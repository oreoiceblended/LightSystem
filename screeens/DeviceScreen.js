import React, { useLayoutEffect, useState } from "react";
import {
    Text,
    View,
    StyleSheet,
    Image,
    Switch,
    TextInput,
    TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from 'expo-linear-gradient';
import {Slider} from '@miblanchard/react-native-slider';
import { MaterialCommunityIcons} from '@expo/vector-icons';
const DeviceScreen = () => {
    const navigation = useNavigation();
    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false,
        });
    }, []);
    const [lightThreshold, setlightThreshold] = useState(50)
    const [hour, sethour] = useState("00");
    const [min, setmin] = useState("00")
    const [scheduledMode, setScheduledMode] = useState(true);
    const onPress = () => {
        const newMode = !scheduledMode
        setScheduledMode(newMode);
    }
    const iconName = scheduledMode ? "lightbulb-on-outline" : "lightbulb-outline";
    const iconSize = scheduledMode ? 40 : 38;
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
                    <Switch></Switch>
                </View>
                <View style={styles.autoConfig}>
                <LinearGradient
                colors={['#957DCD', 'transparent']}
                style={styles.background} />
                    <View style={styles.popUpHeader}>
                        <Text style={styles.modeText}>Auto</Text>
                        <Switch></Switch> 
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
                <View style={styles.scheduledConfig}>
                <LinearGradient
                colors={['#957DCD', 'transparent']}
                style={styles.background}/>
                    <View style={styles.popUpHeader}>
                        <Text style={styles.modeText}>Scheduled</Text>
                        <Switch></Switch> 
                    </View>
                    <View style={styles.timeSet}>
                        <TouchableOpacity style={{marginRight: 20, marginTop: 5}} onPress={onPress}>
                            <MaterialCommunityIcons name={iconName} size={iconSize} color="white" />
                        </TouchableOpacity>
                        <TextInput
                            style={styles.timeText}
                            keyboardType={"numeric"}
                            value={hour}
                            placeholder={"00"}
                            onChange={hour => sethour(hour)}
                        />
                        <Text style={styles.timeText}>{":"}</Text>
                        <TextInput
                            style={styles.timeText}
                            keyboardType={"numeric"}
                            value={min}
                            placeholder={"00"}
                            onChange={min => setmin(min)}
                        />
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
    scheduledConfig: {
        flex: 2,
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