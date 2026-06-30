import Link from "next/link";
import { useTranslations } from "next-intl";
import Container from "@/components/layout/Container";
import { ArrowRight } from "lucide-react";

export default function BottomCTA() {
  const t = useTranslations("bottomCta");

  return (
    <section className="py-20">
      <Container>
        <div className="rounded-2xl border border-border bg-foreground px-8 py-16 text-center">
          <p className="mb-3 text-xs font-medium uppercase tracking-widest text-background/50">
            {t("label")}
          </p>
          <h2 className="text-2xl font-semibold tracking-tight text-background sm:text-3xl">
            {t("title")}
          </h2>
          <p className="mt-3 text-sm text-background/60">
            {t("subtitle")}
          </p>
          <Link
            href="/analyze"
            className="mt-8 inline-flex items-center gap-2 rounded-xl bg-background px-5 py-2.5 text-sm font-medium text-foreground transition-opacity duration-200 hover:opacity-90"
          >
            {t("cta")}
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </Container>
    </section>
  );
}