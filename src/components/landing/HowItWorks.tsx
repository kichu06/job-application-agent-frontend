import Container from "@/components/layout/Container";

const steps = [
  {
    number: "1",
    title: "Upload your resume",
    description:
      "Drop in your PDF resume. The AI reads and parses your skills, experience, and projects automatically.",
    tag: "PDF supported",
  },
  {
    number: "2",
    title: "Paste the job description",
    description:
      "Copy any job listing and paste it in. The AI extracts required skills, seniority level, and role details.",
    tag: "Any job, any industry",
  },
  {
    number: "3",
    title: "Get your results",
    description:
      "Receive a match score, skill gap analysis, a tailored cover letter, and 5 interview questions with suggested answers.",
    tag: "Results in ~15 seconds",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="border-b border-border/60 py-20">
      <Container>

        {/* Header */}
        <div className="mb-12 text-center">
          <p className="mb-2 text-xs font-medium uppercase tracking-widest text-muted-foreground">
            How it works
          </p>
          <h2 className="text-2xl font-semibold tracking-tight">
            Three steps to a stronger application
          </h2>
          <p className="mt-3 text-sm text-muted-foreground">
            From upload to interview-ready in under a minute.
          </p>
        </div>

        {/* Steps */}
        <div className="mx-auto max-w-xl divide-y divide-border/60">
          {steps.map((step) => (
            <div key={step.number} className="flex gap-5 py-6">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-border/60 text-sm font-medium text-muted-foreground mt-0.5">
                {step.number}
              </div>
              <div>
                <h3 className="text-sm font-medium text-foreground mb-1">
                  {step.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                  {step.description}
                </p>
                <span className="inline-block rounded-lg border border-border/60 bg-muted/40 px-2.5 py-1 text-xs text-muted-foreground">
                  {step.tag}
                </span>
              </div>
            </div>
          ))}
        </div>

      </Container>
    </section>
  );
}