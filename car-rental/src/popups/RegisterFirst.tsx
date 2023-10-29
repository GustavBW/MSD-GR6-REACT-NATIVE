import React, { useState, useRef, useEffect } from "react";
import { RefactoredStyles, StylingDefaults } from '../ts/styles';
import { LinearGradient } from 'expo-linear-gradient';
import RegisterSecond from "./RegisterSecond";
import { SafeAreaView, TextInput, View,StyleSheet, Pressable, Text, Modal, Button, TouchableOpacity, Animated,} from "react-native"

interface RegisterFirstProps {
    setPage: (view: JSX.Element) => void;
    setPopUp: (view: JSX.Element) => void;
    usernameProp?: string,
    emailProp?: string,
    passwordProp?: string,
    repeatPasswordProp?: string
    addressProp?: string,
    tosProp?: boolean,
    newsLetterProp?: boolean
}


export default function RegisterFirst({
    setPage,
    setPopUp,
    usernameProp = "",
    emailProp = "",
    passwordProp = "",
    repeatPasswordProp = "",
    addressProp,
    tosProp,
    newsLetterProp
    
}: RegisterFirstProps

) : JSX.Element {
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [repeatPassword, setRepeatPassword] = useState<string>("");
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
    useEffect(() => {
      setUsername(usernameProp);
      setEmail(emailProp);
      setPassword(passwordProp);
      setRepeatPassword(repeatPasswordProp);
    }, [usernameProp, emailProp, passwordProp, repeatPasswordProp]);

    
    return (
      

      <View style={styles.container}>
        <Modal animationType="fade" transparent={true} visible={true}>
          <Animated.View
              style={
                styles.modal}
            >
            <LinearGradient
                colors={RefactoredStyles.subGradient}
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
                placeholder="Username"
                value={username}
                onChangeText={(text) => setUsername(text)}
              />
              <TextInput
                style={styles.input}                
                placeholder="email"
                value={email}
                onChangeText={(text) => setEmail(text)}
              />
              <TextInput
                style={styles.input}
                placeholder="Password"
                value={password}
                secureTextEntry={true}
                onChangeText={(text) => setPassword(text)}
              />
              <TextInput
                style={styles.input}
                placeholder="Repeat Password"
                value={repeatPassword}
                secureTextEntry={true}
                onChangeText={(text) => setRepeatPassword(text)}
              />
  
              <TouchableOpacity style={styles.button} onPress={()=>{
                    if (username && email && password && password == repeatPassword ) {
                      setPopUp(<RegisterSecond setPage={setPage} setPopUp={setPopUp} usernameProp={username} emailProp={email} passwordProp={password} repeatPasswordProp={repeatPassword} addressProp={addressProp} newsLetterProp={newsLetterProp} tosProp={tosProp}/>)
                    }  
                }}>
                <Text style={styles.buttonText}>Register</Text>
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
        borderRadius: RefactoredStyles.borderRadius.defaultBorderRadius,
        paddingHorizontal: '5%',
      

      },
    linearGradient: {
    padding: '2%',
    borderRadius: RefactoredStyles.borderRadius.defaultBorderRadius,
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
        borderColor: RefactoredStyles.colors.red,
        color: RefactoredStyles.colors.white,
        borderRadius: RefactoredStyles.borderRadius.exitButtonBorderRadius,
        width: 30,
        height: 30,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 'auto',
    },
    closeBtnText: {
        textAlign: 'center',
        color: RefactoredStyles.colors.white,
        fontWeight: RefactoredStyles.fontWeight.exitText,
        fontSize: RefactoredStyles.fontSize.exitText,
        marginBottom: 'auto',
        marginTop: 'auto',

    },
    modalText: {
        paddingLeft: '10%',
        marginLeft: 'auto',
        marginRight: 'auto',
        width: '100%',
        fontSize: RefactoredStyles.fontSize.subtitle,
        marginBottom: 20,
        textAlign: 'center',
        color: RefactoredStyles.colors.white,
        fontWeight: RefactoredStyles.fontWeight.subtitle,
    },
    input: {
        margin: 'auto',
        width: 300,
        height: 40,
        borderColor: RefactoredStyles.colors.black,
        borderRadius: RefactoredStyles.borderRadius.inputBorderRadius,
        borderWidth: 1,
        marginBottom: 10,
        padding: 8,
        backgroundColor: RefactoredStyles.colors.white,
        marginRight: 'auto',
        marginLeft: 'auto',
      
    },

    button: {
        margin: 'auto',
        width: 200,
        height: 40,
        backgroundColor: RefactoredStyles.colors.turquoiseLightBlue,
        borderRadius: RefactoredStyles.borderRadius.buttonBorderRadius,
        marginBottom: 10,
        padding: 8,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 'auto',
        marginLeft: 'auto',
    },
    buttonText: {
        color: RefactoredStyles.colors.white,
        fontWeight: RefactoredStyles.fontWeight.buttonText,
        fontSize: RefactoredStyles.fontSize.buttonText,
    }
  });