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
      {/* SOS button uses checklist route slot, renders custom component */}
      <Tabs.Screen
        name="checklist"
        options={{
          title: '',
          tabBarButton: () => (
            <SOSTabButton onPress={() => router.push('/sos')} />
          ),
        }}
      />
      <Tabs.Screen
        name="ziyarat"
        options={{
          title: 'Места',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="map-outline" size={size} color={color} />
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
      {/* Hidden tabs — still navigable via router.push */}
      <Tabs.Screen
        name="dua"
        options={{
          href: null,
        }}
      />
      <Tabs.Screen
        name="masjid"
        options={{
          href: null,
        }}
      />
      <Tabs.Screen
        name="converter"
        options={{
          href: null,
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
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 6,
  },
  sosBtnInner: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: colors.error,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -14,
    shadowColor: colors.error,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.4,
    shadowRadius: 6,
    elevation: 6,
  },
});
