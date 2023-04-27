import React, { useLayoutEffect } from "react";
import { Text, View, StyleSheet, Image, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from 'expo-linear-gradient';
import Log from "../components/Log";
const LogScreen = () => {
    const navigation = useNavigation();
    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false,
        });
    }, []);
    return (
        <View style={styles.container}>
            <LinearGradient
                // Background Linear Gradient
                colors={['#5A46FF', 'transparent']}
                start={[1, 0]} end={[0, 0.6]} location={[0.15, 0.3, 0.6]}
                style={styles.background}
            />
            <View style={styles.header}>
                <Text style={styles.title}>Activity Log</Text>
                <Image style={styles.logo} source={require("../assets/download1.png")} />
            </View>
            <View style={styles.logList}>
                <ScrollView>
                    <Log></Log>
                    <Log></Log>
                    <Log></Log>
                    <Log></Log>
                    <Log></Log>
                    <Log></Log>
                    <Log></Log>
                    <Log></Log>
                    <Log></Log>
                </ScrollView>
            </View>
        </View>
    );
};

export default LogScreen;

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
    logList: {
        flex: 5,
        padding: 0,
        width: "100%",
        flexDirection: "column",
        justifyContent: "flex-start",
        
    },
});