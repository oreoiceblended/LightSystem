import React, { useLayoutEffect, useState } from "react";
import { useFonts } from 'expo-font';
import { useNavigation } from "@react-navigation/native";
// import * as SplashScreen from 'expo-splash-screen';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TextInput,
    TouchableOpacity,
} from "react-native";

const LoginScreen = () => {
    const navigation = useNavigation();

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false,
        });
    }, []);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [fontsLoaded] = useFonts({
        Gotham : require('../assets/fonts/SVN-Gotham-Bold.otf'),
    });
    const signIn = async e => {
        e.preventDefault();
        // try {
        //   const body = {'username' : username, 'password' : password};
        //   await fetch('http://192.168.3.59:5000/signin', {
        //     method: 'POST',
        //     headers: {"Content-Type" : "application/json"},
        //     body: JSON.stringify(body)
        //   }).then(async (res) => {
        //     console.log(await res.json());
        //   });
        // } catch (error) {
        //   console.error(error.message);
        // }
        navigation.navigate("Dashboard");
    };
    const signUp = async e => {
        e.preventDefault();
        try {
            const body = {'username' : username, 'password' : password};
            const response = await fetch('http://192.168.3.59:5000/accounts', {
                method: 'POST',
                headers: {"Content-Type" : "application/json"},
                body: JSON.stringify(body)
            });
            console.log(JSON.stringify(response));
        } catch (error) {
            console.error(error.message);
        }
    }
    if (!fontsLoaded) {
        return null;
    }
    return (
        <View style={styles.container}>
            <Image style={styles.logo} source={require("../assets/download1.png")} />
            <View style={styles.appName}>
                <Text style={styles.nameText}>BITEXCO</Text>
            </View>
            <View style={styles.inputView}>
                <TextInput
                    style={styles.textInput}
                    placeholder="Username"
                    onChangeText={(username) => setUsername(username)}
                />
            </View>
            <View style={styles.inputView}>
                <TextInput
                    style={styles.textInput}
                    placeholder="Password"
                    secureTextEntry={true}
                    onChangeText={(password) => setPassword(password)}
                />
            </View>
            <TouchableOpacity>
                <Text style={styles.forgot_button}>Forgot Password?</Text>
            </TouchableOpacity>
            <View style={styles.buttons}>
                <TouchableOpacity style={styles.signupBtn} onPress={signUp}>
                    <Text style={styles.signupText}>Sign up</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.signinBtn} onPress={signIn}>
                    <Text style={styles.signinText}>Sign in</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}
export default LoginScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F7F9FA",
        alignItems: "center",
        justifyContent: "center",
    },
    logo: {
        marginBottom: 0
    },
    appName: {
        marginBottom: 60
    },
    nameText: {
        fontFamily: 'Gotham',
        fontSize: 30,
        color: "#FF1493",
    },
    inputView: {
        backgroundColor: "#FFF",
        borderRadius: 30,

        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 3,

        width: "70%",
        height: 45,
        marginBottom: 20
    },
    textInput: {
        placeholderTextColor: "#003f5c",
        height: 50,
        flex: 1,
        paddingLeft: 25,
    },
    forgot_button: {
        height: 30,
        marginBottom: 30,
    },
    buttons: {
        flexDirection: 'row',
        width: "60%",
        justifyContent: 'space-between'
    },
    signupBtn: {
        width: "48%",
        borderColor: "#FF1493",
        borderWidth: 1,
        borderRadius: 20,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 10,
        backgroundColor: "#fff",
    },
    signupText: {
        color: "#FF1493",
        fontWeight: "bold",
    },
    signinText: {
        color: "#FFF",
        fontWeight: "bold"
    },
    signinBtn: {
        width: "48%",
        borderRadius: 20,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 10,
        backgroundColor: "#FF1493",
    },
});