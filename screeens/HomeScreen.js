import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity
} from 'react-native'
import React, { useLayoutEffect, useState} from "react";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons, Entypo, Ionicons } from '@expo/vector-icons';
import { useInterval, postData, fetchData, USERNAME, KEY } from "../utils/datahandle";

const HomeScreen = () => {
    const navigation = useNavigation();
    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false,
        });
    }, []);
    useInterval(() => {
            fetchData(setTemperature, USERNAME, 'cambien1')
            fetchData(setLight, USERNAME, 'cambien2')
            fetchData(setHumidity, USERNAME, 'cambien3')
            fetchData(setState, USERNAME, 'nutnhan1')
        }
        , 3600000)
    const [temperature, setTemperature] = useState(35)
    const [humidity, setHumidity] = useState(35)
    const [light, setLight] = useState(35)
    const [state, setState] = useState(async ()=>{
        await fetch(`https://io.adafruit.com/api/v2/${USERNAME}/feeds/nutnhan1/data?limit=1`)
        .then((res) => res.json())
        .then((res) => {
            postData(USERNAME, "nutnhan2", KEY, 0)
            setState(res[0]["value"])
        })
        .catch((e) => console.error(e));
    })
    const [updateTime, setUpdateTime] = useState(new Date().toLocaleString())
    const onPress = async function () {
        var m=global.manual;
        if (m==1) {
            setState(prevState => !prevState);
            var on = !state ? 1 : 0;
            postData(USERNAME, "nutnhan1", KEY, on)
            setIconName(!state ? "lightbulb-on-outline" : "lightbulb-outline")
            setIconSize(!state ? 26 : 24)
            setSwitchColor(!state ? "#47408E" : "transparent")
            setgradientColor(!state ? "#5A46FF" : "transparent")
            setStatus(!state ? "On" : "Off")
        }
    }
    const onRefresh = () => {
        fetchData(setTemperature, USERNAME, 'cambien1')
        fetchData(setLight, USERNAME, 'cambien2')
        fetchData(setHumidity, USERNAME, 'cambien3')
        fetchData(setState, USERNAME, 'nutnhan1')
        setUpdateTime(new Date().toLocaleString())
        setIconName(state == 1 ? "lightbulb-on-outline" : "lightbulb-outline")
        setIconSize(state == 1 ? 26 : 24)
        setSwitchColor(state == 1 ? "#47408E" : "transparent")
        setgradientColor(state == 1 ? "#5A46FF" : "transparent")
        setStatus(state == 1 ? "On" : "Off")
    }
    const [iconName, setIconName] = useState("lightbulb-on-outline");
    const [iconSize, setIconSize] = useState(26);
    const [switchColor, setSwitchColor] = useState("#47408E");
    const [gradientColor, setgradientColor] = useState("#5A46FF");
    const [status, setStatus] = useState("On");
    return (
        <View style={styles.container}>
            <LinearGradient
                // Background Linear Gradient
                colors={['#5A46FF', 'transparent']}
                start={[1, 0]} end={[0, 0.6]} location={[0.15, 0.3, 0.6]}
                style={styles.background}
            />
            <View style={styles.header}>
                <Text style={styles.title}>Home</Text>
                <View style={styles.btnAdd}>
                    <Text style={styles.btnText}>+</Text>
                </View>
            </View>
            <View style={styles.device}>
                <View style={styles.popUp}>
                    <LinearGradient
                        // Background Linear Gradient
                        colors={[gradientColor, 'transparent']}
                        start={[1, 0]} end={[0.3, 0.6]} location={[0.15, 0.3, 0.6]}
                        style={styles.background} />
                    <View style={styles.popUpHeader}>
                        <Text style={styles.deviceName}>Device</Text>
                        <Text style={styles.roomName}>Room</Text>
                    </View>
                    <View style={styles.lightSwitch}>
                        <TouchableOpacity style={[styles.switchBtn, { backgroundColor: switchColor }]} onPress={onPress}>
                            <MaterialCommunityIcons name={iconName} size={iconSize} color="white" />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.popUpFooter}>
                        <Text style={styles.lightColor}>Status</Text>
                        <Text style={styles.colorPercent}>{status}</Text>
                    </View>
                </View>
            </View>
            <View style={styles.body}>
                <View style={styles.infoContainer}>
                    <Text style={styles.timeText}>{updateTime}</Text>
                    <TouchableOpacity onPress={onRefresh}>
                        <Ionicons name='refresh' size={20} color='white'></Ionicons>
                    </TouchableOpacity>
                    <View style={styles.envInfo}>
                        <LinearGradient
                            // Background Linear Gradient
                            colors={['#957DCD', 'transparent']}
                            style={styles.background} />
                        <View style={[styles.envContainer]}>
                            <Entypo name="water" size={30} color="#28AAE1" />
                            <Text style={[styles.envText, { fontSize: 18, fontWeight: 'bold' }]}>{humidity}</Text>
                            <Text style={styles.envText}>Humidity</Text>
                        </View>
                        <View style={[styles.envContainer]}>
                            <MaterialCommunityIcons name="weather-partly-cloudy" size={30} color="#FFFFFF" />
                            <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
                                <Text style={[styles.envText, { fontSize: 18, lineHeight: 28, fontWeight: 'bold' }]}>{temperature}</Text>
                                <Text style={[styles.envText, { fontSize: 11, lineHeight: 18 }]}>o</Text>
                            </View>
                            <Text style={styles.envText}>Temperature</Text>
                        </View>
                        <View style={[styles.envContainer]}>
                            <Ionicons name="sunny-outline" size={30} color="white" />
                            <Text style={[styles.envText, { fontSize: 18, fontWeight: 'bold' }]}>{light}</Text>
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
        backgroundColor: "#05012F",
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
        width: 220,
        height: 220,
        marginTop: 20,
        backgroundColor: "#05012F",
        borderRadius: 20,
        overflow: 'hidden'
    },
    popUpHeader: {
        flex: 2,
        paddingLeft: 15
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
        borderRadius: 120,
        width: 58,
        height: 58,
        marginBottom: 15
    },
    popUpFooter: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        paddingLeft: 15,
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
        paddingLeft: 20,
        paddingRight: 20
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
