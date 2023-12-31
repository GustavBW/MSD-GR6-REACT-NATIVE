import React, { useEffect } from 'react';
import { DimensionValue, Image, Pressable, StyleSheet, SafeAreaView, Text, View, Keyboard, Modal, TouchableOpacity } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons'
import { CarData } from '../ts/types';
import { LinearGradient } from 'expo-linear-gradient';
import { RefactoredStyles, StylingDefaults } from '../ts/styles';
import Confirmation from '../popups/Confirmation';
import { Menu } from './Menu';
import Home from '../pages/Home';
import storage, {KnownKeys} from '../ts/storage';
import PaymentSecond from '../pages/PaymentSecond';
import PaymentFirst from '../pages/PaymentFirst';

export interface CarProps {
    setPage: (view: JSX.Element) => void;
    setPopUp: (view: JSX.Element) => void;
    car: CarData;
}

export default function Car({setPage, setPopUp, car}: CarProps): JSX.Element {
    const [isLoggedIn, setLoggedIn] = React.useState("false");


    return (
        <View>
            <Modal animationType="slide"  transparent={true}>
                <LinearGradient colors={RefactoredStyles.subGradient} style={styles.modal}>   
                    <View style={styles.closeButton}>
                        <Pressable onPress={()=>setPopUp(<></>)}>
                            <FontAwesomeIcon icon={faCircleXmark} size={RefactoredStyles.iconSize} color={RefactoredStyles.colors.white}/>
                        </Pressable>
                    </View> 
                    <View>
                        {/* Information about car */}
                        <Text style={styles.modalHeader}>Information</Text>
                        <Text style={styles.modalText}>{car.manufacturer}</Text>
                        <Text style={styles.modalText}>{car.model}</Text>
                        <Text style={styles.modalText}>{car.year}</Text>
                        <Text style={styles.modalText}>{car.weightKg}</Text>
                        <Text style={styles.modalText}>{car.dimensions}</Text>

                        {/* Price pr. km */}
                        <Text style={styles.modalHeader}>Price pr. km</Text>
                        <Text style={styles.modalText}>{car.dkkPrKm} dkk</Text>
                    </View>
                    <View style={styles.row}>
                    <TouchableOpacity style={styles.button} onPress={() => {
                        setPage(<Home setPopUp={setPopUp} setPage={setPage} selectedCar={car}/>)
                    }}>
                        <Text style={styles.modalText}>Map</Text>
                    </TouchableOpacity>                    
                    <TouchableOpacity style={styles.button} onPress={() => {
                        if(isLoggedIn == "true"){
                            setPage(<PaymentSecond setPage={setPage} setPopUp={setPopUp} car={car}/>)
                            return;
                        }
                        setPage(<PaymentFirst setPage={setPage} setPopUp={setPopUp} car={car} />)
                    }}>
                        <Text style={styles.modalText}>Reserve</Text>
                    </TouchableOpacity>                
                </View>
                </LinearGradient>
            </Modal>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modal: {
        flexDirection :'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: '70%',
        padding: 10,
        top: "40%",
        alignSelf: "center",
        borderRadius: RefactoredStyles.borderRadius.defaultBorderRadius,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: '50%',
    },
    closeButton: {
        zIndex: 1,
        position: "absolute",
        top: "0%",
        right: "1%",
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    modalText: {
        fontSize: RefactoredStyles.fontSize.bodyText,
        color: RefactoredStyles.colors.white,
        fontWeight: RefactoredStyles.fontWeight.bodyText,
    },
    modalHeader: {
        fontSize: RefactoredStyles.fontSize.subtitle,
        color: RefactoredStyles.colors.white,
        fontWeight: RefactoredStyles.fontWeight.subtitle,
    },
    button: {
        margin: 'auto',
        marginRight: '10%',
            width: 100,
            height: 40,
            backgroundColor: RefactoredStyles.colors.turquoiseLightBlue,
            borderRadius: RefactoredStyles.borderRadius.buttonBorderRadius,
            marginBottom: 10,
            padding: 8,
            alignItems: 'center',
            justifyContent: 'center'
        }
  });