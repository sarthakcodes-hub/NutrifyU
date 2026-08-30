import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  Alert,
  ScrollView,
} from "react-native";

import * as ImagePicker from "expo-image-picker";
import api from "../config/api";

export default function FoodScannerScreen({ navigation }) {
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const pickImage = async () => {
    const permission =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permission.granted) {
      Alert.alert(
        "Permission Required",
        "Please allow photo library access."
      );
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      quality: 0.8,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      setResult(null);
    }
  };

  const takePhoto = async () => {
    const permission =
      await ImagePicker.requestCameraPermissionsAsync();

    if (!permission.granted) {
      Alert.alert(
        "Permission Required",
        "Please allow camera access."
      );
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      quality: 0.8,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      setResult(null);
    }
  };

  const analyzeFood = async () => {
    if (!image) {
      Alert.alert("No Image", "Please select or capture a food image.");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();

      formData.append("file", {
        uri: image,
        name: "food.jpg",
        type: "image/jpeg",
      });

      const response = await api.post("/analyze", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("API Response:", response.data);

      setResult(response.data.data);
    } catch (error) {
      console.log("Food Analysis Error:", error);

      if (error.response) {
        Alert.alert(
          "Server Error",
          error.response.data?.detail ||
            "Food analysis failed."
        );
      } else if (error.request) {
        Alert.alert(
          "Connection Error",
          "Unable to connect to the NutrifyU backend."
        );
      } else {
        Alert.alert(
          "Error",
          "Something went wrong while analyzing the food."
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
    >
      {/* Header */}

      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backText}>‹</Text>
        </TouchableOpacity>

        <Text style={styles.headerTitle}>
          Food Scanner
        </Text>

        <View style={styles.headerSpacer} />
      </View>

      {/* Title */}

      <Text style={styles.title}>
        Analyze Your Food
      </Text>

      <Text style={styles.subtitle}>
        Take a photo or select an existing food image to
        get nutritional information.
      </Text>

      {/* Image */}

      <View style={styles.imageContainer}>
        {image ? (
          <Image
            source={{ uri: image }}
            style={styles.foodImage}
          />
        ) : (
          <View style={styles.imagePlaceholder}>
            <Text style={styles.cameraIcon}>📷</Text>

            <Text style={styles.placeholderText}>
              No food image selected
            </Text>
          </View>
        )}
      </View>

      {/* Image Buttons */}

      <View style={styles.buttonRow}>
        <TouchableOpacity
          style={styles.secondaryButton}
          onPress={takePhoto}
        >
          <Text style={styles.buttonIcon}>📷</Text>
          <Text style={styles.secondaryButtonText}>
            Camera
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.secondaryButton}
          onPress={pickImage}
        >
          <Text style={styles.buttonIcon}>🖼️</Text>
          <Text style={styles.secondaryButtonText}>
            Gallery
          </Text>
        </TouchableOpacity>
      </View>

      {/* Analyze */}

      <TouchableOpacity
        style={[
          styles.analyzeButton,
          (!image || loading) &&
            styles.analyzeButtonDisabled,
        ]}
        onPress={analyzeFood}
        disabled={!image || loading}
      >
        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator color="#FFFFFF" />

            <Text style={styles.analyzeButtonText}>
              Analyzing...
            </Text>
          </View>
        ) : (
          <Text style={styles.analyzeButtonText}>
            Analyze Food
          </Text>
        )}
      </TouchableOpacity>

      {/* Result */}

      {result && (
        <View style={styles.resultCard}>
          <Text style={styles.resultTitle}>
            {result.dish_name}
          </Text>

          <Text style={styles.confidence}>
            Confidence:{" "}
            {Math.round(
              result.confidence_score * 100
            )}
            %
          </Text>

          <View style={styles.nutritionGrid}>
            <NutritionItem
              label="Calories"
              value={
                result.nutrition_per_100g
                  ?.calories_kcal
              }
              unit="kcal"
            />

            <NutritionItem
              label="Protein"
              value={
                result.nutrition_per_100g
                  ?.protein_g
              }
              unit="g"
            />

            <NutritionItem
              label="Carbs"
              value={
                result.nutrition_per_100g
                  ?.carbs_g
              }
              unit="g"
            />

            <NutritionItem
              label="Fat"
              value={
                result.nutrition_per_100g
                  ?.fat_g
              }
              unit="g"
            />

            <NutritionItem
              label="Fiber"
              value={
                result.nutrition_per_100g
                  ?.fiber_g
              }
              unit="g"
            />

            <NutritionItem
              label="Serving"
              value={result.estimated_serving_size_g}
              unit="g"
            />
          </View>

          {/* Ingredients */}

          {result.ingredients?.length > 0 && (
            <View style={styles.resultSection}>
              <Text style={styles.sectionTitle}>
                Ingredients
              </Text>

              {result.ingredients.map(
                (ingredient, index) => (
                  <Text
                    key={index}
                    style={styles.listItem}
                  >
                    • {ingredient}
                  </Text>
                )
              )}
            </View>
          )}

          {/* Allergens */}

          {result.allergens?.length > 0 && (
            <View style={styles.resultSection}>
              <Text style={styles.sectionTitle}>
                Allergens
              </Text>

              {result.allergens.map(
                (allergen, index) => (
                  <Text
                    key={index}
                    style={styles.listItem}
                  >
                    • {allergen}
                  </Text>
                )
              )}
            </View>
          )}

          {/* Health Tips */}

          {result.health_tips?.length > 0 && (
            <View style={styles.resultSection}>
              <Text style={styles.sectionTitle}>
                Health Tips
              </Text>

              {result.health_tips.map(
                (tip, index) => (
                  <Text
                    key={index}
                    style={styles.listItem}
                  >
                    • {tip}
                  </Text>
                )
              )}
            </View>
          )}
        </View>
      )}
    </ScrollView>
  );
}

