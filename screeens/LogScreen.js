import React, { useLayoutEffect, useState } from "react";
import { Text, View, StyleSheet, Image, ScrollView, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from 'expo-linear-gradient';
import Log from "../components/Log";
import { Ionicons } from '@expo/vector-icons';
import { useInterval } from "../utils/datahandle";
const USERNAME = "dungvo20csehcmut"
const KEY = 'aio_hpgx65JexxnCdL2s7puNYX12tr6S'
const LogScreen = () => {
    const navigation = useNavigation();
    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false,
        });
    }, []);
    const [logList, setLogList] = useState([])
    const [timeLog, setTimeLog] = useState([])
    const fetchLog = async () => {
		await fetch(`https://io.adafruit.com/api/v2/${USERNAME}/feeds/nutnhan1/data?limit=20`)
        .then((res) => res.json())
        .then((res) => {
            setLogList(res.map((item) => {
                return item["value"]
            }))
            setTimeLog(res.map((item) => {
                return item["created_at"]
            }))
        })
        .catch((e) => console.error(e));
    }
    const onRefresh = () => {
        fetchLog();
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
                <Text style={styles.title}>Activity Log</Text>
                <TouchableOpacity onPress={onRefresh}>
                        <Ionicons name='refresh' size={20} color='white'></Ionicons>
                </TouchableOpacity>
            </View>
            <View style={styles.logList}>
                <ScrollView>
                    {
                        logList.map((item, index) => {
                            return <Log key={index} status={item} time={timeLog[index]}></Log>
                        })
                    }
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
        paddingTop: 20,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingRight: 30
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