import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";

export default function DashboardScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Good Morning 👋</Text>
            <Text style={styles.userName}>Welcome to NutrifyU</Text>
          </View>

          <TouchableOpacity
            style={styles.profileButton}
            onPress={() => navigation.navigate("Profile")}
          >
            <Text style={styles.profileIcon}>👤</Text>
          </TouchableOpacity>
        </View>

        {/* Daily Progress */}
        <View style={styles.progressCard}>
          <Text style={styles.cardTitle}>Today's Progress</Text>

          <View style={styles.progressRow}>
            <View style={styles.progressItem}>
              <Text style={styles.progressValue}>1,250</Text>
              <Text style={styles.progressLabel}>Calories</Text>
              <Text style={styles.progressTarget}>/ 2,000 kcal</Text>
            </View>

            <View style={styles.divider} />

            <View style={styles.progressItem}>
              <Text style={styles.progressValue}>65g</Text>
              <Text style={styles.progressLabel}>Protein</Text>
              <Text style={styles.progressTarget}>/ 120g</Text>
            </View>

            <View style={styles.divider} />

            <View style={styles.progressItem}>
              <Text style={styles.progressValue}>4</Text>
              <Text style={styles.progressLabel}>Water</Text>
              <Text style={styles.progressTarget}>/ 8 glasses</Text>
            </View>
          </View>
        </View>

        {/* Quick Actions */}
        <Text style={styles.sectionTitle}>Quick Actions</Text>

        <View style={styles.actionGrid}>
          <TouchableOpacity
            style={styles.actionCard}
            onPress={() => navigation.navigate("AddFood")}
          >
            <Text style={styles.actionIcon}>🍎</Text>
            <Text style={styles.actionTitle}>Add Food</Text>
            <Text style={styles.actionDescription}>
              Track your meal
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionCard}
            onPress={() => navigation.navigate("FoodScanner")}
          >
            <Text style={styles.actionIcon}>📷</Text>
            <Text style={styles.actionTitle}>Scan Food</Text>
            <Text style={styles.actionDescription}>
              Identify food
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionCard}
            onPress={() => navigation.navigate("MealPlanner")}
          >
            <Text style={styles.actionIcon}>🍽️</Text>
            <Text style={styles.actionTitle}>Meal Plan</Text>
            <Text style={styles.actionDescription}>
              Plan your meals
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionCard}
            onPress={() => navigation.navigate("Goals")}
          >
            <Text style={styles.actionIcon}>🎯</Text>
            <Text style={styles.actionTitle}>My Goals</Text>
            <Text style={styles.actionDescription}>
              Track your goals
            </Text>
          </TouchableOpacity>
        </View>

        {/* Today's Meals */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Today's Meals</Text>

          <TouchableOpacity
            onPress={() => navigation.navigate("AddFood")}
          >
            <Text style={styles.viewAll}>Add</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.mealCard}>
          <View style={styles.mealIconContainer}>
            <Text style={styles.mealIcon}>🥣</Text>
          </View>

          <View style={styles.mealInfo}>
            <Text style={styles.mealName}>Breakfast</Text>
            <Text style={styles.mealDetails}>
              Oatmeal • Banana • Milk
            </Text>
          </View>

          <Text style={styles.mealCalories}>350 kcal</Text>
        </View>

        <View style={styles.mealCard}>
          <View style={styles.mealIconContainer}>
            <Text style={styles.mealIcon}>🥗</Text>
          </View>

          <View style={styles.mealInfo}>
            <Text style={styles.mealName}>Lunch</Text>
            <Text style={styles.mealDetails}>
              Rice • Chicken • Vegetables
            </Text>
          </View>

          <Text style={styles.mealCalories}>520 kcal</Text>
        </View>

        {/* Progress Button */}
        <TouchableOpacity
          style={styles.progressButton}
          onPress={() => navigation.navigate("Progress")}
        >
          <View>
            <Text style={styles.progressButtonTitle}>
              View Your Progress
            </Text>
            <Text style={styles.progressButtonSubtitle}>
              Check your nutrition journey
            </Text>
          </View>

          <Text style={styles.arrow}>›</Text>
        </TouchableOpacity>

      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem}>
          <Text style={styles.navIcon}>🏠</Text>
          <Text style={styles.activeNavText}>Home</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navItem}
          onPress={() => navigation.navigate("Progress")}
        >
          <Text style={styles.navIcon}>📊</Text>
          <Text style={styles.navText}>Progress</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navItem}
          onPress={() => navigation.navigate("Goals")}
        >
          <Text style={styles.navIcon}>🎯</Text>
          <Text style={styles.navText}>Goals</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navItem}
          onPress={() => navigation.navigate("Profile")}
        >
          <Text style={styles.navIcon}>👤</Text>
          <Text style={styles.navText}>Profile</Text>
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

  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 15,
    paddingBottom: 100,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 22,
  },

  greeting: {
    fontSize: 15,
    color: "#6B7280",
    marginBottom: 4,
  },

  userName: {
    fontSize: 22,
    fontWeight: "800",
    color: "#1F2937",
  },

  profileButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#E8F5E9",
    justifyContent: "center",
    alignItems: "center",
  },

  profileIcon: {
    fontSize: 22,
  },

  progressCard: {
    backgroundColor: "#4CAF50",
    borderRadius: 20,
    padding: 20,
    marginBottom: 28,
  },

  cardTitle: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 20,
  },

  progressRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  progressItem: {
    flex: 1,
    alignItems: "center",
  },

  progressValue: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "800",
    marginBottom: 4,
  },

  progressLabel: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "600",
  },

  progressTarget: {
    color: "#DFF3E1",
    fontSize: 10,
    marginTop: 2,
  },

  divider: {
    width: 1,
    height: 45,
    backgroundColor: "#FFFFFF",
    opacity: 0.3,
  },

  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  sectionTitle: {
    fontSize: 20,
    fontWeight: "800",
    color: "#1F2937",
    marginBottom: 15,
  },

  viewAll: {
    color: "#4CAF50",
    fontSize: 14,
    fontWeight: "700",
    marginBottom: 15,
  },

  actionGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 25,
  },

  actionCard: {
    width: "48%",
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },

  actionIcon: {
    fontSize: 28,
    marginBottom: 12,
  },

  actionTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: "#1F2937",
    marginBottom: 4,
  },

  actionDescription: {
    fontSize: 12,
    color: "#6B7280",
  },

  mealCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 15,
    padding: 13,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },

  mealIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: "#F1F8E9",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },

  mealIcon: {
    fontSize: 24,
  },

  mealInfo: {
    flex: 1,
  },

  mealName: {
    fontSize: 15,
    fontWeight: "700",
    color: "#1F2937",
    marginBottom: 3,
  },

  mealDetails: {
    fontSize: 11,
    color: "#6B7280",
  },

  mealCalories: {
    fontSize: 12,
    fontWeight: "700",
    color: "#4CAF50",
  },

  progressButton: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#E8F5E9",
    borderRadius: 16,
    padding: 18,
    marginTop: 10,
  },

  progressButtonTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: "#2E7D32",
    marginBottom: 4,
  },

  progressButtonSubtitle: {
    fontSize: 12,
    color: "#6B7280",
  },

  arrow: {
    fontSize: 30,
    color: "#4CAF50",
  },

  bottomNav: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 75,
    backgroundColor: "#FFFFFF",
    borderTopWidth: 1,
    borderTopColor: "#E5E7EB",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },

  navItem: {
    alignItems: "center",
    justifyContent: "center",
    width: "25%",
  },

  navIcon: {
    fontSize: 19,
    marginBottom: 4,
  },

  navText: {
    fontSize: 11,
    color: "#6B7280",
  },

  activeNavText: {
    fontSize: 11,
    color: "#4CAF50",
    fontWeight: "700",
  },
});