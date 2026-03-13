import type { GenerationEntry } from "@/backend.d.ts";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import {
  useDeleteGeneration,
  useGetHistory,
  useSaveGeneration,
} from "@/hooks/useQueries";
import { generateSiteContent } from "@/lib/siteGenerator";
import {
  ArrowLeft,
  CheckCircle2,
  Clock,
  Loader2,
  Monitor,
  RefreshCw,
  Save,
  Trash2,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import SitePreview from "./SitePreview";

type ColorScheme = "warm" | "cool" | "neutral" | "vibrant";
type LayoutStyle = "minimal" | "bold" | "elegant";

interface PreviewViewProps {
  prompt: string;
  colorScheme: ColorScheme;
  layoutStyle: LayoutStyle;
  onBack: () => void;
  onHistorySelect: (entry: GenerationEntry) => void;
}

function formatDate(ts: bigint) {
  return new Date(Number(ts) / 1_000_000).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
}

export default function PreviewView({
  prompt,
  colorScheme,
  layoutStyle,
  onBack,
  onHistorySelect,
}: PreviewViewProps) {
  const content = generateSiteContent(prompt, colorScheme, layoutStyle);
  const [saved, setSaved] = useState(false);

  const saveMutation = useSaveGeneration();
  const deleteMutation = useDeleteGeneration();
  const { data: history, isLoading: historyLoading } = useGetHistory();

  async function handleSave() {
    try {
      await saveMutation.mutateAsync({
        prompt,
        colorScheme,
        layoutStyle,
        title: content.title,
      });
      setSaved(true);
      toast.success("Website saved to history!");
    } catch {
      toast.error("Failed to save. Please try again.");
    }
  }

  function handleDelete(e: React.MouseEvent, id: bigint) {
    e.stopPropagation();
    deleteMutation.mutate(id, {
      onSuccess: () => toast.success("Deleted."),
      onError: () => toast.error("Failed to delete."),
    });
  }

  return (
    <div className="h-screen flex flex-col bg-background overflow-hidden">
      {/* Top bar */}
      <header className="flex-shrink-0 glass border-b border-border/50 flex items-center gap-3 px-4 py-3 z-20">
        <Button
          data-ocid="preview.back_button"
          variant="ghost"
          size="sm"
          onClick={onBack}
          className="gap-1.5 text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </Button>

        <div className="h-4 w-px bg-border" />

        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium truncate">{content.title}</p>
          <p className="text-xs text-muted-foreground truncate">{prompt}</p>
        </div>

        <div className="flex items-center gap-2 flex-shrink-0">
          <div className="hidden sm:flex items-center gap-1.5">
            <span className="px-2 py-0.5 rounded-full bg-secondary text-xs text-muted-foreground">
              {colorScheme}
            </span>
            <span className="px-2 py-0.5 rounded-full bg-secondary text-xs text-muted-foreground">
              {layoutStyle}
            </span>
          </div>

          <Button
            data-ocid="preview.regenerate_button"
            variant="outline"
            size="sm"
            onClick={onBack}
            className="gap-1.5 border-border/50"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Regenerate</span>
          </Button>

          <Button
            data-ocid="preview.save_button"
            size="sm"
            onClick={handleSave}
            disabled={saveMutation.isPending || saved}
            className="gap-1.5 shimmer-btn border-0 text-primary-foreground"
          >
            {saveMutation.isPending ? (
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
            ) : saved ? (
              <CheckCircle2 className="w-3.5 h-3.5" />
            ) : (
              <Save className="w-3.5 h-3.5" />
            )}
            {saved ? "Saved" : "Save"}
          </Button>
        </div>
      </header>

      {/* Body: sidebar + preview */}
      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar */}
        <aside className="w-56 flex-shrink-0 border-r border-border/30 flex-col bg-sidebar hidden md:flex">
          <div className="px-4 py-3 border-b border-border/30">
            <p className="text-xs font-medium text-muted-foreground flex items-center gap-1.5">
              <Clock className="w-3 h-3" />
              History
            </p>
          </div>
          <ScrollArea className="flex-1">
            <div className="p-2 space-y-1">
              {historyLoading ? (
                <div
                  className="space-y-1.5 p-1"
                  data-ocid="history.loading_state"
                >
                  {[1, 2, 3].map((i) => (
                    <Skeleton key={i} className="h-12 w-full rounded-lg" />
                  ))}
                </div>
              ) : !history || history.length === 0 ? (
                <div
                  data-ocid="history.empty_state"
                  className="px-2 py-6 text-center text-xs text-muted-foreground"
                >
                  No history yet
                </div>
              ) : (
                [...history]
                  .sort((a, b) => Number(b.timestamp) - Number(a.timestamp))
                  .slice(0, 20)
                  .map((entry, idx) => (
                    <div
                      key={entry.id.toString()}
                      data-ocid={`history.item.${idx + 1}`}
                      className="group relative rounded-lg hover:bg-secondary/50 transition-colors"
                    >
                      <button
                        type="button"
                        onClick={() => onHistorySelect(entry)}
                        className="w-full text-left px-2 py-2 rounded-lg"
                      >
                        <p className="text-xs font-medium truncate text-foreground/90">
                          {entry.title}
                        </p>
                        <p className="text-[10px] text-muted-foreground mt-0.5">
                          {formatDate(entry.timestamp)}
                        </p>
                      </button>
                      <button
                        type="button"
                        data-ocid={`history.delete_button.${idx + 1}`}
                        onClick={(e) => handleDelete(e, entry.id)}
                        className="absolute top-1.5 right-1.5 opacity-0 group-hover:opacity-100 p-0.5 rounded hover:text-destructive text-muted-foreground transition-all"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                  ))
              )}
            </div>
          </ScrollArea>
        </aside>

        {/* Preview area */}
        <main className="flex-1 flex flex-col overflow-hidden bg-muted/20">
          {/* Browser chrome */}
          <div className="flex-shrink-0 px-6 pt-4 pb-3">
            <motion.div
              data-ocid="preview.browser_frame"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="rounded-xl overflow-hidden border border-border/50 shadow-lg bg-card"
            >
              {/* Browser toolbar */}
              <div className="bg-secondary/80 px-4 py-2.5 flex items-center gap-3 border-b border-border/30">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-destructive/70" />
                  <div className="w-3 h-3 rounded-full bg-amber-500/70" />
                  <div className="w-3 h-3 rounded-full bg-green-500/70" />
                </div>
                <div className="flex-1 bg-background/60 rounded-md px-3 py-1 flex items-center gap-2">
                  <Monitor className="w-3 h-3 text-muted-foreground" />
                  <span className="text-xs text-muted-foreground truncate">
                    {content.title.toLowerCase().replace(/\s+/g, "-")}.com
                  </span>
                </div>
              </div>

              {/* Website preview content */}
              <div
                className="overflow-auto"
                style={{ height: "calc(100vh - 200px)" }}
              >
                <SitePreview
                  content={content}
                  colorScheme={colorScheme}
                  layoutStyle={layoutStyle}
                />
              </div>
            </motion.div>
          </div>
        </main>
      </div>
    </div>
  );
}
