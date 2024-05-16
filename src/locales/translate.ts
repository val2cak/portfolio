import { getLocaleFromStorage } from '../services/local-storage';
import en from './en';
import hr from './hr';

export const availableLocales = {
  en,
  hr,
};

let defaultLocale = 'en';

export const locale = getLocaleFromStorage() ?? defaultLocale;

export const translate = availableLocales[locale];
