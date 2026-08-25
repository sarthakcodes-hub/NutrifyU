// import React, { useState } from 'react';
// import {
//   View,
//   Text,
//   Button,
//   Image,
//   StyleSheet,
//   ActivityIndicator,
//   ScrollView,
//   Alert,
//   SafeAreaView
// } from 'react-native';
// import * as ImagePicker from 'expo-image-picker';
// import axios from 'axios';

// // IMPORTANT: Change this to your computer's IP address
// // To find your IP: Open Command Prompt and type 'ipconfig'
// // Look for "IPv4 Address" under your active network connection
// const API_URL = 'http://192.168.68.109:8000/analyze';

// export default function App() {
//   const [image, setImage] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [nutritionData, setNutritionData] = useState(null);

//   const pickImage = async () => {
//     try {
//       // Request permissions
//       const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
//       if (status !== 'granted') {
//         Alert.alert('Permission denied', 'We need camera roll permissions to analyze food.');
//         return;
//       }

//       const result = await ImagePicker.launchImageLibraryAsync({
//         mediaTypes: ImagePicker.MediaTypeOptions.Images,
//         allowsEditing: true,
//         quality: 0.7,
//       });

//       if (!result.canceled && result.assets && result.assets.length > 0) {
//         const selectedImage = result.assets[0];
//         setImage(selectedImage.uri);
//         await analyzeImage(selectedImage.uri);
//       }
//     } catch (error) {
//       console.error('Pick Image Error:', error);
//       Alert.alert('Error', 'Failed to pick image: ' + error.message);
//     }
//   };

//   const takePhoto = async () => {
//     try {
//       const { status } = await ImagePicker.requestCameraPermissionsAsync();
//       if (status !== 'granted') {
//         Alert.alert('Permission denied', 'We need camera permissions to analyze food.');
//         return;
//       }

//       const result = await ImagePicker.launchCameraAsync({
//         allowsEditing: true,
//         quality: 0.7,
//       });

//       if (!result.canceled && result.assets && result.assets.length > 0) {
//         const photo = result.assets[0];
//         setImage(photo.uri);
//         await analyzeImage(photo.uri);
//       }
//     } catch (error) {
//       console.error('Camera Error:', error);
//       Alert.alert('Error', 'Failed to take photo: ' + error.message);
//     }
//   };

//   const analyzeImage = async (uri) => {
//     setLoading(true);
//     setNutritionData(null);

//     try {
//       // Create form data
//       const formData = new FormData();
//       formData.append('file', {
//         uri: uri,
//         type: 'image/jpeg',
//         name: 'food_photo.jpg',
//       });

//       console.log('📤 Sending request to:', API_URL);

//       const response = await axios.post(API_URL, formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//         timeout: 30000, // 30 seconds timeout
//       });

//       console.log('📥 Response received:', response.data);

//       if (response.data && response.data.data) {
//         setNutritionData(response.data.data);
//         Alert.alert('✅ Success', 'Food analyzed successfully!');
//       } else {
//         Alert.alert('Error', 'Invalid response from server');
//       }
//     } catch (error) {
//       console.error('❌ Analysis Error:', error);

//       let errorMessage = 'Failed to analyze the food. Please try again.';
//       if (error.response) {
//         // Server responded with error
//         errorMessage = error.response.data?.detail || errorMessage;
//         console.log('Server error:', error.response.data);
//       } else if (error.request) {
//         // No response from server
//         errorMessage = 'Cannot connect to server. Make sure:\n1. Backend is running\n2. Phone and computer on same WiFi\n3. IP address is correct';
//         console.log('No response from server');
//       } else {
//         errorMessage = error.message;
//       }

//       Alert.alert('❌ Error', errorMessage);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const resetAnalysis = () => {
//     setImage(null);
//     setNutritionData(null);
//     setLoading(false);
//   };

//   return (
//     <SafeAreaView style={styles.container}>
//       <ScrollView contentContainerStyle={styles.scrollContainer}>
//         <Text style={styles.title}>🍽️ Food Nutrition Detector</Text>
//         <Text style={styles.subtitle}>Snap. Analyze. Eat Healthy.</Text>

