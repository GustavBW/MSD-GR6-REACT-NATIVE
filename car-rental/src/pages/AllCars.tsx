import React from  'react';
import { StyleSheet, View, Text, Pressable } from 'react-native';
import { StylingDefaults } from '../ts/styles';
import { LinearGradient } from 'expo-linear-gradient';
import { Car } from '../ts/types';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import Home from './Home';

interface AllCars {
    cars: Car[];
    setPage: (view: JSX.Element) => void;
    setPopUp: (view: JSX.Element) => void;
}

export default function AllCars({cars, setPage, setPopUp}: AllCars){

    return (
        <View style={styles.container}>
            <Text style={styles.pageTitle}>All Cars</Text>
            <View style={styles.horizonalFlex}>
                <View style={styles.table}>
                    <View style={styles.tableHeader}>
                        <Text style={styles.tableHeaderText}>Model</Text>
                        <Text style={styles.tableHeaderText}>Kr/Km</Text>
                    </View>
                    <View style={styles.tableBody}>
                        {cars.map((car, index) => {
                            return (
                                <View key={index} style={styles.tableRow}>
                                    <Text style={styles.tableRowText}>{car.model}</Text>
                                    <Text style={styles.tableRowText}>{car.dkkPrKm}</Text>
                                </View>
                            )
                        })}
                    </View>
                </View>
                <View style={styles.xButtonSpacer}>
                    <Pressable onPress={() => setPage(<Home setPage={setPage} setPopUp={setPopUp} cars={cars}/>)}>
                        <FontAwesomeIcon icon={faCircleXmark} size={100} color="black" />
                    </Pressable>
                </View>
            </View>
            <LinearGradient
                colors={StylingDefaults.backgroundGradient}
                style={{...StyleSheet.absoluteFillObject, zIndex: -1}}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        height: '100%',
        width: '100%',
        justifyContent: "center",
        alignItems: "center"

    },
    pageTitle: {
        fontSize: 30,
        padding: 30,
        color: "white",
        textAlign: "center",
    },
    tableHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
        padding: 10,
        backgroundColor: StylingDefaults.colors.blueDark.hsl,
        borderRadius: 10,
        borderEndEndRadius: 0,
        borderEndStartRadius: 0,
    },
    horizonalFlex: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
        height: "80%",
    },
    table: {
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
        width: "85%",
        height: "100%",
    },
    tableHeaderText: {
        color: "white",
        fontSize: 20,
        fontWeight: "bold",
    },
    xButtonSpacer: {
        width: "20%",
        height: "100%",
        alignItems: "center",
    },
    tableBody: {
        width: "100%",
        height: "90%",
        backgroundColor: StylingDefaults.colors.blueDark.hsl,
        borderRadius: 10,
        borderTopEndRadius: 0,
        borderTopStartRadius: 0,
        overflow: "scroll",
        overflowX: "hidden",
    },
    tableRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
        padding: 10,
        backgroundColor: StylingDefaults.colors.blueBase.hsl,
        borderRadius: 10,
    },
    tableRowText: {
        color: "white",
        fontSize: 20,
    }
});