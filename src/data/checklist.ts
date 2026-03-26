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

export const CATEGORY_LABELS: Record<ChecklistCategory, string> = {
  documents: 'Документы',
  clothes: 'Одежда',
  spiritual: 'Духовная',
  health: 'Здоровье',
  travel: 'В дорогу',
};

export const CATEGORY_ICONS: Record<ChecklistCategory, string> = {
  documents: 'document-text-outline',
  clothes: 'shirt-outline',
  spiritual: 'moon-outline',
  health: 'medkit-outline',
  travel: 'airplane-outline',
};
