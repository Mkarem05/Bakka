import { api } from './api';

const PRAYER_NAMES: Record<string, string> = {
  Fajr: 'Фаджр',
  Dhuhr: 'Зухр',
  Asr: 'Аср',
  Maghrib: 'Магриб',
  Isha: 'Иша',
};

const PRAYER_ORDER = ['Fajr', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'];

export interface PrayerTime {
  name: string;
  nameRu: string;
  time: string;
  timestamp: number;
}

export interface PrayerData {
  prayers: PrayerTime[];
  nextPrayer: PrayerTime;
  countdown: string;
  date: string;
}

function parseTime(timeStr: string): number {
  const [hours, minutes] = timeStr.split(':').map(Number);
  const now = new Date();
  const dt = new Date(now.getFullYear(), now.getMonth(), now.getDate(), hours, minutes, 0);
  return dt.getTime();
}

function formatCountdown(ms: number): string {
  if (ms <= 0) return '0м';
  const totalMinutes = Math.floor(ms / 60000);
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  if (hours > 0) return `${hours}ч ${minutes}м`;
  return `${minutes}м`;
}

export const prayerService = {
  async getTimes(lat = 21.3891, lng = 39.8579): Promise<PrayerData> {
    const response = await api.get('/api/prayer', { params: { lat, lng } });
    const timings = response.data.data.timings as Record<string, string>;
    const dateInfo = response.data.data.date;

    const now = Date.now();

    const prayers: PrayerTime[] = PRAYER_ORDER.map((name) => {
      const time = timings[name] ?? '00:00';
      return {
        name,
        nameRu: PRAYER_NAMES[name] ?? name,
        time: time.substring(0, 5),
        timestamp: parseTime(time),
      };
    });

    const nextPrayer =
      prayers.find((p) => p.timestamp > now) ?? prayers[0];

    const countdown = formatCountdown(nextPrayer.timestamp - now);

    return {
      prayers,
      nextPrayer,
      countdown,
      date: dateInfo?.readable ?? new Date().toLocaleDateString('ru-RU'),
    };
  },
};
