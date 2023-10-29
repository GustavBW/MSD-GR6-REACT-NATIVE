import React, { useEffect } from 'react';
import { DimensionValue, Image, Pressable, StyleSheet, SafeAreaView, Text, View, Keyboard, Modal, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { StylingDefaults } from '../ts/styles';
import { CarData } from '../ts/types';
import Home from '../pages/Home';


export interface ConfirmationProps {
    setPage: (view: JSX.Element) => void;
    setPopUp: (view: JSX.Element) => void;
    car: CarData;
}

export default function Confirmation({setPage, setPopUp, car}: ConfirmationProps): JSX.Element {
    return (
        <View>
            <Modal animationType="slide"  transparent={true}>
                <LinearGradient colors={[StylingDefaults.colors.blueBase.hsl, StylingDefaults.colors.blueDark.hsl]} style={styles.modal}>   
                    <View>
                        {/* Car name */}
                        <Text style={styles.modalHeader}>{car.manufacturer} {car.model}</Text>

                        {/* Image of car */}

                        {/* Confirmation */}
                        <Text style={styles.modalHeader}>Purchase Complete!</Text>

                        <TouchableOpacity style={styles.button} onPress={() => {
                            setPopUp(<></>);
                            setPage(<Home setPage={setPage} setPopUp={setPopUp} selectedCar={car} />);
                        }}>
                            <Text style={styles.modalText}>To Car</Text>
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
        alignSelf: "center"
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
        fontSize: 20,
        color: 'white',
        fontWeight: 'bold',
    },
    modalHeader: {
        fontSize: 30,
        color: 'white',
        fontWeight: 'bold',
    },
    button: {
        margin: 'auto',
            width: 100,
            height: 40,
            backgroundColor: 'rgb(70,88,129)',
            borderRadius: 15,
            marginBottom: 10,
            padding: 8,
            alignItems: 'center',
            justifyContent: 'center'
        }
  });