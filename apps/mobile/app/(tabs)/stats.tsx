import { StyleSheet, Text, View } from 'react-native';

export default function Stats() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Stats</Text>
      <Text style={styles.placeholder}>Your drink statistics will appear here once we wire up analytics.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 8,
  },
  placeholder: {
    fontSize: 16,
    color: '#6b7280',
  },
});

