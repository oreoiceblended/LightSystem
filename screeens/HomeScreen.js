import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity
} from 'react-native'
import React, { useLayoutEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons, Entypo, Ionicons  } from '@expo/vector-icons';
const HomeScreen = () => {
  const navigation = useNavigation();
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);
  const [state, setState] = useState(true);
  const onPress = () => setState(prevState => !prevState);
  const newState = state;
  const iconName = newState ? "lightbulb-on-outline" : "lightbulb-outline";
  const iconSize = newState ? 26 : 24;
  const switchColor = newState ? "#47408E": "transparent";
  const gradientColor = newState ? "#5A46FF" : "transparent";
  return (
    <View style={styles.container}>
      <LinearGradient
        // Background Linear Gradient
        colors={['#5A46FF', 'transparent']}
        start={[1, 0]} end={[0, 0.6]}   location={[0.15, 0.3, 0.6]}
        style={styles.background}
      />
      <View style={styles.header}>
        <Text style={styles.title}>Home</Text>
        <View style = {styles.btnAdd}>
          <Text style = {styles.btnText}>+</Text>
        </View>
      </View>
      <View style={styles.device}>
        <View style={styles.popUp}>
          <LinearGradient
          // Background Linear Gradient
          colors={[gradientColor, 'transparent']}
          start={[1, 0]} end={[0.3, 0.6]} location={[0.15, 0.3, 0.6]}
          style={styles.background}/>
          <View style={styles.popUpHeader}>
            <Text style={styles.deviceName}>Device</Text>
            <Text style={styles.roomName}>Room</Text>
          </View>
          <View style={styles.lightSwitch}>
            <TouchableOpacity style={[styles.switchBtn, {backgroundColor: switchColor}]} onPress={onPress}>
              <MaterialCommunityIcons name={iconName} size={iconSize} color="white" />
            </TouchableOpacity>
          </View>
          <View style={styles.popUpFooter}>
            <Text style={styles.lightColor}>Color</Text>
            <Text style={styles.colorPercent}>100%</Text>
          </View>
		    </View>
      </View>
      <View style={styles.body}>
        <View style={styles.infoContainer}>
          <Text style={styles.timeText}>Friday, 26 August 2022 | 10:00</Text>
          <View style={styles.envInfo}>
            <LinearGradient
            // Background Linear Gradient
            colors={['#957DCD', 'transparent']}
            style={styles.background}/>
            <View style={[styles.envContainer]}>
              <Entypo name="water" size={30} color="#28AAE1" />
              <Text style={[styles.envText, {fontSize:18, fontWeight: 'bold'}]}>20%</Text>
              <Text style={styles.envText}>Humidity</Text>
            </View>
            <View style={[styles.envContainer]}>
            <MaterialCommunityIcons name="weather-partly-cloudy" size={30} color="#FFFFFF" />
              <View style={{flexDirection: 'row', alignItems: 'flex-start'}}>
                <Text style={[styles.envText, {fontSize: 18, lineHeight: 28, fontWeight: 'bold'}]}>10</Text>
                <Text style={[styles.envText, {fontSize: 11, lineHeight: 18}]}>o</Text>
              </View>
              <Text style={styles.envText}>Temperature</Text>
            </View>
            <View style={[styles.envContainer]}>
              <Ionicons name="sunny-outline" size={30} color="white" />
              <Text style={[styles.envText, {fontSize:18, fontWeight: 'bold'}]}>40%</Text>
              <Text style={styles.envText}>Light</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:   "#05012F"  ,
    alignItems: "center",
    justifyContent: "space-between",
  },
  background: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: "100%",
  },
  header: {
	flex: 1,
    // backgroundColor: "red",
    marginTop: 20,
    height: "20%",
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 40,
  },
  title: {
    marginTop: 5,
    marginLeft: 20,
    fontSize: 40,
    fontWeight: "bold",
    color: "#fff",
  },
  btnAdd: {
    width: 50,
    height: 50,
    marginRight: 20,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff",
    borderRadius: 100,
    borderColor: "black"
  },
  btnText: {
    fontSize: 30
  },
  device: {
	flex: 3,
	justifyContent: "center",
	alignItems: "center",
  },
  popUp: {
	width:220,
	height: 220,
	marginTop: 20,
	backgroundColor: "#05012F",
	borderRadius: 20,
	overflow: 'hidden'
  },
  popUpHeader: {
	flex: 2,
	paddingLeft:15
  },
  deviceName: {
	color: "white",
	marginTop: 7,
	fontWeight: "bold",
	fontSize: 18
  },
  roomName: {
	color: "white",
	fontWeight: "350",
	fontSize: 15
  },
  lightSwitch: {
	flex: 4,
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: "red"
  },
  switchBtn: {
    borderColor: "#ffffff40",
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
    borderRadius:120,
    width: 58,
    height: 58,
    marginBottom: 15
  },
  popUpFooter: {
	flex: 1,
	flexDirection: "row",
	justifyContent: "space-between",
	paddingLeft:15,
	paddingRight: 15,
  },
  lightColor: {
	color: "white",
	fontSize: 15,
  },
  colorPercent: {
	color: "white",
	fontSize: 15,
  },
  body: {
	flex: 3,

  },
  infoContainer: {
    width: 294,
    height: 161,
    marginTop: 40,
    alignItems: "center",
    justifyContent: "space-between",
  },
  timeText: {
    color: "white",
  },
  envInfo: {
    height: 94,
    width: "100%",
    borderRadius: 8,
    backgroundColor: "rgba(82, 61, 127, 0.5)",
    overflow: "hidden",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingLeft:20,
    paddingRight:20
  },
  envContainer: {
    // backgroundColor: "white",
    marginTop: 10,
    marginBottom: 5,
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
  },
  envText: {
    color: "white",
  }
});