//         {!nutritionData && !loading && (
//           <View style={styles.buttonContainer}>
//             <View style={styles.buttonWrapper}>
//               <Button title="📷 Take Photo" onPress={takePhoto} color="#4CAF50" />
//             </View>
//             <View style={styles.buttonWrapper}>
//               <Button title="🖼️ Gallery" onPress={pickImage} color="#2196F3" />
//             </View>
//           </View>
//         )}

//         {(loading || nutritionData) && (
//           <View style={styles.buttonContainer}>
//             <View style={styles.buttonWrapper}>
//               <Button title="🔄 New Analysis" onPress={resetAnalysis} color="#FF6B6B" />
//             </View>
//           </View>
//         )}

//         {image && !loading && !nutritionData && (
//           <Image source={{ uri: image }} style={styles.image} />
//         )}

//         {loading && (
//           <View style={styles.loadingContainer}>
//             <ActivityIndicator size="large" color="#4CAF50" />
//             <Text style={styles.loadingText}>🧠 Analyzing your food...</Text>
//             <Text style={styles.loadingSubText}>This may take a few seconds</Text>
//           </View>
//         )}

//         {nutritionData && (
//           <View style={styles.resultCard}>
//             {/* Dish Name */}
//             <Text style={styles.dishName}>{nutritionData.dish_name || 'Unknown Dish'}</Text>
//             {nutritionData.confidence_score && (
//               <Text style={styles.confidence}>
//                 Confidence: {(nutritionData.confidence_score * 100).toFixed(1)}%
//               </Text>
//             )}

//             {/* Nutrition Grid */}
//             {nutritionData.nutrition_per_100g && (
//               <View style={styles.nutritionGrid}>
//                 <View style={styles.nutritionItem}>
//                   <Text style={styles.nutritionValue}>
//                     {nutritionData.nutrition_per_100g.calories_kcal || 0}
//                   </Text>
//                   <Text style={styles.nutritionLabel}>Calories</Text>
//                 </View>
//                 <View style={styles.nutritionItem}>
//                   <Text style={styles.nutritionValue}>
//                     {nutritionData.nutrition_per_100g.protein_g || 0}g
//                   </Text>
//                   <Text style={styles.nutritionLabel}>Protein</Text>
//                 </View>
//                 <View style={styles.nutritionItem}>
//                   <Text style={styles.nutritionValue}>
//                     {nutritionData.nutrition_per_100g.carbs_g || 0}g
//                   </Text>
//                   <Text style={styles.nutritionLabel}>Carbs</Text>
//                 </View>
//                 <View style={styles.nutritionItem}>
//                   <Text style={styles.nutritionValue}>
//                     {nutritionData.nutrition_per_100g.fat_g || 0}g
//                   </Text>
//                   <Text style={styles.nutritionLabel}>Fat</Text>
//                 </View>
//               </View>
//             )}

//             {/* Fiber (if available) */}
//             {nutritionData.nutrition_per_100g?.fiber_g && (
//               <View style={styles.fiberContainer}>
//                 <Text style={styles.fiberText}>
//                   🌾 Fiber: {nutritionData.nutrition_per_100g.fiber_g}g per 100g
//                 </Text>
//               </View>
//             )}

//             {/* Serving Size */}
//             {nutritionData.estimated_serving_size_g && (
//               <Text style={styles.sectionTitle}>
//                 🥗 Estimated Serving: {nutritionData.estimated_serving_size_g}g
//               </Text>
//             )}

//             {/* Ingredients */}
//             {nutritionData.ingredients && nutritionData.ingredients.length > 0 && (
//               <>
//                 <Text style={styles.sectionTitle}>🧾 Ingredients:</Text>
//                 <View style={styles.tagsContainer}>
//                   {nutritionData.ingredients.map((ingredient, index) => (
//                     <View key={index} style={styles.tag}>
//                       <Text style={styles.tagText}>{ingredient}</Text>
//                     </View>
//                   ))}
//                 </View>
//               </>
//             )}

//             {/* Allergens */}
//             {nutritionData.allergens && nutritionData.allergens.length > 0 && (
//               <>
//                 <Text style={styles.sectionTitle}>⚠️ Allergens:</Text>
//                 <View style={styles.tagsContainer}>
//                   {nutritionData.allergens.map((allergen, index) => (
//                     <View key={index} style={[styles.tag, styles.allergenTag]}>
//                       <Text style={styles.tagText}>🚫 {allergen}</Text>
//                     </View>
//                   ))}
//                 </View>
//               </>
//             )}

