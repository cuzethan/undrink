import { Redirect } from 'expo-router';

export default function Index() {
  // Temporary: always go straight to the main tabs. Auth will be reintroduced later.
  return <Redirect href="/(tabs)" />;
}
