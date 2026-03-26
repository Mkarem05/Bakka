export function getDaysUntil(isoDate: string | null): number | null {
  if (!isoDate) return null;
  const target = new Date(isoDate);
  const now = new Date();
  const diff = target.getTime() - now.getTime();
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
}

export function formatCountdown(isoDate: string | null): string | null {
  const days = getDaysUntil(isoDate);
  if (days === null) return null;
  if (days < 0) return null;
  if (days === 0) return 'Сегодня';
  return `${days} дн.`;
}
