import React, {useState} from "react";
import { ScrollView, View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from "react-native";

const green = "#39d98a";

export default function ProfileScreen({navigation}) {
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({
    firstName:"Roshani", lastName:"Kumari", email:"roshani@example.com",
    age:"23", gender:"Female", height:"164", weight:"63"
  });

  const update = (key, value) => setForm({...form, [key]:value});

  return (
    <ScrollView style={styles.root} contentContainerStyle={styles.container}>
      <View style={styles.sidebar}>
        <Text style={styles.logo}>🥬 Nutrify<Text style={{color:green}}>U</Text></Text>
        {[
          ["⌂ Dashboard","Dashboard"],
          ["🥗 My Nutrition",null],["📷 Food Scanner",null],
          ["🍽 Meal Planner",null],["🎯 My Goals",null],
          ["📊 Reports",null],["👤 Profile","Profile"]
        ].map(([label,route])=>(
          <TouchableOpacity key={label} style={[styles.nav,label.includes("Profile")&&styles.activeNav]}
            onPress={()=>route&&navigation.navigate(route)}>
            <Text style={[styles.navText,label.includes("Profile")&&styles.activeText]}>{label}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.main}>
        <View style={styles.card}>
          <View style={styles.identity}>
            <View style={styles.avatar}><Text style={styles.avatarText}>R</Text></View>
            <View style={{flex:1}}>
              <Text style={styles.title}>Roshani</Text>
              <Text style={styles.muted}>roshani@example.com</Text>
              <Text style={styles.member}>NUTRIFYU MEMBER</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.button} onPress={()=>setEditing(true)}>
            <Text style={styles.buttonText}>✎ Edit Profile</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Personal Information</Text>
          <Text style={styles.muted}>Keep your basic information up to date.</Text>

          {[
            ["firstName","First Name"],["lastName","Last Name"],["email","Email"],
            ["age","Age"],["gender","Gender"],["height","Height"],["weight","Weight"]
          ].map(([key,label])=>(
            <View style={styles.field} key={key}>
              <Text style={styles.label}>{label}</Text>
              <TextInput
                value={form[key]}
                editable={editing}
                onChangeText={v=>update(key,v)}
                style={[styles.input,!editing&&styles.disabled]}
              />
            </View>
          ))}

          <TouchableOpacity style={styles.save} onPress={()=>{
            setEditing(false);
            Alert.alert("NutrifyU","Profile saved successfully.");
          }}>
            <Text style={styles.saveText}>Save Changes</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Profile Completion</Text>
          <Text style={styles.goal}>82%</Text>
          <Text style={styles.muted}>Complete your profile for better insights.</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Nutrition Preferences</Text>
          <Text style={styles.preference}>Diet: <Text style={styles.bold}>Vegetarian</Text></Text>
          <Text style={styles.preference}>Calories: <Text style={styles.bold}>2,000 kcal</Text></Text>
          <Text style={styles.preference}>Water: <Text style={styles.bold}>2.5 L</Text></Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles=StyleSheet.create({
 root:{flex:1,backgroundColor:"#07110d"},container:{paddingBottom:30},
 sidebar:{backgroundColor:"#08140e",padding:24,borderBottomWidth:1,borderColor:"#183025"},
 logo:{fontSize:23,fontWeight:"700",color:"#edf6f1",marginBottom:20},
 nav:{padding:12,borderRadius:10,marginBottom:5},activeNav:{backgroundColor:"#10251a"},
 navText:{color:"#829089",fontSize:14},activeText:{color:green},
 main:{padding:20},card:{backgroundColor:"#0d1913",borderWidth:1,borderColor:"#183025",borderRadius:17,padding:20,marginBottom:15},
 identity:{flexDirection:"row",alignItems:"center",gap:16,marginBottom:15},
 avatar:{width:70,height:70,borderRadius:18,backgroundColor:green,alignItems:"center",justifyContent:"center"},
 avatarText:{fontSize:25,fontWeight:"700",color:"#06130c"},title:{fontSize:25,fontWeight:"700",color:"#edf6f1"},
 muted:{color:"#718078",fontSize:11,lineHeight:18},member:{color:green,fontSize:10,marginTop:5},
 button:{alignSelf:"flex-start",borderWidth:1,borderColor:"#264936",borderRadius:9,padding:11},
 buttonText:{color:green},sectionTitle:{fontSize:18,fontWeight:"700",color:"#edf6f1",marginBottom:6},
 field:{marginTop:14},label:{fontSize:11,color:"#9baaa2",marginBottom:6},
 input:{height:45,borderWidth:1,borderColor:"#20382b",borderRadius:9,color:"#fff",paddingHorizontal:12,backgroundColor:"#101e17"},
 disabled:{opacity:.7},save:{marginTop:18,backgroundColor:green,borderRadius:9,padding:13,alignItems:"center"},
 saveText:{color:"#06130c",fontWeight:"700"},goal:{fontSize:50,color:green,textAlign:"center",padding:20},
 preference:{color:"#edf6f1",marginTop:10},bold:{fontWeight:"700"}
});
