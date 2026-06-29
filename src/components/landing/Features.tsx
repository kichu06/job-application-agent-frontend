import Container from "@/components/layout/Container";
import { BarChart2, FileText, MessageSquare } from "lucide-react";

const features = [
  {
    icon: BarChart2,
    title: "Match score",
    description:
      "See exactly how well your profile matches the job requirements with a percentage score and skill breakdown.",
    iconClass: "text-emerald-600 dark:text-emerald-400",
    bgClass: "bg-emerald-50 dark:bg-emerald-950/40",
  },
  {
    icon: FileText,
    title: "Cover letter",
    description:
      "Get a tailored cover letter written using your actual experience and the job's specific requirements.",
    iconClass: "text-blue-600 dark:text-blue-400",
    bgClass: "bg-blue-50 dark:bg-blue-950/40",
  },
  {
    icon: MessageSquare,
    title: "Interview kit",
    description:
      "Prepare with likely interview questions and suggested answers based on your background and the role.",
    iconClass: "text-violet-600 dark:text-violet-400",
    bgClass: "bg-violet-50 dark:bg-violet-950/40",
  },
];

export default function Features() {
  return (
    <section className="border-b border-border/60 py-20">
      <Container>

        {/* Header */}
        <div className="mb-12 text-center">
          <p className="mb-2 text-xs font-medium uppercase tracking-widest text-muted-foreground">
            Features
          </p>
          <h2 className="text-2xl font-semibold tracking-tight">
            Everything you need to apply with confidence
          </h2>
          <p className="mt-3 text-sm text-muted-foreground">
            Three AI-powered tools built into one seamless workflow.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                className="rounded-2xl border border-border/60 bg-card p-6 transition-colors duration-200 hover:border-border"
              >
                <div
                  className={`mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl ${feature.bgClass}`}
                >
                  <Icon
                    className={`h-5 w-5 ${feature.iconClass}`}
                    aria-hidden="true"
                  />
                </div>
                <h3 className="mb-2 text-sm font-medium text-foreground">
                  {feature.title}
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>

      </Container>
    </section>
  );
}