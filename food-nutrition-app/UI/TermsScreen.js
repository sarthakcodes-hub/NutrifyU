import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

const green = "#39d98a";
const sections = [
  [
    "1. Acceptance of Terms",
    "By creating an account or using NutrifyU, you agree to these Terms of Service and our Privacy Policy.",
  ],
  [
    "2. Our Service",
    "NutrifyU is a nutrition and wellness platform for meal tracking, nutrition information, goals, reports, and related wellness tools.",
  ],
  [
    "3. Your Account",
    "You are responsible for accurate information, protecting your credentials, and notifying us of unauthorized access.",
  ],
  [
    "4. Health Information",
    "NutrifyU provides general nutrition information and is not a substitute for professional medical advice, diagnosis, or treatment.",
  ],
  [
    "5. Acceptable Use",
    "Do not attempt unauthorized access, interfere with security, upload malicious software, or use the service unlawfully.",
  ],
  [
    "6. User Content",
    "You remain responsible for the accuracy and legality of information you submit.",
  ],
  [
    "7. Intellectual Property",
    "The NutrifyU name, branding, interface, software, design, and original content are protected by applicable intellectual property laws.",
  ],
  [
    "8. Disclaimer",
    "NutrifyU is provided on an as-available basis. Nutrition estimates should not be treated as medical advice.",
  ],
  [
    "9. Termination",
    "You may stop using NutrifyU at any time. Access may be suspended or terminated where necessary.",
  ],
  ["10. Contact", "Questions can be sent to support@nutrifyu.com."],
];

export default function TermsScreen({ navigation }) {
  return (
    <ScrollView style={styles.root} contentContainerStyle={styles.container}>
      <View style={styles.top}>
        <Text style={styles.logo}>
          🥬 Nutrify<Text style={{ color: green }}>U</Text>
        </Text>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.link}>← Back</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.hero}>
        Terms of <Text style={{ color: green }}>Service</Text>
      </Text>
      <Text style={styles.muted}>
        Please read these terms carefully before using NutrifyU.
      </Text>
      <Text style={styles.updated}>Last Updated: August 18, 2026</Text>
      <View style={styles.content}>
        {sections.map(([title, text]) => (
          <View style={styles.section} key={title}>
            <Text style={styles.heading}>{title}</Text>
            <Text style={styles.body}>{text}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: "#07110d" },
  container: { paddingBottom: 35 },
  top: {
    height: 70,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderColor: "#183025",
  },
  logo: { fontSize: 20, fontWeight: "700", color: "#edf6f1" },
  link: { color: "#829089" },
  hero: {
    fontSize: 38,
    fontWeight: "700",
    color: "#edf6f1",
    textAlign: "center",
    marginTop: 45,
  },
  muted: {
    color: "#87948d",
    fontSize: 12,
    lineHeight: 20,
    textAlign: "center",
    paddingHorizontal: 20,
  },
  updated: { color: "#718078", fontSize: 11, margin: 25 },
  content: {
    marginHorizontal: 15,
    backgroundColor: "#0d1913",
    borderWidth: 1,
    borderColor: "#183025",
    borderRadius: 18,
    padding: 20,
  },
  section: {
    paddingBottom: 22,
    marginBottom: 22,
    borderBottomWidth: 1,
    borderColor: "#183025",
  },
  heading: { fontSize: 17, fontWeight: "700", color: green, marginBottom: 10 },
  body: { fontSize: 12, color: "#87948d", lineHeight: 21 },
});
