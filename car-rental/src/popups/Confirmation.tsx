import React, { useEffect } from 'react';
import { DimensionValue, Image, Pressable, StyleSheet, SafeAreaView, Text, View, Keyboard, Modal, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { RefactoredStyles, StylingDefaults } from '../ts/styles';
import { CarData } from '../ts/types';


export interface ConfirmationProps {
    setPage: (view: JSX.Element) => void;
    setPopUp: (view: JSX.Element) => void;
    car: CarData;
}

export default function Confirmation({setPage, setPopUp, car}: ConfirmationProps): JSX.Element {
    return (
        <View>
            <Modal animationType="slide"  transparent={true}>
                <LinearGradient colors={RefactoredStyles.subGradient} style={styles.modal}>   
                    <View>
                        {/* Car name */}
                        <Text style={styles.modalHeader}>{car.manufacturer} {car.model}</Text>

                        {/* Image of car */}

                        {/* Confirmation */}
                        <Text style={styles.modalHeader}>Purchase Complete!</Text>

                        <TouchableOpacity style={styles.button}>
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