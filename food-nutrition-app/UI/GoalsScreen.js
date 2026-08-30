import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  ActivityIndicator,
} from "react-native";

import { doc, getDoc, updateDoc } from "firebase/firestore";
import { auth, db } from "../services/firebase";

const green = "#39d98a";

export default function GoalsScreen({ navigation }) {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editing, setEditing] = useState(false);

  const [form, setForm] = useState({
    dailyCalorieGoal: "",
    dailyWaterGoal: "",
    dailyProteinGoal: "",
    dailyCarbsGoal: "",
    dailyFatGoal: "",
  });

  useEffect(() => {
    loadGoals();
  }, []);

  const loadGoals = async () => {
    try {
      const user = auth.currentUser;

      if (!user) {
        Alert.alert("Login Required", "Please login first.");
        navigation.replace("Login");
        return;
      }

      const userRef = doc(db, "users", user.uid);
      const userSnap = await getDoc(userRef);

      if (userSnap.exists()) {
        const data = userSnap.data();

        setForm({
          dailyCalorieGoal:
            data.dailyCalorieGoal?.toString() || "",
          dailyWaterGoal:
            data.dailyWaterGoal?.toString() || "",
          dailyProteinGoal:
            data.dailyProteinGoal?.toString() || "",
          dailyCarbsGoal:
            data.dailyCarbsGoal?.toString() || "",
          dailyFatGoal:
            data.dailyFatGoal?.toString() || "",
        });
      }
    } catch (error) {
      console.log("Goals loading error:", error);

      Alert.alert(
        "Error",
        "Unable to load your goals."
      );
    } finally {
      setLoading(false);
    }
  };

  const update = (key, value) => {
    setForm((previous) => ({
      ...previous,
      [key]: value,
    }));
  };

  const handleSave = async () => {
    try {
      const user = auth.currentUser;

      if (!user) {
        Alert.alert("Error", "User is not logged in.");
        return;
      }

      setSaving(true);

      const userRef = doc(db, "users", user.uid);

      await updateDoc(userRef, {
        dailyCalorieGoal:
          Number(form.dailyCalorieGoal) || 0,

        dailyWaterGoal:
          Number(form.dailyWaterGoal) || 0,

        dailyProteinGoal:
          Number(form.dailyProteinGoal) || 0,

        dailyCarbsGoal:
          Number(form.dailyCarbsGoal) || 0,

        dailyFatGoal:
          Number(form.dailyFatGoal) || 0,
      });

      setEditing(false);

      Alert.alert(
        "NutrifyU",
        "Goals saved successfully."
      );
    } catch (error) {
      console.log("Goals saving error:", error);

      Alert.alert(
        "Error",
        "Unable to save your goals."
      );
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator
          size="large"
          color={green}
        />

        <Text style={styles.loadingText}>
          Loading your goals...
        </Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.root}>
      <View style={styles.container}>

        {/* HEADER */}

        <TouchableOpacity
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.back}>
            ‹ Back
          </Text>
        </TouchableOpacity>

        <Text style={styles.title}>
          My Goals
        </Text>

        <Text style={styles.subtitle}>
          Set your daily nutrition targets and keep
          track of your progress.
        </Text>

        {/* GOALS CARD */}

        <View style={styles.card}>

          <View style={styles.cardHeader}>
            <View>
              <Text style={styles.sectionTitle}>
                Daily Targets
              </Text>

              <Text style={styles.muted}>
                Your personal nutrition goals
              </Text>
            </View>

            {!editing && (
              <TouchableOpacity
                style={styles.editButton}
                onPress={() => setEditing(true)}
              >
                <Text style={styles.editText}>
                  ✎ Edit
                </Text>
              </TouchableOpacity>
            )}
          </View>

          {/* CALORIES */}

          <GoalField
            label="Daily Calories"
            unit="kcal"
            value={form.dailyCalorieGoal}
            editable={editing}
            onChangeText={(value) =>
              update("dailyCalorieGoal", value)
            }
          />

          {/* WATER */}

          <GoalField
            label="Daily Water"
            unit="L"
            value={form.dailyWaterGoal}
            editable={editing}
            onChangeText={(value) =>
              update("dailyWaterGoal", value)
            }
          />

          {/* PROTEIN */}

          <GoalField
            label="Daily Protein"
            unit="g"
            value={form.dailyProteinGoal}
            editable={editing}
            onChangeText={(value) =>
              update("dailyProteinGoal", value)
            }
          />

          {/* CARBS */}

          <GoalField
            label="Daily Carbohydrates"
            unit="g"
            value={form.dailyCarbsGoal}
            editable={editing}
            onChangeText={(value) =>
              update("dailyCarbsGoal", value)
            }
          />

          {/* FAT */}

          <GoalField
            label="Daily Fat"
            unit="g"
            value={form.dailyFatGoal}
            editable={editing}
            onChangeText={(value) =>
              update("dailyFatGoal", value)
            }
          />

          {/* SAVE */}

          {editing && (
            <View style={styles.buttonRow}>

              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => {
                  setEditing(false);
                  loadGoals();
                }}
              >
                <Text style={styles.cancelText}>
                  Cancel
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.saveButton}
                onPress={handleSave}
                disabled={saving}
              >
                {saving ? (
                  <ActivityIndicator color="#06130c" />
                ) : (
                  <Text style={styles.saveText}>
                    Save Changes
                  </Text>
                )}
              </TouchableOpacity>

            </View>
          )}

        </View>

        {/* INFORMATION */}

        <View style={styles.infoCard}>
          <Text style={styles.infoTitle}>
            💡 Why set goals?
          </Text>

          <Text style={styles.infoText}>
            Your goals help NutrifyU compare your
            daily food intake with your personal
            nutrition targets.
          </Text>
        </View>

      </View>
    </ScrollView>
  );
}

