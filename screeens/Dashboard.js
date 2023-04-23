import { View, Text, StyleSheet } from 'react-native'
import React, { useLayoutEffect } from "react";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from "@expo/vector-icons";
import { Octicons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import HomeScreen from './HomeScreen';
import LogScreen from './LogScreen';
import DeviceScreen from './DeviceScreen';
import SettingScreen from './SettingScreen';
const Dashboard = () => {
    const navigation = useNavigation();
    const Tab = createBottomTabNavigator();
    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false,
        });
    }, []);
    return (
        <Tab.Navigator
            screenOptions={({route}) => ({
                tabBarStyle: {
                    height: 80,
                    backgroundColor: '#05012F'
                },
                tabBarShowLabel: false,
                tabBarIcon: ({focused, size, colour}) => {
                    let iconName;
                    size = 30,

                        colour = "white";
                    if (route.name === 'Home') {
                        if (focused) {
                            return <View style={styles.navBox}><Octicons name="home" size={size} color={colour} /></View>
                        } else {
                            return <Octicons name="home" size={size} color={colour} />
                        }
                    } else if (route.name === 'Log') {
                        if (focused) {
                            return <View style={styles.navBox}><Ionicons name='ios-time-outline' size={size+5} color={colour} /></View>
                        } else {
                            return <Ionicons name='ios-time-outline' size={size} color={colour} />
                        }
                    } else if (route.name === 'Device') {
                        if (focused) {
                            return <View style={styles.navBox}><MaterialIcons name='lightbulb-outline' size={size+8} color={colour} /></View>
                        } else {
                            return <MaterialIcons name='lightbulb-outline' size={size+3} color={colour} />
                        }
                    } else if (route.name === 'More') {
                        if (focused) {
                            return <View style={styles.navBox}><AntDesign name="user" size={size+5} color={colour} /></View>
                        } else {
                            return <AntDesign name="user" size={size} color={colour} />
                        }
                    }
                },
            })}>
            <Tab.Screen name="Home" component={HomeScreen}/>
            <Tab.Screen name="Log" component={LogScreen}/>
            <Tab.Screen name="Device" component={DeviceScreen}/>
            <Tab.Screen name="More" component={SettingScreen}/>
        </Tab.Navigator>
    )
}

export default Dashboard

const styles = StyleSheet.create({
    navBox: {
        backgroundColor: "#5A46FF",
        height: 50,
        width: 50,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 100,
        paddingLeft: 3,
        shadowRadius: 10,
    }
});