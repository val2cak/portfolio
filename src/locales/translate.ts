import { getLocaleFromStorage } from '../services/local-storage';
import en from './en';

export const availableLocales = {
  en,
};

let defaultLocale = 'en';

if (typeof window !== 'undefined') {
  defaultLocale = window.navigator.language.split('-')[0] || 'en';
}

export const locale = getLocaleFromStorage() ?? defaultLocale;

export const translate = availableLocales[locale];
