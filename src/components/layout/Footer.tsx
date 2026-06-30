import Link from "next/link";
import { useTranslations } from "next-intl";
import Container from "@/components/layout/Container";
import Logo from "@/components/common/Logo";
import { appName } from "@/config/app";
import { navigation } from "@/config/navigation";

export default function Footer() {
  const t = useTranslations();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-muted/30">
      <Container className="py-12">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">

          {/* Left */}
          <div className="flex flex-col gap-4 max-w-xs">
            <Logo />
            <p className="text-sm text-muted-foreground leading-relaxed">
              {t("footer.tagline")}
            </p>
            <a
              href="https://github.com/kichu06/job-application-agent-backend"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-xs text-muted-foreground transition-colors hover:text-foreground w-fit"
            >
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
              </svg>
              {t("footer.github")}
            </a>
          </div>

          {/* Right — nav + stack */}
          <div className="flex gap-16">
            <div className="flex flex-col gap-3">
              <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
                {t("footer.navigation")}
              </p>
              <ul className="flex flex-col gap-2.5">
                {navigation.map((item) => (
                  <li key={item.key}>
                    <Link
                      href={item.href}
                      className="text-sm text-muted-foreground transition-colors duration-200 hover:text-foreground"
                    >
                      {t(`nav.${item.key}`)}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col gap-3">
              <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
                {t("footer.builtWith")}
              </p>
              <ul className="flex flex-col gap-2.5">
                {["Next.js", "LangGraph", "FastAPI", "Llama 3.1"].map((tech) => (
                  <li key={tech} className="text-sm text-muted-foreground">
                    {tech}
                  </li>
                ))}
              </ul>
            </div>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="mt-10 flex flex-col gap-2 border-t border-border pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-muted-foreground">
            © {currentYear} {appName}. {t("footer.rights")}
          </p>
          <p className="text-xs text-muted-foreground">
            {t("footer.madeFor")}
          </p>
        </div>

      </Container>
    </footer>
  );
}