import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ActivityIndicator,
  Alert,
  TouchableOpacity,
  Platform,
  SafeAreaView,
} from "react-native";
import axios from "axios";
import * as ImagePicker from "expo-image-picker";

const BACKEND_URL =
  Platform.OS === "web"
    ? "http://localhost:8000/predict"
    : "http://<YOUR_LOCAL_IP>:8000/predict";  // Replace with your system IP


const PredictScreen = () => {
  const [image, setImage] = useState<string | null>(null);
  const [prediction, setPrediction] = useState<{ result: string; confidence: number } | null>(null);
  const [loading, setLoading] = useState(false);
  const [webFile, setWebFile] = useState<File | null>(null);

  const pickFromGallery = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const pickedImage = result.assets[0].uri;
      setImage(pickedImage);
      setPrediction(null);
    }
  };

  const takePhoto = async () => {
    const permission = await ImagePicker.requestCameraPermissionsAsync();
    if (!permission.granted) {
      Alert.alert("Permission denied", "Camera access is required.");
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const capturedImage = result.assets[0].uri;
      setImage(capturedImage);
      setPrediction(null);
    }
  };

  const pickImageWeb = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = () => {
      if (input.files && input.files.length > 0) {
        const file = input.files[0];
        setWebFile(file);
        const objectUrl = URL.createObjectURL(file);
        setImage(objectUrl);
        setPrediction(null);
      }
    };
    input.click();
  };

  const predictDisease = async () => {
    if (!image) return;

    const formData = new FormData();

    if (Platform.OS === "web") {
      if (!webFile) return;
      formData.append("file", webFile);
    } else {
      formData.append("file", {
        uri: image,
        name: "image.jpg",
        type: "image/jpeg",
      } as any);
    }

    try {
      setLoading(true);
      const response = await axios.post(BACKEND_URL, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setPrediction({
        result: response.data.result || "No result",
        confidence: response.data.confidence || 0,
      });
    } catch (error) {
      console.error("Prediction error:", error);
      Alert.alert("Error", "Failed to connect to backend or predict.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <Text style={styles.title}>🌱 Upload or Capture Soybean Leaf</Text>

        {Platform.OS === "web" ? (
          <TouchableOpacity style={styles.button} onPress={pickImageWeb}>
            <Text style={styles.buttonText}>🖼️ Upload Image (Web)</Text>
          </TouchableOpacity>
        ) : (
          <>
            <TouchableOpacity style={styles.button} onPress={takePhoto}>
              <Text style={styles.buttonText}>📷 Take Photo</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={pickFromGallery}>
              <Text style={styles.buttonText}>🖼️ Choose from Gallery</Text>
            </TouchableOpacity>
          </>
        )}

        {image && (
          <>
            <Image source={{ uri: image }} style={styles.image} />
            <TouchableOpacity style={styles.predictButton} onPress={predictDisease}>
              <Text style={styles.predictButtonText}>🔍 Predict Disease</Text>
            </TouchableOpacity>
          </>
        )}

        {loading && (
          <ActivityIndicator size="large" color="#2e7d32" style={{ marginTop: 20 }} />
        )}

        {prediction && (
          <View style={styles.resultCard}>
            <Text style={styles.resultText}>
              🧪 <Text style={styles.bold}>Result:</Text> {prediction.result}
            </Text>
            <Text style={styles.resultText}>
              🎯 <Text style={styles.bold}>Confidence:</Text>{" "}
              {(prediction.confidence * 100).toFixed(2)}%
            </Text>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: "#f1f8e9",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#2e7d32",
    marginBottom: 20,
    textAlign: "center",
  },
  image: {
    width: "100%",
    height: 240,
    borderRadius: 12,
    marginVertical: 20,
    resizeMode: "cover",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  button: {
    backgroundColor: "#43a047",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginTop: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  predictButton: {
    backgroundColor: "#1e88e5",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
  },
  predictButtonText: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "bold",
  },
  resultCard: {
    backgroundColor: "#e0f2f1",
    marginTop: 30,
    padding: 16,
    borderRadius: 12,
    elevation: 4,
  },
  resultText: {
    fontSize: 17,
    color: "#00695c",
    marginBottom: 8,
  },
  bold: {
    fontWeight: "bold",
  },
});

export default PredictScreen;
