export function getLocaleFromStorage(): string | null {
  if (typeof window !== 'undefined') {
    const locale = localStorage.getItem('locale');

    if (locale && locale !== null) return JSON.parse(locale);
    else return null;
  }
}

export function setLocaleToStorage(locale: string) {
  localStorage.setItem('locale', JSON.stringify(locale));
}
