import { Tabs, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { useSupabase } from '../../contexts/SupabaseContext';
import { CustomTabBar } from '../../components/CustomTabBar';

export default function TabsLayout() {
  const supabase = useSupabase();
  const router = useRouter();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    let alive = true;

    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!alive) return;
      if (!session) router.replace('/(auth)/sign-in');
      setChecking(false);
    });

    const { data: subscription } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) router.replace('/(auth)/sign-in');
    });

    return () => {
      alive = false;
      subscription?.subscription?.unsubscribe();
    };
  }, [router, supabase.auth]);

  if (checking) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

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
