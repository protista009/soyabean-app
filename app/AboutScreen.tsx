import React from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';

export default function AboutScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.title}>📘 About This App</Text>

        <Text style={styles.subtitle}>👩‍💻 Developed By</Text>
        <Text style={styles.text}>• Manaswi Mane</Text>
        <Text style={styles.text}>• Pooja Patel</Text>

        <Text style={styles.subtitle}>🛠️ Technologies Used</Text>
        <View style={styles.card}>
          <Text style={styles.cardText}>🌐 Google Colab - Model Training</Text>
          <Text style={styles.cardText}>🧠 Streamlit - Model Backend</Text>
          <Text style={styles.cardText}>📱 React Native - Mobile App</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f1f8e9',
  },
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'flex-start',
  },
  title: {
    fontSize: 26,
    color: '#2e7d32',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 24,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#33691e',
    marginTop: 12,
    marginBottom: 8,
  },
  text: {
    fontSize: 16,
    color: '#4e342e',
    marginBottom: 6,
    paddingLeft: 10,
  },
  card: {
    backgroundColor: '#e8f5e9',
    padding: 16,
    borderRadius: 12,
    marginTop: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  cardText: {
    fontSize: 15,
    color: '#1b5e20',
    marginBottom: 8,
  },
});
