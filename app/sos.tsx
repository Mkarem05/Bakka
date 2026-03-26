import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Linking,
  Animated,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import * as Clipboard from 'expo-clipboard';
import { colors } from '../src/theme/colors';
import { fonts, fontSize } from '../src/theme/typography';
import { spacing, radius } from '../src/theme/spacing';
import { Modal } from '../src/components/ui/Modal';
import { showToast } from '../src/components/ui/Toast';
import {
  SAUDI_EMERGENCY,
  CIS_EMBASSIES,
  ARABIC_PHRASES,
  LOST_PROTOCOL,
} from '../src/data/emergencyContacts';

const HEAT_STEPS = [
  'Немедленно найдите тень — под навесом, в здании, у стены',
  'Пейте воду мелкими глотками, не залпом',
  'Смочите голову, шею и запястья холодной водой',
  'Если не лучше через 10 минут — звоните 911',
];

export default function SOSScreen() {
  const router = useRouter();
  const [lostModalVisible, setLostModalVisible] = useState(false);
  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, { toValue: 1.06, duration: 700, useNativeDriver: true }),
        Animated.timing(pulseAnim, { toValue: 1, duration: 700, useNativeDriver: true }),
      ])
    ).start();
  }, [pulseAnim]);

  const call = (number: string) => {
    Linking.openURL(`tel:${number}`);
  };

  const copyArabic = async (text: string) => {
    await Clipboard.setStringAsync(text);
    showToast('Скопировано', 'success');
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      {/* Header */}
      <View style={styles.headerBar}>
        <Text style={styles.headerTitle}>Экстренная помощь</Text>
        <TouchableOpacity
          onPress={() => router.back()}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Ionicons name="close" size={26} color={colors.white} />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* Lost button */}
        <Animated.View style={{ transform: [{ scale: pulseAnim }] }}>
          <TouchableOpacity
            style={styles.lostBtn}
            onPress={() => setLostModalVisible(true)}
            activeOpacity={0.85}
          >
            <Ionicons name="location-outline" size={28} color={colors.white} />
            <Text style={styles.lostBtnText}>Я потерялся</Text>
            <Text style={styles.lostBtnSub}>Нажмите — получите инструкцию</Text>
          </TouchableOpacity>
        </Animated.View>

        {/* Saudi emergency */}
        <Text style={styles.sectionTitle}>Экстренные номера КСА</Text>
        <View style={styles.section}>
          {SAUDI_EMERGENCY.map((item) => (
            <View key={item.number} style={styles.callCard}>
              <View style={styles.callCardLeft}>
                <View style={styles.callIcon}>
                  <Ionicons name={item.icon as any} size={22} color={colors.primary} />
                </View>
                <View>
                  <Text style={styles.callName}>{item.name}</Text>
                  <Text style={styles.callNumber}>{item.number}</Text>
                </View>
              </View>
              <TouchableOpacity
                style={styles.callBtn}
                onPress={() => call(item.number)}
                activeOpacity={0.8}
              >
                <Ionicons name="call-outline" size={18} color={colors.white} />
                <Text style={styles.callBtnText}>Позвонить</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>

        {/* Embassies */}
        <Text style={styles.sectionTitle}>Посольства СНГ</Text>
        <View style={styles.section}>
          {CIS_EMBASSIES.map((e) => (
            <View key={e.country} style={styles.callCard}>
              <View style={styles.callCardLeft}>
                <View style={styles.callIcon}>
                  <Ionicons name="flag-outline" size={22} color={colors.primary} />
                </View>
                <View>
                  <Text style={styles.callName}>{e.country}</Text>
                  <Text style={styles.callNumber}>{e.city}</Text>
                </View>
              </View>
              <TouchableOpacity
                style={styles.callBtn}
                onPress={() => call(e.number)}
                activeOpacity={0.8}
              >
                <Ionicons name="call-outline" size={18} color={colors.white} />
                <Text style={styles.callBtnText}>Позвонить</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>

        {/* Arabic phrases */}
        <Text style={styles.sectionTitle}>Арабские фразы</Text>
        <Text style={styles.sectionHint}>Нажмите — скопировать арабский текст</Text>
        <View style={styles.section}>
          {ARABIC_PHRASES.map((p, i) => (
            <TouchableOpacity
              key={i}
              style={styles.phraseCard}
              onPress={() => copyArabic(p.arabic)}
              activeOpacity={0.7}
            >
              <Text style={styles.phraseRu}>{p.russian}</Text>
              <Text style={styles.phraseAr}>{p.arabic}</Text>
              <Text style={styles.phraseTranslit}>{p.transliteration}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Heat stroke */}
        <Text style={styles.sectionTitle}>Тепловой удар — действия</Text>
        <View style={styles.section}>
          {HEAT_STEPS.map((step, i) => (
            <View key={i} style={styles.heatStep}>
              <View style={styles.heatNum}>
                <Text style={styles.heatNumText}>{i + 1}</Text>
              </View>
              <Text style={styles.heatText}>{step}</Text>
            </View>
          ))}
        </View>
      </ScrollView>

      {/* Lost modal */}
      <Modal
        visible={lostModalVisible}
        title="Вы потерялись? Следуйте шагам:"
        message={LOST_PROTOCOL.map((s, i) => `${i + 1}. ${s}`).join('\n\n')}
        actions={[
          {
            label: 'Понятно',
            onPress: () => setLostModalVisible(false),
            variant: 'primary',
          },
        ]}
        onClose={() => setLostModalVisible(false)}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.ivory },
  headerBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.error,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.lg,
  },
  headerTitle: {
    fontFamily: fonts.bold,
    fontSize: fontSize.lg,
    color: colors.white,
  },
  scroll: {
    padding: spacing.lg,
    paddingBottom: spacing['4xl'],
    gap: spacing.sm,
  },
  lostBtn: {
    backgroundColor: colors.error,
    borderRadius: radius.lg,
    padding: spacing['2xl'],
    alignItems: 'center',
    gap: spacing.sm,
    marginBottom: spacing.lg,
    shadowColor: colors.error,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 8,
    elevation: 6,
  },
  lostBtnText: {
    fontFamily: fonts.bold,
    fontSize: fontSize.xl,
    color: colors.white,
  },
  lostBtnSub: {
    fontFamily: fonts.regular,
    fontSize: fontSize.sm,
    color: 'rgba(255,255,255,0.8)',
  },
  sectionTitle: {
    fontFamily: fonts.bold,
    fontSize: fontSize.base,
    color: colors.textPrimary,
    marginTop: spacing.lg,
    marginBottom: spacing.sm,
  },
  sectionHint: {
    fontFamily: fonts.regular,
    fontSize: fontSize.xs,
    color: colors.textMuted,
    marginBottom: spacing.sm,
    marginTop: -spacing.xs,
  },
  section: { gap: spacing.sm },
  callCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    padding: spacing.lg,
    minHeight: 64,
  },
  callCardLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    flex: 1,
  },
  callIcon: {
    width: 44,
    height: 44,
    borderRadius: radius.md,
    backgroundColor: colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  callName: {
    fontFamily: fonts.semiBold,
    fontSize: fontSize.sm,
    color: colors.textPrimary,
  },
  callNumber: {
    fontFamily: fonts.regular,
    fontSize: fontSize.sm,
    color: colors.textSecondary,
  },
  callBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    backgroundColor: colors.primary,
    borderRadius: radius.sm,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    minHeight: 44,
  },
  callBtnText: {
    fontFamily: fonts.semiBold,
    fontSize: fontSize.sm,
    color: colors.white,
  },
  phraseCard: {
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    padding: spacing.lg,
    gap: spacing.xs,
  },
  phraseRu: {
    fontFamily: fonts.medium,
    fontSize: fontSize.sm,
    color: colors.textPrimary,
  },
  phraseAr: {
    fontFamily: 'Amiri_400Regular',
    fontSize: 24,
    color: colors.accent,
    textAlign: 'right',
    writingDirection: 'rtl',
    lineHeight: 38,
  },
  phraseTranslit: {
    fontFamily: fonts.regular,
    fontSize: fontSize.xs,
    color: colors.textSecondary,
    fontStyle: 'italic',
  },
  heatStep: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    padding: spacing.lg,
    gap: spacing.md,
  },
  heatNum: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: colors.error,
    alignItems: 'center',
    justifyContent: 'center',
  },
  heatNumText: {
    fontFamily: fonts.bold,
    fontSize: fontSize.sm,
    color: colors.white,
  },
  heatText: {
    fontFamily: fonts.regular,
    fontSize: fontSize.sm,
    color: colors.textPrimary,
    flex: 1,
    lineHeight: 22,
  },
});
