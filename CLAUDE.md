# CLAUDE.md — Bakka App: React Native MVP

> Этот файл — твоя полная инструкция. Читай целиком перед началом.
> Задавай вопросы только если что-то реально неясно. Иначе — делай.

---

## Что мы строим

**Bakka (بكة)** — мобильное приложение для паломников из СНГ (Россия, Казахстан, Узбекистан, Таджикистан), совершающих Умру и Хадж. Название — коранический топоним Мекки (Сура Аль-Имран, аят 96). Домен: bakka.app

**Главный инсайт:** Nusuk (государственная платформа КСА, 40М+ пользователей) закрывает визы и бронирование, но никогда не закроет: навигацию на русском языке, AI-помощника, офлайн-гид, SOS для паломников из СНГ. Это и есть Bakka.

**Аналог-ориентир:** IKHLAS (Малайзия, AirAsia) — взлетел при 234 конкурентах, 110К+ паломников в 2024. Русскоязычного аналога не существует. Безвизовый режим для России открылся декабрь 2025 — рынок только формируется.

**Целевая аудитория:** мусульмане СНГ 40–65 лет, многие едут впервые. UX должен быть максимально простым.

---

## Стек

```
React Native — Expo SDK 52, managed workflow
TypeScript — строгий режим, noImplicitAny: true
Expo Router v3 — file-based routing
Zustand — стейт-менеджмент с persist
react-native-mmkv — быстрое локальное хранилище
Axios — HTTP клиент
Expo Notifications — push уведомления
react-native-svg — карта Харама
@expo-google-fonts/montserrat — основной шрифт
@expo-google-fonts/amiri — арабский текст
@expo/vector-icons (Ionicons) — иконки
```

**Backend (папка `backend/` в корне репо):**
```
Node.js + Express + TypeScript
@anthropic-ai/sdk — Claude API
node-cache — кеш ответов aladhan.com
express-rate-limit — защита от злоупотреблений
dotenv — переменные окружения
```

---

## Бренд — СТРОГО СОБЛЮДАТЬ

```typescript
// src/theme/colors.ts — единственный источник цветов
export const colors = {
  // Основные
  primary: '#0C6B59',       // Bakka Green
  accent: '#D19D6B',        // Bakka Tan / Gold
  dark: '#2D2D2D',          // Bakka Dark
  ivory: '#F7F4EE',         // Bakka Ivory — основной фон
  white: '#FFFFFF',

  // Производные
  primaryLight: '#E6F4F0',
  primaryDark: '#094F42',
  accentLight: '#FAF3EB',

  // Статусы
  error: '#C53030',
  success: '#276749',

  // Текст
  textPrimary: '#2D2D2D',
  textSecondary: '#6B7280',
  textMuted: '#9CA3AF',

  // UI
  border: '#E2DDD5',
  surface: '#FFFFFF',
  surfaceSecondary: '#F7F4EE',
};
```

```typescript
// src/theme/typography.ts
export const fonts = {
  regular: 'Montserrat_400Regular',
  medium: 'Montserrat_500Medium',
  semiBold: 'Montserrat_600SemiBold',
  bold: 'Montserrat_700Bold',
  extraBold: 'Montserrat_800ExtraBold',
  // Только для арабского текста:
  arabic: 'Amiri_400Regular',
  arabicBold: 'Amiri_700Bold',
};

export const fontSize = {
  xs: 12,
  sm: 14,
  base: 16,     // минимум для body text (аудитория 40+)
  lg: 18,
  xl: 22,
  '2xl': 28,
  arabic: 26,   // арабский текст — всегда крупный
};
```

