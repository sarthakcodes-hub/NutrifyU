import React from "react";
import { ScrollView, View, Text, StyleSheet, TouchableOpacity } from "react-native";

const green = "#39d98a";

export default function DashboardScreen({ navigation }) {
  const navItems = [
    ["⌂", "Dashboard", "Dashboard"],
    ["🥗", "My Nutrition", null],
    ["📷", "Food Scanner", null],
    ["🍽", "Meal Planner", null],
    ["🎯", "My Goals", null],
    ["📊", "Reports", null],
    ["👤", "Profile", "Profile"],
  ];

  return (
    <View style={styles.root}>
      <ScrollView horizontal={false} contentContainerStyle={styles.container}>
        <View style={styles.sidebar}>
          <Text style={styles.logo}>🥬 Nutrify<Text style={{color: green}}>U</Text></Text>
          {navItems.map(([icon, label, route]) => (
            <TouchableOpacity
              key={label}
              style={[styles.nav, label === "Dashboard" && styles.activeNav]}
              onPress={() => route && navigation.navigate(route)}
            >
              <Text style={[styles.navText, label === "Dashboard" && styles.activeText]}>
                {icon}  {label}
              </Text>
            </TouchableOpacity>
          ))}
          <View style={styles.policyLinks}>
            <TouchableOpacity onPress={() => navigation.navigate("Privacy")}>
              <Text style={styles.smallLink}>Privacy Policy</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate("Terms")}>
              <Text style={styles.smallLink}>Terms of Service</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.main}>
          <Text style={styles.overview}>OVERVIEW / DASHBOARD</Text>
          <Text style={styles.title}>Good evening, <Text style={{color: green}}>Sarthak</Text> 👋</Text>
          <Text style={styles.muted}>Here's your nutrition overview for today.</Text>

          <View style={styles.stats}>
            {[
              ["1,560 kcal", "Calories consumed"],
              ["82g", "Protein intake"],
              ["2.1L", "Water intake"],
              ["6", "Healthy choices"],
            ].map(([value, label]) => (
              <View style={styles.card} key={label}>
                <Text style={styles.value}>{value}</Text>
                <Text style={styles.muted}>{label}</Text>
              </View>
            ))}
          </View>

          <View style={styles.card}>
            <Text style={styles.cardTitle}>Weekly Calories</Text>
            <View style={styles.bars}>
              {[62,75,55,82,68,91,73].map((height, i) => (
                <View style={styles.barColumn} key={i}>
                  <View style={[styles.bar, {height: height * 1.7}]} />
                  <Text style={styles.muted}>{["Mon","Tue","Wed","Thu","Fri","Sat","Sun"][i]}</Text>
                </View>
              ))}
            </View>
          </View>

          <View style={styles.card}>
            <Text style={styles.cardTitle}>Daily Goal</Text>
            <Text style={styles.goal}>78%</Text>
            <Text style={styles.muted}>Overall nutrition progress</Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.cardTitle}>Today's Meals</Text>
            {[
              ["🍳", "Breakfast", "Oatmeal · Banana · Almonds", "420 kcal"],
              ["🥗", "Lunch", "Rice · Dal · Vegetables", "560 kcal"],
              ["🍎", "Evening Snack", "Apple · Greek Yogurt", "180 kcal"],
            ].map(([icon, meal, desc, kcal]) => (
              <View style={styles.meal} key={meal}>
                <Text style={{fontSize: 22}}>{icon}</Text>
                <View style={{flex: 1}}>
                  <Text style={styles.mealTitle}>{meal}</Text>
                  <Text style={styles.muted}>{desc}</Text>
                </View>
                <Text style={styles.mealKcal}>{kcal}</Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root:{flex:1,backgroundColor:"#07110d"},
  container:{paddingBottom:30},
  sidebar:{backgroundColor:"#08140e",padding:24,borderBottomWidth:1,borderColor:"#183025"},
  logo:{fontSize:23,fontWeight:"700",color:"#edf6f1",marginBottom:20},
  nav:{padding:12,borderRadius:10,marginBottom:5},
  activeNav:{backgroundColor:"#10251a"},
  navText:{color:"#829089",fontSize:14},
  activeText:{color:green},
  policyLinks:{flexDirection:"row",gap:20,marginTop:15},
  smallLink:{color:"#718078",fontSize:11},
  main:{padding:20},
  overview:{color:"#718078",fontSize:11,marginBottom:25},
  title:{fontSize:28,fontWeight:"700",color:"#edf6f1"},
  muted:{color:"#718078",fontSize:11,lineHeight:18},
  stats:{gap:12,marginVertical:20},
  card:{backgroundColor:"#0d1913",borderWidth:1,borderColor:"#183025",borderRadius:17,padding:18,marginBottom:15},
  value:{fontSize:25,fontWeight:"700",color:"#edf6f1",marginBottom:6},
  cardTitle:{fontSize:17,fontWeight:"700",color:"#edf6f1",marginBottom:15},
  bars:{height:190,flexDirection:"row",alignItems:"flex-end",justifyContent:"space-between"},
  barColumn:{alignItems:"center",justifyContent:"flex-end",flex:1},
  bar:{width:18,backgroundColor:green,borderRadius:6,marginBottom:7},
  goal:{fontSize:55,color:green,textAlign:"center",paddingVertical:25},
  meal:{flexDirection:"row",alignItems:"center",gap:12,padding:12,backgroundColor:"#101e17",borderRadius:10,marginBottom:9},
  mealTitle:{color:"#edf6f1",fontWeight:"700"},
  mealKcal:{color:"#edf6f1",fontSize:12},
});
