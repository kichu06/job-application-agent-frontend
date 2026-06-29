"use client";

import { cn } from "@/lib/utils";

interface JobDescriptionFormProps {
  value: string;
  onChange: (value: string) => void;
}

const MAX_CHARS = 5000;

export default function JobDescriptionForm({
  value,
  onChange,
}: JobDescriptionFormProps) {
  const remaining = MAX_CHARS - value.length;
  const isNearLimit = remaining < 500;
  const isAtLimit = remaining <= 0;

  return (
    <div className="flex min-h-[200px] flex-col rounded-2xl border border-border bg-card overflow-hidden transition-colors duration-200 focus-within:border-foreground/40">

      {/* Header */}
      <div className="flex items-center justify-between border-b border-border px-4 py-3">
        <p className="text-sm font-medium text-foreground">
          Job description
        </p>
        <span
          className={cn(
            "text-xs transition-colors duration-200",
            isAtLimit
              ? "text-destructive"
              : isNearLimit
              ? "text-amber-500 dark:text-amber-400"
              : "text-muted-foreground"
          )}
        >
          {remaining.toLocaleString()} remaining
        </span>
      </div>

      {/* Textarea */}
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value.slice(0, MAX_CHARS))}
        placeholder="Paste the full job description here..."
        aria-label="Job description"
        className="flex-1 resize-none bg-transparent px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none min-h-[152px]"
      />
    </div>
  );
}