function GoalField({
  label,
  unit,
  value,
  editable,
  onChangeText,
}) {
  return (
    <View style={styles.field}>

      <Text style={styles.label}>
        {label}
      </Text>

      <View style={styles.inputWrapper}>

        <TextInput
          value={value}
          editable={editable}
          onChangeText={onChangeText}
          keyboardType="decimal-pad"
          placeholder="Not set"
          placeholderTextColor="#718078"
          style={[
            styles.input,
            !editable && styles.disabled,
          ]}
        />

        <Text style={styles.unit}>
          {unit}
        </Text>

      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#07110d",
  },

  container: {
    padding: 20,
    paddingBottom: 40,
  },

  loading: {
    flex: 1,
    backgroundColor: "#07110d",
    alignItems: "center",
    justifyContent: "center",
  },

  loadingText: {
    color: "#718078",
    marginTop: 10,
  },

  back: {
    color: green,
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 15,
  },

  title: {
    color: "#edf6f1",
    fontSize: 28,
    fontWeight: "700",
  },

  subtitle: {
    color: "#718078",
    fontSize: 13,
    lineHeight: 20,
    marginTop: 6,
    marginBottom: 20,
  },

  card: {
    backgroundColor: "#0d1913",
    borderWidth: 1,
    borderColor: "#183025",
    borderRadius: 17,
    padding: 20,
  },

  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 5,
  },

  sectionTitle: {
    color: "#edf6f1",
    fontSize: 19,
    fontWeight: "700",
  },

  muted: {
    color: "#718078",
    fontSize: 11,
    marginTop: 5,
  },

  editButton: {
    borderWidth: 1,
    borderColor: "#264936",
    borderRadius: 9,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },

  editText: {
    color: green,
    fontSize: 13,
    fontWeight: "600",
  },

  field: {
    marginTop: 18,
  },

  label: {
    color: "#9baaa2",
    fontSize: 12,
    marginBottom: 7,
  },

  inputWrapper: {
    position: "relative",
    justifyContent: "center",
  },

  input: {
    height: 48,
    backgroundColor: "#101e17",
    borderWidth: 1,
    borderColor: "#20382b",
    borderRadius: 9,
    color: "#edf6f1",
    paddingHorizontal: 13,
    paddingRight: 55,
    fontSize: 14,
  },

  disabled: {
    opacity: 0.7,
  },

  unit: {
    position: "absolute",
    right: 14,
    color: green,
    fontSize: 12,
    fontWeight: "600",
  },

  buttonRow: {
    flexDirection: "row",
    gap: 10,
    marginTop: 22,
  },

  cancelButton: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#264936",
    borderRadius: 9,
    padding: 13,
    alignItems: "center",
  },

  cancelText: {
    color: "#9baaa2",
    fontWeight: "600",
  },

  saveButton: {
    flex: 1,
    backgroundColor: green,
    borderRadius: 9,
    padding: 13,
    alignItems: "center",
  },

  saveText: {
    color: "#06130c",
    fontWeight: "700",
  },

  infoCard: {
    backgroundColor: "#0d1913",
    borderWidth: 1,
    borderColor: "#183025",
    borderRadius: 17,
    padding: 18,
    marginTop: 15,
  },

  infoTitle: {
    color: "#edf6f1",
    fontSize: 15,
    fontWeight: "700",
    marginBottom: 8,
  },

  infoText: {
    color: "#718078",
    fontSize: 12,
    lineHeight: 19,
  },
});

