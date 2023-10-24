import React, { useState, useRef } from "react";
import { StylingDefaults } from '../ts/styles';
import { LinearGradient } from 'expo-linear-gradient';
import Scan from "../pages/Scan";
import RegisterFirst from "./RegisterFirst";
import Home from "../pages/Home";
import { SafeAreaView, TextInput, View,StyleSheet, Pressable, Text, Modal, Button, TouchableOpacity, Animated,} from "react-native"

interface RegisterSecondProps {
    setPage: (view: JSX.Element) => void;
    setPopUp: (view: JSX.Element) => void;
}

export default function RegisterSecond({
    setPage,
    setPopUp,
}: RegisterSecondProps

) : JSX.Element {
    const [address, setAddress] = useState("");
    const [modalVisible, setModalVisible] = useState(true);
    const translateY = useRef(new Animated.Value(0)).current;
    const closeRegister = () => {
        Animated.timing(translateY, {
          toValue: 1000, 
          duration: 500,
          useNativeDriver: true,
        }).start(() => {
          setModalVisible(false);
          setPopUp(<></>);
        });
      };
    
    return (
      

      <View style={styles.container}>
        <Modal animationType="fade" transparent={true} visible={true}>
          <Animated.View
              style={
                styles.modal}
            >
            <LinearGradient
                colors={StylingDefaults.colors.BlueAndGreen}
                style={styles.linearGradient}
              >
              <View style={styles.popUpHeader}>
                <Text style={styles.modalText}>Register</Text>
                <TouchableOpacity style={styles.closeBtn} onPress={closeRegister}>
                  <Text style={styles.closeBtnText}>X</Text>
                </TouchableOpacity>
              </View>

              <TextInput
                style={styles.input}
                placeholder="Address (optional)"
                secureTextEntry={true}
                onChangeText={(text) => setAddress(text)}
              />
  
              <TouchableOpacity style={styles.button} onPress={()=>{
                    setPage(<Scan setPage={setPage} setPopUp={setPopUp}/>)
                }}>
                <Text style={styles.buttonText}>{'Scan license (optional)'}</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.button} onPress={()=>{
                    setPopUp(<RegisterFirst setPage={setPage} setPopUp={setPopUp}/>)
                }}>
                <Text style={styles.buttonText}>Back</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.button} onPress={()=>{
                    setPage(<Home setPage={setPage} setPopUp={setPopUp} cars={[]}/>)
                }}>
                <Text style={styles.buttonText}>Confirm</Text>
              </TouchableOpacity>
            </LinearGradient>
          </Animated.View>
        </Modal>
      </View>
    );
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
    linearGradient: {
    padding: '2%',
    borderRadius: 15,
    },
    popUpHeader: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'flex-start',
        width: '100%',
        padding: '1%',
        marginBottom: '2%'
    },
    closeBtn: {
        borderWidth: 2,
        borderColor: ' rgb(251,91,90)',
        color: 'white',
        borderRadius: 15,
        width: 30,
        height: 30,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 'auto',
    },
    closeBtnText: {
        textAlign: 'center',
        color: 'white',
        fontWeight: 'bold',
        fontSize: 20,
        marginBottom: 'auto',
        marginTop: 'auto',

    },
    modalText: {
        paddingLeft: '10%',
        marginLeft: 'auto',
        marginRight: 'auto',
        width: '100%',
        fontSize: 20,
        marginBottom: 20,
        textAlign: 'center',
        color: 'white',
        fontWeight: 'bold',
    },
    input: {
        margin: 'auto',
        width: 300,
        height: 40,
        borderColor: 'gray',
        borderRadius: 15,
        borderWidth: 1,
        marginBottom: 10,
        padding: 8,
        backgroundColor: 'white',
        marginRight: 'auto',
        marginLeft: 'auto',
      
    },

    button: {
        margin: 'auto',
        width: 200,
        height: 40,
        backgroundColor: 'rgb(70,88,129)',
        borderRadius: 15,
        marginBottom: 10,
        padding: 8,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 'auto',
        marginLeft: 'auto',
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 15,
    }
  });