//             {/* Health Tips */}
//             {nutritionData.health_tips && nutritionData.health_tips.length > 0 && (
//               <>
//                 <Text style={styles.sectionTitle}>💡 Health Tips:</Text>
//                 {nutritionData.health_tips.map((tip, index) => (
//                   <Text key={index} style={styles.tipText}>• {tip}</Text>
//                 ))}
//               </>
//             )}
//           </View>
//         )}
//       </ScrollView>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#f5f5f5',
//   },
//   scrollContainer: {
//     flexGrow: 1,
//     alignItems: 'center',
//     paddingVertical: 30,
//     paddingHorizontal: 20,
//   },
//   title: {
//     fontSize: 32,
//     fontWeight: 'bold',
//     color: '#2E7D32',
//     marginBottom: 5,
//   },
//   subtitle: {
//     fontSize: 16,
//     color: '#666',
//     marginBottom: 25,
//   },
//   buttonContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-around',
//     width: '100%',
//     marginBottom: 20,
//   },
//   buttonWrapper: {
//     flex: 1,
//     marginHorizontal: 5,
//   },
//   image: {
//     width: 280,
//     height: 280,
//     borderRadius: 15,
//     marginVertical: 15,
//     borderWidth: 2,
//     borderColor: '#4CAF50',
//   },
//   loadingContainer: {
//     marginVertical: 30,
//     alignItems: 'center',
//   },
//   loadingText: {
//     marginTop: 15,
//     fontSize: 18,
//     fontWeight: '600',
//     color: '#2E7D32',
//   },
//   loadingSubText: {
//     fontSize: 14,
//     color: '#666',
//     marginTop: 5,
//   },
//   resultCard: {
//     backgroundColor: 'white',
//     padding: 20,
//     borderRadius: 20,
//     width: '100%',
//     marginTop: 10,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 3 },
//     shadowOpacity: 0.1,
//     shadowRadius: 6,
//     elevation: 5,
//   },
//   dishName: {
//     fontSize: 26,
//     fontWeight: 'bold',
//     textAlign: 'center',
//     color: '#1a1a1a',
//     marginBottom: 5,
//   },
//   confidence: {
//     textAlign: 'center',
//     color: '#888',
//     fontSize: 14,
//     marginBottom: 15,
//   },
//   nutritionGrid: {
//     flexDirection: 'row',
//     justifyContent: 'space-around',
//     marginVertical: 15,
//     paddingVertical: 15,
//     borderTopWidth: 1,
//     borderBottomWidth: 1,
//     borderColor: '#e0e0e0',
//   },
//   nutritionItem: {
//     alignItems: 'center',
//   },
//   nutritionValue: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     color: '#2E7D32',
//   },
//   nutritionLabel: {
//     fontSize: 14,
//     color: '#666',
//     marginTop: 2,
//   },
//   fiberContainer: {
//     backgroundColor: '#E8F5E9',
//     padding: 10,
//     borderRadius: 10,
//     marginVertical: 10,
//     alignItems: 'center',
//   },
//   fiberText: {
//     fontSize: 16,
//     color: '#2E7D32',
//     fontWeight: '500',
//   },
//   sectionTitle: {
//     fontSize: 18,
//     fontWeight: '600',
//     marginTop: 15,
//     marginBottom: 8,
//     color: '#333',
//   },
//   tagsContainer: {
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//     marginBottom: 5,
//   },
//   tag: {
//     backgroundColor: '#E3F2FD',
//     paddingHorizontal: 12,
//     paddingVertical: 6,
//     borderRadius: 20,
//     marginRight: 8,
//     marginBottom: 8,
//   },
//   allergenTag: {
//     backgroundColor: '#FFEBEE',
//   },
//   tagText: {
//     fontSize: 14,
//     color: '#1a1a1a',
//   },
//   tipText: {
//     fontSize: 15,
//     color: '#444',
//     marginVertical: 3,
//     marginLeft: 5,
//     lineHeight: 22,
//   },
// });



















// import React, { useState } from "react";
// import {
//   View,
//   Text,
//   Button,
//   Image,
//   StyleSheet,
//   ActivityIndicator,
//   ScrollView,
//   Alert,
//   SafeAreaView,
// } from "react-native";
// import * as ImagePicker from "expo-image-picker";
// import axios from "axios";

