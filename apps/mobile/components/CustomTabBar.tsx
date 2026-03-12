import { Ionicons } from '@expo/vector-icons';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Pressable, StyleSheet, Text, View } from 'react-native';

type TabKey = 'index' | 'stats' | 'add-drinks' | 'friends' | 'settings';

const TABS: { key: TabKey; label: string; icon: keyof typeof Ionicons.glyphMap }[] = [
  { key: 'index', label: 'Home', icon: 'home' },
  { key: 'stats', label: 'Stats', icon: 'stats-chart' },
  { key: 'add-drinks', label: 'Add drinks', icon: 'add-circle' },
  { key: 'friends', label: 'Friends', icon: 'people' },
  { key: 'settings', label: 'Settings', icon: 'settings-outline' },
];

export function CustomTabBar({ state, descriptors, navigation }: BottomTabBarProps) {
  const insets = useSafeAreaInsets();
  const router = useRouter();

  function handleTabPress(key: TabKey, index: number) {
    const isFocused = state.index === index;

    const event = navigation.emit({
      type: 'tabPress',
      target: state.routes[index].key,
      canPreventDefault: true,
    });

    if (!isFocused && !event.defaultPrevented) {
      navigation.navigate({ name: key, merge: true } as never);
    }
  }

  return (
    <View style={[styles.wrapper, { paddingBottom: insets.bottom || 12 }]}>
      <View style={styles.bar}>
        <View style={styles.tabsRow}>
          {TABS.map((tab, index) => {
            const routeIndex = state.routes.findIndex((r) => r.name === tab.key);
            if (routeIndex === -1) {
              return null;
            }

            const isFocused = state.index === routeIndex;

            const isPrimary = tab.key === 'add-drinks';
            const baseColor = isPrimary ? '#ffffff' : '#6b7280';
            const activeColor = isPrimary ? '#ffffff' : '#2563eb';
            const color = isFocused ? activeColor : baseColor;

            const containerStyle = isPrimary
              ? [
                  styles.tabButton,
                  styles.primaryTabButton,
                  isFocused && styles.primaryTabButtonActive,
                ]
              : styles.tabButton;

            const iconSize = isPrimary ? 26 : 22;

            return (
              <Pressable
                key={tab.key}
                style={containerStyle}
                onPress={() => handleTabPress(tab.key, routeIndex)}
              >
                <Ionicons
                  name={tab.icon}
                  size={iconSize}
                  color={color}
                />
                <Text style={[styles.tabLabel, isPrimary && styles.primaryTabLabel, { color }]}>
                  {tab.label}
                </Text>
              </Pressable>
            );
          })}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'flex-end',
  },
  bar: {
    flex: 1,
    alignSelf: 'stretch',
    marginHorizontal: 16,
    marginTop: 8,
    borderRadius: 24,
    backgroundColor: '#f9fafb',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 12,
  },
  tabsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    height: 60,
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabLabel: {
    marginTop: 4,
    fontSize: 12,
    fontWeight: '500',
  },
  primaryTabButton: {
    flex: 1.2,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 999,
    backgroundColor: '#2563eb',
  },
  primaryTabButtonActive: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 12,
  },
  primaryTabLabel: {
    fontSize: 13,
    fontWeight: '700',
  },
});

