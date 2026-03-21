import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { authClient } from '../../lib/auth-client';
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

const MIN_LENGTH = 2;

export default function SetDisplayName() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const [displayName, setDisplayName] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (isPending) return;
    if (!session) {
      router.replace('/(auth)/sign-in');
      return;
    }
    const existing = session.user?.name?.trim();
    if (existing) {
      router.replace('/(tabs)');
    }
  }, [isPending, session, router]);

  async function handleContinue() {
    const trimmed = displayName.trim();
    if (trimmed.length < MIN_LENGTH) {
      Alert.alert('Error', `Please enter a display name (at least ${MIN_LENGTH} characters).`);
      return;
    }

    setSaving(true);
    const { error } = await authClient.updateUser({ name: trimmed });
    setSaving(false);

    if (error) {
      Alert.alert('Error', error.message);
      return;
    }

    router.replace('/(tabs)');
  }

  if (isPending || !session) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <View style={styles.form}>
        <Text style={styles.title}>What should we call you?</Text>
        <Text style={styles.subtitle}>{"This is how you'll appear in the app."}</Text>
        <TextInput
          style={styles.input}
          placeholder="Display name"
          placeholderTextColor="#999"
          value={displayName}
          onChangeText={setDisplayName}
          autoCapitalize="words"
          autoComplete="name"
          autoCorrect={false}
        />
        <TouchableOpacity style={styles.button} onPress={handleContinue} disabled={saving}>
          {saving ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Continue</Text>}
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 24,
    backgroundColor: '#fff',
  },
  form: {
    gap: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 15,
    color: '#6b7280',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 14,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#2563eb',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
