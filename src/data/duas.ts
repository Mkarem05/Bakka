export type DuaCategory = 'umrah' | 'hajj' | 'medina' | 'zamzam' | 'daily';

export interface Dua {
  id: string;
  name: string;
  moment: string;
  arabic: string;
  transliteration: string;
  translation: string;
  category: DuaCategory;
}

export const DUAS: Dua[] = [
  // Умра
  {
    id: 'u1',
    name: 'При входе в Харам',
    moment: 'При входе в Масджид аль-Харам',
    arabic: 'اللَّهُمَّ افْتَحْ لِي أَبْوَابَ رَحْمَتِكَ',
    transliteration: 'Allahumma iftah li abwaba rahmatik',
    translation: 'О Аллах, открой для меня врата Твоей милости',
    category: 'umrah',
  },
  {
    id: 'u2',
    name: 'При первом взгляде на Каабу',
    moment: 'При виде Каабы',
    arabic: 'اللَّهُمَّ زِدْ هَذَا الْبَيْتَ تَشْرِيفًا وَتَعْظِيمًا وَتَكْرِيمًا وَمَهَابَةً',
    transliteration:
      'Allahumma zid hadhal-bayta tashrифan wa ta\'dhiman wa takriman wa mahaba',
    translation:
      'О Аллах, умножь почёт, величие, уважение и благоговение этого Дома',
    category: 'umrah',
  },
  {
    id: 'u3',
    name: 'Тальбийя',
    moment: 'В состоянии ихрама — постоянно',
    arabic:
      'لَبَّيْكَ اللَّهُمَّ لَبَّيْكَ، لَبَّيْكَ لَا شَرِيكَ لَكَ لَبَّيْكَ، إِنَّ الْحَمْدَ وَالنِّعْمَةَ لَكَ وَالْمُلْكَ، لَا شَرِيكَ لَكَ',
    transliteration:
      'Labbayk Allahumma labbayk, labbayk la sharika laka labbayk, innal-hamda wan-ni\'mata laka wal-mulk, la sharika lak',
    translation:
      'Вот я перед Тобой, о Аллах! Нет у Тебя сотоварища! Воистину, хвала, милость и власть — Твои. Нет у Тебя сотоварища!',
    category: 'umrah',
  },
  {
    id: 'u4',
    name: 'После двух ракаатов тавафа',
    moment: 'У Макам Ибрагим после тавафа',
    arabic: 'رَبِّ إِنِّي ظَلَمْتُ نَفْسِي فَاغْفِرْ لِي',
    transliteration: 'Rabbi inni dhalamtu nafsi faghfir li',
    translation: 'Господь мой, я обидел себя, так прости меня',
    category: 'umrah',
  },
  {
    id: 'u5',
    name: 'Дуа о принятии Умры',
    moment: 'После завершения всех обрядов',
    arabic: 'رَبَّنَا تَقَبَّلْ مِنَّا إِنَّكَ أَنتَ السَّمِيعُ الْعَلِيمُ',
    transliteration: "Rabbana taqabbal minna innaka antas-Sami'ul-'Alim",
    translation: 'Господь наш, прими от нас! Воистину, Ты — Слышащий, Знающий',
    category: 'umrah',
  },

  // Хадж
  {
    id: 'h1',
    name: 'Лучшее дуа в Арафате',
    moment: 'День Арафата — весь день',
    arabic:
      'لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ',
    transliteration:
      'La ilaha illallahu wahdahu la sharika lah, lahul-mulku wa lahul-hamdu wa huwa ala kulli shayin qadir',
    translation:
      'Нет божества кроме Аллаха, Единого, нет у Него сотоварища. Ему принадлежит власть и хвала, и Он над всем Всемогущ',
    category: 'hajj',
  },
  {
    id: 'h2',
    name: 'Дуа о прощении',
    moment: 'На Арафате и в любое время',
    arabic: 'اللَّهُمَّ إِنَّكَ عَفُوٌّ تُحِبُّ الْعَفْوَ فَاعْفُ عَنِّي',
    transliteration: "Allahumma innaka 'afuwwun tuhibbul-'afwa fa'fu 'anni",
    translation: 'О Аллах, Ты — Прощающий, любишь прощение, так прости меня',
    category: 'hajj',
  },
  {
    id: 'h3',
    name: 'При броске камешков',
    moment: 'Каждый бросок в Джамарат',
    arabic: 'اللَّهُ أَكْبَرُ',
    transliteration: 'Allahu Akbar',
    translation: 'Аллах Велик',
    category: 'hajj',
  },
  {
    id: 'h4',
    name: 'Такбир дней Ташрика',
    moment: 'Дни 11–13, после каждого намаза',
    arabic:
      'اللَّهُ أَكْبَرُ، اللَّهُ أَكْبَرُ، لَا إِلَهَ إِلَّا اللَّهُ، وَاللَّهُ أَكْبَرُ، اللَّهُ أَكْبَرُ، وَلِلَّهِ الْحَمْدُ',
    transliteration:
      'Allahu Akbar, Allahu Akbar, la ilaha illallah, wallahu Akbar, Allahu Akbar, wa lillahil-hamd',
    translation:
      'Аллах Велик, Аллах Велик, нет бога кроме Аллаха, Аллах Велик, Аллах Велик, и Аллаху вся хвала',
    category: 'hajj',
  },
  {
    id: 'h5',
    name: 'Прощальная дуа у Каабы',
    moment: 'Таваф Вада — перед отъездом',
    arabic:
      'اللَّهُمَّ لَا تَجْعَلْ هَذَا آخِرَ الْعَهْدِ مِنِّي بِبَيْتِكَ الْحَرَامِ',
    transliteration:
      "Allahumma la taj'al hadha akhiral-'ahdi minni bi-baytika l-haram",
    translation:
      'О Аллах, не делай это последним моим посещением Твоего Запретного Дома',
    category: 'hajj',
  },

  // Медина
  {
    id: 'm1',
    name: 'Приветствие Пророку',
    moment: 'При посещении Равзы (могилы Пророка)',
    arabic:
      'السَّلَامُ عَلَيْكَ يَا رَسُولَ اللَّهِ، السَّلَامُ عَلَيْكَ يَا نَبِيَّ اللَّهِ',
    transliteration:
      "As-salamu 'alayka ya Rasulallah, as-salamu 'alayka ya Nabiyyallah",
    translation:
      'Мир тебе, о Посланник Аллаха! Мир тебе, о Пророк Аллаха!',
    category: 'medina',
  },
  {
    id: 'm2',
    name: 'В мечети Пророка',
    moment: 'При входе в Масджид ан-Набави',
    arabic:
      'اللَّهُمَّ صَلِّ عَلَى مُحَمَّدٍ، اللَّهُمَّ افْتَحْ لِي أَبْوَابَ رَحْمَتِكَ',
    transliteration:
      'Allahumma salli ala Muhammad, Allahumma iftah li abwaba rahmatik',
    translation:
      'О Аллах, благослови Мухаммада. О Аллах, открой для меня врата Твоей милости',
    category: 'medina',
  },
  {
    id: 'm3',
    name: 'Приветствие Абу Бакру и Умару',
    moment: 'У могил сподвижников',
    arabic:
      'السَّلَامُ عَلَيْكُمَا يَا صَاحِبَيْ رَسُولِ اللَّهِ',
    transliteration: "As-salamu 'alaykuma ya sahibay Rasulillah",
    translation: 'Мир вам обоим, о спутники Посланника Аллаха',
    category: 'medina',
  },
  {
    id: 'm4',
    name: 'Дуа в Равзе',
    moment: 'Молитва в Равзат аш-Шарифа',
    arabic:
      'اللَّهُمَّ إِنِّي أَسْأَلُكَ بِحَقِّ نَبِيِّكَ مُحَمَّدٍ أَنْ تَغْفِرَ لِي ذُنُوبِي',
    transliteration:
      'Allahumma inni as\'aluka bi-haqqi nabiyyika Muhammadin an taghfira li dhunubi',
    translation:
      'О Аллах, прошу Тебя ради Твоего пророка Мухаммада простить мои грехи',
    category: 'medina',
  },
  {
    id: 'm5',
    name: 'Благословение на Пророка',
    moment: 'Постоянно в Медине',
    arabic:
      'اللَّهُمَّ صَلِّ عَلَى مُحَمَّدٍ وَعَلَى آلِ مُحَمَّدٍ كَمَا صَلَّيْتَ عَلَى إِبْرَاهِيمَ',
    transliteration:
      'Allahumma salli ala Muhammadin wa ala ali Muhammadin kama sallayta ala Ibrahim',
    translation:
      'О Аллах, благослови Мухаммада и семью Мухаммада, как Ты благословил Ибрагима',
    category: 'medina',
  },

  // Зам-зам
  {
    id: 'z1',
    name: 'Дуа при питье зам-зам',
    moment: 'Перед питьём зам-зам',
    arabic:
      'اللَّهُمَّ إِنِّي أَسْأَلُكَ عِلْمًا نَافِعًا وَرِزْقًا وَاسِعًا وَشِفَاءً مِنْ كُلِّ دَاءٍ',
    transliteration:
      "Allahumma inni as'aluka 'ilman nafi'an wa rizqan wasi'an wa shifa'an min kulli da'",
    translation:
      'О Аллах, прошу Тебя полезных знаний, широкого удела и исцеления от всех болезней',
    category: 'zamzam',
  },
  {
    id: 'z2',
    name: 'Перед питьём',
    moment: 'Перед каждым глотком',
    arabic: 'بِسْمِ اللَّهِ',
    transliteration: 'Bismillah',
    translation: 'Во имя Аллаха',
    category: 'zamzam',
  },
  {
    id: 'z3',
    name: 'После питья зам-зам',
    moment: 'После питья',
    arabic: 'الْحَمْدُ لِلَّهِ',
    transliteration: 'Alhamdulillah',
    translation: 'Хвала Аллаху',
    category: 'zamzam',
  },
  {
    id: 'z4',
    name: 'О благах зам-зам',
    moment: 'При наполнении сосуда',
    arabic:
      'اللَّهُمَّ اجْعَلْهُ شِفَاءً مِنْ كُلِّ دَاءٍ وَأَمَانًا مِنْ كُلِّ خَوْفٍ',
    transliteration:
      "Allahumma ij'alhu shifa'an min kulli da'in wa amanan min kulli khawf",
    translation:
      'О Аллах, сделай его исцелением от всех болезней и защитой от всех страхов',
    category: 'zamzam',
  },
  {
    id: 'z5',
    name: 'Намерение при питье',
    moment: 'Перед тем как пить с намерением',
    arabic:
      'اللَّهُمَّ إِنَّهُ بَلَغَنِي أَنَّ رَسُولَكَ قَالَ: مَاءُ زَمْزَمَ لِمَا شُرِبَ لَهُ',
    transliteration:
      "Allahumma innahu balaghani anna Rasulaka qal: ma'u Zamzama lima shuriba lah",
    translation:
      'О Аллах, до меня дошло, что Твой Посланник сказал: вода зам-зам — для того, для чего пьют её',
    category: 'zamzam',
  },

  // Ежедневные
  {
    id: 'd1',
    name: 'Утреннее дуа',
    moment: 'Каждое утро',
    arabic:
      'أَصْبَحْنَا وَأَصْبَحَ الْمُلْكُ لِلَّهِ، وَالْحَمْدُ لِلَّهِ، لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ',
    transliteration:
      'Asbahna wa asbahal-mulku lillah, wal-hamdu lillah, la ilaha illallahu wahdahu la sharika lah',
    translation:
      'Мы вошли в утро, и власть принадлежит Аллаху. Хвала Аллаху. Нет бога кроме Аллаха, Единого, без сотоварища',
    category: 'daily',
  },
  {
    id: 'd2',
    name: 'Вечернее дуа',
    moment: 'Каждый вечер',
    arabic:
      'أَمْسَيْنَا وَأَمْسَى الْمُلْكُ لِلَّهِ، وَالْحَمْدُ لِلَّهِ، لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ',
    transliteration:
      'Amsayna wa amsal-mulku lillah, wal-hamdu lillah, la ilaha illallahu wahdahu la sharika lah',
    translation:
      'Мы вошли в вечер, и власть принадлежит Аллаху. Хвала Аллаху. Нет бога кроме Аллаха, Единого, без сотоварища',
    category: 'daily',
  },
  {
    id: 'd3',
    name: 'Перед сном',
    moment: 'Каждую ночь перед сном',
    arabic: 'بِاسْمِكَ اللَّهُمَّ أَمُوتُ وَأَحْيَا',
    transliteration: 'Bismika Allahumma amutu wa ahya',
    translation: 'С именем Твоим, о Аллах, умираю и живу',
    category: 'daily',
  },
  {
    id: 'd4',
    name: 'После пробуждения',
    moment: 'Сразу после пробуждения',
    arabic:
      'الْحَمْدُ لِلَّهِ الَّذِي أَحْيَانَا بَعْدَ مَا أَمَاتَنَا وَإِلَيْهِ النُّشُورُ',
    transliteration:
      'Alhamdulillahil-ladhi ahyana ba\'da ma amatana wa ilayhin-nushur',
    translation:
      'Хвала Аллаху, Который оживил нас после того, как умертвил нас, и к Нему воскресение',
    category: 'daily',
  },
  {
    id: 'd5',
    name: 'Истигфар',
    moment: 'После каждого намаза и в любое время',
    arabic: 'أَسْتَغْفِرُ اللَّهَ الْعَظِيمَ الَّذِي لَا إِلَهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ وَأَتُوبُ إِلَيْهِ',
    transliteration:
      'Astaghfirullahal-Adhimil-ladhi la ilaha illa Huwal-Hayyul-Qayyumu wa atubu ilayh',
    translation:
      'Прошу прощения у Аллаха Великого, кроме Которого нет бога, Живого, Вечносущего, и каюсь перед Ним',
    category: 'daily',
  },
];
