import React from "react";
import { SafeAreaView, TextInput, View,StyleSheet, Pressable, Text, Modal, TouchableOpacity } from "react-native"
import { Button, Icon } from 'react-native-elements';
import { LinearGradient } from 'expo-linear-gradient';





export interface MenuProps {
    setPage: (view: JSX.Element) => void;
    setPopUp: (view: JSX.Element) => void;
}

export function Menu({setPage, setPopUp}: MenuProps){
    return(
        <View>
            <Modal animationType="slide" style={styles.container}>
            <LinearGradient colors={['#3498db', '#2ecc71']} style={styles.modal}>
                {/* Top row */}
                <View style={styles.row}>
                    <Button title="All Cars" buttonStyle={styles.button} />
                    <Button title="Invoices" buttonStyle={styles.button} />
                </View>
                {/* Bottom row */}
                <View style={styles.row}>
                    <Button title="About" buttonStyle={styles.button} />
                    <Button title="Support" buttonStyle={styles.button} />
                </View>
                {/* Circular "X" button in the top right corner */}
                <View style={styles.closeButton}>
                    <Icon name="close" type="font-awesome" color="white" size={30} />
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


