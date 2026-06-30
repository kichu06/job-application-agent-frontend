import { useTranslations } from "next-intl";
import Container from "@/components/layout/Container";
import { BarChart2, FileText, MessageSquare } from "lucide-react";

export default function Features() {
  const t = useTranslations("features");

  const features = [
    {
      key: "matchScore",
      icon: BarChart2,
      iconClass: "text-emerald-600 dark:text-emerald-400",
      bgClass: "bg-emerald-50 dark:bg-emerald-950/40",
    },
    {
      key: "coverLetter",
      icon: FileText,
      iconClass: "text-blue-600 dark:text-blue-400",
      bgClass: "bg-blue-50 dark:bg-blue-950/40",
    },
    {
      key: "interviewKit",
      icon: MessageSquare,
      iconClass: "text-violet-600 dark:text-violet-400",
      bgClass: "bg-violet-50 dark:bg-violet-950/40",
    },
  ];

  return (
    <section className="border-b border-border/60 py-20">
      <Container>

        <div className="mb-12 text-center">
          <p className="mb-2 text-xs font-medium uppercase tracking-widest text-muted-foreground">
            {t("label")}
          </p>
          <h2 className="text-2xl font-semibold tracking-tight">
            {t("title")}
          </h2>
          <p className="mt-3 text-sm text-muted-foreground">
            {t("subtitle")}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.key}
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
                  {t(`${feature.key}.title`)}
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {t(`${feature.key}.description`)}
                </p>
              </div>
            );
          })}
        </div>

      </Container>
    </section>
  );
}