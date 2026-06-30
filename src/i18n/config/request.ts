import { getRequestConfig } from "next-intl/server";
import { cookies } from "next/headers";

export const locales = ["en", "de"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";

export default getRequestConfig(async () => {
  const cookieStore = await cookies();
  const localeCookie = cookieStore.get("locale")?.value;

  const locale =
    localeCookie && locales.includes(localeCookie as Locale)
      ? (localeCookie as Locale)
      : defaultLocale;

  const [common, landing, analyze] = await Promise.all([
    import(`@/i18n/locales/${locale}/common.json`),
    import(`@/i18n/locales/${locale}/landing.json`),
    import(`@/i18n/locales/${locale}/analyze.json`),
  ]);

  return {
    locale,
    messages: {
      ...common.default,
      ...landing.default,
      analyze: analyze.default,
    },
  };
});