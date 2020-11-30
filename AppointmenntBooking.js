import React  from 'react'
import {View, Text, StyleSheet,Image, TextInput, TouchableOpacity, ScrollView } from "react-native";


export  default class AppointmenntBooking extends React.Component{
   

    render() {
        return (
        <ScrollView>
            <View style = {styles.container}>

                <View>
                    <Text style={styles.greeting}>Covid App</Text>
                </View>
                
                <TouchableOpacity style={styles.button} onPress={this.handleBooking} >
                    <Text style={{textAlign: "center", color: "#FFF", fontWeight: "500", fontSize: 20}}>Book An appointment</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{alignSelf: "center", marginTop: 32}} onPress={() => this.props.navigation.navigate("Booking")} >
                    <Text style={{color: "#414959", fontSize: 13}}>
                        No Account? <Text style={{fontWeight: "500", color: "#b38e3e"}}> Manage Booking</Text>
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
