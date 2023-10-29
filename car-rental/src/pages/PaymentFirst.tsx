import React, { useEffect } from 'react';
import { DimensionValue, Image, Pressable, StyleSheet, SafeAreaView, Text, View, Keyboard, TextInput } from 'react-native';
import { RefactoredStyles, StylingDefaults } from '../ts/styles';
import { CarData } from '../ts/types';
import { TouchableOpacity } from 'react-native';
import Scan from './Scan';
import Home from './Home';
import Car from '../popups/Car';
import PaymentSecond from './PaymentSecond';

export interface PaymentProps {
    setPage: (view: JSX.Element) => void;
    setPopUp: (view: JSX.Element) => void;
    car: CarData;
}

export default function PaymentFirst({setPage, setPopUp, car}: PaymentProps): JSX.Element {
    const [email, setEmail] = React.useState("email");

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.pageTitle}>Reserve</Text>
            <Text style={styles.subTitle}>{car.manufacturer} {car.model} {car.year}</Text>
            <Text style={styles.header}>Information</Text>
            <View style={styles.vertSpacer}></View>
            <View style={styles.body}>
                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    secureTextEntry={true}
                    onChangeText={(text) => setEmail(text)}
                />
                <TouchableOpacity style={styles.button} onPress={() => {
                    setPage(<Scan setPage={setPage} setPopUp={setPopUp}/>)
                }}>
                    <Text style={styles.buttonText}>Scan</Text>
                </TouchableOpacity>

                <View style={styles.horizontalNav} >
                    <TouchableOpacity style={styles.button} onPress={() => {
                        setPage(<Home setPopUp={setPopUp} setPage={setPage} selectedCar={car}/>)
                        setPopUp(<Car car={car} setPage={setPage} setPopUp={setPopUp}/>)
                    }}>
                        <Text style={styles.buttonText}>Cancel</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={() => {
                        setPage(<PaymentSecond setPopUp={setPopUp} setPage={setPage} car={car} email={email}/>)
                    }}>
                        <Text style={styles.buttonText}>Next</Text>
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
        fontWeight: RefactoredStyles.fontWeight.subtitle,
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
        color: RefactoredStyles.colors.white,
    },
    input: {
        width: "100%",
        height: 50,
        borderColor: RefactoredStyles.colors.black,
        borderRadius: RefactoredStyles.borderRadius.inputBorderRadius,
        borderWidth: 1,
        padding: 10,
        margin: 10,
        textAlign: "center",
        backgroundColor: RefactoredStyles.colors.white,
    },
    button: {
        margin: 5,
        width: "100%",
        height: 40,
        borderRadius: RefactoredStyles.borderRadius.buttonBorderRadius,
        backgroundColor: RefactoredStyles.colors.turquoiseLightBlue,
        padding: 8,
        alignItems: 'center',
        justifyContent: 'center',
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