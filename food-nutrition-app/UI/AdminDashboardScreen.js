import React from "react";
import { ScrollView, View, Text, StyleSheet, TouchableOpacity } from "react-native";

const green="#39d98a";

export default function AdminDashboardScreen({navigation}){
 const nav=[
  ["⌂","Dashboard"],["👥","Users"],["🥗","Food Database"],
  ["📊","Reports"],["📈","Analytics"],["📝","Activity Logs"],["🔐","Security"]
 ];
 return <ScrollView style={styles.root} contentContainerStyle={styles.container}>
  <View style={styles.sidebar}>
   <Text style={styles.logo}>🥬 Nutrify<Text style={{color:green}}>U</Text></Text>
   <Text style={styles.admin}>ADMIN</Text>
   {nav.map(([icon,label],i)=><TouchableOpacity key={label} style={[styles.nav,i===0&&styles.active]}>
    <Text style={[styles.navText,i===0&&styles.activeText]}>{icon}  {label}</Text>
   </TouchableOpacity>)}
  </View>
  <View style={styles.main}>
   <Text style={styles.title}>Admin <Text style={{color:green}}>Dashboard</Text></Text>
   <Text style={styles.muted}>Monitor and manage the NutrifyU platform.</Text>
   <View style={styles.stats}>
    {[["2,847","Total Users"],["1,926","Active Users"],["8,492","Food Records"],["5,631","Food Scans"]].map(([v,l])=>
      <View style={styles.card} key={l}><Text style={styles.value}>{v}</Text><Text style={styles.muted}>{l}</Text></View>
    )}
   </View>
   <View style={styles.card}>
    <Text style={styles.heading}>User Growth</Text>
    <View style={styles.bars}>{[38,52,44,67,81].map((h,i)=><View style={styles.barWrap} key={i}>
      <View style={[styles.bar,{height:h*2}]} /><Text style={styles.muted}>W{i+1}</Text>
    </View>)}</View>
   </View>
   <View style={styles.card}>
    <Text style={styles.heading}>Recent Activity</Text>
    {["👤 New user registered","📷 Food scan completed","🥗 Food item added","🔐 Admin login"].map(x=>
      <View style={styles.activity} key={x}><Text style={styles.activityText}>{x}</Text></View>
    )}
   </View>
   <View style={styles.card}>
    <Text style={styles.heading}>Recent Users</Text>
    {[["Riya Sharma","Aug 18, 2026","24 meals","Active"],["Arjun Kumar","Aug 17, 2026","18 meals","Active"],["Priya Mehta","Aug 16, 2026","31 meals","Active"],["Vivek Kumar","Aug 15, 2026","6 meals","Inactive"]].map(row=>
      <View style={styles.row} key={row[0]}>{row.map((v,i)=><Text key={i} style={[styles.cell,i===3&&v==="Active"&&{color:green}]}>{v}</Text>)}</View>
    )}
   </View>
   <View style={styles.card}>
    <Text style={styles.heading}>System Status</Text>
    <Text style={styles.status}>🟢 Web Application — Operational</Text>
    <Text style={styles.status}>🟢 API Server — Operational</Text>
    <Text style={styles.status}>🟢 Database — Operational</Text>
   </View>
  </View>
 </ScrollView>
}

const styles=StyleSheet.create({
 root:{flex:1,backgroundColor:"#07110d"},container:{paddingBottom:30},
 sidebar:{backgroundColor:"#08140e",padding:22,borderBottomWidth:1,borderColor:"#183025"},
 logo:{fontSize:22,fontWeight:"700",color:"#edf6f1"},admin:{color:green,fontSize:9,marginBottom:18},
 nav:{padding:12,borderRadius:10,marginBottom:5},active:{backgroundColor:"#10251a"},
 navText:{color:"#829089",fontSize:13},activeText:{color:green},
 main:{padding:20},title:{fontSize:30,fontWeight:"700",color:"#edf6f1",marginBottom:5},
 muted:{color:"#718078",fontSize:11,lineHeight:18},stats:{marginTop:20},
 card:{backgroundColor:"#0d1913",borderWidth:1,borderColor:"#183025",borderRadius:17,padding:18,marginBottom:15},
 value:{fontSize:25,fontWeight:"700",color:"#edf6f1"},heading:{fontSize:17,fontWeight:"700",color:"#edf6f1",marginBottom:14},
 bars:{height:180,flexDirection:"row",alignItems:"flex-end",justifyContent:"space-around"},
 barWrap:{alignItems:"center",flex:1},bar:{width:28,backgroundColor:green,borderRadius:6,marginBottom:8},
 activity:{backgroundColor:"#101e17",borderRadius:10,padding:12,marginBottom:8},activityText:{color:"#edf6f1",fontSize:12},
 row:{flexDirection:"row",paddingVertical:13,borderBottomWidth:1,borderColor:"#183025"},
 cell:{flex:1,color:"#edf6f1",fontSize:10},status:{color:"#edf6f1",marginVertical:6,fontSize:12}
});