function NutritionItem({ label, value, unit }) {
  return (
    <View style={styles.nutritionItem}>
      <Text style={styles.nutritionValue}>
        {value ?? "--"}
        {value !== undefined && ` ${unit}`}
      </Text>

      <Text style={styles.nutritionLabel}>
        {label}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7FBF5",
  },

  content: {
    padding: 20,
    paddingBottom: 40,
  },

  header: {
    height: 55,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  backButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: "#E8F5E9",
    alignItems: "center",
    justifyContent: "center",
  },

  backText: {
    fontSize: 32,
    color: "#4CAF50",
    lineHeight: 34,
  },

  headerTitle: {
    fontSize: 19,
    fontWeight: "800",
    color: "#1F2937",
  },

  headerSpacer: {
    width: 42,
  },

  title: {
    fontSize: 27,
    fontWeight: "800",
    color: "#1F2937",
    marginTop: 20,
  },

  subtitle: {
    color: "#6B7280",
    fontSize: 14,
    lineHeight: 21,
    marginTop: 7,
    marginBottom: 20,
  },

  imageContainer: {
    width: "100%",
    height: 260,
    borderRadius: 20,
    overflow: "hidden",
    backgroundColor: "#E8F5E9",
    marginBottom: 15,
  },

  foodImage: {
    width: "100%",
    height: "100%",
  },

  imagePlaceholder: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  cameraIcon: {
    fontSize: 55,
    marginBottom: 10,
  },

  placeholderText: {
    color: "#6B7280",
    fontSize: 14,
  },

  buttonRow: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 15,
  },

  secondaryButton: {
    flex: 1,
    height: 52,
    borderRadius: 13,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#DDE5DC",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },

  buttonIcon: {
    fontSize: 18,
    marginRight: 7,
  },

  secondaryButtonText: {
    color: "#374151",
    fontWeight: "700",
  },

  analyzeButton: {
    height: 55,
    borderRadius: 13,
    backgroundColor: "#4CAF50",
    justifyContent: "center",
    alignItems: "center",
  },

  analyzeButtonDisabled: {
    opacity: 0.5,
  },

  analyzeButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "800",
  },

  loadingContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },

  resultCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 18,
    marginTop: 20,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },

  resultTitle: {
    fontSize: 22,
    fontWeight: "800",
    color: "#1F2937",
  },

  confidence: {
    color: "#4CAF50",
    fontWeight: "600",
    marginTop: 5,
    marginBottom: 18,
  },

  nutritionGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },

  nutritionItem: {
    width: "48%",
    backgroundColor: "#F7FBF5",
    borderRadius: 12,
    padding: 13,
    marginBottom: 10,
  },

  nutritionValue: {
    fontSize: 16,
    fontWeight: "800",
    color: "#2E7D32",
  },

  nutritionLabel: {
    color: "#6B7280",
    fontSize: 12,
    marginTop: 3,
  },

  resultSection: {
    marginTop: 15,
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: "800",
    color: "#1F2937",
    marginBottom: 7,
  },

  listItem: {
    color: "#6B7280",
    fontSize: 13,
    lineHeight: 21,
  },
});
