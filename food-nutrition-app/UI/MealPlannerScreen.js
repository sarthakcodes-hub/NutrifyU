import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function MealPlannerScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Meal Planner</Text>
      <Text style={styles.subtitle}>
        Meal planning screen
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F7FBF5",
  },

  title: {
    fontSize: 30,
    fontWeight: "800",
    color: "#1F2937",
  },

  subtitle: {
    marginTop: 8,
    color: "#6B7280",
  },
});