import React, { useEffect } from 'react';
import { DimensionValue, Image, Pressable, StyleSheet, SafeAreaView, Text, View, Keyboard, TouchableOpacity } from 'react-native';
import { CarData } from '../ts/types';
import Home from './Home';
import Car from '../popups/Car';
import { StylingDefaults } from '../ts/styles';

export interface PaymentProps {
    setPage: (view: JSX.Element) => void;
    setPopUp: (view: JSX.Element) => void;
    car: CarData;
    email?: string;
}

export default function PaymentSecond({setPage, setPopUp, car, email}: PaymentProps): JSX.Element {
    return (
        <View>
            <Text style={styles.pageTitle}>Reserve</Text>
            <Text style={styles.subTitle}>{car.manufacturer} {car.model} {car.year}</Text>
            <Text style={styles.header}>Information</Text>
            <View style={styles.vertSpacer}></View>
            <View style={styles.horizontalNav} >
                <TouchableOpacity style={styles.button} onPress={() => {
                    setPage(<Home setPopUp={setPopUp} setPage={setPage} selectedCar={car}/>)
                    setPopUp(<Car car={car} setPage={setPage} setPopUp={setPopUp}/>)
                }}>
                    <Text>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => {
                    setPage(<PaymentSecond setPopUp={setPopUp} setPage={setPage} car={car} email={email}/>)
                }}>
                    <Text>Next</Text>
                </TouchableOpacity>
            </View>
        </View>
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
        bottom: 0,
    },
    

})