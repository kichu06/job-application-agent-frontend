import { Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

interface AnalyzeButtonProps {
  onClick: () => void;
  disabled: boolean;
}

export default function AnalyzeButton({ onClick, disabled }: AnalyzeButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "w-full inline-flex items-center justify-center gap-2 rounded-xl py-3 text-sm font-medium transition-all duration-200",
        disabled
          ? "bg-muted text-muted-foreground cursor-not-allowed"
          : "bg-foreground text-background hover:opacity-80 active:scale-[0.99]"
      )}
    >
      <Sparkles className="h-4 w-4" aria-hidden="true" />
      Analyze my application
    </button>
  );
}