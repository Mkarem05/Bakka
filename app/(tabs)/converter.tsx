import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../src/theme/colors';
import { fonts, fontSize } from '../../src/theme/typography';
import { spacing, radius } from '../../src/theme/spacing';

interface Currency {
  code: string;
  label: string;
  flag: string;
  fallback: number;
}

const CURRENCIES: Currency[] = [
  { code: 'RUB', label: 'Рубль', flag: '🇷🇺', fallback: 26.5 },
  { code: 'KZT', label: 'Тенге', flag: '🇰🇿', fallback: 135 },
  { code: 'UZS', label: 'Сум', flag: '🇺🇿', fallback: 3400 },
  { code: 'TJS', label: 'Сомони', flag: '🇹🇯', fallback: 2.9 },
  { code: 'KGS', label: 'Сом', flag: '🇰🇬', fallback: 23.5 },
];

const QUICK_AMOUNTS = [10, 50, 100, 200, 500, 1000];

interface MeccaPrice {
  name: string;
  range: string;
}

const MECCA_PRICES: MeccaPrice[] = [
  { name: 'Такси от отеля до мечети', range: '15–50' },
  { name: 'Обед в кафе у мечети', range: '20–60' },
  { name: 'Шаурма / фастфуд', range: '8–20' },
  { name: 'Вода 1.5л в магазине', range: '1–3' },
  { name: 'Ихрам мужской', range: '20–80' },
  { name: 'Сувениры / тасбих', range: '5–50' },
  { name: 'Парфюм (атар)', range: '30–300' },
];

function parseRange(range: string): [number, number] {
  const parts = range.split('–').map(Number);
  return [parts[0] ?? 0, parts[1] ?? parts[0] ?? 0];
}

function formatLocal(value: number): string {
  if (value >= 1000) {
    return value.toLocaleString('ru-RU', { maximumFractionDigits: 0 });
  }
  return value.toLocaleString('ru-RU', { maximumFractionDigits: 1 });
}

