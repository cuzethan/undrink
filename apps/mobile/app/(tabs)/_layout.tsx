import { Tabs } from 'expo-router';
import { StyleSheet, View } from 'react-native';
import { CustomTabBar } from '../../components/CustomTabBar';

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerTitle: 'undrink',
        headerTitleAlign: 'left',
        headerTitleStyle: {
          fontSize: 24,
          fontWeight: '700',
        },
        headerStyle: { backgroundColor: '#f9fafb' },
        tabBarStyle: { display: 'none' },
      }}
      tabBar={(props) => <CustomTabBar {...props} />}
    >
      <Tabs.Screen
        name="index"
      />
      <Tabs.Screen
        name="stats"
      />
      <Tabs.Screen
        name="add-drinks"
      />
      <Tabs.Screen
        name="friends"
      />
      <Tabs.Screen
        name="settings"
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
});
