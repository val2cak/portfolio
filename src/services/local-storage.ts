export function getLocaleFromStorage(): string | null {
  if (typeof window !== 'undefined') {
    const locale = localStorage.getItem('locale');

    if (locale && locale !== null) return JSON.parse(locale);
    else return null;
  }

  return null;
}

export function setLocaleToStorage(locale: string) {
  localStorage.setItem('locale', JSON.stringify(locale));
}

export function getHighScore(): number {
  if (typeof window !== 'undefined') {
    const highScore = localStorage.getItem('highScore');
    return highScore ? JSON.parse(highScore) : 0;
  }
  return 0;
}

export function setHighScore(score: number) {
  if (typeof window !== 'undefined') {
    localStorage.setItem('highScore', JSON.stringify(score));
  }
}
