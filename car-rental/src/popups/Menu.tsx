import React from "react";
import { SafeAreaView, TextInput, View,StyleSheet, Pressable, Text, Modal, TouchableOpacity } from "react-native"
import { Button, Icon } from 'react-native-elements';
import { LinearGradient } from 'expo-linear-gradient';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import {faCarSide, faCircleInfo, faPhone, faFileInvoiceDollar, faCircleXmark } from '@fortawesome/free-solid-svg-icons'
import { RefactoredStyles, StylingDefaults } from '../ts/styles';
import AllCars from "../pages/AllCars";
import { CarData } from "../ts/types";

export interface MenuProps {
    setPage: (view: JSX.Element) => void;
    setPopUp: (view: JSX.Element) => void;
    cars: CarData[];
}

export function Menu({setPage, setPopUp, cars}: MenuProps){
    return(
        <View style={styles.container}>
        <Modal animationType="slide"  transparent={true}>
            <LinearGradient colors={RefactoredStyles.subGradient} style={styles.modal}>
                <View style={styles.closeButton}>
                    <Pressable onPress={()=>setPopUp(<></>)}>
                        <FontAwesomeIcon icon={faCircleXmark} size={RefactoredStyles.iconSize} color={RefactoredStyles.colors.white}/>
                    </Pressable>
                </View> 
                <View style={styles.row}>
                    <Pressable style={styles.button} onPress={() => setPage(<AllCars setPage={setPage} setPopUp={setPopUp} cars={cars}/>)}>
                        <FontAwesomeIcon icon={faCarSide} size={RefactoredStyles.iconSize} color={RefactoredStyles.colors.white}/>
                        <Text style={styles.modalText}>All Cars</Text>
                    </Pressable>
                    <Pressable style={styles.button}>
                        <FontAwesomeIcon icon={faFileInvoiceDollar} size={RefactoredStyles.iconSize} color={RefactoredStyles.colors.white}/>
                        <Text style={styles.modalText}>Invoices</Text>
                    </Pressable>                
                </View>
                {/* Bottom row */}
                <View style={styles.row}>
                    <Pressable style={styles.button}>
                        <FontAwesomeIcon icon={faCircleInfo} size={RefactoredStyles.iconSize} color={RefactoredStyles.colors.white}/>
                        <Text style={styles.modalText}>Info</Text>
                    </Pressable>                    
                    <Pressable style={styles.button}>
                        <FontAwesomeIcon icon={faPhone} size={RefactoredStyles.iconSize} color={RefactoredStyles.colors.white}/>
                        <Text style={styles.modalText}>Support</Text>
                    </Pressable>                
                </View>
            </LinearGradient>
                {/* Top row */}
            
            
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
        padding: 20,
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
        top: "1%",
        left: "99%",
        flexDirection: 'row',
        justifyContent: 'flex-end'    
    },
    modalText: {
        fontSize: RefactoredStyles.fontSize.subtitle,
        color: RefactoredStyles.colors.white,
        fontWeight: RefactoredStyles.fontWeight.subtitle,
    },
    button: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        padding: "10%"
    }
  });


