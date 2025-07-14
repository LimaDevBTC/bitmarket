import { NextIntlClientProvider } from 'next-intl';
import { ProtectRoute } from '@/hooks/use-auth';
import { getMessages } from 'next-intl/server';

export default async function LocaleLayout(props: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const { children, params } = props;
  const { locale } = await params;
  const messages = await getMessages();

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <ProtectRoute>
        {children}
      </ProtectRoute>
    </NextIntlClientProvider>
  );
}
