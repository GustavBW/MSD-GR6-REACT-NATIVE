import React from  'react';
import { StyleSheet, View, Text, Pressable, ScrollView, FlatList } from 'react-native';
import { RefactoredColors, RefactoredStyles, StylingDefaults } from '../ts/styles';
import { LinearGradient } from 'expo-linear-gradient';
import { CarData } from '../ts/types';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import Home from './Home';
import Car from '../popups/Car';

interface AllCars {
    cars: CarData[];
    setPage: (view: JSX.Element) => void;
    setPopUp: (view: JSX.Element) => void;
}

export default function AllCars({cars, setPage, setPopUp}: AllCars){

    const getTableRow = (car: CarData, index: number) => {
        return (
            <Pressable key={index} style={styles.tableRow} onPress={() => setPopUp(<Car car={car} setPage={setPage} setPopUp={setPopUp}></Car>)}>
                <Text style={styles.tableRowText}>{car.manufacturer}</Text>
                <Text style={styles.tableRowText}>{car.model}</Text>
                <Text style={styles.tableRowText}>{car.dkkPrKm}</Text>
            </Pressable>
        )
    };

    return (
        <View style={styles.container}>
            <Text style={styles.pageTitle}>All Cars</Text>
            <View style={styles.horizonalFlex}>
                <View style={styles.table}>
                    <View style={styles.tableHeader}>
                        <Text style={styles.tableHeaderText}>Manufacturer</Text>
                        <Text style={styles.tableHeaderText}>Model</Text>
                        <Text style={styles.tableHeaderText}>Kr/Km</Text>   
                    </View>
                    <FlatList style={styles.tableBody}
                        data={cars}
                        renderItem={({item, index}) => getTableRow(item, index)}
                        keyExtractor={item => item.id.toString()}
                    />
                </View>
                <View style={styles.xButtonSpacer}>
                    <Pressable onPress={() => setPage(<Home setPage={setPage} setPopUp={setPopUp}/>)}>
                        <FontAwesomeIcon icon={faCircleXmark} size={60} color="white" />
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
        backgroundColor: RefactoredStyles.colors.turquoiseBaseBlue,
    },
    pageTitle: {
        fontSize: RefactoredStyles.fontSize.title,
        padding: 30,
        color: RefactoredStyles.colors.white,
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
        padding: "2%",
        flex: 1,
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
        marginBottom: "5%",
        padding: 10,
        backgroundColor: "transparent",
        borderBottomWidth: 2,
        borderEndEndRadius: 0,
        borderEndStartRadius: 0,
    },
    tableHeaderText: {
        color: RefactoredStyles.colors.white,
        fontSize: RefactoredStyles.fontSize.subtitle,
        fontWeight: RefactoredStyles.fontWeight.subtitle,
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
        borderRadius: RefactoredStyles.borderRadius.buttonBorderRadius,
        overflow: "scroll",
    },
    tableRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
        padding: "5%",
        marginBottom: "5%",
        backgroundColor: RefactoredStyles.colors.turquoiseLightBlue,
        borderRadius: RefactoredStyles.borderRadius.buttonBorderRadius,
    },
    tableRowText: {
        color: RefactoredStyles.colors.white,
        fontSize: RefactoredStyles.fontSize.buttonText,
        fontWeight: RefactoredStyles.fontWeight.buttonText,
    }
});