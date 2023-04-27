import { StyleSheet, Text, View } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react'

export default function Log() {
  return (
    <View style={styles.item}>
        <LinearGradient
        colors={['#957DCD', 'transparent']}
        style={styles.background} />
        <View style={styles.itemTop}>
            <Text style={styles.itemStatus}>Status: On</Text>
            <Text style={styles.itemMode}>Mode: Auto</Text>
        </View>
        <Text style={styles.itemBottom}>Adjusted Time: Friday, 26 August 2022 | 10:00</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    background: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        height: "100%",
    },
    item: {
        width: "80%",
        alignSelf: "center",
        flexDirection: "column",
        height: 80,
        marginBottom: 10,
        paddingTop: 10,
        borderRadius: 15,
        overflow: "hidden",
        backgroundColor: "rgba(82, 61, 127, 0.5)",
    },
    itemTop: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
    },
    itemStatus: {
        color: "white",
        marginLeft:30,
    },
    itemMode: {
        color: "white",
        marginRight: 30,
    },
    itemBottom: {
        flex: 1,
        marginBottom: 0,
        alignSelf: "center",
        color: "white"
    }
})