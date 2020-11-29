import React  from 'react'
import {View, Text, StyleSheet,Image, TextInput, TouchableOpacity, ScrollView } from "react-native";
import  firebase from 'firebase'

export  default class LoginScreen extends React.Component{
    static navigationOptions={
        headerShown: false
    };
    state= {
        email:"",
        password: "",
        errorMessage: "",
        loading: false
    };
    handleLogin= () => {
        firebase
            .auth()
            .signInWithEmailAndPassword(this.state.email, this.state.password)
            .then(this.onLoginSuccess)
            .catch(error => this.setState({errorMessage: error.message}));
    };
    onLoginSuccess = () =>{
        this.setState({
            error:'',
            loading: false
        })
    };

    render() {
        return (
        <ScrollView>
            <View style = {styles.container}>

                <Image source={require("../assets/complaint.png")}
                 style={{marginTop: 40, alignSelf: "center", height: 100, width: 100}}/>
                <View>
                    <Text style={styles.greeting}>Covid App</Text>
                </View>
                <View style={styles.errorMessage}>
                  <Text style={styles.error}>{this.state.errorMessage}</Text>
                </View>

                <View style={styles.form}>
                    <View>
                        <Text style={styles.inputTitle}>Email Address</Text>
                        <TextInput style={styles.input} onChangeText={email => this.setState({email})} value={this.state.email}/>
                    </View>
                    <View style={{marginTop: 32 }}>
                        <Text style={styles.inputTitle}>Password</Text>
                        <TextInput
                            style={styles.input}
                            autoCapitalize = "none"
                            onChangeText={password => this.setState({password})}
                            value={this.state.password}/>
                    </View>
                </View>
                <TouchableOpacity style={styles.button} onPress={this.handleLogin} >
                    <Text style={{textAlign: "center", color: "#FFF", fontWeight: "500", fontSize: 20}}>Sign In</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{alignSelf: "center", marginTop: 32}} onPress={() => this.props.navigation.navigate("Register")} >
                    <Text style={{color: "#414959", fontSize: 13}}>
                        No Account? <Text style={{fontWeight: "500", color: "#b38e3e"}}> Sign Up</Text>
                    </Text>
                </TouchableOpacity>

            </View>
        </ScrollView>



        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    greeting:{
        marginTop: 20,
        fontSize: 18,
        fontWeight: "400",
        textAlign: "center"
    },
    errorMessage:{
        height: 72,
        alignItems: "center",
        justifyContent: "center",
        marginHorizontal: 30,
        marginTop: -20
    },
    form:{
        marginBottom: 48,
        marginHorizontal: 30,
        marginTop: -30
    },
    inputTitle:{
        color: "#8A8F9E",
        fontSize: 10,
        textTransform : "uppercase"
    },
    input:{
        borderBottomColor: "#8A8F9E",
        borderRadius: 5,
        height: 40,
        fontSize: 15,
        color: "#161F3D",
        backgroundColor: 'rgba(255,255,255,.5)'
    },
    error:{
        color: "#E9446A",
        fontSize: 13,
        fontWeight: "600",
        textAlign: "center"
    },
    button:{
        marginHorizontal:30,
        backgroundColor: "#b38e3e",
        borderRadius: 8,
        padding: 15,
        height: 52,
        alignItems: "center",
        justifyContent: "center"

    }
});
