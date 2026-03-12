import React, { createContext, useContext } from 'react';
import { supabase } from '../lib/supabase';

const SupabaseContext = createContext(supabase);

export function SupabaseProvider({ children }: { children: React.ReactNode }) {
  return <SupabaseContext.Provider value={supabase}>{children}</SupabaseContext.Provider>;
}

export function useSupabase() {
  const client = useContext(SupabaseContext);
  if (!client) throw new Error('useSupabase must be used within SupabaseProvider');
  return client;
}
