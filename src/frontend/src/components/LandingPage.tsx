import type { GenerationEntry } from "@/backend.d.ts";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import { useDeleteGeneration, useGetHistory } from "@/hooks/useQueries";
import { EXAMPLE_PROMPTS } from "@/lib/siteGenerator";
import {
  ArrowRight,
  ChevronRight,
  Clock,
  Sparkles,
  Trash2,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useRef, useState } from "react";
import { toast } from "sonner";

type ColorScheme = "warm" | "cool" | "neutral" | "vibrant";
type LayoutStyle = "minimal" | "bold" | "elegant";

interface LandingPageProps {
  onGenerate: (
    prompt: string,
    colorScheme: ColorScheme,
    layoutStyle: LayoutStyle,
  ) => void;
  onHistorySelect: (entry: GenerationEntry) => void;
}

const colorSchemes: { value: ColorScheme; label: string; preview: string }[] = [
  { value: "warm", label: "Warm", preview: "from-amber-500 to-orange-400" },
  { value: "cool", label: "Cool", preview: "from-sky-500 to-teal-400" },
  { value: "neutral", label: "Neutral", preview: "from-slate-400 to-gray-500" },
  {
    value: "vibrant",
    label: "Vibrant",
    preview: "from-purple-500 to-pink-400",
  },
];

const layoutStyles: { value: LayoutStyle; label: string }[] = [
  { value: "minimal", label: "Minimal" },
  { value: "bold", label: "Bold" },
  { value: "elegant", label: "Elegant" },
];

function formatDate(ts: bigint) {
  return new Date(Number(ts) / 1_000_000).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
}