**Правила дизайна — обязательные:**
- Фон ВСЕГДА светлый: `ivory` (#F7F4EE) или `white` (#FFFFFF)
- Никакой тёмной темы. Никогда.
- Минимальная высота кнопок: **52px**
- Минимальная тапабельная область: **44×44px**
- Арабский текст: шрифт Amiri, `textAlign: 'right'`, `writingDirection: 'rtl'`, минимум 24px
- Контраст текста: минимум WCAG AA (4.5:1 для основного текста)
- Иконки: только `@expo/vector-icons` (Ionicons). Никаких emoji в UI-элементах.

---

## Структура проекта

```
bakka/
├── CLAUDE.md
├── app.json
├── eas.json
├── package.json
├── tsconfig.json
├── .env.local                      ← EXPO_PUBLIC_API_URL (не коммитить)
│
├── app/                            ← Expo Router (все экраны)
│   ├── _layout.tsx                 ← RootLayout: шрифты, провайдеры, редирект
│   ├── index.tsx                   ← редирект: /onboarding/welcome или /(tabs)/
│   ├── sos.tsx                     ← SOS Modal (отдельный стек, не таб)
│   │
│   ├── onboarding/
│   │   ├── _layout.tsx
│   │   ├── welcome.tsx
│   │   ├── trip-type.tsx
│   │   └── trip-date.tsx
│   │
│   └── (tabs)/
│       ├── _layout.tsx             ← TabBar + SOS кнопка
│       ├── index.tsx               ← Главная
│       ├── guide.tsx               ← Гид (Умра/Хадж)
│       ├── checklist.tsx           ← Чеклист
│       ├── dua.tsx                 ← Дуа
│       └── ai.tsx                  ← AI Помощник
│
├── src/
│   ├── components/
│   │   ├── ui/
│   │   │   ├── Button.tsx
│   │   │   ├── Card.tsx
│   │   │   ├── Modal.tsx           ← ЗАМЕНЯЕТ alert() везде
│   │   │   ├── Toast.tsx
│   │   │   └── Badge.tsx
│   │   ├── prayer/
│   │   │   └── PrayerWidget.tsx
│   │   ├── guide/
│   │   │   ├── StepCard.tsx
│   │   │   ├── DuaBox.tsx
│   │   │   └── ProgressBar.tsx
│   │   └── chat/
│   │       ├── ChatBubble.tsx
│   │       └── ChatInput.tsx
│   │
│   ├── store/
│   │   ├── profileStore.ts
│   │   ├── progressStore.ts
│   │   ├── checklistStore.ts
│   │   ├── prayerStore.ts
│   │   └── chatStore.ts
│   │
│   ├── services/
│   │   ├── api.ts                  ← axios instance
│   │   ├── chatService.ts
│   │   └── prayerService.ts
│   │
│   ├── data/
│   │   ├── umrahSteps.ts
│   │   ├── hajjSteps.ts
│   │   ├── duas.ts
│   │   ├── checklist.ts
│   │   ├── arabicPhrases.ts
│   │   └── emergencyContacts.ts
│   │
│   ├── theme/
│   │   ├── colors.ts
│   │   ├── typography.ts
│   │   └── spacing.ts
│   │
│   └── utils/
│       ├── storage.ts              ← MMKV wrapper для Zustand
│       └── dateUtils.ts           ← countdown до поездки
│
├── assets/
│   ├── fonts/
│   └── images/
│       └── logo.png
│
└── backend/
    ├── src/
    │   ├── index.ts
    │   ├── routes/
    │   │   ├── chat.ts
    │   │   └── prayer.ts
    │   ├── services/
    │   │   └── claudeService.ts
    │   └── middleware/
    │       └── rateLimit.ts
    ├── package.json
    ├── tsconfig.json
    └── .env                        ← ANTHROPIC_API_KEY (не коммитить)
```

---

## Задачи по этапам — выполняй строго по порядку

---

### ЭТАП 0: Инициализация

```bash
# Создать проект
npx create-expo-app@latest bakka --template expo-template-blank-typescript
cd bakka

# Основные зависимости
npx expo install expo-router expo-font expo-splash-screen expo-status-bar
npx expo install expo-notifications expo-linking
npx expo install react-native-svg
npx expo install @react-native-async-storage/async-storage

# NPM пакеты
npm install zustand
npm install react-native-mmkv
npm install axios
npm install @expo-google-fonts/montserrat @expo-google-fonts/amiri
npm install @expo/vector-icons

# Backend
mkdir backend && cd backend
npm init -y
npm install express cors helmet express-rate-limit node-cache dotenv axios
npm install @anthropic-ai/sdk
npm install -D typescript @types/express @types/node ts-node nodemon
cd ..
```

**`app.json`:**
```json
{
  "expo": {
    "name": "Bakka",
    "slug": "bakka",
    "scheme": "bakka",
    "version": "1.0.0",
    "orientation": "portrait",
    "icon": "./assets/images/icon.png",
    "splash": {
      "backgroundColor": "#0C6B59",
      "resizeMode": "contain"
    },
    "ios": {
      "bundleIdentifier": "app.bakka.pilgrim",
      "supportsTablet": false
    },
    "android": {
      "package": "app.bakka.pilgrim",
      "adaptiveIcon": {
        "backgroundColor": "#0C6B59"
      }
    },
    "plugins": [
      "expo-router",
      "expo-font",
      ["expo-notifications", { "color": "#0C6B59" }]
    ],
    "experiments": {
      "typedRoutes": true
    }
  }
}
```

---

### ЭТАП 1: Theme + Data

Создай все файлы в `src/theme/` (colors.ts, typography.ts, spacing.ts) согласно разделу "Бренд" выше.

**`src/theme/spacing.ts`:**
```typescript
export const spacing = {
  xs: 4, sm: 8, md: 12, lg: 16, xl: 20,
  '2xl': 24, '3xl': 32, '4xl': 48,
};
export const radius = {
  sm: 8, md: 12, lg: 16, xl: 20, full: 999,
};
```

**`src/utils/storage.ts`:**
```typescript
import { MMKV } from 'react-native-mmkv';
import { StateStorage } from 'zustand/middleware';

const mmkv = new MMKV({ id: 'bakka-store' });

export const storage: StateStorage = {
  getItem: (name) => mmkv.getString(name) ?? null,
  setItem: (name, value) => mmkv.set(name, value),
  removeItem: (name) => mmkv.delete(name),
};
```

**`src/data/umrahSteps.ts`** — 4 шага с полными данными:

```typescript
export interface DuaItem {
  name: string;
  arabic: string;
  transliteration: string;
  translation: string;
}

export interface UmrahStep {
  id: number;
  name: string;
  nameArabic: string;
  icon: string;        // Ionicons name
  description: string;
  tips: string[];
  duas: DuaItem[];
}

export const UMRAH_STEPS: UmrahStep[] = [
  {
    id: 1,
    name: 'Ихрам',
    nameArabic: 'الإحرام',
    icon: 'shirt-outline',
    description: 'Ихрам — особое состояние ритуальной чистоты. Начинается с намерения (ниет) и надевания специальной одежды. Мужчины: два куска белой ткани без швов. Женщины: скромная одежда, открытое лицо.',
    tips: [
      'Совершите гусль (полное омовение) перед ихрамом',
      "Мужчины: правое плечо открыто (идтиба')",
      'Произнесите ниет — намерение на Умру',
      'Начните читать тальбийю громко',
      'Нельзя: духи, стрижка, охота, интимная близость',
    ],
    duas: [
      {
        name: 'Ниет (намерение)',
        arabic: 'لَبَّيْكَ اللَّهُمَّ عُمْرَةً',
        transliteration: "Labbayka Allahumma 'umratan",
        translation: 'О Аллах, я намереваюсь совершить Умру',
      },
      {
        name: 'Тальбийя',
        arabic: 'لَبَّيْكَ اللَّهُمَّ لَبَّيْكَ، لَبَّيْكَ لَا شَرِيكَ لَكَ لَبَّيْكَ',
        transliteration: 'Labbayk Allahumma labbayk, labbayk la sharika laka labbayk',
        translation: 'Вот я перед Тобой, о Аллах! Нет у Тебя сотоварища!',
      },
    ],
  },
  {
    id: 2,
    name: 'Таваф',
    nameArabic: 'الطواف',
    icon: 'refresh-circle-outline',
    description: 'Семь кругов вокруг Каабы против часовой стрелки. Начало — у Чёрного камня (зелёный свет на полу). Кааба всегда слева. Первые 3 круга — ускоренный шаг.',
    tips: [
      'Начинайте от зелёного света (линия Чёрного камня)',
      'При каждом прохождении Камня: жест рукой и "Аллаху Акбар"',
      'Тальбийя прекращается при начале тавафа',
      'Давка? Идите по внешнему краю — таваф действителен',
      'После тавафа — 2 ракаата намаза у Макам Ибрагим',
    ],
    duas: [
      {
        name: 'У Чёрного камня',
        arabic: 'بِسْمِ اللَّهِ، اللَّهُ أَكْبَرُ',
        transliteration: 'Bismillah, Allahu Akbar',
        translation: 'Во имя Аллаха, Аллах Велик',
      },
      {
        name: 'Между Йеменским углом и Камнем',
        arabic: 'رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الْآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ',
        transliteration: "Rabbana atina fid-dunya hasanatan wa fil-akhirati hasanatan wa qina 'adhaban-nar",
        translation: 'Господь наш, дай нам добро в этом мире и в Следующем, защити от огня',
      },
    ],
  },
  {
    id: 3,
    name: "Са'й",
    nameArabic: 'السعي',
    icon: 'swap-horizontal-outline',
    description: "Семь проходов между холмами Сафа и Марва. Начало на Сафа, конец на Марва. Память о Хаджар, которая искала воду для Исмаила — Аллах принял её усилие.",
    tips: [
      'Один проход = Сафа → Марва (или обратно)',
      'На Сафа: повернитесь к Каабе, поднимите руки, читайте дуа',
      'Зелёные столбы: мужчины ускоряют шаг',
      'Пожилым и больным: доступны электрические тележки',
      'Заканчивайте на Марва (7-й проход)',
    ],
    duas: [
      {
        name: 'На холме Сафа',
        arabic: 'إِنَّ الصَّفَا وَالْمَرْوَةَ مِن شَعَائِرِ اللَّهِ',
        transliteration: "Inna s-Safa wal-Marwata min sha'a'irillah",
        translation: 'Воистину, Сафа и Марва — из обрядовых знаков Аллаха',
      },
      {
        name: 'Дуа между холмами',
        arabic: 'رَبِّ اغْفِرْ وَارْحَمْ وَتَجَاوَزْ عَمَّا تَعْلَمُ',
        transliteration: "Rabbi ghfir warham wa tajawaz 'amma ta'lam",
        translation: 'Господь мой, прости, помилуй и не взыщи за то, что Ты знаешь',
      },
    ],
  },
  {
    id: 4,
    name: 'Тахаллюль',
    nameArabic: 'التحلل',
    icon: 'checkmark-circle-outline',
    description: 'Выход из ихрама — завершение Умры. После стрижки все запреты ихрама снимаются. Умра принята — альхамдуллиллях! Это момент радости и благодарности Аллаху.',
    tips: [
      'Мужчины: желательно сбрить голову полностью (халк)',
      'Или: подстричь со всех сторон равномерно (таксир)',
      'Женщины: отрезают прядь длиной около пальца — не бреют',
      'После стрижки все запреты ихрама сняты',
      'Прочитайте дуа принятия',
    ],
    duas: [
      {
        name: 'Дуа о принятии',
        arabic: 'رَبَّنَا تَقَبَّلْ مِنَّا إِنَّكَ أَنتَ السَّمِيعُ الْعَلِيمُ',
        transliteration: "Rabbana taqabbal minna innaka antas-Sami'ul-'Alim",
        translation: 'Господь наш, прими от нас! Воистину, Ты — Слышащий, Знающий',
      },
      {
        name: 'После завершения Умры',
        arabic: 'الْحَمْدُ لِلَّهِ الَّذِي بَلَّغَنَا',
        transliteration: 'Alhamdulillahil-ladhi ballaghana',
        translation: 'Вся хвала Аллаху, Который довёл нас до этого',
      },
    ],
  },
];
```

**`src/data/hajjSteps.ts`** — 7 шагов, добавь поля `day: number` и `dayLabel: string`. Шаги:
1. Ихрам Хаджа (день 8, «день тарвийя») — ниет Хаджа, Мина
2. Стояние на Арафате (день 9) — главный столп, с полудня до заката
3. Муздалифа (ночь 9→10) — Магриб+Иша, сбор 49–70 камешков
4. Бросание Джамарат (день 10) — 7 камешков в большой столб, выход из ихрама
5. Таваф аль-Ифада (день 10) — обязательный таваф Хаджа
6. Дни Ташрика (дни 11–13) — 21 камешек в день, 3 столба
7. Таваф аль-Вада (день 13) — прощальный таваф перед отъездом

Используй те же интерфейсы DuaItem и аналогичный HajjStep (с `day`, `dayLabel`).

**`src/data/duas.ts`** — категории: 'Умра', 'Хадж', 'Медина', 'Зам-зам', 'Ежедневные'. Минимум 4 дуа в каждой.

**`src/data/checklist.ts`:**
```typescript
export type ChecklistCategory = 'documents' | 'clothes' | 'spiritual' | 'health' | 'travel';

export interface ChecklistItem {
  id: string;
  text: string;
  category: ChecklistCategory;
}

export const CHECKLIST_ITEMS: ChecklistItem[] = [
  { id: 'doc_1', text: 'Загранпаспорт (срок действия 6+ месяцев)', category: 'documents' },
  { id: 'doc_2', text: 'Виза / разрешение через Nusuk', category: 'documents' },
  { id: 'doc_3', text: 'Авиабилеты (распечатать или скачать офлайн)', category: 'documents' },
  { id: 'doc_4', text: 'Подтверждение бронирования отеля', category: 'documents' },
  { id: 'doc_5', text: 'Медицинская страховка', category: 'documents' },
  { id: 'doc_6', text: 'Копии всех документов (отдельно от оригиналов)', category: 'documents' },
  { id: 'cl_1', text: 'Ихрам — 2 комплекта (для мужчин)', category: 'clothes' },
  { id: 'cl_2', text: 'Скромная закрытая одежда', category: 'clothes' },
  { id: 'cl_3', text: 'Удобная обувь без шнурков (легко снимать в мечети)', category: 'clothes' },
  { id: 'cl_4', text: 'Носки (мраморный пол холодный)', category: 'clothes' },
  { id: 'cl_5', text: 'Зонт от солнца (в Мекке +45°C)', category: 'clothes' },
  { id: 'sp_1', text: 'Выучить тальбийю наизусть', category: 'spiritual' },
  { id: 'sp_2', text: 'Прочитать пошаговый гид Умры в Bakka', category: 'spiritual' },
  { id: 'sp_3', text: 'Совершить искреннее покаяние (тауба)', category: 'spiritual' },
  { id: 'sp_4', text: 'Попросить прощения у близких', category: 'spiritual' },
  { id: 'sp_5', text: 'Уладить все долги и обязательства', category: 'spiritual' },
  { id: 'h_1', text: 'Прививка от менингита (обязательна для визы)', category: 'health' },
  { id: 'h_2', text: 'Личные лекарства с запасом на 2 недели', category: 'health' },
  { id: 'h_3', text: 'Солнцезащитный крем без запаха (ихрам)', category: 'health' },
  { id: 'h_4', text: 'Регидрон / электролиты от обезвоживания', category: 'health' },
  { id: 'tr_1', text: 'Наличные риалы SAR (минимум 500–1000)', category: 'travel' },
  { id: 'tr_2', text: 'Сохранить номер гида / турагентства', category: 'travel' },
  { id: 'tr_3', text: 'Загрузить Bakka в офлайн-режим до поездки', category: 'travel' },
  { id: 'tr_4', text: 'Зарядное устройство + переходник тип G', category: 'travel' },
];
```

**`src/data/emergencyContacts.ts`:**
```typescript
export const SAUDI_EMERGENCY = [
  { name: 'Скорая помощь', number: '911', icon: 'medical-outline' },
  { name: 'Полиция', number: '999', icon: 'shield-outline' },
  { name: 'Гражданская оборона', number: '998', icon: 'flame-outline' },
  { name: 'Министерство Хаджа', number: '920002814', icon: 'business-outline' },
];

export const CIS_EMBASSIES = [
  { country: 'Россия', city: 'Джедда', number: '+966-12-667-3702' },
  { country: 'Казахстан', city: 'Эр-Рияд', number: '+966-11-488-7400' },
  { country: 'Узбекистан', city: 'Эр-Рияд', number: '+966-11-419-2770' },
  { country: 'Таджикистан', city: 'Эр-Рияд', number: '+966-11-454-3030' },
  { country: 'Кыргызстан', city: 'Эр-Рияд', number: '+966-11-480-6555' },
];

export const ARABIC_PHRASES = [
  { russian: 'Мне плохо, нужна помощь', arabic: 'أنا مريض، أحتاج مساعدة', transliteration: "Ana marid, ahtaju musa'ada" },
  { russian: 'Вызовите скорую помощь', arabic: 'اتصلوا بالإسعاف', transliteration: 'Ittasilu bil-is\'af' },
  { russian: 'Я потерялся', arabic: 'أنا ضائع', transliteration: "Ana daya'" },
  { russian: 'Где ворота номер...?', arabic: 'أين الباب رقم...؟', transliteration: 'Ayna al-bab raqm...?' },
  { russian: 'Где туалет?', arabic: 'أين الحمام؟', transliteration: 'Ayna al-hammam?' },
  { russian: 'Я из России', arabic: 'أنا من روسيا', transliteration: 'Ana min Rusiya' },
  { russian: 'Позовите сотрудника мечети', arabic: 'اطلب موظف المسجد', transliteration: 'Utlub muwazzaf al-masjid' },
  { russian: 'Где зам-зам?', arabic: 'أين زمزم؟', transliteration: 'Ayna Zamzam?' },
];

export const LOST_PROTOCOL = [
  'Остановитесь у стены или колонны — не двигайтесь хаотично',
  'Найдите номер ворот — он написан крупно на каждом входе',
  'Позвоните гиду или в турагентство',
  'Если нет связи — подойдите к сотруднику мечети (зелёная форма)',
  'Покажите им на экране: أنا ضائع (Ana daya\')',
  'Если не помогло — звоните в полицию: 999',
];
```

---

### ЭТАП 2: Zustand Stores

**`src/store/profileStore.ts`:**
```typescript
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { storage } from '../utils/storage';

export type TripType = 'umrah' | 'hajj' | 'undecided';
export type Country = 'russia' | 'kazakhstan' | 'uzbekistan' | 'tajikistan' | 'kyrgyzstan' | 'other';

interface ProfileState {
  isOnboardingComplete: boolean;
  tripType: TripType | null;
  tripDate: string | null;   // ISO date string "2026-03-15"
  country: Country | null;
  
  setOnboardingComplete: (v: boolean) => void;
  setTripType: (t: TripType) => void;
  setTripDate: (d: string | null) => void;
  setCountry: (c: Country) => void;
  reset: () => void;
}

export const useProfileStore = create<ProfileState>()(
  persist(
    (set) => ({
      isOnboardingComplete: false,
      tripType: null,
      tripDate: null,
      country: null,
      setOnboardingComplete: (v) => set({ isOnboardingComplete: v }),
      setTripType: (t) => set({ tripType: t }),
      setTripDate: (d) => set({ tripDate: d }),
      setCountry: (c) => set({ country: c }),
      reset: () => set({ isOnboardingComplete: false, tripType: null, tripDate: null, country: null }),
    }),
    { name: 'bakka-profile', storage: createJSONStorage(() => storage) }
  )
);
```

**`src/store/progressStore.ts`:**
Хранит выполненные шаги Умры и Хаджа. Поля: `umrahCompleted: number[]`, `hajjCompleted: number[]`.
Методы: `markUmrahDone(id)`, `unmarkUmrah(id)`, `isUmrahDone(id)`, `markHajjDone(id)`, `unmarkHajj(id)`, `isHajjDone(id)`, `resetAll()`.
Persist через MMKV.

**`src/store/checklistStore.ts`:**
Хранит `completed: string[]` (id выполненных пунктов). Методы: `toggle(id)`, `isChecked(id)`, `reset()`. Persist.

**`src/store/chatStore.ts`:**
Хранит `messages: Array<{role: 'user'|'assistant', content: string}>`. Методы: `addMessage(msg)`, `clear()`. Последние 20 сообщений. НЕ persist (чат не сохраняется между сессиями — это нормально).

---

### ЭТАП 3: Backend

**`backend/src/index.ts`** — Express сервер на порту из .env, с middleware: helmet, cors, json. Маршруты /api/chat, /api/prayer, /health.

**`backend/src/services/claudeService.ts`:**
```typescript
import Anthropic from '@anthropic-ai/sdk';

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

const SYSTEM_PROMPT = `Ты — Bakka AI, исламский помощник для паломников из России и стран СНГ.

Твои задачи:
- Отвечать на вопросы об обрядах Умры и Хаджа
- Давать практические советы о пребывании в Мекке и Мадине
- Помогать с дуа, арабскими фразами, навигацией в Харам-комплексе
- Объяснять исламские практики в контексте ханафитского мазхаба (основной для СНГ)

Строгие правила:
- Отвечай ТОЛЬКО на русском языке
- Краткость: 2–4 предложения для простых вопросов
- НЕ выдавай фетвы по сложным правовым вопросам — направляй к учёным своего региона
- При неопределённости: "Лучше уточнить у учёного"
- Тон: доброжелательный, спокойный, уважительный
- Арабские термины можно использовать с переводом в скобках
- Не обсуждай политику, не сравнивай мазхабы негативно

Формат: простой текст без markdown, без списков со звёздочками.`;

export const claudeService = {
  async chat(messages: Array<{ role: 'user' | 'assistant'; content: string }>) {
    const response = await client.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 500,
      system: SYSTEM_PROMPT,
      messages: messages.slice(-10),
    });
    return response.content[0].type === 'text' ? response.content[0].text : '';
  },
};
```

**`backend/src/routes/chat.ts`** — POST /, rateLimit 10 req/min per IP, валидация messages, вызов claudeService, ответ `{ reply: string }`.

**`backend/src/routes/prayer.ts`** — GET /, параметры `lat` и `lng` (если нет — использует Мекку: 21.3891, 39.8579). Проксирует `https://api.aladhan.com/v1/timings`. Кешировать на 6 часов через node-cache.

**`backend/.env.example`:**
```
ANTHROPIC_API_KEY=sk-ant-...
PORT=3000
NODE_ENV=development
```

---

### ЭТАП 4: UI Компоненты

**`src/components/ui/Button.tsx`:**
- Props: `title`, `onPress`, `variant: 'primary'|'secondary'|'danger'|'ghost'`, `loading?`, `disabled?`, `icon?`
- primary: background primary, белый текст
- secondary: border primary, primary текст, прозрачный фон
- danger: background error
- ghost: без border, primary текст
- minHeight: 52, borderRadius: 14
- loading: ActivityIndicator вместо текста
- disabled: opacity 0.45

**`src/components/ui/Modal.tsx`:**
- ЗАМЕНЯЕТ alert() везде в приложении — никаких нативных alert()
- Props: `visible`, `title`, `message?`, `actions: Array<{label, onPress, variant}>`
- Анимация fade + slide from bottom
- Backdrop: rgba(0,0,0,0.5), нажатие закрывает (если есть кнопка отмены)

**`src/components/ui/Toast.tsx`:**
- Всплывает снизу над TabBar (bottom: 80)
- Auto-dismiss через 2500ms
- Варианты: success (зелёный), error (красный), info (серый)
- Экспортируй хук `useToast()` и компонент `<ToastContainer />`

**`src/components/guide/DuaBox.tsx`:**
- Зелёный фон (primaryLight)
- Заголовок: название дуа (bold, 13px, primary)
- Арабский текст (Amiri, 26px, accent, textAlign right, writingDirection rtl)
- Транслитерация (12px, серый, курсив)
- Перевод (14px, dark)
- Кнопка копировать арабский (Ionicons copy-outline, 20px)
- При копировании: toast "Скопировано"

**`src/components/guide/StepCard.tsx`:**
- Белая карточка с цветной левой полосой (4px):
  - Выполнен: accent (#D19D6B)
  - Активный: primary (#0C6B59)
  - Будущий: border (#E2DDD5)
- Header: номер + название + арабское название + стрелка аккордеона
- Тело (раскрывается): описание + советы + дуа (DuaBox) + кнопка выполнено
- Кнопка "Отметить выполненным": зелёная → после нажатия "✓ Выполнено" (золотой фон)
- Анимация раскрытия: Animated.Value высоты

**`src/components/prayer/PrayerWidget.tsx`:**
- Белая карточка, левая граница 4px primary
- Показывает следующий намаз (название + время)
- Обратный отсчёт обновляется каждые 60 секунд (useEffect + setInterval)
- При загрузке данных: skeleton (серые прямоугольники)
- При ошибке сети: тихо скрыть (не показывать ошибку пользователю)
- Тапабельна → позволяет открыть полное расписание намазов (опционально)

---

### ЭТАП 5: Навигация и Онбординг

**`app/_layout.tsx`:**
- useFonts() загружает все Montserrat variants + Amiri_400Regular + Amiri_700Bold
- SplashScreen.preventAutoHideAsync() в начале, скрыть после loaded
- Обернуть в SafeAreaProvider + ToastContainer
- Экспортировать как Stack (Expo Router)

**`app/index.tsx`:**
```typescript
import { Redirect } from 'expo-router';
import { useProfileStore } from '../src/store/profileStore';

export default function Index() {
  const { isOnboardingComplete } = useProfileStore();
  return isOnboardingComplete
    ? <Redirect href="/(tabs)/" />
    : <Redirect href="/onboarding/welcome" />;
}
```

**`app/onboarding/welcome.tsx`:**
- Фон: ivory
- Центр: логотип/текст BAKKA зелёный (большой, 48px, ExtraBold)
- Под ним: بكة (Amiri, 32px, accent)
- Арабская фраза: بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيم (Amiri, 22px, accent, center)
- Заголовок: "Ваш проводник к священному" (Bold, 22px)
- Подзаголовок: "Гид по обрядам, дуа, AI-помощник и SOS — всё работает офлайн" (Regular, 14px, textSecondary)
- Внизу: кнопка "Начать" (primary, полная ширина)
- router.push('/onboarding/trip-type')

**`app/onboarding/trip-type.tsx`:**
- Заголовок: "Куда вы направляетесь?"
- 3 карточки выбора (вертикально):
  - 🕋 Умра — "Малое паломничество"
  - 🌙 Хадж — "Великое паломничество"
  - 🤲 Ещё не решил
- Выбранная карточка: border 2px primary, фон primaryLight
- Кнопка "Далее" активна только после выбора
- Сохраняет в profileStore.setTripType()
- router.push('/onboarding/trip-date')

**`app/onboarding/trip-date.tsx`:**
- Заголовок: "Когда ваша поездка?"
- Выбор месяца + года (два Picker или простые кнопки +/-)
- Dropdown страны: Россия / Казахстан / Узбекистан / Таджикистан / Кыргызстан / Другая
- Кнопка "Пропустить" (ghost, текст "Укажу позже")
- Кнопка "Готово" (primary)
- При нажатии: setTripDate() + setCountry() + setOnboardingComplete(true)
- router.replace('/(tabs)/')

---

### ЭТАП 6: Главный экран

**`app/(tabs)/index.tsx`** — ScrollView, фон ivory, padding 16px.

Блоки сверху вниз:

**1. Приветствие:**
- Арабское السَّلَامُ عَلَيْكُمْ (Amiri, 20px, accent)
- "Добро пожаловать" (Bold, 22px)
- Если есть tripDate → показать "До поездки: N дней" (badge зелёный)

**2. PrayerWidget** (из компонентов)

**3. Карточка прогресса:**
- Заголовок по tripType: "Прогресс Умры" или "Прогресс Хаджа"
- 4 (или 7) горизонтальных сегментов: выполнен=gold, активный=primary (мигает), будущий=border
- Текст: "Шаг 2 из 4 — Таваф"

**4. Быстрый доступ (сетка 2×2):**
- 🕋 Умра → guide
- 🌙 Хадж → guide (открывает Хадж сразу)
- 📿 Дуа → dua
- 🆘 SOS → /sos (красный акцент, span 2 колонки)

**5. Быстрые дуа (горизонтальный ScrollView, чипы):**
- "При входе" / "Вид Каабы" / "Зам-зам" / "Таваф" / "Сафа"
- При нажатии → открывает Дуа с нужной категорией

---

### ЭТАП 7: Экран Гида

**`app/(tabs)/guide.tsx`:**
- Сегментированный контрол вверху: "Умра" | "Хадж"
- Для Умры: FlatList с StepCard для каждого из UMRAH_STEPS
- Для Хаджа: FlatList + фильтр-чипы по дням (Все / День 8 / День 9 / День 10 / 11–13)
- Прогресс-бар под контролом
- При нажатии StepCard → раскрытие аккордеона
- Кнопка "Отметить выполненным" → progressStore.markUmrahDone() или markHajjDone()

---

### ЭТАП 8: Экран Чеклиста

**`app/(tabs)/checklist.tsx`:**
- Заголовок "Подготовка к поездке"
- Прогресс: "Готово: 5 из 24" + ProgressBar
- Горизонтальные табы категорий с иконками:
  - 📄 Документы | 👔 Одежда | 🕌 Духовная | 💊 Здоровье | ✈️ В дорогу
- FlatList пунктов выбранной категории
- Каждый пункт: чекбокс слева + текст (strikethrough если выполнен)
- Состояние в checklistStore.toggle(id)
- Анимация при отметке (небольшой scale bounce)

---

### ЭТАП 9: Экран Дуа

**`app/(tabs)/dua.tsx`:**
- Горизонтальные табы: Умра | Хадж | Медина | Зам-зам | Ежедневные
- FlatList карточек дуа
- Каждая карточка — аккордеон:
  - Header: название дуа + момент ("📍 При входе в мечеть")
  - Body: DuaBox компонент (арабский + транслит + перевод + копировать)

---

### ЭТАП 10: AI Экран

**`app/(tabs)/ai.tsx`:**

Начальное состояние (нет сообщений):
- Иконка 🕌 (60px)
- "Bakka AI — Помощник паломника" (Bold, 20px)
- "Задайте любой вопрос об Умре, Хадже или обрядах" (14px, gray)
- 4 кнопки-подсказки:
  - "Что нельзя делать в ихраме?"
  - "Как правильно делать таваф?"
  - "Что взять в Умру?"
  - "Что делать если я потерялся?"

С сообщениями:
- KeyboardAvoidingView
- FlatList (inverted) с ChatBubble
- Пузырь пользователя: справа, фон primary, белый текст, borderRadius 16 4 16 16
- Пузырь AI: слева, фон white с тенью, dark текст, borderRadius 4 16 16 16
- Typing indicator: три точки (анимированные)

Input снизу:
- TextInput multiline, maxHeight 100
- Кнопка отправки (Ionicons send, фон primary)
- Enter отправляет (не добавляет перенос)

Логика:
- При отправке: chatService.sendMessage(messages) → POST /api/chat
- Добавить сообщения в chatStore
- При ошибке сети: toast "Нет соединения. Проверьте интернет." + кнопка retry

---

### ЭТАП 11: SOS Экран

**`app/sos.tsx`** — открывается как Modal поверх TabBar.

- Красная шапка: "🆘 Экстренная помощь" (белый текст)
- Кнопка закрыть (X) в правом верхнем углу
- **НИКАКИХ alert()** — только кастомный Modal компонент

Секции (ScrollView):

**1. Кнопка "Я потерялся"** — большая, красная, пульсирующая анимация:
- При нажатии → Modal с LOST_PROTOCOL (список шагов)

**2. Экстренные номера КСА:**
- Карточки из SAUDI_EMERGENCY
- Каждая: иконка + название + номер + кнопка "Позвонить" (Linking.openURL('tel:...'))

**3. Посольства СНГ:**
- Список из CIS_EMBASSIES
- Кнопка "Позвонить" для каждого

**4. Арабские фразы:**
- Список из ARABIC_PHRASES
- Каждая: русский + арабский (RTL, крупно) + транслит
- При нажатии карточки → копировать арабский текст → toast "Скопировано"

**5. Тепловой удар — действия:**
- 4 шага: найти тень, пить воду мелкими глотками, смочить голову/шею, если не лучше → 911

---

### ЭТАП 12: Prayer Service

**`src/services/prayerService.ts`:**
```typescript
import axios from 'axios';

const PRAYER_NAMES: Record<string, string> = {
  Fajr: 'Фаджр', Dhuhr: 'Зухр', Asr: 'Аср', Maghrib: 'Магриб', Isha: 'Иша',
};

export interface PrayerTime {
  name: string;
  nameRu: string;
  time: string;        // "05:23"
  timestamp: number;   // ms
}

export interface PrayerData {
  prayers: PrayerTime[];
  nextPrayer: PrayerTime;
  countdown: string;   // "1ч 23м"
  date: string;
}

export const prayerService = {
  async getTimes(lat = 21.3891, lng = 39.8579): Promise<PrayerData> {
    const today = new Date();
    const url = `https://api.aladhan.com/v1/timings/${Math.floor(today.getTime()/1000)}?latitude=${lat}&longitude=${lng}&method=4`;
    const response = await axios.get(url, { timeout: 8000 });
    const timings = response.data.data.timings;

    // Собрать PrayerTime[] из Fajr, Dhuhr, Asr, Maghrib, Isha
    // Найти следующий намаз (ближайший после текущего времени)
    // Вычислить countdown
    // Вернуть PrayerData
    // ... реализуй логику
  },
};
```

---

### ЭТАП 13: TabBar с SOS

**`app/(tabs)/_layout.tsx`:**
```typescript
// Использовать Tabs из expo-router
// 5 стандартных табов: index, guide, checklist, dua, ai
// Добавить кастомную TabBar кнопку SOS между dua и ai
// SOS: круглая кнопка красная, возвышается над TabBar на 8px
// При нажатии: router.push('/sos')
// Цвета TabBar: background white, activeTintColor primary, inactiveTintColor textSecondary
```

---

### ЭТАП 14: Финальный чеклист

Прогони каждый пункт перед отметкой "готово":

- [ ] `npx tsc --noEmit` — ноль TypeScript ошибок
- [ ] Шрифт везде Montserrat, никакого системного
- [ ] Арабский текст: Amiri, минимум 24px, RTL
- [ ] Фон везде светлый — нет `#000`, `#080F0A`, тёмных тем
- [ ] `alert()` нигде не используется — только `<Modal />`
- [ ] `ANTHROPIC_API_KEY` только в `backend/.env`, не в клиенте
- [ ] Прогресс Умры/Хаджа переживает перезапуск приложения
- [ ] Профиль онбординга переживает перезапуск
- [ ] Чат отправляет запрос на `/api/chat` (не напрямую в Anthropic)
- [ ] Все кнопки высотой минимум 52px
- [ ] SOS → звонок реально работает через `Linking.openURL('tel:...')`
- [ ] Нет цвета `#0D3B1E` или `#1A5C2A` (из старого прототипа) — только `#0C6B59`
- [ ] Иконки из `@expo/vector-icons` (Ionicons), не emoji

---

## Что ЗАПРЕЩЕНО

- `alert()`, `confirm()`, `prompt()` — только `<Modal />`
- Тёмная тема, тёмный фон — весь дизайн светлый
- Шрифт отличный от Montserrat (для UI) и Amiri (для арабского)
- `ANTHROPIC_API_KEY` в клиентском коде или `EXPO_PUBLIC_*`
- Прямые запросы к `api.anthropic.com` с клиента
- Emoji как иконки в UI-элементах (только в тексте контента)
- Цвета не из `src/theme/colors.ts`

---

## Переменные окружения

**`backend/.env`** (не коммитить):
```
ANTHROPIC_API_KEY=sk-ant-...
PORT=3000
NODE_ENV=development
```

**`.env.local`** в корне Expo (не коммитить):
```
EXPO_PUBLIC_API_URL=http://localhost:3000
```

В production `EXPO_PUBLIC_API_URL` = URL задеплоенного backend (Railway / Render / VPS).

---

## Запуск

```bash
# Терминал 1 — backend
cd backend
cp .env.example .env
# вставить ANTHROPIC_API_KEY
npm run dev

# Терминал 2 — мобилка
npx expo start --clear
# Открыть на iOS Simulator или Android Emulator
```

---

## Справка: данные из прото-прототипа

В проекте есть рабочий HTML-прототип (`Palomnikal_html.txt`). Там уже есть:
- Полные данные STEPS (4 шага Умры) с дуа на арабском — скопируй напрямую в `umrahSteps.ts`
- Полные данные HAJJ_STEPS (7 шагов) — в `hajjSteps.ts`
- DUAS_DATA по категориям — в `duas.ts`
- PHRASES (арабские фразы) — в `arabicPhrases.ts`

Используй эти данные как есть — они проверены и содержательно правильны.
