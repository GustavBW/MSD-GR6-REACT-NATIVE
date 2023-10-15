import React from  'react';
import { StyleSheet, View, Text, Pressable } from 'react-native';
import { StylingDefaults } from '../ts/styles';
import { Pages, StackProps } from '../ts/types';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import Car from '../popups/Car';
const data = [
    {
        model: "Model S",
        manufacturer: "Tesla",
        year: 2022,
        weightKg: 2100.7,
        dkkPrKm: 0.35,
        dimensions: [4979, 1964, 1445],
        lat: 34.0522,
        lon: -118.2437,
        available: true,
        id: 1001
    },
    {
        model: "Ariya",
        manufacturer: "Nissan",
        year: 2023,
        weightKg: 1800.2,
        dkkPrKm: 0.28,
        dimensions: [4680, 1858, 1665],
        lat: 40.7128,
        lon: -74.0060,
        available: true,
        id: 1002
    },
    {
        model: "Bolt EUV",
        manufacturer: "Chevrolet",
        year: 2023,
        weightKg: 1750.5,
        dkkPrKm: 0.32,
        dimensions: [4166, 1766, 1614],
        lat: 37.7749,
        lon: -122.4194,
        available: false,
        id: 1003
    },
    {
        model: "Mustang Mach-E",
        manufacturer: "Ford",
        year: 2023,
        weightKg: 1980.3,
        dkkPrKm: 0.31,
        dimensions: [4748, 1881, 1600],
        lat: 34.0522,
        lon: -118.2437,
        available: true,
        id: 1004
    },
    {
        model: "ID.4",
        manufacturer: "Volkswagen",
        year: 2022,
        weightKg: 1850.6,
        dkkPrKm: 0.29,
        dimensions: [4584, 1852, 1640],
        lat: 40.7128,
        lon: -74.0060,
        available: true,
        id: 1005
    },
    {
        model: "i3",
        manufacturer: "BMW",
        year: 2022,
        weightKg: 1245.8,
        dkkPrKm: 0.24,
        dimensions: [3999, 1775, 1578],
        lat: 37.7749,
        lon: -122.4194,
        available: false,
        id: 1006
    },
    {
        model: "e-tron",
        manufacturer: "Audi",
        year: 2023,
        weightKg: 2300.4,
        dkkPrKm: 0.37,
        dimensions: [4901, 1935, 1616],
        lat: 34.0522,
        lon: -118.2437,
        available: true,
        id: 1007
    },
    {
        model: "Kona Electric",
        manufacturer: "Hyundai",
        year: 2023,
        weightKg: 1675.9,
        dkkPrKm: 0.26,
        dimensions: [4180, 1800, 1570],
        lat: 40.7128,
        lon: -74.0060,
        available: true,
        id: 1008
    },
      {
        model: "Soul EV",
        manufacturer: "Kia",
        year: 2023,
        weightKg: 1620.2,
        dkkPrKm: 0.27,
        dimensions: [4195, 1800, 1600],
        lat: 37.7749,
        lon: -122.4194,
        available: false,
        id: 1009
    },
    {
        model: "I-PACE",
        manufacturer: "Jaguar",
        year: 2022,
        weightKg: 2135.6,
        dkkPrKm: 0.36,
        dimensions: [4682, 2139, 1565],
        lat: 34.0522,
        lon: -118.2437,
        available: true,
        id: 1010
    }];

export default function AllCars({ navigation, route }: StackProps<Pages.AllCars>): JSX.Element {
    const { cars, setPopUp } = route.params;
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
                        {data.map((car, index) => {         {/* INSERT CARS INSTEAD WHEN DATA FETCHING IS FIXED */}
                            return (
                                <Pressable key={index} style={styles.tableRow} onPress={() => setPopUp(<Car car={car} setPage={(ignored) => {}} setPopUp={setPopUp}></Car>)}>
                                    <Text style={styles.tableRowText}>{car.manufacturer}</Text>
                                    <Text style={styles.tableRowText}>{car.model}</Text>
                                    <Text style={styles.tableRowText}>{car.dkkPrKm}</Text>
                                </Pressable>
                            )
                        })}
                    </View>
                </View>
                <View style={styles.xButtonSpacer}>
                    <Pressable onPress={() => navigation.navigate(Pages.Home, {cars, setPopUp})}>
                        <FontAwesomeIcon icon={faCircleXmark} size={60} color="black" />
                    </Pressable>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        height: '100%',
        width: '100%',
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: StylingDefaults.colors.blueDark.hsl,
    },
    pageTitle: {
        fontSize: StylingDefaults.fontSize.title,
        padding: 30,
        color: "white",
        textAlign: "center",
    },

    horizonalFlex: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "80%",
    },
    table: {
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
        width: "80%",
        height: "100%",
    },
    tableHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
        padding: 10,
        backgroundColor: "transparent",
        borderBottomWidth: 2,
        borderEndEndRadius: 0,
        borderEndStartRadius: 0,
    },
    tableHeaderText: {
        color: "white",
        fontSize: 20,
        fontWeight: "bold",
    },
    xButtonSpacer: {
        width: "15%",
        height: "100%",
        alignItems: "center",
        paddingTop: "2%"
    },
    tableBody: {
        width: "100%",
        height: "90%",
        backgroundColor: "transparent",
        borderRadius: 10,
        overflow: "scroll",
    },
    tableRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
        height: "10%",
        padding: "5%",
        marginBottom: "5%",
        backgroundColor: "hsl(290, 80%, 30%)",
        borderRadius: 10,
    },
    tableRowText: {
        color: "white",
        fontSize: 20,
    }
});