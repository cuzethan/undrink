import AsyncStorage from '@react-native-async-storage/async-storage';
import Constants from 'expo-constants';
import { createClient } from '@supabase/supabase-js';

const extra = Constants.expoConfig?.extra ?? {};
const supabaseUrl = extra.supabaseUrl as string;
const supabasePublishableKey = extra.supabasePublishableKey as string;

if (!supabaseUrl || !supabasePublishableKey) {
  console.warn(
    'Supabase URL or publishable key missing. Set EXPO_PUBLIC_SUPABASE_URL and EXPO_PUBLIC_SUPABASE_KEY in .env'
  );
}

export const supabase = createClient(supabaseUrl || 'https://placeholder.supabase.co', supabasePublishableKey || 'placeholder', {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
