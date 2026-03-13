import type { GenerationEntry } from "@/backend.d.ts";
import GeneratingOverlay from "@/components/GeneratingOverlay";
import LandingPage from "@/components/LandingPage";
import PreviewView from "@/components/PreviewView";
import { Toaster } from "@/components/ui/sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AnimatePresence } from "motion/react";
import { useEffect, useState } from "react";

type ColorScheme = "warm" | "cool" | "neutral" | "vibrant";
type LayoutStyle = "minimal" | "bold" | "elegant";

type View = "landing" | "generating" | "preview";

interface BuildState {
  prompt: string;
  colorScheme: ColorScheme;
  layoutStyle: LayoutStyle;
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: 30_000,
    },
  },
});

function AppInner() {
  const [view, setView] = useState<View>("landing");
  const [buildState, setBuildState] = useState<BuildState>({
    prompt: "",
    colorScheme: "cool",
    layoutStyle: "minimal",
  });
  const [genStep, setGenStep] = useState(0);

  function handleGenerate(
    prompt: string,
    colorScheme: ColorScheme,
    layoutStyle: LayoutStyle,
  ) {
    setBuildState({ prompt, colorScheme, layoutStyle });
    setView("generating");
    setGenStep(0);
  }

  useEffect(() => {
    if (view !== "generating") return;

    let step = 0;
    const total = 5;
    const interval = setInterval(() => {
      step += 1;
      setGenStep(step);
      if (step >= total) {
        clearInterval(interval);
        setTimeout(() => setView("preview"), 300);
      }
    }, 280);

    return () => clearInterval(interval);
  }, [view]);

  function handleHistorySelect(entry: GenerationEntry) {
    setBuildState({
      prompt: entry.prompt,
      colorScheme: entry.colorScheme as ColorScheme,
      layoutStyle: entry.layoutStyle as LayoutStyle,
    });
    setView("preview");
  }

  return (
    <>
      <AnimatePresence mode="wait">
        {view === "generating" && (
          <GeneratingOverlay key="generating" step={genStep} />
        )}
      </AnimatePresence>

      {view === "landing" && (
        <LandingPage
          onGenerate={handleGenerate}
          onHistorySelect={handleHistorySelect}
        />
      )}

      {view === "preview" && (
        <PreviewView
          prompt={buildState.prompt}
          colorScheme={buildState.colorScheme}
          layoutStyle={buildState.layoutStyle}
          onBack={() => setView("landing")}
          onHistorySelect={handleHistorySelect}
        />
      )}

      <Toaster />
    </>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AppInner />
    </QueryClientProvider>
  );
}
