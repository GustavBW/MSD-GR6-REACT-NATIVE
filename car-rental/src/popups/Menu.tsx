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
        <Modal animationType="slide"  transparent={true}>
            
            <LinearGradient colors={[StylingDefaults.colors.blueBase.hsl, StylingDefaults.colors.blueDark.hsl]} style={styles.modal}>
                <View style={styles.closeButton}>
                    <Pressable style={styles.button} onPress={()=>setPopUp(<></>)}>
                        <FontAwesomeIcon icon={faCircleXmark} size={StylingDefaults.iconSize} color={StylingDefaults.colors.blueBase.hsl}/>
                    </Pressable>
                </View>
                <View style={styles.row }>
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
        margin: 'auto',    
        borderRadius: 15,
        width: '30%',
        height: 'auto',

    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        width: '30%',
    },
    closeButton: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginTop: '2%',
        marginBottom: '2%',
        marginLeft: 'auto',
        paddingHorizontal: '5%',
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
        marginBottom: '2%',
    }
  });