export default function ConverterScreen() {
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [rates, setRates] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState(false);

  const [sarInput, setSarInput] = useState('100');
  const [localInput, setLocalInput] = useState('');

  const activeCurrency = CURRENCIES[selectedIdx];
  const effectiveRate = rates[activeCurrency.code] ?? activeCurrency.fallback;

  // Fetch rates on mount
  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      try {
        setLoading(true);
        setFetchError(false);
        const res = await fetch('https://open.er-api.com/v6/latest/SAR');
        if (!res.ok) throw new Error('Network response not ok');
        const data = (await res.json()) as { rates?: Record<string, number> };
        if (!cancelled && data.rates) {
          const picked: Record<string, number> = {};
          for (const c of CURRENCIES) {
            if (data.rates[c.code] !== undefined) {
              picked[c.code] = data.rates[c.code];
            }
          }
          setRates(picked);
        }
      } catch {
        if (!cancelled) setFetchError(true);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };
    void load();
    return () => {
      cancelled = true;
    };
  }, []);

  // Keep local input in sync when currency changes or rates update
  useEffect(() => {
    const sar = parseFloat(sarInput);
    if (!isNaN(sar)) {
      setLocalInput(formatLocal(sar * effectiveRate));
    }
  }, [selectedIdx, rates]);

  const handleSarChange = useCallback(
    (text: string) => {
      setSarInput(text);
      const sar = parseFloat(text.replace(',', '.'));
      if (!isNaN(sar)) {
        setLocalInput(formatLocal(sar * effectiveRate));
      } else {
        setLocalInput('');
      }
    },
    [effectiveRate],
  );

  const handleLocalChange = useCallback(
    (text: string) => {
      setLocalInput(text);
      const local = parseFloat(text.replace(/\s/g, '').replace(',', '.'));
      if (!isNaN(local) && effectiveRate > 0) {
        setSarInput(String(parseFloat((local / effectiveRate).toFixed(2))));
      } else {
        setSarInput('');
      }
    },
    [effectiveRate],
  );

  const handleQuickAmount = (sar: number) => {
    setSarInput(String(sar));
    setLocalInput(formatLocal(sar * effectiveRate));
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Header */}
      <LinearGradient
        colors={['#C9922A', '#E8B84A']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.header}
      >
        <View style={styles.headerIcon}>
          <Ionicons name="swap-horizontal-outline" size={22} color="#FFFFFF" />
        </View>
        <View>
          <Text style={styles.headerTitle}>Конвертер валют</Text>
          <Text style={styles.headerSub}>SAR → СНГ</Text>
        </View>
        {loading && <ActivityIndicator color="#FFFFFF" style={{ marginLeft: 'auto' }} />}
        {fetchError && !loading && (
          <View style={styles.offlineBadge}>
            <Ionicons name="cloud-offline-outline" size={12} color="#FFFFFF" />
            <Text style={styles.offlineBadgeText}>Офлайн</Text>
          </View>
        )}
      </LinearGradient>

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* Currency selector */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.currencyRow}
        >
          {CURRENCIES.map((c, i) => (
            <TouchableOpacity
              key={c.code}
              style={[styles.currencyChip, i === selectedIdx && styles.currencyChipActive]}
              onPress={() => setSelectedIdx(i)}
              activeOpacity={0.75}
            >
              <Text style={styles.currencyFlag}>{c.flag}</Text>
              <Text style={[styles.currencyCode, i === selectedIdx && styles.currencyCodeActive]}>
                {c.code}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Rate info */}
        <View style={styles.rateInfo}>
          <Ionicons name="information-circle-outline" size={14} color={colors.textMuted} />
          <Text style={styles.rateInfoText}>
            1 SAR = {effectiveRate.toLocaleString('ru-RU', { maximumFractionDigits: 2 })}{' '}
            {activeCurrency.code}
            {fetchError ? ' (резервный курс)' : ''}
          </Text>
        </View>

        {/* Converter inputs */}
        <View style={styles.converterCard}>
          {/* SAR input */}
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Саудовский риал (SAR)</Text>
            <View style={styles.inputRow}>
              <Text style={styles.currencySymbol}>﷼</Text>
              <TextInput
                style={styles.input}
                value={sarInput}
                onChangeText={handleSarChange}
                keyboardType="decimal-pad"
                placeholder="0"
                placeholderTextColor={colors.textMuted}
                selectTextOnFocus
              />
            </View>
          </View>

          {/* Swap arrow */}
          <View style={styles.swapRow}>
            <View style={styles.swapLine} />
            <View style={styles.swapIcon}>
              <Ionicons name="swap-vertical-outline" size={18} color={colors.primary} />
            </View>
            <View style={styles.swapLine} />
          </View>

          {/* Local currency input */}
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>
              {activeCurrency.flag} {activeCurrency.label} ({activeCurrency.code})
            </Text>
            <View style={styles.inputRow}>
              <Text style={styles.currencySymbol}>{activeCurrency.code[0]}</Text>
              <TextInput
                style={styles.input}
                value={localInput}
                onChangeText={handleLocalChange}
                keyboardType="decimal-pad"
                placeholder="0"
                placeholderTextColor={colors.textMuted}
                selectTextOnFocus
              />
            </View>
          </View>
        </View>

        {/* Quick amounts */}
        <Text style={styles.sectionTitle}>Быстрый расчёт</Text>
        <View style={styles.quickRow}>
          {QUICK_AMOUNTS.map((amt) => (
            <TouchableOpacity
              key={amt}
              style={[styles.quickBtn, sarInput === String(amt) && styles.quickBtnActive]}
              onPress={() => handleQuickAmount(amt)}
              activeOpacity={0.75}
            >
              <Text style={[styles.quickBtnText, sarInput === String(amt) && styles.quickBtnTextActive]}>
                {amt} ﷼
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Prices in Mecca */}
        <Text style={styles.sectionTitle}>Цены в Мекке</Text>
        <View style={styles.pricesCard}>
          {MECCA_PRICES.map((item, i) => {
            const [lo, hi] = parseRange(item.range);
            const loLocal = Math.round(lo * effectiveRate);
            const hiLocal = Math.round(hi * effectiveRate);
            const localStr =
              loLocal === hiLocal
                ? formatLocal(loLocal)
                : `${formatLocal(loLocal)}–${formatLocal(hiLocal)}`;

            return (
              <View key={i} style={[styles.priceRow, i > 0 && styles.priceRowBorder]}>
                <View style={styles.priceLeft}>
                  <Text style={styles.priceName}>{item.name}</Text>
                  <View style={styles.priceTagRow}>
                    <View style={styles.priceTag}>
                      <Text style={styles.priceTagText}>{item.range} ﷼ SAR</Text>
                    </View>
                  </View>
                </View>
                <View style={styles.priceRight}>
                  <Text style={styles.priceLocalAmount}>{localStr}</Text>
                  <Text style={styles.priceLocalCode}>{activeCurrency.code}</Text>
                </View>
              </View>
            );
          })}
        </View>

        <View style={{ height: spacing['4xl'] }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.ivory,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.lg,
  },
  headerIcon: {
    width: 44,
    height: 44,
    borderRadius: radius.md,
    backgroundColor: 'rgba(0,0,0,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontFamily: fonts.bold,
    fontSize: fontSize.lg,
    color: '#FFFFFF',
  },
  headerSub: {
    fontFamily: fonts.regular,
    fontSize: fontSize.xs,
    color: 'rgba(255,255,255,0.7)',
    marginTop: 2,
  },
  offlineBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginLeft: 'auto',
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
    borderRadius: radius.full,
  },
  offlineBadgeText: {
    fontFamily: fonts.medium,
    fontSize: fontSize.xs,
    color: colors.white,
  },
  scroll: {
    padding: spacing.lg,
  },
  currencyRow: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginBottom: spacing.md,
  },
  currencyChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: radius.full,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    minHeight: 40,
  },
  currencyChipActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  currencyFlag: {
    fontSize: 16,
  },
  currencyCode: {
    fontFamily: fonts.semiBold,
    fontSize: fontSize.sm,
    color: colors.textSecondary,
  },
  currencyCodeActive: {
    color: colors.white,
  },
  rateInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    marginBottom: spacing.lg,
  },
  rateInfoText: {
    fontFamily: fonts.regular,
    fontSize: fontSize.xs,
    color: colors.textMuted,
  },
  converterCard: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: spacing.xl,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  inputGroup: {
    marginBottom: spacing.xs,
  },
  inputLabel: {
    fontFamily: fonts.medium,
    fontSize: fontSize.xs,
    color: colors.textSecondary,
    marginBottom: spacing.sm,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surfaceSecondary,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: spacing.md,
    height: 56,
  },
  currencySymbol: {
    fontFamily: fonts.bold,
    fontSize: fontSize.lg,
    color: colors.textSecondary,
    marginRight: spacing.sm,
    width: 24,
  },
  input: {
    flex: 1,
    fontFamily: fonts.bold,
    fontSize: fontSize.xl,
    color: colors.textPrimary,
    padding: 0,
  },
  swapRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: spacing.md,
  },
  swapLine: {
    flex: 1,
    height: 1,
    backgroundColor: colors.border,
  },
  swapIcon: {
    width: 36,
    height: 36,
    borderRadius: radius.full,
    backgroundColor: colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: spacing.md,
  },
  sectionTitle: {
    fontFamily: fonts.semiBold,
    fontSize: fontSize.base,
    color: colors.textPrimary,
    marginBottom: spacing.md,
  },
  quickRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
    marginBottom: spacing.xl,
  },
  quickBtn: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderRadius: radius.full,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    minHeight: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  quickBtnActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  quickBtnText: {
    fontFamily: fonts.semiBold,
    fontSize: fontSize.sm,
    color: colors.textPrimary,
  },
  quickBtnTextActive: {
    color: colors.white,
  },
  pricesCard: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: spacing.lg,
  },
  priceRowBorder: {
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  priceLeft: {
    flex: 1,
    marginRight: spacing.md,
  },
  priceName: {
    fontFamily: fonts.medium,
    fontSize: fontSize.sm,
    color: colors.textPrimary,
    marginBottom: 4,
  },
  priceTagRow: {
    flexDirection: 'row',
  },
  priceTag: {
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
    backgroundColor: colors.accentLight,
    borderRadius: radius.sm,
  },
  priceTagText: {
    fontFamily: fonts.regular,
    fontSize: fontSize.xs,
    color: colors.accent,
  },
  priceRight: {
    alignItems: 'flex-end',
  },
  priceLocalAmount: {
    fontFamily: fonts.bold,
    fontSize: fontSize.base,
    color: colors.primary,
  },
  priceLocalCode: {
    fontFamily: fonts.regular,
    fontSize: fontSize.xs,
    color: colors.textMuted,
  },
});