// // IMPORTANT: Change this to your computer's IP address
// // Get this from 'ipconfig' in Command Prompt
// const API_URL = "http://192.168.0.134:8000/analyze"; // <-- CHANGE THIS TO YOUR IP

// // Main App Component - MUST be default export
// export default function App() {
//   const [image, setImage] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [nutritionData, setNutritionData] = useState(null);

//   const pickImage = async () => {
//     try {
//       const { status } =
//         await ImagePicker.requestMediaLibraryPermissionsAsync();
//       if (status !== "granted") {
//         Alert.alert(
//           "Permission needed",
//           "Please grant camera roll permissions",
//         );
//         return;
//       }

//       const result = await ImagePicker.launchImageLibraryAsync({
//         mediaTypes: ImagePicker.MediaTypeOptions.Images,
//         allowsEditing: true,
//         quality: 0.7,
//       });

//       if (!result.canceled && result.assets && result.assets.length > 0) {
//         const selectedImage = result.assets[0];
//         setImage(selectedImage.uri);
//         await analyzeImage(selectedImage.uri);
//       }
//     } catch (error) {
//       console.error("Pick Image Error:", error);
//       Alert.alert("Error", "Failed to pick image");
//     }
//   };

//   const takePhoto = async () => {
//     try {
//       const { status } = await ImagePicker.requestCameraPermissionsAsync();
//       if (status !== "granted") {
//         Alert.alert("Permission needed", "Please grant camera permissions");
//         return;
//       }

//       const result = await ImagePicker.launchCameraAsync({
//         allowsEditing: true,
//         quality: 0.7,
//       });

//       if (!result.canceled && result.assets && result.assets.length > 0) {
//         const photo = result.assets[0];
//         setImage(photo.uri);
//         await analyzeImage(photo.uri);
//       }
//     } catch (error) {
//       console.error("Camera Error:", error);
//       Alert.alert("Error", "Failed to take photo");
//     }
//   };

//   const analyzeImage = async (uri) => {
//     setLoading(true);
//     setNutritionData(null);

//     try {
//       console.log("📤 Analyzing image...");
//       console.log("📤 API URL:", API_URL);

//       const formData = new FormData();
//       formData.append("file", {
//         uri: uri,
//         type: "image/jpeg",
//         name: "food_photo.jpg",
//       });

//       const response = await axios.post(API_URL, formData, {
//         headers: {
//           "Content-Type": "multipart/form-data",
//         },
//         timeout: 30000,
//       });

//       console.log("📥 Response received:", response.status);

//       if (response.data && response.data.data) {
//         setNutritionData(response.data.data);
//         Alert.alert("✅ Success", "Food analyzed successfully!");
//       } else {
//         Alert.alert("Error", "Invalid response from server");
//       }
//     } catch (error) {
//       console.error("❌ Analysis Error:", error);

//       let errorMessage = "Failed to analyze the food.";
//       if (error.response) {
//         errorMessage = error.response.data?.detail || errorMessage;
//       } else if (error.request) {
//         errorMessage =
//           "Cannot connect to server.\n\nMake sure:\n• Backend is running\n• Phone and computer on same WiFi\n• IP address is correct\n• Firewall allows port 8000";
//       } else {
//         errorMessage = error.message;
//       }

//       Alert.alert("❌ Error", errorMessage);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const resetAnalysis = () => {
//     setImage(null);
//     setNutritionData(null);
//     setLoading(false);
//   };

//   return (
//     <SafeAreaView style={styles.container}>
//       <ScrollView contentContainerStyle={styles.scrollContainer}>
//         <Text style={styles.title}>🍽️ Food Nutrition Detector</Text>
//         <Text style={styles.subtitle}>Snap. Analyze. Eat Healthy.</Text>

//         {!nutritionData && !loading && (
//           <View style={styles.buttonContainer}>
//             <View style={styles.buttonWrapper}>
//               <Button
//                 title="📷 Take Photo"
//                 onPress={takePhoto}
//                 color="#4CAF50"
//               />
//             </View>
//             <View style={styles.buttonWrapper}>
//               <Button title="🖼️ Gallery" onPress={pickImage} color="#2196F3" />
//             </View>
//           </View>
//         )}

