import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Alert,
} from "react-native";

export default function AddFoodScreen({ navigation }) {
  const [foodName, setFoodName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [calories, setCalories] = useState("");
  const [protein, setProtein] = useState("");
  const [carbs, setCarbs] = useState("");
  const [fat, setFat] = useState("");
  const [mealType, setMealType] = useState("Breakfast");

  const handleSaveFood = () => {
    if (!foodName.trim()) {
      Alert.alert("Missing Information", "Please enter the food name.");
      return;
    }

    if (!quantity.trim()) {
      Alert.alert("Missing Information", "Please enter the quantity.");
      return;
    }

    if (!calories.trim()) {
      Alert.alert("Missing Information", "Please enter the calories.");
      return;
    }

    const foodData = {
      foodName: foodName.trim(),
      quantity: quantity.trim(),
      calories: Number(calories),
      protein: Number(protein) || 0,
      carbs: Number(carbs) || 0,
      fat: Number(fat) || 0,
      mealType,
    };

    console.log("Food Data:", foodData);

    Alert.alert(
      "Food Added",
      `${foodName} has been added successfully.`,
      [
        {
          text: "OK",
          onPress: () => navigation.goBack(),
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButton}
          >
            <Text style={styles.backText}>‹</Text>
          </TouchableOpacity>

          <Text style={styles.headerTitle}>Add Food</Text>

          <View style={styles.headerSpacer} />
        </View>

        {/* Intro */}
        <View style={styles.intro}>
          <Text style={styles.title}>Track Your Food</Text>

          <Text style={styles.subtitle}>
            Add nutritional information about your meal.
          </Text>
        </View>

        {/* Food Name */}
        <Text style={styles.label}>Food Name *</Text>

        <TextInput
          style={styles.input}
          placeholder="e.g. Chicken Rice"
          placeholderTextColor="#9CA3AF"
          value={foodName}
          onChangeText={setFoodName}
        />

        {/* Quantity */}
        <Text style={styles.label}>Quantity *</Text>

        <TextInput
          style={styles.input}
          placeholder="e.g. 1 bowl, 200g"
          placeholderTextColor="#9CA3AF"
          value={quantity}
          onChangeText={setQuantity}
        />

        {/* Meal Type */}
        <Text style={styles.label}>Meal Type</Text>

        <View style={styles.mealTypeContainer}>
          {["Breakfast", "Lunch", "Dinner", "Snack"].map((type) => (
            <TouchableOpacity
              key={type}
              style={[
                styles.mealTypeButton,
                mealType === type && styles.mealTypeButtonActive,
              ]}
              onPress={() => setMealType(type)}
            >
              <Text
                style={[
                  styles.mealTypeText,
                  mealType === type && styles.mealTypeTextActive,
                ]}
              >
                {type}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Nutrition */}
        <Text style={styles.sectionTitle}>Nutrition Information</Text>

        <View style={styles.nutritionCard}>
          {/* Calories */}
          <Text style={styles.label}>Calories (kcal) *</Text>

          <TextInput
            style={styles.input}
            placeholder="e.g. 450"
            placeholderTextColor="#9CA3AF"
            keyboardType="numeric"
            value={calories}
            onChangeText={setCalories}
          />

          {/* Protein */}
          <Text style={styles.label}>Protein (g)</Text>

          <TextInput
            style={styles.input}
            placeholder="e.g. 30"
            placeholderTextColor="#9CA3AF"
            keyboardType="numeric"
            value={protein}
            onChangeText={setProtein}
          />

          {/* Carbs */}
          <Text style={styles.label}>Carbohydrates (g)</Text>

          <TextInput
            style={styles.input}
            placeholder="e.g. 50"
            placeholderTextColor="#9CA3AF"
            keyboardType="numeric"
            value={carbs}
            onChangeText={setCarbs}
          />

          {/* Fat */}
          <Text style={styles.label}>Fat (g)</Text>

          <TextInput
            style={styles.input}
            placeholder="e.g. 15"
            placeholderTextColor="#9CA3AF"
            keyboardType="numeric"
            value={fat}
            onChangeText={setFat}
          />
        </View>

        {/* Save */}
        <TouchableOpacity
          style={styles.saveButton}
          onPress={handleSaveFood}
        >
          <Text style={styles.saveButtonText}>Save Food</Text>
        </TouchableOpacity>

        {/* Cancel */}
        <TouchableOpacity
          style={styles.cancelButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.cancelButtonText}>Cancel</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7FBF5",
  },

  content: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },

  header: {
    height: 60,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  backButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: "#E8F5E9",
    justifyContent: "center",
    alignItems: "center",
  },

  backText: {
    fontSize: 32,
    lineHeight: 34,
    color: "#4CAF50",
  },

  headerTitle: {
    fontSize: 19,
    fontWeight: "800",
    color: "#1F2937",
  },

  headerSpacer: {
    width: 42,
  },

  intro: {
    marginTop: 18,
    marginBottom: 25,
  },

  title: {
    fontSize: 27,
    fontWeight: "800",
    color: "#1F2937",
    marginBottom: 6,
  },

  subtitle: {
    fontSize: 14,
    color: "#6B7280",
    lineHeight: 21,
  },

  label: {
    fontSize: 14,
    fontWeight: "700",
    color: "#374151",
    marginBottom: 8,
    marginTop: 6,
  },

  input: {
    height: 52,
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    paddingHorizontal: 15,
    fontSize: 14,
    color: "#1F2937",
    marginBottom: 16,
  },

  mealTypeContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 25,
  },

  mealTypeButton: {
    paddingHorizontal: 16,
    paddingVertical: 11,
    borderRadius: 20,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    marginRight: 8,
    marginBottom: 8,
  },

  mealTypeButtonActive: {
    backgroundColor: "#4CAF50",
    borderColor: "#4CAF50",
  },

  mealTypeText: {
    fontSize: 13,
    fontWeight: "600",
    color: "#6B7280",
  },

  mealTypeTextActive: {
    color: "#FFFFFF",
  },

  sectionTitle: {
    fontSize: 20,
    fontWeight: "800",
    color: "#1F2937",
    marginBottom: 15,
  },

  nutritionCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 16,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    marginBottom: 20,
  },

  saveButton: {
    height: 55,
    borderRadius: 13,
    backgroundColor: "#4CAF50",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 5,
  },

  saveButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "800",
  },

  cancelButton: {
    height: 50,
    borderRadius: 13,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 8,
  },

  cancelButtonText: {
    color: "#6B7280",
    fontSize: 15,
    fontWeight: "700",
  },
});