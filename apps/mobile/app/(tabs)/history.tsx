import { StyleSheet, Text, View } from 'react-native';

export default function History() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>History</Text>
      <Text style={styles.placeholder}>Your drink log will appear here once the database is set up.</Text>
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
