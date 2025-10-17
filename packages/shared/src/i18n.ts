/**
 * i18n Utilities
 * Helpers for internationalization (en, es, ru)
 */

export type Locale = 'en' | 'es' | 'ru';

export const SUPPORTED_LOCALES: Locale[] = ['en', 'es', 'ru'];
export const DEFAULT_LOCALE: Locale = 'en';

export interface I18nText {
  en?: string;
  es?: string;
  ru?: string;
}

/**
 * Get translated text for locale with fallback
 * @param text i18n text object
 * @param locale Desired locale
 * @param fallbackLocale Fallback locale (default: 'en')
 * @returns Translated string
 */
export function getTranslation(
  text: I18nText | null | undefined,
  locale: Locale,
  fallbackLocale: Locale = DEFAULT_LOCALE
): string {
  if (!text) return '';

  return (
    text[locale] ||
    text[fallbackLocale] ||
    text.en ||
    text.es ||
    text.ru ||
    ''
  );
}

/**
 * Validate locale string
 * @param locale Locale string to validate
 * @returns True if valid
 */
export function isValidLocale(locale: string): locale is Locale {
  return SUPPORTED_LOCALES.includes(locale as Locale);
}

/**
 * Parse locale from string with fallback
 * @param locale Locale string
 * @param fallback Fallback locale
 * @returns Valid locale
 */
export function parseLocale(
  locale: string | undefined,
  fallback: Locale = DEFAULT_LOCALE
): Locale {
  if (!locale) return fallback;
  
  // Handle locale variants (e.g., 'en-US' -> 'en')
  const baseLocale = locale.split('-')[0].toLowerCase();
  
  return isValidLocale(baseLocale) ? baseLocale : fallback;
}

/**
 * Create i18n text object from single string
 * Useful for migration or default values
 * @param text Text string
 * @param locale Source locale
 * @returns I18n text object
 */
export function createI18nText(text: string, locale: Locale = 'en'): I18nText {
  return { [locale]: text };
}

/**
 * Merge i18n text objects
 * @param base Base i18n text
 * @param override Override i18n text
 * @returns Merged i18n text
 */
export function mergeI18nText(
  base: I18nText,
  override: Partial<I18nText>
): I18nText {
  return { ...base, ...override };
}

/**
 * Check if i18n text is complete (has all locales)
 * @param text i18n text object
 * @returns True if all locales present
 */
export function isCompleteI18nText(text: I18nText): boolean {
  return SUPPORTED_LOCALES.every((locale) => Boolean(text[locale]));
}

/**
 * Get missing locales from i18n text
 * @param text i18n text object
 * @returns Array of missing locales
 */
export function getMissingLocales(text: I18nText): Locale[] {
  return SUPPORTED_LOCALES.filter((locale) => !text[locale]);
}

/**
 * Format date according to locale
 * @param date Date to format
 * @param locale Locale
 * @param options Intl.DateTimeFormatOptions
 * @returns Formatted date string
 */
export function formatDate(
  date: Date | string,
  locale: Locale = DEFAULT_LOCALE,
  options?: Intl.DateTimeFormatOptions
): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  
  const defaultOptions: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    ...options,
  };

  // Map our locales to full locale codes
  const localeMap: Record<Locale, string> = {
    en: 'en-GB',
    es: 'es-ES',
    ru: 'ru-RU',
  };

  return dateObj.toLocaleDateString(localeMap[locale], defaultOptions);
}

/**
 * Format time according to locale
 * @param date Date to format
 * @param locale Locale
 * @param options Intl.DateTimeFormatOptions
 * @returns Formatted time string
 */
export function formatTime(
  date: Date | string,
  locale: Locale = DEFAULT_LOCALE,
  options?: Intl.DateTimeFormatOptions
): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  
  const defaultOptions: Intl.DateTimeFormatOptions = {
    hour: '2-digit',
    minute: '2-digit',
    ...options,
  };

  const localeMap: Record<Locale, string> = {
    en: 'en-GB',
    es: 'es-ES',
    ru: 'ru-RU',
  };

  return dateObj.toLocaleTimeString(localeMap[locale], defaultOptions);
}

