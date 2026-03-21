import { useRouter } from 'expo-router';
import { useState } from 'react';
import { authClient } from '../../lib/auth-client'; 
import { z } from 'zod';
import {
  Alert, 
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

const SignUpSchema = z
  .object({
    username: z.string().trim().min(1, 'Username is required.').min(3, 'Username must be at least 3 characters.'),
    email: z.email(),
    password: z.string().min(1, 'Password is required.').min(6, 'Password must be at least 6 characters.'),
    confirmPassword: z.string().min(1, 'Please confirm your password.'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match.',
    path: ['confirmPassword'],
  });

export default function SignUp() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  async function handleSignUp() {
    setLoading(true);
    const result = SignUpSchema.safeParse({ username, email, password, confirmPassword });

    if (!result.success) {
      Alert.alert('Error', result.error.issues[0]?.message ?? 'Invalid input.');
      setLoading(false);
      return;
    }

    const { data: response } = await authClient.isUsernameAvailable({
      username: username.trim(),
    });

    if (!(response?.available)) {
      Alert.alert('Error', 'Username is already taken.');
      setLoading(false);
      return;
    }

    const { error } = await authClient.signUp.email({
      email,
      password,
      name: '',
      username: username.trim(),
    });

    if (error) {
      Alert.alert('Error', error.message);
      setLoading(false);
      return;
    }

    // Instant login: same credentials, then set display name → home.
    const { error: signInError } = await authClient.signIn.username({
      username: username.trim(),
      password,
    });

    setLoading(false);

    if (signInError) {
      Alert.alert('Account created', 'Please sign in with your username and password.');
      router.replace('/(auth)/sign-in');
      return;
    }

    router.replace('/(auth)/set-display-name');
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <View style={styles.form}>
        <Text style={styles.title}>Sign up</Text>
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#999"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
          autoComplete="email"
        />
        <TextInput
          style={styles.input}
          placeholder="Username"
          placeholderTextColor="#999"
          value={username}
          onChangeText={setUsername}
          autoCapitalize="none"
          autoComplete="username"
        />
        <TextInput
          style={styles.input}
          placeholder="Password (min 6 characters)"
          placeholderTextColor="#999"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          autoComplete="new-password"
        />
        <TextInput
          style={styles.input}
          placeholder="Confirm Password"
          placeholderTextColor="#999"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
          autoComplete="new-password"
        />
        <TouchableOpacity style={styles.button} onPress={handleSignUp} disabled={loading}>
          {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Sign up</Text>}
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.back()} style={styles.link}>
          <Text style={styles.linkText}>Already have an account? Sign in</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
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
  link: {
    alignItems: 'center',
    marginTop: 16,
  },
  linkText: {
    color: '#2563eb',
    fontSize: 14,
  },
});