//         {(loading || nutritionData) && (
//           <View style={styles.buttonContainer}>
//             <View style={styles.buttonWrapper}>
//               <Button
//                 title="🔄 New Analysis"
//                 onPress={resetAnalysis}
//                 color="#FF6B6B"
//               />
//             </View>
//           </View>
//         )}

//         {image && !loading && !nutritionData && (
//           <Image source={{ uri: image }} style={styles.image} />
//         )}

//         {loading && (
//           <View style={styles.loadingContainer}>
//             <ActivityIndicator size="large" color="#4CAF50" />
//             <Text style={styles.loadingText}>🧠 Analyzing your food...</Text>
//             <Text style={styles.loadingSubText}>
//               This may take a few seconds
//             </Text>
//           </View>
//         )}

//         {nutritionData && (
//           <View style={styles.resultCard}>
//             <Text style={styles.dishName}>
//               {nutritionData.dish_name || "Unknown Dish"}
//             </Text>

//             {nutritionData.confidence_score && (
//               <Text style={styles.confidence}>
//                 Confidence: {(nutritionData.confidence_score * 100).toFixed(1)}%
//               </Text>
//             )}

//             {nutritionData.nutrition_per_100g && (
//               <View style={styles.nutritionGrid}>
//                 <View style={styles.nutritionItem}>
//                   <Text style={styles.nutritionValue}>
//                     {nutritionData.nutrition_per_100g.calories_kcal || 0}
//                   </Text>
//                   <Text style={styles.nutritionLabel}>Calories</Text>
//                 </View>
//                 <View style={styles.nutritionItem}>
//                   <Text style={styles.nutritionValue}>
//                     {nutritionData.nutrition_per_100g.protein_g || 0}g
//                   </Text>
//                   <Text style={styles.nutritionLabel}>Protein</Text>
//                 </View>
//                 <View style={styles.nutritionItem}>
//                   <Text style={styles.nutritionValue}>
//                     {nutritionData.nutrition_per_100g.carbs_g || 0}g
//                   </Text>
//                   <Text style={styles.nutritionLabel}>Carbs</Text>
//                 </View>
//                 <View style={styles.nutritionItem}>
//                   <Text style={styles.nutritionValue}>
//                     {nutritionData.nutrition_per_100g.fat_g || 0}g
//                   </Text>
//                   <Text style={styles.nutritionLabel}>Fat</Text>
//                 </View>
//               </View>
//             )}

//             {nutritionData.nutrition_per_100g?.fiber_g && (
//               <View style={styles.fiberContainer}>
//                 <Text style={styles.fiberText}>
//                   🌾 Fiber: {nutritionData.nutrition_per_100g.fiber_g}g per 100g
//                 </Text>
//               </View>
//             )}

//             {nutritionData.estimated_serving_size_g && (
//               <Text style={styles.sectionTitle}>
//                 🥗 Estimated Serving: {nutritionData.estimated_serving_size_g}g
//               </Text>
//             )}

//             {nutritionData.ingredients &&
//               nutritionData.ingredients.length > 0 && (
//                 <>
//                   <Text style={styles.sectionTitle}>🧾 Ingredients:</Text>
//                   <View style={styles.tagsContainer}>
//                     {nutritionData.ingredients.map((ingredient, index) => (
//                       <View key={index} style={styles.tag}>
//                         <Text style={styles.tagText}>{ingredient}</Text>
//                       </View>
//                     ))}
//                   </View>
//                 </>
//               )}

//             {nutritionData.allergens && nutritionData.allergens.length > 0 && (
//               <>
//                 <Text style={styles.sectionTitle}>⚠️ Allergens:</Text>
//                 <View style={styles.tagsContainer}>
//                   {nutritionData.allergens.map((allergen, index) => (
//                     <View key={index} style={[styles.tag, styles.allergenTag]}>
//                       <Text style={styles.tagText}>🚫 {allergen}</Text>
//                     </View>
//                   ))}
//                 </View>
//               </>
//             )}

//             {nutritionData.health_tips &&
//               nutritionData.health_tips.length > 0 && (
//                 <>
//                   <Text style={styles.sectionTitle}>💡 Health Tips:</Text>
//                   {nutritionData.health_tips.map((tip, index) => (
//                     <Text key={index} style={styles.tipText}>
//                       • {tip}
//                     </Text>
//                   ))}
//                 </>
//               )}
//           </View>
//         )}
//       </ScrollView>
//     </SafeAreaView>
//   );
// }

