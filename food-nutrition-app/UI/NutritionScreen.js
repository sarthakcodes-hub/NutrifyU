import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";

import { collection, query, where, getDocs } from "firebase/firestore";
import { auth, db } from "../services/firebase";

export default function NutritionScreen({ navigation }) {
  const [meals, setMeals] = useState([]);
  const [totals, setTotals] = useState({
    calories: 0,
    protein: 0,
    carbs: 0,
    fat: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadNutrition();
  }, []);

  const loadNutrition = async () => {
    try {
      const user = auth.currentUser;

      if (!user) {
        return;
      }

      const mealsRef = collection(db, "meals");

      const mealsQuery = query(
        mealsRef,
        where("uid", "==", user.uid)
      );

      const snapshot = await getDocs(mealsQuery);

      const mealList = snapshot.docs.map((mealDoc) => ({
        id: mealDoc.id,
        ...mealDoc.data(),
      }));

      setMeals(mealList);

      const calculatedTotals = mealList.reduce(
        (total, meal) => ({
          calories:
            total.calories + Number(meal.calories || 0),

          protein:
            total.protein + Number(meal.protein || 0),

          carbs:
            total.carbs + Number(meal.carbs || 0),

          fat:
            total.fat + Number(meal.fat || 0),
        }),
        {
          calories: 0,
          protein: 0,
          carbs: 0,
          fat: 0,
        }
      );

      setTotals(calculatedTotals);
    } catch (error) {
      console.log("Nutrition loading error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.root}>
      <View style={styles.container}>

        {/* HEADER */}
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.back}>‹ Back</Text>
          </TouchableOpacity>

          <Text style={styles.title}>
            My Nutrition
          </Text>

          <Text style={styles.subtitle}>
            Track your daily nutrition intake.
          </Text>
        </View>

        {/* TOTALS */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>
            Today's Nutrition
          </Text>

          <View style={styles.statsGrid}>

            <View style={styles.stat}>
              <Text style={styles.icon}>🔥</Text>
              <Text style={styles.value}>
                {totals.calories}
              </Text>
              <Text style={styles.label}>
                Calories
              </Text>
            </View>

            <View style={styles.stat}>
              <Text style={styles.icon}>💪</Text>
              <Text style={styles.value}>
                {totals.protein}g
              </Text>
              <Text style={styles.label}>
                Protein
              </Text>
            </View>

            <View style={styles.stat}>
              <Text style={styles.icon}>🌾</Text>
              <Text style={styles.value}>
                {totals.carbs}g
              </Text>
              <Text style={styles.label}>
                Carbs
              </Text>
            </View>

            <View style={styles.stat}>
              <Text style={styles.icon}>🥑</Text>
              <Text style={styles.value}>
                {totals.fat}g
              </Text>
              <Text style={styles.label}>
                Fat
              </Text>
            </View>

          </View>
        </View>

        {/* MEALS */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>
            Today's Meals
          </Text>

          {loading ? (
            <Text style={styles.empty}>
              Loading...
            </Text>
          ) : meals.length === 0 ? (
            <Text style={styles.empty}>
              No meals added yet.
            </Text>
          ) : (
            meals.map((meal) => (
              <View
                key={meal.id}
                style={styles.meal}
              >
                <View style={{ flex: 1 }}>
                  <Text style={styles.mealType}>
                    {meal.mealType}
                  </Text>

                  <Text style={styles.foodName}>
                    {meal.foodName}
                  </Text>
                </View>

                <View style={styles.nutrition}>
                  <Text style={styles.calories}>
                    {meal.calories || 0} kcal
                  </Text>

                  <Text style={styles.macro}>
                    P {meal.protein || 0}g
                    {"  "}
                    C {meal.carbs || 0}g
                    {"  "}
                    F {meal.fat || 0}g
                  </Text>
                </View>
              </View>
            ))
          )}
        </View>

        {/* ADD MEAL */}
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => navigation.navigate("AddFood")}
        >
          <Text style={styles.addButtonText}>
            + Add Meal
          </Text>
        </TouchableOpacity>

      </View>
    </ScrollView>
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

  header: {
    marginBottom: 20,
  },

  back: {
    color: "#39d98a",
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
    marginTop: 6,
  },

  card: {
    backgroundColor: "#0d1913",
    borderWidth: 1,
    borderColor: "#183025",
    borderRadius: 17,
    padding: 20,
    marginBottom: 15,
  },

  sectionTitle: {
    color: "#edf6f1",
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 18,
  },

  statsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },

  stat: {
    width: "48%",
    backgroundColor: "#101e17",
    borderRadius: 12,
    padding: 15,
    marginBottom: 10,
  },

  icon: {
    fontSize: 22,
    marginBottom: 8,
  },

  value: {
    color: "#39d98a",
    fontSize: 22,
    fontWeight: "700",
  },

  label: {
    color: "#718078",
    fontSize: 12,
    marginTop: 4,
  },

  meal: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#183025",
  },

  mealType: {
    color: "#39d98a",
    fontSize: 12,
    fontWeight: "600",
  },

  foodName: {
    color: "#edf6f1",
    fontSize: 15,
    fontWeight: "600",
    marginTop: 4,
  },

  nutrition: {
    alignItems: "flex-end",
  },

  calories: {
    color: "#edf6f1",
    fontSize: 14,
    fontWeight: "700",
  },

  macro: {
    color: "#718078",
    fontSize: 10,
    marginTop: 5,
  },

  empty: {
    color: "#718078",
    textAlign: "center",
    paddingVertical: 20,
  },

  addButton: {
    backgroundColor: "#39d98a",
    borderRadius: 10,
    padding: 14,
    alignItems: "center",
  },

  addButtonText: {
    color: "#06130c",
    fontWeight: "700",
    fontSize: 15,
  },
});
