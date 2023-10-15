import React from "react";
import { SafeAreaView, TextInput, View,StyleSheet, Pressable, Text, Modal, TouchableOpacity } from "react-native"
import { LinearGradient } from 'expo-linear-gradient';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import {faCarSide, faCircleInfo, faPhone, faFileInvoiceDollar, faCircleXmark } from '@fortawesome/free-solid-svg-icons'
import { StylingDefaults } from '../ts/styles';
import { CarData, NavigationHook, Pages } from "../ts/types";

export interface MenuProps {
    setPopUp: (view: JSX.Element) => void;
    cars: CarData[];
    navigation: NavigationHook;
}

export function Menu({navigation, setPopUp, cars}: MenuProps){

    return(
        <View style={styles.container}>
        <Modal animationType="slide"  transparent={true}>
            <View style={styles.closeButton}>
                <Pressable style={styles.button} onPress={()=>setPopUp(<></>)}>
                    <FontAwesomeIcon icon={faCircleXmark} size={StylingDefaults.iconSize} color={StylingDefaults.colors.blueBase.hsl}/>
                </Pressable>
            </View>
            <LinearGradient colors={[StylingDefaults.colors.blueBase.hsl, StylingDefaults.colors.blueDark.hsl]} style={styles.modal}>
                <View style={styles.row}>
                    <Pressable style={styles.button} onPress={() => navigation.navigate(Pages.AllCars, {cars, setPopUp})}>
                        <FontAwesomeIcon icon={faCarSide} size={StylingDefaults.iconSize} color={StylingDefaults.colors.blueBase.hsl}/>
                        <Text style={styles.modalText}>All Cars</Text>
                    </Pressable>
                    <Pressable style={styles.button}>
                        <FontAwesomeIcon icon={faFileInvoiceDollar} size={StylingDefaults.iconSize} color={StylingDefaults.colors.blueBase.hsl}/>
                        <Text style={styles.modalText}>Invoices</Text>
                    </Pressable>                
                </View>
                {/* Bottom row */}
                <View style={styles.row}>
                    <Pressable style={styles.button}>
                        <FontAwesomeIcon icon={faCircleInfo} size={StylingDefaults.iconSize} color={StylingDefaults.colors.blueBase.hsl}/>
                        <Text style={styles.modalText}>Info</Text>
                    </Pressable>                    
                    <Pressable style={styles.button}>
                        <FontAwesomeIcon icon={faPhone} size={StylingDefaults.iconSize} color={StylingDefaults.colors.blueBase.hsl}/>
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
        width: '60%',
        height: '30%',
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
        top: "35%",
        left: "25%",
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    modalText: {
        fontSize: 20,
        color: 'white',
        fontWeight: 'bold',
    },
    button: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        padding: "10%"
    }
  });