// // Styles
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#f5f5f5",
//   },
//   scrollContainer: {
//     flexGrow: 1,
//     alignItems: "center",
//     paddingVertical: 30,
//     paddingHorizontal: 20,
//   },
//   title: {
//     fontSize: 32,
//     fontWeight: "bold",
//     color: "#2E7D32",
//     marginBottom: 5,
//   },
//   subtitle: {
//     fontSize: 16,
//     color: "#666",
//     marginBottom: 25,
//   },
//   buttonContainer: {
//     flexDirection: "row",
//     justifyContent: "space-around",
//     width: "100%",
//     marginBottom: 20,
//   },
//   buttonWrapper: {
//     flex: 1,
//     marginHorizontal: 5,
//   },
//   image: {
//     width: 280,
//     height: 280,
//     borderRadius: 15,
//     marginVertical: 15,
//     borderWidth: 2,
//     borderColor: "#4CAF50",
//   },
//   loadingContainer: {
//     marginVertical: 30,
//     alignItems: "center",
//   },
//   loadingText: {
//     marginTop: 15,
//     fontSize: 18,
//     fontWeight: "600",
//     color: "#2E7D32",
//   },
//   loadingSubText: {
//     fontSize: 14,
//     color: "#666",
//     marginTop: 5,
//   },
//   resultCard: {
//     backgroundColor: "white",
//     padding: 20,
//     borderRadius: 20,
//     width: "100%",
//     marginTop: 10,
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 3 },
//     shadowOpacity: 0.1,
//     shadowRadius: 6,
//     elevation: 5,
//   },
//   dishName: {
//     fontSize: 26,
//     fontWeight: "bold",
//     textAlign: "center",
//     color: "#1a1a1a",
//     marginBottom: 5,
//   },
//   confidence: {
//     textAlign: "center",
//     color: "#888",
//     fontSize: 14,
//     marginBottom: 15,
//   },
//   nutritionGrid: {
//     flexDirection: "row",
//     justifyContent: "space-around",
//     marginVertical: 15,
//     paddingVertical: 15,
//     borderTopWidth: 1,
//     borderBottomWidth: 1,
//     borderColor: "#e0e0e0",
//   },
//   nutritionItem: {
//     alignItems: "center",
//   },
//   nutritionValue: {
//     fontSize: 24,
//     fontWeight: "bold",
//     color: "#2E7D32",
//   },
//   nutritionLabel: {
//     fontSize: 14,
//     color: "#666",
//     marginTop: 2,
//   },
//   fiberContainer: {
//     backgroundColor: "#E8F5E9",
//     padding: 10,
//     borderRadius: 10,
//     marginVertical: 10,
//     alignItems: "center",
//   },
//   fiberText: {
//     fontSize: 16,
//     color: "#2E7D32",
//     fontWeight: "500",
//   },
//   sectionTitle: {
//     fontSize: 18,
//     fontWeight: "600",
//     marginTop: 15,
//     marginBottom: 8,
//     color: "#333",
//   },
//   tagsContainer: {
//     flexDirection: "row",
//     flexWrap: "wrap",
//     marginBottom: 5,
//   },
//   tag: {
//     backgroundColor: "#E3F2FD",
//     paddingHorizontal: 12,
//     paddingVertical: 6,
//     borderRadius: 20,
//     marginRight: 8,
//     marginBottom: 8,
//   },
//   allergenTag: {
//     backgroundColor: "#FFEBEE",
//   },
//   tagText: {
//     fontSize: 14,
//     color: "#1a1a1a",
//   },
//   tipText: {
//     fontSize: 15,
//     color: "#444",
//     marginVertical: 3,
//     marginLeft: 5,
//     lineHeight: 22,
//   },
// });

















import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import DashboardScreen from "./UI/DashboardScreen";
import ProfileScreen from "./UI/ProfileScreen";
import PrivacyScreen from "./UI/PrivacyScreen";
import TermsScreen from "./UI/TermsScreen";
import AdminDashboardScreen from "./UI/AdminDashboardScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Dashboard"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Dashboard" component={DashboardScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="Privacy" component={PrivacyScreen} />
        <Stack.Screen name="Terms" component={TermsScreen} />
        <Stack.Screen name="AdminDashboard" component={AdminDashboardScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