/**
 * Format number/currency according to locale
 * @param value Number to format
 * @param locale Locale
 * @param currency Currency code (EUR, USD, etc.)
 * @returns Formatted currency string
 */
export function formatCurrency(
  value: number,
  locale: Locale = DEFAULT_LOCALE,
  currency = 'EUR'
): string {
  const localeMap: Record<Locale, string> = {
    en: 'en-GB',
    es: 'es-ES',
    ru: 'ru-RU',
  };

  return new Intl.NumberFormat(localeMap[locale], {
    style: 'currency',
    currency,
  }).format(value);
}

/**
 * Slugify text for URL-friendly strings
 * Handles special characters from Spanish and Russian
 * @param text Text to slugify
 * @returns URL-friendly slug
 */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    // Replace Spanish accented characters
    .replace(/á/g, 'a')
    .replace(/é/g, 'e')
    .replace(/í/g, 'i')
    .replace(/ó/g, 'o')
    .replace(/ú/g, 'u')
    .replace(/ñ/g, 'n')
    .replace(/ü/g, 'u')
    // Replace Cyrillic characters (basic transliteration)
    .replace(/а/g, 'a')
    .replace(/б/g, 'b')
    .replace(/в/g, 'v')
    .replace(/г/g, 'g')
    .replace(/д/g, 'd')
    .replace(/е/g, 'e')
    .replace(/ё/g, 'yo')
    .replace(/ж/g, 'zh')
    .replace(/з/g, 'z')
    .replace(/и/g, 'i')
    .replace(/й/g, 'y')
    .replace(/к/g, 'k')
    .replace(/л/g, 'l')
    .replace(/м/g, 'm')
    .replace(/н/g, 'n')
    .replace(/о/g, 'o')
    .replace(/п/g, 'p')
    .replace(/р/g, 'r')
    .replace(/с/g, 's')
    .replace(/т/g, 't')
    .replace(/у/g, 'u')
    .replace(/ф/g, 'f')
    .replace(/х/g, 'h')
    .replace(/ц/g, 'ts')
    .replace(/ч/g, 'ch')
    .replace(/ш/g, 'sh')
    .replace(/щ/g, 'sch')
    .replace(/ъ/g, '')
    .replace(/ы/g, 'y')
    .replace(/ь/g, '')
    .replace(/э/g, 'e')
    .replace(/ю/g, 'yu')
    .replace(/я/g, 'ya')
    // Remove non-alphanumeric characters except hyphens
    .replace(/[^\w\s-]/g, '')
    // Replace whitespace and underscores with hyphens
    .replace(/[\s_]+/g, '-')
    // Remove duplicate hyphens
    .replace(/-+/g, '-')
    // Remove leading/trailing hyphens
    .replace(/^-+|-+$/g, '');
}

/**
 * Locale-specific text labels
 */
export const LOCALE_LABELS: Record<Locale, Record<string, string>> = {
  en: {
    day: 'Day',
    night: 'Night',
    free: 'Free',
    from: 'From',
    events: 'Events',
    articles: 'Articles',
    artists: 'Artists',
    venues: 'Venues',
    readMore: 'Read more',
    viewAll: 'View all',
    noResults: 'No results found',
  },
  es: {
    day: 'Día',
    night: 'Noche',
    free: 'Gratis',
    from: 'Desde',
    events: 'Eventos',
    articles: 'Artículos',
    artists: 'Artistas',
    venues: 'Lugares',
    readMore: 'Leer más',
    viewAll: 'Ver todo',
    noResults: 'No se encontraron resultados',
  },
  ru: {
    day: 'День',
    night: 'Ночь',
    free: 'Бесплатно',
    from: 'От',
    events: 'События',
    articles: 'Статьи',
    artists: 'Артисты',
    venues: 'Площадки',
    readMore: 'Читать далее',
    viewAll: 'Показать все',
    noResults: 'Результаты не найдены',
  },
};

/**
 * Get locale label
 * @param key Label key
 * @param locale Locale
 * @returns Translated label
 */
export function getLabel(key: string, locale: Locale = DEFAULT_LOCALE): string {
  return LOCALE_LABELS[locale]?.[key] || LOCALE_LABELS[DEFAULT_LOCALE][key] || key;
}
