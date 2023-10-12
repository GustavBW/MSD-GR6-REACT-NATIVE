import React, { useState } from "react";
import { SafeAreaView, TextInput, View,StyleSheet, Pressable, Text, Modal, Button, TouchableOpacity } from "react-native"
import { StylingDefaults } from '../ts/styles';
import { LinearGradient } from 'expo-linear-gradient';

interface LoginProps {
    setPage: (view: JSX.Element) => void;
    setPopUp: (view: JSX.Element) => void;
}

export default function Login({
    setPage,
    setPopUp,
}: LoginProps
) : JSX.Element {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    var [modalVisible, setModalVisible] = useState(false);

    return (
            <View style={styles.container}>
                <Modal animationType="slide">
                    <LinearGradient 
                            colors={['#3498db', '#2ecc71']}
                            style={styles.modal}>
                            <Text style={styles.modalText}>Login</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Username"
                                onChangeText={(text) => setUsername(text)}
                            />
                            <TextInput
                                style={styles.input}
                                placeholder="Password"
                                secureTextEntry={true}
                                onChangeText={(text) => setPassword(text)}
                            />
                            <TouchableOpacity style={styles.button}>

                                <Text style={styles.buttonText}>Login</Text>

                            </TouchableOpacity>

                            <TouchableOpacity style={styles.button} onPress={() => setModalVisible(false)}>

                                <Text style={styles.buttonText}>Register</Text>

                            </TouchableOpacity>
                    </LinearGradient>
                    
                </Modal>

            </View>
    )}

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

