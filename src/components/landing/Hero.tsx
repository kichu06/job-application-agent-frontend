import Link from "next/link";
import Container from "@/components/layout/Container";
import { Zap, Check } from "lucide-react";

const trustSignals = [
  "Free to use",
  "No signup required",
  "Results in seconds",
];

export default function Hero() {
  return (
    <section className="border-b border-border/60 py-20 text-center">
      <Container className="flex flex-col items-center">

        {/* Badge */}
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border/60 bg-muted/50 px-3 py-1.5 text-xs font-medium text-muted-foreground">
          <Zap className="h-3 w-3 text-primary" aria-hidden="true" />
          Powered by LangGraph + Llama 3.1
        </div>

        {/* Headline */}
        <h1 className="max-w-2xl text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
          Land your next job with{" "}
          <span className="text-muted-foreground">AI-powered</span> analysis
        </h1>

        {/* Subheadline */}
        <p className="mt-5 max-w-md text-base text-muted-foreground leading-relaxed">
          Upload your resume, paste a job description, and get instant skill
          match analysis, a tailored cover letter, and interview prep.
        </p>

        {/* CTAs */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/analyze"
            className="inline-flex items-center gap-2 rounded-xl bg-foreground px-5 py-2.5 text-sm font-medium text-background transition-opacity duration-200 hover:opacity-80"
          >
            Analyze my resume
          </Link>
          <a
            href="#how-it-works"
            className="inline-flex items-center gap-2 rounded-xl border border-border/60 px-5 py-2.5 text-sm font-medium text-muted-foreground transition-colors duration-200 hover:text-foreground hover:bg-accent/50"
          >
            See how it works
          </a>
        </div>

        {/* Trust signals */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-5">
          {trustSignals.map((signal) => (
            <span
              key={signal}
              className="flex items-center gap-1.5 text-xs text-muted-foreground"
            >
              <Check className="h-3.5 w-3.5 text-foreground" aria-hidden="true" />
              {signal}
            </span>
          ))}
        </div>

      </Container>
    </section>
  );
}