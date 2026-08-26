import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";

import { signOut } from "firebase/auth";
import { doc, getDoc, updateDoc } from "firebase/firestore";

import { auth, db } from "../services/firebase";

const green = "#39d98a";

export default function ProfileScreen({ navigation }) {
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    age: "",
    gender: "",
    height: "",
    weight: "",
    diet: "",
    calorieGoal: "",
    waterGoal: "",
  });

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const user = auth.currentUser;

        if (!user) {
          return;
        }

        const userRef = doc(db, "users", user.uid);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
          const data = userSnap.data();

          setForm({
            name: data.name || "",
            email: data.email || user.email || "",

            age: data.age || "",
            gender: data.gender || "",
            height: data.height || "",
            weight: data.weight || "",

            diet: data.diet || "",
            calorieGoal: data.calorieGoal || "",
            waterGoal: data.waterGoal || "",
          });
        } else {
          setForm({
            name: "",
            email: user.email || "",

            age: "",
            gender: "",
            height: "",
            weight: "",

            diet: "",
            calorieGoal: "",
            waterGoal: "",
          });
        }
      } catch (error) {
        console.log("Profile loading error:", error);
        Alert.alert("Error", "Unable to load your profile.");
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, []);

  const update = (key, value) => {
    setForm((form) => ({
      ...form,
      [key]: value,
    }));
  };

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const user = auth.currentUser;

        if (!user) {
          Alert.alert("Error", "No user is currently logged in.");
          navigation.replace("Login");
          return;
        }

        const userRef = doc(db, "users", user.uid);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
          const data = userSnap.data();

          setForm({
            name: data.name || "",
            email: data.email || user.email || "",
            age: data.age || "",
            gender: data.gender || "",
            height: data.height || "",
            weight: data.weight || "",
            diet: data.diet || "",
            calorieGoal: data.calorieGoal || "",
            waterGoal: data.waterGoal || "",
          });
        } else {
          Alert.alert(
            "Profile Not Found",
            "Your user profile could not be found.",
          );
        }
      } catch (error) {
        console.log("Profile loading error:", error);

        Alert.alert("Error", "Unable to load your profile.");
      } finally {
        setLoading(false);
      }
    };
    loadProfile();
  }, []);

  const handleSave = async () => {
    try {
      const user = auth.currentUser;

      if (!user) {
        Alert.alert("Error", "No user is currently logged in.");
        return;
      }

      const userRef = doc(db, "users", user.uid);

      await updateDoc(userRef, {
        age: form.age,
        gender: form.gender,
        height: form.height,
        weight: form.weight,
        diet: form.diet,
        calorieGoal: form.calorieGoal,
        waterGoal: form.waterGoal,
      });

      setEditing(false);

      Alert.alert("NutrifyU", "Profile updated successfully.");
    } catch (error) {
      console.log("Profile update error:", error);

      Alert.alert(
        "Update Failed",
        "Unable to save your profile. Please try again.",
      );
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.log("Logout error:", error);

      Alert.alert("Error", "Unable to logout. Please try again.");
    }
  };

  const profileFields = [
    form.name,
    form.email,
    form.age,
    form.gender,
    form.height,
    form.weight,
    form.diet,
    form.calorieGoal,
    form.waterGoal,
  ];

  const completedFields = profileFields.filter(
    (field) =>
      field !== undefined && field !== null && field.toString().trim() !== "",
  ).length;

  const profileCompletion = Math.round(
    (completedFields / profileFields.length) * 100,
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={green} />
        <Text style={styles.loadingText}>Loading profile...</Text>
      </View>
    );
  }

  const avatarLetter = form.name?.trim()?.charAt(0)?.toUpperCase() || "?";

  return (
    <SafeAreaView style={styles.root}>
      <ScrollView>
        {/* SIDEBAR */}
        <View
          style={[
            styles.sidebar,
            menuOpen ? styles.sidebarOpen : styles.sidebarClosed,
          ]}
        >
          {/* MENU BUTTON */}
          <View style={styles.menuHeader}>
            <TouchableOpacity
              style={styles.menuButton}
              onPress={() => setMenuOpen(!menuOpen)}
            >
              <Text style={styles.menuIcon}>{menuOpen ? "✕" : "☰"}</Text>
            </TouchableOpacity>

            <Text style={styles.headerLogo}>
              🥬 Nutrify
              <Text style={{ color: green }}>U</Text>
            </Text>
          </View>

          {/* MENU CONTENT */}
          {menuOpen && (
            <View style={styles.menuContent}>
              <Text style={styles.logo}>
                🥬 Nutrify
                <Text style={{ color: green }}>U</Text>
              </Text>

              {[
                ["⌂ Dashboard", "Dashboard"],
                ["🥗 My Nutrition", null],
                ["📷 Food Scanner", null],
                ["🍽 Meal Planner", null],
                ["🎯 My Goals", null],
                ["📊 Reports", null],
                ["👤 Profile", "Profile"],
              ].map(([label, route]) => (
                <TouchableOpacity
                  key={label}
                  style={[
                    styles.nav,
                    label.includes("Profile") && styles.activeNav,
                  ]}
                  onPress={() => {
                    if (route) {
                      navigation.navigate(route);
                      setMenuOpen(false);
                    }
                  }}
                >
                  <Text
                    style={[
                      styles.navText,
                      label.includes("Profile") && styles.activeText,
                    ]}
                  >
                    {label}
                  </Text>
                </TouchableOpacity>
              ))}

              {/* LOGOUT */}
              <TouchableOpacity
                style={styles.logoutButton}
                onPress={handleLogout}
              >
                <Text style={styles.logoutText}>↪ Logout</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>

        {/* MAIN CONTENT */}
        <View style={styles.main}>
          {/* PROFILE HEADER */}
          <View style={styles.card}>
            <View style={styles.identity}>
              <View style={styles.avatar}>
                <Text style={styles.avatarText}>{avatarLetter}</Text>
              </View>

              <View style={{ flex: 1 }}>
                <Text style={styles.title}>{form.name || "User"}</Text>

                <Text style={styles.muted}>{form.email}</Text>

                <Text style={styles.member}>NUTRIFYU MEMBER</Text>
              </View>
            </View>

            <TouchableOpacity
              style={styles.button}
              onPress={() => setEditing(true)}
            >
              <Text style={styles.buttonText}>✎ Edit Profile</Text>
            </TouchableOpacity>
          </View>

          {/* PROFILE COMPLETION */}
          <View style={styles.card}>
            <Text style={styles.sectionTitle}>Profile Completion</Text>

            <Text style={styles.goal}>{profileCompletion}%</Text>

            <Text style={styles.muted}>
              Complete your profile for better insights.
            </Text>
          </View>

          {/* PERSONAL INFORMATION */}
          <View style={styles.card}>
            <Text style={styles.sectionTitle}>Personal Information</Text>

            <Text style={styles.muted}>
              Keep your basic information up to date.
            </Text>

            {/* FULL NAME */}
            <View style={styles.field}>
              <Text style={styles.label}>Full Name</Text>

              <TextInput
                value={form.name}
                editable={false}
                style={[styles.input, styles.disabled]}
                placeholder="Your name"
                placeholderTextColor="#718078"
              />
            </View>

            {/* EMAIL */}
            <View style={styles.field}>
              <Text style={styles.label}>Email</Text>

              <TextInput
                value={form.email}
                editable={false}
                style={[styles.input, styles.disabled]}
              />
            </View>

            {/* AGE */}
            <View style={styles.field}>
              <Text style={styles.label}>Age</Text>

              <TextInput
                value={form.age}
                editable={editing}
                onChangeText={(value) => update("age", value)}
                style={[styles.input, !editing && styles.disabled]}
                placeholder="Enter your age"
                placeholderTextColor="#718078"
                keyboardType="numeric"
              />
            </View>

            {/* GENDER */}
            <View style={styles.field}>
              <Text style={styles.label}>Gender</Text>

              <TextInput
                value={form.gender}
                editable={editing}
                onChangeText={(value) => update("gender", value)}
                style={[styles.input, !editing && styles.disabled]}
                placeholder="Enter your gender"
                placeholderTextColor="#718078"
              />
            </View>

            {/* HEIGHT */}
            <View style={styles.field}>
              <Text style={styles.label}>Height (cm)</Text>

              <TextInput
                value={form.height}
                editable={editing}
                onChangeText={(value) => update("height", value)}
                style={[styles.input, !editing && styles.disabled]}
                placeholder="Enter your height"
                placeholderTextColor="#718078"
                keyboardType="numeric"
              />
            </View>

            {/* WEIGHT */}
            <View style={styles.field}>
              <Text style={styles.label}>Weight (kg)</Text>

              <TextInput
                value={form.weight}
                editable={editing}
                onChangeText={(value) => update("weight", value)}
                style={[styles.input, !editing && styles.disabled]}
                placeholder="Enter your weight"
                placeholderTextColor="#718078"
                keyboardType="numeric"
              />
            </View>

            {/* DIET */}
            <View style={styles.field}>
              <Text style={styles.label}>Diet</Text>

              <TextInput
                value={form.diet}
                editable={editing}
                onChangeText={(value) => update("diet", value)}
                style={[styles.input, !editing && styles.disabled]}
                placeholder="e.g. Vegetarian"
                placeholderTextColor="#718078"
              />
            </View>

            {/* CALORIE GOAL */}
            <View style={styles.field}>
              <Text style={styles.label}>Daily Calorie Goal (kcal)</Text>

              <TextInput
                value={form.calorieGoal}
                editable={editing}
                onChangeText={(value) => update("calorieGoal", value)}
                style={[styles.input, !editing && styles.disabled]}
                placeholder="e.g. 2000"
                placeholderTextColor="#718078"
                keyboardType="numeric"
              />
            </View>

            {/* WATER GOAL */}
            <View style={styles.field}>
              <Text style={styles.label}>Daily Water Goal (L)</Text>

              <TextInput
                value={form.waterGoal}
                editable={editing}
                onChangeText={(value) => update("waterGoal", value)}
                style={[styles.input, !editing && styles.disabled]}
                placeholder="e.g. 2.5"
                placeholderTextColor="#718078"
                keyboardType="decimal-pad"
              />
            </View>

            {/* SAVE */}
            {editing && (
              <TouchableOpacity style={styles.save} onPress={handleSave}>
                <Text style={styles.saveText}>Save Changes</Text>
              </TouchableOpacity>
            )}
          </View>

          {/* NUTRITION PREFERENCES */}
          <View style={styles.card}>
            <Text style={styles.sectionTitle}>Nutrition Preferences</Text>

            <Text style={styles.preference}>
              Diet: <Text style={styles.bold}>Not set</Text>
            </Text>

            <Text style={styles.preference}>
              Calories: <Text style={styles.bold}>Not set</Text>
            </Text>

            <Text style={styles.preference}>
              Water: <Text style={styles.bold}>Not set</Text>
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#07110d",
  },

  container: {
    paddingBottom: 30,
  },

  sidebar: {
    backgroundColor: "#08140e",
    padding: 24,
    borderBottomWidth: 1,
    borderColor: "#183025",
  },

  logo: {
    fontSize: 23,
    fontWeight: "700",
    color: "#edf6f1",
    marginBottom: 20,
  },

  nav: {
    padding: 12,
    borderRadius: 10,
    marginBottom: 5,
  },

  activeNav: {
    backgroundColor: "#10251a",
  },

  navText: {
    color: "#829089",
    fontSize: 14,
  },

  activeText: {
    color: green,
  },

  logoutButton: {
    marginTop: 20,
    padding: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#6b2b2b",
  },

  logoutText: {
    color: "#ff6b6b",
    fontSize: 14,
    fontWeight: "600",
  },

  main: {
    padding: 20,
  },

  card: {
    backgroundColor: "#0d1913",
    borderWidth: 1,
    borderColor: "#183025",
    borderRadius: 17,
    padding: 20,
    marginBottom: 15,
  },

  identity: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    marginBottom: 15,
  },

  avatar: {
    width: 70,
    height: 70,
    borderRadius: 18,
    backgroundColor: green,
    alignItems: "center",
    justifyContent: "center",
  },

  avatarText: {
    fontSize: 25,
    fontWeight: "700",
    color: "#06130c",
  },

  title: {
    fontSize: 25,
    fontWeight: "700",
    color: "#edf6f1",
  },

  muted: {
    color: "#718078",
    fontSize: 11,
    lineHeight: 18,
  },

  member: {
    color: green,
    fontSize: 10,
    marginTop: 5,
  },

  button: {
    alignSelf: "flex-start",
    borderWidth: 1,
    borderColor: "#264936",
    borderRadius: 9,
    padding: 11,
  },

  buttonText: {
    color: green,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#edf6f1",
    marginBottom: 6,
  },

  field: {
    marginTop: 14,
  },

  label: {
    fontSize: 11,
    color: "#9baaa2",
    marginBottom: 6,
  },

  input: {
    height: 45,
    borderWidth: 1,
    borderColor: "#20382b",
    borderRadius: 9,
    color: "#fff",
    paddingHorizontal: 12,
    backgroundColor: "#101e17",
  },

  disabled: {
    opacity: 0.7,
  },

  save: {
    marginTop: 18,
    backgroundColor: green,
    borderRadius: 9,
    padding: 13,
    alignItems: "center",
  },

  saveText: {
    color: "#06130c",
    fontWeight: "700",
  },

  goal: {
    fontSize: 50,
    color: green,
    textAlign: "center",
    padding: 20,
  },

  preference: {
    color: "#edf6f1",
    marginTop: 10,
  },

  bold: {
    fontWeight: "700",
  },

  loadingContainer: {
    flex: 1,
    backgroundColor: "#07110d",
    alignItems: "center",
    justifyContent: "center",
  },

  loadingText: {
    color: green,
    fontSize: 16,
  },
  loadingContainer: {
    flex: 1,
    backgroundColor: "#07110d",
    justifyContent: "center",
    alignItems: "center",
  },

  loadingText: {
    color: "#edf6f1",
    marginTop: 12,
    fontSize: 14,
  },
  sidebar: {
    backgroundColor: "#08140e",
    borderBottomWidth: 1,
    borderColor: "#183025",
  },

  sidebarOpen: {
    padding: 20,
  },

  sidebarClosed: {
    padding: 12,
  },

  menuButton: {
    width: 45,
    height: 45,
    borderRadius: 10,
    backgroundColor: "#10251a",
    alignItems: "center",
    justifyContent: "center",
  },

  menuIcon: {
    color: "#39d98a",
    fontSize: 25,
    fontWeight: "700",
  },

  menuContent: {
    marginTop: 20,
  },

  logoutButton: {
    marginTop: 25,
    padding: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#3a2828",
  },

  logoutText: {
    color: "#ff7777",
    fontSize: 14,
    fontWeight: "600",
  },
  menuHeader: {
    flexDirection: "row",
    alignItems: "center",
  },

  headerLogo: {
    marginLeft: 12,
    fontSize: 21,
    fontWeight: "700",
    color: "#edf6f1",
  },
});
