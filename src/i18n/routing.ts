import { defineRouting } from 'next-intl/routing'

export const routing = defineRouting({
  locales: ['en', 'sw', 'zh', 'ru', 'fr', 'ar', 'es', 'pt', 'de', 'ja', 'hi', 'ko', 'it', 'nl', 'tr'],
  defaultLocale: 'en',
  localePrefix: 'always',
})
