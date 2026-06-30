import { useTranslations } from "next-intl";
import Container from "@/components/layout/Container";

export default function HowItWorks() {
  const t = useTranslations("howItWorks");

  const steps = ["step1", "step2", "step3"];

  return (
    <section id="how-it-works" className="border-b border-border/60 py-20">
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

        <div className="mx-auto max-w-xl divide-y divide-border/60">
          {steps.map((step, index) => (
            <div key={step} className="flex gap-5 py-6">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-border/60 text-sm font-medium text-muted-foreground mt-0.5">
                {index + 1}
              </div>
              <div>
                <h3 className="text-sm font-medium text-foreground mb-1">
                  {t(`${step}.title`)}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                  {t(`${step}.description`)}
                </p>
                <span className="inline-block rounded-lg border border-border/60 bg-muted/40 px-2.5 py-1 text-xs text-muted-foreground">
                  {t(`${step}.tag`)}
                </span>
              </div>
            </div>
          ))}
        </div>

      </Container>
    </section>
  );
}