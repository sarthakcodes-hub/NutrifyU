import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { auth, db } from "../services/firebase";

import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";

export default function RegisterScreen({ navigation }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleRegister = async () => {
    console.log("CREATE ACCOUNT BUTTON PRESSED");
    if (!name.trim() || !email.trim() || !password || !confirmPassword) {
      Alert.alert("Missing Information", "Please fill in all fields.");
      return;
    }
  
    if (password !== confirmPassword) {
      Alert.alert("Password Error", "Passwords do not match.");
      return;
    }
  
    if (password.length < 6) {
      Alert.alert(
        "Password Error",
        "Password must contain at least 6 characters."
      );
      return;
    }
  
    try {
      // 1. Create Firebase Authentication account
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email.trim(),
        password
      );
  
      const user = userCredential.user;
  
      // 2. Create user's Firestore document
      await setDoc(doc(db, "users", user.uid), {
        name: name.trim(),
        email: user.email,
  
        // Additional profile information
        age: "",
        gender: "",
        height: "",
        weight: "",
        diet: "",
        calorieGoal: "",
        waterGoal: "",
  
        createdAt: serverTimestamp(),
      });
  
      Alert.alert(
        "Account Created",
        "Your NutrifyU account has been created successfully.",
        [
          {
            text: "Continue",
            onPress: () => navigation.replace("Dashboard"),
          },
        ]
      );
    } catch (error) {
      console.log("Registration error:", error);
  
      if (error.code === "auth/email-already-in-use") {
        Alert.alert(
          "Account Exists",
          "An account already exists with this email."
        );
      } else if (error.code === "auth/invalid-email") {
        Alert.alert(
          "Invalid Email",
          "Please enter a valid email address."
        );
      } else if (error.code === "auth/weak-password") {
        Alert.alert(
          "Weak Password",
          "Please use a stronger password."
        );
      } else {
        Alert.alert(
          "Registration Failed",
          error.message
        );
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.content}
          keyboardShouldPersistTaps="handled"
        >
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButton}
          >
            <Text style={styles.backText}>‹ Back</Text>
          </TouchableOpacity>

          <Text style={styles.logo}>NutrifyU</Text>

          <Text style={styles.title}>Create Account</Text>

          <Text style={styles.subtitle}>
            Start your journey toward better nutrition.
          </Text>

          <TextInput
            style={styles.input}
            placeholder="Full Name"
            placeholderTextColor="#9CA3AF"
            value={name}
            onChangeText={setName}
          />

          <TextInput
            style={styles.input}
            placeholder="Email Address"
            placeholderTextColor="#9CA3AF"
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
          />

          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="#9CA3AF"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />

          <TextInput
            style={styles.input}
            placeholder="Confirm Password"
            placeholderTextColor="#9CA3AF"
            secureTextEntry
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />

          <TouchableOpacity
            style={styles.button}
            onPress={handleRegister}
          >
            <Text style={styles.buttonText}>Create Account</Text>
          </TouchableOpacity>

          <View style={styles.loginRow}>
            <Text style={styles.loginText}>
              Already have an account?
            </Text>

            <TouchableOpacity
              onPress={() => navigation.navigate("Login")}
            >
              <Text style={styles.loginLink}> Login</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7FBF5",
  },

  content: {
    flexGrow: 1,
    paddingHorizontal: 25,
    paddingTop: 15,
    paddingBottom: 30,
    justifyContent: "center",
  },

  backButton: {
    alignSelf: "flex-start",
    marginBottom: 25,
  },

  backText: {
    fontSize: 16,
    color: "#4CAF50",
    fontWeight: "600",
  },

  logo: {
    fontSize: 30,
    fontWeight: "800",
    color: "#4CAF50",
    marginBottom: 25,
  },

  title: {
    fontSize: 30,
    fontWeight: "800",
    color: "#1F2937",
    marginBottom: 8,
  },

  subtitle: {
    fontSize: 15,
    lineHeight: 22,
    color: "#6B7280",
    marginBottom: 30,
  },

  input: {
    height: 55,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 12,
    paddingHorizontal: 16,
    fontSize: 15,
    color: "#1F2937",
    marginBottom: 15,
  },

  button: {
    height: 55,
    backgroundColor: "#4CAF50",
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },

  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
  },

  loginRow: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 25,
  },

  loginText: {
    color: "#6B7280",
    fontSize: 14,
  },

  loginLink: {
    color: "#4CAF50",
    fontSize: 14,
    fontWeight: "700",
  },
});