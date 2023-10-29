import React, { useEffect, Component } from 'react';
import { DimensionValue, Image, Pressable, StyleSheet, SafeAreaView, Text, View, Keyboard, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { CarData } from '../ts/types';
import Home from './Home';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faUser, faCreditCard, faCarSide } from '@fortawesome/free-solid-svg-icons'
import { faPaypal } from "@fortawesome/free-brands-svg-icons"
import Car from '../popups/Car';
import { StylingDefaults } from '../ts/styles';
import Confirmation from '../popups/Confirmation';
import { CreditCardInput, LiteCreditCardInput } from "react-native-credit-card-input";

const handlePayment = (formData) => {
    console.log(formData);
  };


export interface PaymentProps {
    setPage: (view: JSX.Element) => void;
    setPopUp: (view: JSX.Element) => void;
    car: CarData;
    email?: string;
}



export default function PaymentSecond({setPage, setPopUp, car, email}: PaymentProps): JSX.Element {
    const [destination, setDestination] = React.useState("destination");
    return (
        <SafeAreaView style={styles.container}>
          <ScrollView>
            <Text style={styles.pageTitle}>Reserve</Text>
            <Text style={styles.subTitle}>{car.manufacturer} {car.model} {car.year}</Text>
            <View style={styles.body}>
                <Text style={styles.header}>Destination</Text>
                <View style={styles.vertSpacer}></View>
                <TextInput
                        style={styles.input}
                        placeholder="Destination"
                        secureTextEntry={true}
                        onChangeText={(text) => setDestination(text)}
                    />
                <Text style={styles.header}>Card Payment</Text>
                <View style={styles.vertSpacer}></View>
                <View style={styles.cardContainer}>
                                                              <CreditCardInput
                                                                //autoFocus
                                                                requiresCVC
                                                                labelStyle={styles.labelcard}
                                                                inputStyle={styles.inputcard}
                                                                validColor="black"
                                                                invalidColor="red"
                                                                placeholderColor="white"
                                                                allowScroll
                                                                onChange={handlePayment}
                                                              />
                                                            </View>

                <Text style={styles.header}>Total</Text>
                <View style={styles.vertSpacer}></View>
                <Text style={styles.header}>238 dkk</Text>

                <View style={styles.horizontalNav} >
                    <TouchableOpacity style={styles.button} onPress={() => {
                        setPage(<Home setPopUp={setPopUp} setPage={setPage} selectedCar={car}/>)
                        setPopUp(<Car car={car} setPage={setPage} setPopUp={setPopUp}/>)
                    }}>
                        <Text>Cancel</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={() => {
                        setPage(<Home setPopUp={setPopUp} setPage={setPage} selectedCar={car}/>)
                        setPopUp(<Confirmation setPage={setPage} setPopUp={setPopUp} car={car}/>)
                    }}>
                        <Text>Confirm</Text>
                    </TouchableOpacity>
                </View>
            </View>
           </ScrollView>
        </SafeAreaView>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: '100%',
        width: '100%',
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: StylingDefaults.colors.blueDark.hsl,
    },
    pageTitle: {
        fontSize: StylingDefaults.fontSize.title,
        padding: 10,
        color: "white",
        textAlign: "center",
    },
    subTitle: {
        fontSize: StylingDefaults.fontSize.subTitle,
        padding: 20,
        color: "white",
        textAlign: "center",
    
    },
    header: {
        fontSize: StylingDefaults.fontSize.header,
        padding: 10,
        color: "white",
        textAlign: "left",
        width: "100%",
    },
    vertSpacer: {
        height: 1,
        width: '100%',
        borderWidth: 1,
        borderColor: "white"
    },
    body: {
        flex: 1,
        width: '100%',
        justifyContent: "center",
        alignItems: "center",
        padding: 10,
        backgroundColor: StylingDefaults.colors.blueDark.hsl,
    },
    input: {
        width: "100%",
        height: 50,
        borderColor: 'gray',
        borderRadius: 5,
        borderWidth: 1,
        padding: 10,
        margin: 10,
        backgroundColor: 'white',
        textAlign: "center"
    },
    button: {
        margin: 5,
        width: "100%",
        height: 40,
        borderRadius: 5,
        backgroundColor: StylingDefaults.colors.blueBase.hsl,
        padding: 8,
        alignItems: 'center',
        justifyContent: 'center'
    },
    horizontalNav: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        width: "50%",
        height: "10%",
        backgroundColor: "transparent",
        borderRadius: 10,
        marginTop: 20,
        bottom: 30,
        paddingTop: 20,
        paddingBottom: 10,
    },
    cardContainer: {
        backgroundColor: StylingDefaults.colors.blueDark.hsl,
        marginTop: 30,
        height: '40%',
        width: '80%',
        paddingBottom: 15,
      },
      labelcard: {
        color: "white",
        fontSize: 12,
      },
      inputcard: {
        fontSize: 16,
        color: "white",
      },
})