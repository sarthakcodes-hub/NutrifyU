import React, { useState } from "react";

import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
} from "react-native";

import { auth, db } from "../services/firebase";

import {
  collection,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";

export default function AddFoodScreen({ navigation }) {
  const [mealType, setMealType] = useState("Breakfast");

  const [foodName, setFoodName] = useState("");
  const [calories, setCalories] = useState("");
  const [protein, setProtein] = useState("");
  const [carbs, setCarbs] = useState("");
  const [fat, setFat] = useState("");

  const [saving, setSaving] = useState(false);

  const handleAddMeal = async () => {
    try {
      const user = auth.currentUser;

      if (!user) {
        Alert.alert(
          "Login Required",
          "Please login before adding a meal."
        );
        return;
      }

      if (!foodName.trim()) {
        Alert.alert(
          "Missing Food",
          "Please enter the food name."
        );
        return;
      }

      if (!calories.trim()) {
        Alert.alert(
          "Missing Calories",
          "Please enter the calories."
        );
        return;
      }

      setSaving(true);

      await addDoc(collection(db, "meals"), {
        uid: user.uid,

        mealType: mealType,

        foodName: foodName.trim(),

        calories: Number(calories) || 0,
        protein: Number(protein) || 0,
        carbs: Number(carbs) || 0,
        fat: Number(fat) || 0,

        createdAt: serverTimestamp(),
      });

      Alert.alert(
        "Success",
        "Meal added successfully!",
        [
          {
            text: "OK",
            onPress: () => navigation.goBack(),
          },
        ]
      );
    } catch (error) {
      console.log("Add meal error:", error);

      Alert.alert(
        "Error",
        "Unable to add meal. Please try again."
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >

        {/* HEADER */}

        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Text style={styles.backText}>‹ Back</Text>
        </TouchableOpacity>

        <Text style={styles.title}>
          Add Meal
        </Text>

        <Text style={styles.subtitle}>
          Add your meal details to track your nutrition.
        </Text>


        {/* MEAL TYPE */}

        <Text style={styles.label}>
          Meal Type
        </Text>

        <View style={styles.mealTypes}>

          {["Breakfast", "Lunch", "Dinner", "Snack"].map(
            (type) => (
              <TouchableOpacity
                key={type}
                style={[
                  styles.mealTypeButton,
                  mealType === type &&
                    styles.selectedMealType,
                ]}
                onPress={() => setMealType(type)}
              >
                <Text
                  style={[
                    styles.mealTypeText,
                    mealType === type &&
                      styles.selectedMealTypeText,
                  ]}
                >
                  {type}
                </Text>
              </TouchableOpacity>
            )
          )}

        </View>


        {/* FOOD NAME */}

        <Text style={styles.label}>
          Food Name
        </Text>

        <TextInput
          style={styles.input}
          placeholder="e.g. Chicken Rice"
          placeholderTextColor="#9CA3AF"
          value={foodName}
          onChangeText={setFoodName}
        />


        {/* CALORIES */}

        <Text style={styles.label}>
          Calories (kcal)
        </Text>

        <TextInput
          style={styles.input}
          placeholder="e.g. 450"
          placeholderTextColor="#9CA3AF"
          keyboardType="numeric"
          value={calories}
          onChangeText={setCalories}
        />


        {/* PROTEIN */}

        <Text style={styles.label}>
          Protein (g)
        </Text>

        <TextInput
          style={styles.input}
          placeholder="e.g. 25"
          placeholderTextColor="#9CA3AF"
          keyboardType="numeric"
          value={protein}
          onChangeText={setProtein}
        />


        {/* CARBS */}

        <Text style={styles.label}>
          Carbs (g)
        </Text>

        <TextInput
          style={styles.input}
          placeholder="e.g. 50"
          placeholderTextColor="#9CA3AF"
          keyboardType="numeric"
          value={carbs}
          onChangeText={setCarbs}
        />


        {/* FAT */}

        <Text style={styles.label}>
          Fat (g)
        </Text>

        <TextInput
          style={styles.input}
          placeholder="e.g. 12"
          placeholderTextColor="#9CA3AF"
          keyboardType="numeric"
          value={fat}
          onChangeText={setFat}
        />


        {/* SAVE */}

        <TouchableOpacity
          style={[
            styles.saveButton,
            saving && styles.disabledButton,
          ]}
          onPress={handleAddMeal}
          disabled={saving}
        >
          <Text style={styles.saveText}>
            {saving ? "Saving..." : "Add Meal"}
          </Text>
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
    padding: 20,
    paddingBottom: 40,
  },

  backButton: {
    marginBottom: 20,
  },

  backText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#4CAF50",
  },

  title: {
    fontSize: 30,
    fontWeight: "800",
    color: "#1F2937",
    marginBottom: 8,
  },

  subtitle: {
    fontSize: 14,
    color: "#6B7280",
    lineHeight: 21,
    marginBottom: 25,
  },

  label: {
    fontSize: 13,
    fontWeight: "700",
    color: "#374151",
    marginBottom: 8,
    marginTop: 12,
  },

  mealTypes: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 10,
  },

  mealTypeButton: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#D1D5DB",
    backgroundColor: "#FFFFFF",
  },

  selectedMealType: {
    backgroundColor: "#4CAF50",
    borderColor: "#4CAF50",
  },

  mealTypeText: {
    color: "#374151",
    fontSize: 13,
    fontWeight: "600",
  },

  selectedMealTypeText: {
    color: "#FFFFFF",
  },

  input: {
    height: 52,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 11,
    paddingHorizontal: 15,
    fontSize: 15,
    color: "#1F2937",
  },

  saveButton: {
    height: 55,
    backgroundColor: "#4CAF50",
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 25,
  },

  disabledButton: {
    opacity: 0.6,
  },

  saveText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
  },

});