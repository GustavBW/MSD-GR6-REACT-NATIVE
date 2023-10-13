import React from "react";
import { SafeAreaView, TextInput, View,StyleSheet, Pressable, Text, Modal, TouchableOpacity } from "react-native"
import { Button, Icon } from 'react-native-elements';
import { LinearGradient } from 'expo-linear-gradient';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import {faCarSide, faCircleInfo, faPhone, faFileInvoiceDollar, faCircleXmark } from '@fortawesome/free-solid-svg-icons'
import { StylingDefaults } from '../ts/styles';

export interface MenuProps {
    setPage: (view: JSX.Element) => void;
    setPopUp: (view: JSX.Element) => void;
}

export function Menu({setPage, setPopUp}: MenuProps){
    return(
        <View style={styles.container}>
        <Modal animationType="slide" style={styles.modal} transparent={true}>
            <LinearGradient colors={[StylingDefaults.colors.blueBase.hsl, StylingDefaults.colors.blueDark.hsl]} style={styles.table}>
                <View style={styles.row}>
                    <Pressable style={styles.button}>
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
            
            {/* Circular "X" button in the top right corner */}
            <View style={styles.closeButton}>
                <Pressable style={styles.button} onPress={()=>setPopUp(<></>)}>
                    <FontAwesomeIcon icon={faCircleXmark} size={StylingDefaults.iconSize} color={StylingDefaults.colors.blueBase.hsl}/>
                </Pressable>
            </View>
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
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 'auto',
        marginBottom: 'auto',         
        borderRadius: 15,
        paddingHorizontal: '5%',
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    closeButton: {
        position: 'absolute',
        flex: 1,
        top: "20%",
        right: "1%",
    },
    table: {
        zIndex: 0,
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%',
    },
    modalText: {
        fontSize: 20,
        padding: "5%",
        textAlign: 'center',
        color: 'white',
        fontWeight: 'bold',
    },
    button: {
        zIndex: 1,
        padding: 30,
        alignItems: 'center',
        justifyContent: 'center',
    }
  });


