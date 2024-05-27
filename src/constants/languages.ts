import { Language } from '../types/language-types';
import en from '../../public/icons/english.svg';
import hr from '../../public/icons/croatian.svg';

export const languages: Language[] = [
  { id: 1, locale: 'en', name: 'English', icon: en.src },
  { id: 2, locale: 'hr', name: 'Croatian', icon: hr.src },
];
