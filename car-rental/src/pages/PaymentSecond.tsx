import React, { useEffect } from 'react';
import { DimensionValue, Image, Pressable, StyleSheet, SafeAreaView, Text, View, Keyboard, TouchableOpacity, TextInput } from 'react-native';
import { CarData } from '../ts/types';
import Home from './Home';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faUser, faCreditCard, faCarSide } from '@fortawesome/free-solid-svg-icons'
import { faPaypal } from "@fortawesome/free-brands-svg-icons"
import Car from '../popups/Car';
import { RefactoredColors, RefactoredStyles, StylingDefaults } from '../ts/styles';
import Confirmation from '../popups/Confirmation';

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
            <Text style={styles.pageTitle}>Reserve</Text>
            <Text style={styles.subTitle}>{car.manufacturer} {car.model} {car.year}</Text>
            <View style={styles.body}>
                <Text style={styles.header}>Destination</Text>
                <View style={styles.vertSpacer}></View>
                <TextInput
                        style={styles.input}
                        placeholder="Destination"
                        onChangeText={(text) => setDestination(text)}
                    />
                <Text style={styles.header}>Payment Method</Text>
                <View style={styles.vertSpacer}></View>
                <View style={{
                    width: "100%",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-evenly",
                    padding: 10
                }}>
                    <FontAwesomeIcon icon={faPaypal} size={StylingDefaults.iconSize} color={StylingDefaults.colors.blueBase.hsl} />
                    <FontAwesomeIcon icon={faCreditCard} size={StylingDefaults.iconSize} color={StylingDefaults.colors.blueBase.hsl} />
                    <FontAwesomeIcon icon={faUser} size={StylingDefaults.iconSize} color={StylingDefaults.colors.blueBase.hsl} />
                </View>

                <Text style={styles.header}>Total</Text>
                <View style={styles.vertSpacer}></View>
                <Text style={styles.header}>238 dkk</Text>

                <View style={styles.horizontalNav} >
                    <TouchableOpacity style={styles.button} onPress={() => {
                        setPage(<Home setPopUp={setPopUp} setPage={setPage} selectedCar={car}/>)
                        setPopUp(<Car car={car} setPage={setPage} setPopUp={setPopUp}/>)
                    }}>
                        <Text style={styles.buttonText}>Cancel</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={() => {
                        setPage(<Home setPopUp={setPopUp} setPage={setPage} selectedCar={car}/>)
                        setPopUp(<Confirmation setPage={setPage} setPopUp={setPopUp} car={car}/>)
                    }}>
                        <Text style={styles.buttonText}>Confirm</Text>
                    </TouchableOpacity>
                </View>
            </View>
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
        backgroundColor: RefactoredStyles.colors.turquoiseBaseBlue,
    },
    pageTitle: {
        fontSize: RefactoredStyles.fontSize.title,
        padding: 10,
        color: RefactoredStyles.colors.white,
        textAlign: "center",
    },
    subTitle: {
        fontSize: RefactoredStyles.fontSize.subtitle,
        padding: 20,
        color: RefactoredStyles.colors.white,
        textAlign: "center",
    
    },
    header: {
        fontSize: RefactoredStyles.fontSize.subtitle,
        padding: 10,
        color: RefactoredStyles.colors.white,
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
        backgroundColor: RefactoredStyles.colors.turquoiseBaseBlue,
    },
    input: {
        width: "100%",
        height: 50,
        borderColor: RefactoredStyles.colors.black,
        borderRadius: RefactoredStyles.borderRadius.inputBorderRadius,
        borderWidth: 1,
        padding: 10,
        margin: 10,
        backgroundColor: RefactoredStyles.colors.white,
        textAlign: "center"
    },
    button: {
        margin: 5,
        width: "100%",
        height: 40,
        borderRadius: RefactoredStyles.borderRadius.buttonBorderRadius,
        backgroundColor: RefactoredStyles.colors.turquoiseLightBlue,
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
        borderRadius: RefactoredStyles.borderRadius.defaultBorderRadius,
        bottom: 0,
    },
    buttonText: {
        color: RefactoredStyles.colors.white,
        fontWeight: RefactoredStyles.fontWeight.buttonText,
        fontSize: RefactoredStyles.fontSize.buttonText,
    }

})