import Link from "next/link";
import { BriefcaseBusiness } from "lucide-react";
import { appName } from "@/config/app";
import { cn } from "@/lib/utils";

interface LogoProps {
  href?: string;
  className?: string;
}

export default function Logo({ href = "/", className }: LogoProps) {
  const content = (
    <>
      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-sm ring-1 ring-border/40">
        <BriefcaseBusiness className="h-5 w-5" aria-hidden="true" />
      </div>
      <span className="text-lg font-semibold tracking-tight text-foreground">{appName}</span>
    </>
  );

  return (
    <Link
      href={href}
      className={cn(
        "inline-flex items-center gap-3 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        className,
      )}
    >
      {content}
    </Link>
  );
}
