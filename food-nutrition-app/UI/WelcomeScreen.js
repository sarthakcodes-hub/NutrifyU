import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

export default function WelcomeScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>

        <Text style={styles.logo}>NutrifyU</Text>

        <Text style={styles.title}>
          Eat Better.
        </Text>

        <Text style={styles.subtitle}>
          Live Better.
        </Text>

        <Text style={styles.description}>
          Track your nutrition, manage your meals,
          and achieve your health goals with NutrifyU.
        </Text>

        <TouchableOpacity
          style={styles.primaryButton}
          onPress={() => navigation.navigate("Login")}
        >
          <Text style={styles.primaryButtonText}>
            Get Started
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.secondaryButton}
          onPress={() => navigation.navigate("Login")}
        >
          <Text style={styles.secondaryButtonText}>
            I already have an account
          </Text>
        </TouchableOpacity>

      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7FBF5",
  },

  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 30,
  },

  logo: {
    fontSize: 38,
    fontWeight: "800",
    color: "#4CAF50",
    marginBottom: 50,
  },

  title: {
    fontSize: 36,
    fontWeight: "800",
    color: "#1F2937",
  },

  subtitle: {
    fontSize: 36,
    fontWeight: "800",
    color: "#4CAF50",
    marginBottom: 20,
  },

  description: {
    fontSize: 16,
    lineHeight: 24,
    textAlign: "center",
    color: "#6B7280",
    marginBottom: 45,
  },

  primaryButton: {
    width: "100%",
    backgroundColor: "#4CAF50",
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: "center",
    marginBottom: 15,
  },

  primaryButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
  },

  secondaryButton: {
    paddingVertical: 12,
  },

  secondaryButtonText: {
    color: "#4CAF50",
    fontSize: 15,
    fontWeight: "600",
  },
});
