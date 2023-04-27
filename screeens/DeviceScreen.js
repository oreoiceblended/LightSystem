import React, { useLayoutEffect, useState } from "react";
import {
    Text,
    View,
    StyleSheet,
    Image,
    Switch} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from 'expo-linear-gradient';
import {Slider} from '@miblanchard/react-native-slider';
import { useInterval, postData, fetchData, USERNAME, KEY } from "../utils/datahandle";

global.manual=1;
const DeviceScreen = () => {
    const navigation = useNavigation();
    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false,
        });
    }, []);
    const [time, setTime] = useState(360000)
    useInterval(() => {
        fetchData(setLight, USERNAME, 'cambien2')
        if (light < lightThreshold && state == 0) {
            alert("Nho hon threshold -> Mo den")
            setState(1);
            postData(USERNAME, "nutnhan1", KEY, 1)
        } else if (light >= lightThreshold && state == 1) {
            alert("Lon hon threshold -> Tat den")
            setState(0);
            postData(USERNAME, "nutnhan1", KEY, 0)
        }
    }
    , time);
    const [lightThreshold, setlightThreshold] = useState(50)
    const [timeMode, setTimeMode] = useState(true);
    const [manualMode, setManualMode] = useState(true);
    const [autoMode, setAutoMode] = useState(false);
    const [alertMode, setAlertMode] = useState(false);
    const [light, setLight] = useState(async ()=>{
        await fetch(`https://io.adafruit.com/api/v2/${USERNAME}/feeds/cambien2/data?limit=1`)
        .then((res) => res.json())
        .then((res) => {
            setLight(res[0]["value"])
        })
        .catch((e) => console.error(e));
    })
    const [state, setState] = useState(async ()=>{
        await fetch(`https://io.adafruit.com/api/v2/${USERNAME}/feeds/nutnhan1/data?limit=1`)
        .then((res) => res.json())
        .then((res) => {
            setState(res[0]["value"])
        })
        .catch((e) => console.error(e));
    })
    const onManualMode = () => {
        setManualMode(true)
        setAlertMode (false)
        setAutoMode(false)
        setTime(3600000)
        if (global.manual==2) {
            postData(USERNAME, "nutnhan2", KEY, 0)
        }
        global.manual=1
    }
    const onAutoMode = () => {
        setManualMode(false)
        setAlertMode(false)
        setAutoMode(true)
        setTime(1000)
        if (global.manual==2) {
            postData(USERNAME, "nutnhan2", KEY, 0)
        }
        global.manual=0
    }
    const onScheduleMode = () => {
        setManualMode(false)
        setAlertMode(true)
        setTime(3600000)
        if (global.manual != 2) {
            postData(USERNAME, "nutnhan2", KEY, 1)
        }
        global.manual=2
    }
    return (
        <View style={styles.container}>
            <LinearGradient
                // Background Linear Gradient
                colors={['#5A46FF', 'transparent']}
                start={[1, 0]} end={[0, 0.6]} location={[0.15, 0.3, 0.6]}
                style={styles.background}
            />
            <View style={styles.header}>
                <Text style={styles.title}>Device Setting</Text>
                <Image style={styles.logo} source={require("../assets/download1.png")} />
            </View>
            <View style={styles.body}>
                <View style={styles.manualConfig}>
                <LinearGradient
                colors={['#957DCD', 'transparent']}
                style={styles.background} />
                    <Text style={styles.modeText}>Manual</Text>
                    <Switch value={manualMode} onValueChange={onManualMode}></Switch>
                </View>
                <View style={styles.autoConfig}>
                <LinearGradient
                colors={['#957DCD', 'transparent']}
                style={styles.background} />
                    <View style={styles.popUpHeader}>
                        <Text style={styles.modeText}>Auto</Text>
                        <Switch value={autoMode} onValueChange={onAutoMode}></Switch> 
                    </View>
                    <Text style={styles.autoLight}>Light Threshold: {lightThreshold}</Text>
                    <View style={{flex: 1, justifyContent: "center"}}>
                        <Slider
                        minimumTrackStyle = {styles.lightSlide}
                        maximumValue = {100}
                        step={5}
                        value={lightThreshold}
                        onValueChange={value => setlightThreshold(value)}
                        />   
                    </View>
                </View>
                <View style={styles.alertConfig}>
                <LinearGradient
                colors={['#957DCD', 'transparent']}
                style={styles.background}/>
                    <View style={styles.popUpHeader}>
                        <Text style={styles.modeText}>Alert Mode</Text>
                        <Switch value={alertMode} onValueChange={onScheduleMode}></Switch> 
                    </View>
                </View>
            </View>
        </View>
    );
};

export default DeviceScreen;

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
        marginTop: 20,
        width: "100%",
        paddingTop: 40,
    },
    title: {
        marginTop: 0,
        marginLeft: 20,
        fontSize: 40,
        fontWeight: "bold",
        color: "#fff",
    },
    logo: {
        position: "absolute",
        width: 150,
        height: 150,
        right: -30,
        top: -5,
    },
    body: {
        flex: 5,
        padding: 20,
        width: "100%",
        flexDirection: "column",
    },
    manualConfig: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        width: "80%",
        alignSelf: "center",
        borderRadius: 15,
        overflow: "hidden",
        alignItems: "center",
        backgroundColor: "rgba(82, 61, 127, 0.5)",
        paddingLeft: 20,
        paddingRight: 20
    },
    modeText: {
        fontSize: 28,
        fontWeight: "bold",
    },
    autoConfig: {
        flex: 2,
        backgroundColor: "rgba(82, 61, 127, 0.5)",
        width: "80%",
        alignSelf: "center",
        borderRadius: 15,
        overflow: "hidden",
        marginTop: 20,
        flexDirection: "column",
        justifyContent: "flex-start",
        paddingLeft: 20,
        paddingRight: 20
    },
    popUpHeader: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    autoLight: {
        // flex: 1,
        // backgroundColor: "red",
        color: "white",
        fontSize: 18
    },
    lightSlide: {
        backgroundColor: 'rgba(82, 61, 127, 0.5)',
    },
    alertConfig: {
        flex: 1,
        backgroundColor: "rgba(82, 61, 127, 0.5)",
        width: "80%",
        alignSelf: "center",
        borderRadius: 15,
        overflow: "hidden",
        marginTop: 20,
        flexDirection: "column",
        paddingLeft: 20,
        paddingRight: 20
    },
    timeSet: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "flex-start",
    },
    timeText: {
        color: "white",
        fontSize: 40
    }
});