import { Slot } from 'expo-router';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { SupabaseProvider } from '../contexts/SupabaseContext';

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <SupabaseProvider>
        <Slot />
      </SupabaseProvider>
    </SafeAreaProvider>
  );
}
