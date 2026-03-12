import { StyleSheet, Text, View } from 'react-native';

export default function Friends() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Friends</Text>
      <Text style={styles.placeholder}>You will be able to see and manage your friends here.</Text>
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

