import React from "react";
import { ScrollView, View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const green="#39d98a";

const sections=[
["1. Information We Collect","We may collect information you provide directly and information generated when you use NutrifyU."],
["2. How We Use Information","We use information to operate, maintain, improve, personalize, secure, and support NutrifyU."],
["3. Health & Nutrition Data","NutrifyU may process nutrition, meals, body measurements, goals, and lifestyle preferences that you choose to provide. This information is for general wellness purposes."],
["4. Data Storage","Information may be stored using application databases and infrastructure used to operate NutrifyU."],
["5. Data Sharing","We do not sell your personal information. Information may be shared with service providers when necessary to operate essential platform functions."],
["6. Data Security","We use reasonable technical and organizational measures designed to protect information, but no internet service can guarantee absolute security."],
["7. Cookies","NutrifyU may use cookies or similar technologies to maintain sessions, remember preferences, improve usability, and understand usage."],
["8. Your Rights","Depending on applicable law, you may have rights to access, correct, delete, or manage certain personal information."],
["9. Children's Privacy","NutrifyU is not intended to knowingly collect personal information from children without appropriate authorization."],
["10. Policy Changes","We may update this Privacy Policy from time to time. Updated versions will include a revised Last Updated date."],
["11. Contact","Privacy questions can be sent to privacy@nutrifyu.com."]
];

export default function PrivacyScreen({navigation}){
 return <ScrollView style={styles.root} contentContainerStyle={styles.container}>
   <View style={styles.top}><Text style={styles.logo}>🥬 Nutrify<Text style={{color:green}}>U</Text></Text>
     <TouchableOpacity onPress={()=>navigation.goBack()}><Text style={styles.link}>← Back</Text></TouchableOpacity>
   </View>
   <Text style={styles.hero}>Privacy <Text style={{color:green}}>Policy</Text></Text>
   <Text style={styles.muted}>How NutrifyU collects, uses, and protects information.</Text>
   <Text style={styles.updated}>Last Updated: August 18, 2026</Text>
   <View style={styles.content}>
    {sections.map(([title,text])=><View style={styles.section} key={title}>
      <Text style={styles.heading}>{title}</Text><Text style={styles.body}>{text}</Text>
    </View>)}
   </View>
 </ScrollView>
}

const styles=StyleSheet.create({
 root:{flex:1,backgroundColor:"#07110d"},container:{paddingBottom:35},
 top:{height:70,paddingHorizontal:20,flexDirection:"row",alignItems:"center",justifyContent:"space-between",borderBottomWidth:1,borderColor:"#183025"},
 logo:{fontSize:20,fontWeight:"700",color:"#edf6f1"},link:{color:"#829089"},
 hero:{fontSize:38,fontWeight:"700",color:"#edf6f1",textAlign:"center",marginTop:45},
 muted:{color:"#87948d",fontSize:12,lineHeight:20,textAlign:"center",paddingHorizontal:20},
 updated:{color:"#718078",fontSize:11,margin:25},
 content:{marginHorizontal:15,backgroundColor:"#0d1913",borderWidth:1,borderColor:"#183025",borderRadius:18,padding:20},
 section:{paddingBottom:22,marginBottom:22,borderBottomWidth:1,borderColor:"#183025"},
 heading:{fontSize:17,fontWeight:"700",color:green,marginBottom:10},body:{fontSize:12,color:"#87948d",lineHeight:21}
});
