import { notFound } from 'next/navigation';
import { getRequestConfig } from 'next-intl/server';

// Can be imported from a shared config
export const locales = ['pt', 'en', 'es'] as const;
export const defaultLocale = 'en' as const;

export type Locale = (typeof locales)[number];

export default getRequestConfig(async ({ locale }) => {
  // Validate that the incoming `locale` parameter is valid
  if (!locale || !locales.includes(locale as Locale)) notFound();

  return {
    locale,
    messages: (await import(`./src/messages/${locale}.json`)).default
  };
}); 