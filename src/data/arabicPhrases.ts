export interface ArabicPhrase {
  russian: string;
  arabic: string;
  transliteration: string;
  category: 'emergency' | 'navigation' | 'ritual' | 'daily';
}

export const ARABIC_PHRASES_EXTENDED: ArabicPhrase[] = [
  // Emergency
  {
    russian: 'Мне плохо, нужна помощь',
    arabic: 'أنا مريض، أحتاج مساعدة',
    transliteration: "Ana marid, ahtaju musa'ada",
    category: 'emergency',
  },
  {
    russian: 'Вызовите скорую помощь',
    arabic: 'اتصلوا بالإسعاف',
    transliteration: "Ittasilu bil-is'af",
    category: 'emergency',
  },
  {
    russian: 'Я потерялся',
    arabic: 'أنا ضائع',
    transliteration: "Ana daya'",
    category: 'emergency',
  },
  {
    russian: 'Позовите сотрудника мечети',
    arabic: 'اطلب موظف المسجد',
    transliteration: 'Utlub muwazzaf al-masjid',
    category: 'emergency',
  },
  // Navigation
  {
    russian: 'Где ворота номер...?',
    arabic: 'أين الباب رقم...؟',
    transliteration: 'Ayna al-bab raqm...?',
    category: 'navigation',
  },
  {
    russian: 'Где туалет?',
    arabic: 'أين الحمام؟',
    transliteration: 'Ayna al-hammam?',
    category: 'navigation',
  },
  {
    russian: 'Где зам-зам?',
    arabic: 'أين زمزم؟',
    transliteration: 'Ayna Zamzam?',
    category: 'navigation',
  },
  {
    russian: 'Где Черный камень?',
    arabic: 'أين الحجر الأسود؟',
    transliteration: 'Ayna al-Hajar al-Aswad?',
    category: 'navigation',
  },
  // Daily
  {
    russian: 'Я из России',
    arabic: 'أنا من روسيا',
    transliteration: 'Ana min Rusiya',
    category: 'daily',
  },
  {
    russian: 'Сколько стоит?',
    arabic: 'بكم هذا؟',
    transliteration: 'Bikam hadha?',
    category: 'daily',
  },
  {
    russian: 'Спасибо',
    arabic: 'شكراً جزيلاً',
    transliteration: 'Shukran jazilan',
    category: 'daily',
  },
  {
    russian: 'Мир вам',
    arabic: 'السلام عليكم',
    transliteration: 'As-salamu alaykum',
    category: 'daily',
  },
];