export default function LandingPage({
  onGenerate,
  onHistorySelect,
}: LandingPageProps) {
  const [prompt, setPrompt] = useState("");
  const [colorScheme, setColorScheme] = useState<ColorScheme>("cool");
  const [layoutStyle, setLayoutStyle] = useState<LayoutStyle>("minimal");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const { data: history, isLoading: historyLoading } = useGetHistory();
  const deleteMutation = useDeleteGeneration();

  function handleGenerate() {
    if (!prompt.trim()) {
      toast.error("Please describe the website you want to build.");
      return;
    }
    onGenerate(prompt.trim(), colorScheme, layoutStyle);
  }

  function handleExampleClick(p: string) {
    setPrompt(p);
    textareaRef.current?.focus();
  }

  function handleDelete(e: React.MouseEvent, id: bigint) {
    e.stopPropagation();
    deleteMutation.mutate(id, {
      onSuccess: () => toast.success("Generation deleted."),
      onError: () => toast.error("Failed to delete."),
    });
  }

  return (
    <div className="min-h-screen bg-background relative overflow-x-hidden">
      {/* Aurora background */}
      <div className="aurora-bg">
        <div className="aurora-orb aurora-orb-1" />
        <div className="aurora-orb aurora-orb-2" />
        <div className="aurora-orb aurora-orb-3" />
      </div>

      {/* Dot grid */}
      <div className="absolute inset-0 dot-grid opacity-40 pointer-events-none" />

      {/* Nav */}
      <header className="relative z-10 flex items-center justify-between px-6 py-5 max-w-7xl mx-auto">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg shimmer-btn flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-primary-foreground" />
          </div>
          <span className="font-display font-700 text-lg tracking-tight">
            Promptsite
          </span>
        </div>
        <nav className="hidden md:flex items-center gap-6 text-sm text-muted-foreground">
          <span>Examples</span>
          <span>History</span>
          <span>Docs</span>
        </nav>
      </header>

      {/* Hero */}
      <main className="relative z-10 flex flex-col items-center px-6 pt-16 pb-8 max-w-4xl mx-auto">
        <motion.button
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-10"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass text-xs font-medium text-primary mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            AI-Powered Website Generation
          </div>

          <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-700 tracking-tight leading-[1.05] mb-6">
            Describe any website.
            <br />
            <span
              className="text-glow"
              style={{
                background:
                  "linear-gradient(135deg, oklch(0.78 0.18 195), oklch(0.72 0.2 290))",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Watch it come to life.
            </span>
          </h1>

          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Type a description below and get a fully styled, ready-to-customize
            website preview in seconds.
          </p>
        </motion.button>

        {/* Builder card */}
        <motion.button
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="w-full glass-card rounded-2xl p-6 shadow-glow"
        >
          <Textarea
            ref={textareaRef}
            data-ocid="builder.prompt_textarea"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="a bakery website with a warm color scheme and rustic feel..."
            className="w-full min-h-[120px] bg-transparent border-0 border-b border-border/50 rounded-none resize-none text-base placeholder:text-muted-foreground/50 focus-visible:ring-0 focus-visible:border-primary/50 transition-colors pb-3 mb-5"
            onKeyDown={(e) => {
              if (e.key === "Enter" && (e.ctrlKey || e.metaKey))
                handleGenerate();
            }}
          />

          {/* Customization row */}
          <div className="flex flex-col sm:flex-row gap-4 mb-5">
            {/* Color scheme */}
            <div className="flex-1">
              <p className="text-xs text-muted-foreground mb-2 font-medium">
                Color Scheme
              </p>
              <div
                className="flex gap-2"
                data-ocid="builder.color_scheme.select"
              >
                {colorSchemes.map((cs) => (
                  <button
                    type="button"
                    key={cs.value}
                    onClick={() => setColorScheme(cs.value)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all border ${
                      colorScheme === cs.value
                        ? "border-primary/60 bg-primary/10 text-primary"
                        : "border-border/50 text-muted-foreground hover:border-border hover:text-foreground"
                    }`}
                  >
                    <span
                      className={`w-2 h-2 rounded-full bg-gradient-to-r ${cs.preview}`}
                    />
                    {cs.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Layout style */}
            <div className="flex-1">
              <p className="text-xs text-muted-foreground mb-2 font-medium">
                Layout Style
              </p>
              <div
                className="flex gap-2"
                data-ocid="builder.layout_style.select"
              >
                {layoutStyles.map((ls) => (
                  <button
                    type="button"
                    key={ls.value}
                    onClick={() => setLayoutStyle(ls.value)}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all border ${
                      layoutStyle === ls.value
                        ? "border-primary/60 bg-primary/10 text-primary"
                        : "border-border/50 text-muted-foreground hover:border-border hover:text-foreground"
                    }`}
                  >
                    {ls.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <Button
            data-ocid="builder.generate_button"
            onClick={handleGenerate}
            className="w-full h-12 shimmer-btn text-primary-foreground font-semibold text-base rounded-xl border-0 glow-cyan"
          >
            <Sparkles className="w-4 h-4 mr-2" />
            Generate Website
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>

          <p className="text-center text-xs text-muted-foreground/50 mt-3">
            ⌘ + Enter to generate
          </p>
        </motion.button>

        {/* Example prompts */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.35, duration: 0.6 }}
          className="w-full mt-12"
        >
          <h2 className="text-sm font-medium text-muted-foreground mb-4 flex items-center gap-2">
            <ChevronRight className="w-3 h-3" />
            Example prompts — click to use
          </h2>
          <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-none -mx-1 px-1">
            {EXAMPLE_PROMPTS.map((p, i) => (
              <motion.button
                type="button"
                key={p}
                data-ocid={`prompt.example.item.${i + 1}`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleExampleClick(p)}
                className="flex-shrink-0 max-w-[200px] glass-card rounded-xl px-4 py-3 text-left text-xs text-muted-foreground hover:text-foreground hover:border-primary/30 transition-all cursor-pointer"
              >
                <span className="line-clamp-3 leading-relaxed">{p}</span>
              </motion.button>
            ))}
          </div>
        </motion.section>

        {/* History */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="w-full mt-12 mb-16"
        >
          <h2 className="text-sm font-medium text-muted-foreground mb-4 flex items-center gap-2">
            <Clock className="w-3 h-3" />
            Previously Generated
          </h2>

          {historyLoading ? (
            <div className="space-y-2" data-ocid="history.loading_state">
              {[1, 2, 3].map((i) => (
                <Skeleton key={i} className="h-14 w-full rounded-xl" />
              ))}
            </div>
          ) : !history || history.length === 0 ? (
            <div
              data-ocid="history.empty_state"
              className="glass-card rounded-xl px-6 py-8 text-center text-muted-foreground text-sm"
            >
              No generations yet. Create your first website above.
            </div>
          ) : (
            <div className="space-y-2">
              <AnimatePresence>
                {[...history]
                  .sort((a, b) => Number(b.timestamp) - Number(a.timestamp))
                  .slice(0, 8)
                  .map((entry, idx) => (
                    <motion.button
                      key={entry.id.toString()}
                      data-ocid={`history.item.${idx + 1}`}
                      initial={{ opacity: 0, x: -16 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 16 }}
                      transition={{ delay: idx * 0.05 }}
                      onClick={() => onHistorySelect(entry)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ")
                          onHistorySelect(entry);
                      }}
                      tabIndex={0}
                      className="glass-card rounded-xl px-4 py-3 flex items-center gap-3 cursor-pointer hover:border-primary/30 transition-all group"
                    >
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">
                          {entry.title}
                        </p>
                        <p className="text-xs text-muted-foreground truncate mt-0.5">
                          {entry.prompt}
                        </p>
                      </div>
                      <div className="flex items-center gap-3 flex-shrink-0">
                        <div className="hidden sm:flex gap-1.5">
                          <span className="px-2 py-0.5 rounded-full bg-secondary text-xs text-muted-foreground">
                            {entry.colorScheme}
                          </span>
                          <span className="px-2 py-0.5 rounded-full bg-secondary text-xs text-muted-foreground">
                            {entry.layoutStyle}
                          </span>
                        </div>
                        <span className="text-xs text-muted-foreground">
                          {formatDate(entry.timestamp)}
                        </span>
                        <button
                          type="button"
                          data-ocid={`history.delete_button.${idx + 1}`}
                          onClick={(e) => handleDelete(e, entry.id)}
                          className="opacity-0 group-hover:opacity-100 p-1.5 rounded-lg hover:bg-destructive/10 hover:text-destructive text-muted-foreground transition-all"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </motion.button>
                  ))}
              </AnimatePresence>
            </div>
          )}
        </motion.section>
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-border/30 py-6 px-6">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-muted-foreground/50">
          <span>
            © {new Date().getFullYear()} Promptsite. All rights reserved.
          </span>
          <a
            href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-muted-foreground transition-colors"
          >
            Built with ❤️ using caffeine.ai
          </a>
        </div>
      </footer>
    </div>
  );
}
