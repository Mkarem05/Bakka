import React from 'react';
import { Tabs, useRouter } from 'expo-router';
import { TouchableOpacity, View, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../src/theme/colors';
import { fonts } from '../../src/theme/typography';

function SOSTabButton({ onPress }: { onPress: () => void }) {
  return (
    <TouchableOpacity style={styles.sosWrap} onPress={onPress} activeOpacity={0.8}>
      <View style={styles.sosBtnInner}>
        <Ionicons name="warning-outline" size={22} color={colors.white} />
      </View>
    </TouchableOpacity>
  );
}

export default function TabsLayout() {
  const router = useRouter();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: styles.tabBar,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textSecondary,
        tabBarLabelStyle: styles.tabLabel,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Главная',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home-outline" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="guide"
        options={{
          title: 'Гид',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="book-outline" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="checklist"
        options={{
          title: 'Чеклист',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="checkbox-outline" size={size} color={color} />
          ),
          tabBarButton: () => (
            <>
              <SOSTabButton onPress={() => router.push('/sos')} />
              <TouchableOpacity
                style={styles.checklistTabBtn}
                onPress={() => router.push('/(tabs)/checklist')}
              >
                <Ionicons name="checkbox-outline" size={24} color={colors.textSecondary} />
              </TouchableOpacity>
            </>
          ),
        }}
      />
      <Tabs.Screen
        name="dua"
        options={{
          title: 'Дуа',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="heart-outline" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="ai"
        options={{
          title: 'AI',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="sparkles-outline" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: colors.white,
    borderTopColor: colors.border,
    borderTopWidth: 1,
    height: 60,
    paddingBottom: 6,
  },
  tabLabel: {
    fontFamily: fonts.medium,
    fontSize: 11,
  },
  sosWrap: {
    position: 'absolute',
    top: -14,
    left: '50%',
    marginLeft: -25,
    zIndex: 10,
  },
  sosBtnInner: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: colors.error,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.error,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.4,
    shadowRadius: 6,
    elevation: 6,
  },
  checklistTabBtn: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 8,
  },
});
