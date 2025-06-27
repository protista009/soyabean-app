import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';

const diseases = [
  "Mossaic Virus", "Southern blight", "Sudden Death Syndrone", "Yellow Mosaic",
  "bacterial_blight", "brown_spot", "crestamento", "ferrugen", "powdery_mildew", "septoria"
];

export default function HomeScreen({ navigation }: any) {
  return (
    <SafeAreaView style={styles.safeContainer}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>🌿 Soybean Disease Detection</Text>
        <Text style={styles.paragraph}>
          This app helps farmers detect soybean leaf diseases by uploading an image.
          Below are the 10 diseases we can detect:
        </Text>

        <View style={styles.card}>
          {diseases.map((disease, index) => (
            <Text key={index} style={styles.disease}>• {disease}</Text>
          ))}
        </View>

        <TouchableOpacity
          style={[styles.button, styles.aboutButton]}
          onPress={() => navigation.navigate('About')}
        >
          <Text style={styles.buttonText}>ℹ️ About</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.predictButton]}
          onPress={() => navigation.navigate('Predict Disease')}
        >
          <Text style={styles.buttonText}>🔍 Predict Disease</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: '#f1f8e9',
  },
  container: {
    padding: 20,
    paddingBottom: 40,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2e7d32',
    marginBottom: 12,
    textAlign: 'center',
  },
  paragraph: {
    fontSize: 16,
    color: '#1b5e20',
    marginBottom: 20,
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#e0f2f1',
    padding: 20,
    borderRadius: 16,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    marginBottom: 25,
  },
  disease: {
    fontSize: 16,
    color: '#00695c',
    marginBottom: 8,
  },
  button: {
    paddingVertical: 14,
    paddingHorizontal: 25,
    borderRadius: 12,
    marginTop: 12,
    alignItems: 'center',
    width: '100%',
  },
  aboutButton: {
    backgroundColor: '#43a047',
  },
  predictButton: {
    backgroundColor: '#1e88e5',
  },
  buttonText: {
    color: '#fff',
    fontSize: 17,
    fontWeight: 'bold',
  },
});
