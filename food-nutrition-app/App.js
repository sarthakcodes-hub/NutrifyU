import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { SafeAreaView } from "react-native-safe-area-context";

import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./services/firebase";

import LoginScreen from "./UI/LoginScreen";
import RegisterScreen from "./UI/RegisterScreen";
import DashboardScreen from "./UI/DashboardScreen";
import ProfileScreen from "./UI/ProfileScreen";
import PrivacyScreen from "./UI/PrivacyScreen";
import TermsScreen from "./UI/TermsScreen";
import AdminDashboardScreen from "./UI/AdminDashboardScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  if (loading) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        {user ? (
          <Stack.Navigator
            initialRouteName="Dashboard"
            screenOptions={{ headerShown: false }}
          >
            <Stack.Screen name="Dashboard" component={DashboardScreen} />

            <Stack.Screen name="Profile" component={ProfileScreen} />

            <Stack.Screen name="Privacy" component={PrivacyScreen} />

            <Stack.Screen name="Terms" component={TermsScreen} />

            <Stack.Screen
              name="AdminDashboard"
              component={AdminDashboardScreen}
            />
          </Stack.Navigator>
        ) : (
          <Stack.Navigator
            initialRouteName="Login"
            screenOptions={{ headerShown: false }}
          >
            <Stack.Screen name="Login" component={LoginScreen} />

            <Stack.Screen name="Register" component={RegisterScreen} />
          </Stack.Navigator>
        )}
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
