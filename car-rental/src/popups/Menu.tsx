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
        <View>
            <Modal animationType="slide" style={styles.container} transparent={true}>
            <LinearGradient colors={['#3498db', '#2ecc71']} style={styles.modal}>
                {/* Top row */}
                <View style={styles.row}>
                    <Pressable style={styles.button}>
                        <FontAwesomeIcon icon={faCarSide} size={StylingDefaults.iconSize} color={StylingDefaults.colors.blueBase.hsl}/>
                        <Text>All Cars</Text>
                    </Pressable>
                    <Pressable style={styles.button}>
                        <FontAwesomeIcon icon={faFileInvoiceDollar} size={StylingDefaults.iconSize} color={StylingDefaults.colors.blueBase.hsl}/>
                        <Text>Invoices</Text>
                    </Pressable>                
                </View>
                {/* Bottom row */}
                <View style={styles.row}>
                    <Pressable style={styles.button}>
                        <FontAwesomeIcon icon={faCircleInfo} size={StylingDefaults.iconSize} color={StylingDefaults.colors.blueBase.hsl}/>
                        <Text>Info</Text>
                    </Pressable>                    
                    <Pressable style={styles.button}>
                        <FontAwesomeIcon icon={faPhone} size={StylingDefaults.iconSize} color={StylingDefaults.colors.blueBase.hsl}/>
                        <Text>Support</Text>
                    </Pressable>                
                </View>
                {/* Circular "X" button in the top right corner */}
                <View style={styles.closeButton}>
                    <Pressable style={styles.button}>
                        <FontAwesomeIcon icon={faCircleXmark} size={30} color={StylingDefaults.colors.blueBase.hsl}/>
                    </Pressable>
                </View>
            </LinearGradient>
            </Modal>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: 20,
      },
      row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
      },
      closeButton: {
        position: 'absolute',
        top: 20,
        right: 20,
      },
    modal: {
        position: 'absolute',
        top: '30%', // Adjust the top position to make it smaller
        left: 0,
        right: 0,
        justifyContent: 'center',
        alignItems: 'center',
        padding:50,
        
        backgroundColor: 'transparent', // Set the background color to transparent
        borderRadius: 10,
      

      },
    modalText: {
    fontSize: 20,
    marginBottom: 20,
    textAlign: 'center',
    color: 'white',
    fontWeight: 'bold',
    },
    button: {
        width: 200,
        height: 200,
        backgroundColor: 'transparent',
        borderRadius: 15,
        marginBottom: 10,
        padding: 8,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 15,
    }
  });


