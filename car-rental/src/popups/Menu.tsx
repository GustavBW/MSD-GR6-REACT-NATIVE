import React from "react";
import { SafeAreaView, TextInput, View,StyleSheet, Pressable, Text, Modal, Button, TouchableOpacity } from "react-native"
import { LinearGradient } from 'expo-linear-gradient';





export interface MenuProps {
    setPage: (view: JSX.Element) => void;
    setPopUp: (view: JSX.Element) => void;
}

export function Menu({setPage, setPopUp}: MenuProps){
    return(
        <View>
            <Modal animationType="slide">
            <LinearGradient 
                            colors={['#3498db', '#2ecc71']}
                            style={styles.modal}>
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
        position: 'absolute',
        top: '30%', // Adjust the top position to make it smaller
        left: 0,
        right: 0,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        
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
    input: {
      width: 300,
      height: 40,
      borderColor: 'gray',
      borderRadius: 15,
      borderWidth: 1,
      marginBottom: 10,
      padding: 8,
      backgroundColor: 'white',
      
    },

    button: {
        width: 200,
        height: 40,
        backgroundColor: 'rgb(70,88,129)',
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


