import React, { useState, useRef, useEffect } from "react";
import { RefactoredStyles, StylingDefaults } from '../ts/styles';
import { LinearGradient } from 'expo-linear-gradient';
import Scan from "../pages/Scan";
import RegisterFirst from "./RegisterFirst";
import Home from "../pages/Home";
import { SafeAreaView, TextInput, View,StyleSheet, Pressable, Text, Modal, Button, TouchableOpacity, Animated} from "react-native"
import storage, { KnownKeys } from "../ts/storage";
import { User } from "../ts/types";
import  CheckBox from 'expo-checkbox';
/* import {CheckBox} from '@react-native-community/checkbox';
 */
interface RegisterSecondProps {
    setPage: (view: JSX.Element) => void;
    setPopUp: (view: JSX.Element) => void;
    usernameProp?: string,
    emailProp?: string,
    passwordProp?: string,
    repeatPasswordProp?: string,
    addressProp?: string,
    tosProp?: boolean,
    newsLetterProp?: boolean
    
}


export default function RegisterSecond({
    setPage,
    setPopUp,
    usernameProp = "",
    emailProp  = "",
    passwordProp = "",
    repeatPasswordProp = "",
    addressProp = "",
    tosProp = false,
    newsLetterProp = false,
}: RegisterSecondProps


) : JSX.Element {
  const [address, setAddress] = useState<string>("none");
  const [modalVisible, setModalVisible] = useState(true);
    const [consentsToToS, setToSConsent] = useState(false);
    const [wantsNewsletter, setNewsletterRecipient] = useState(false);
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
    const saveRegisteredUser = async () => {
      if(usernameProp && passwordProp){
        try{
          const newUser: User = {
            id: Math.floor(Math.random() * 100000000),
            licenseId: Math.floor(Math.random() * 100000000),
            username: usernameProp,
            passwordHash: passwordProp,
            email: emailProp,
            consentsToToS: consentsToToS,
            recievesNewsletter: wantsNewsletter,
            homeAddr: address
          }
          storage.save({key: KnownKeys.userData, data: newUser})
          storage.save({key: KnownKeys.isLoggedIn, data: "true"});

        } catch(error){
          console.log(error + "\n user is not registered")
        }
      }
    }

    useEffect(() => {
      setAddress(addressProp);
      setNewsletterRecipient(newsLetterProp);
      setToSConsent(tosProp);
    },[addressProp,newsLetterProp,tosProp])
    
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
                value={address}
                placeholder="Address (optional)"
                onChangeText={setAddress}
              />

            <View style={styles.conditions}>
              <CheckBox
                  style = {styles.CheckBox}
                  value={wantsNewsletter}
                  onValueChange={setNewsletterRecipient}
              />
              <View style={styles.checkBoxTextBox}>
                <Text style ={styles.CheckBoxText}>Do send me your newsletter</Text>
              </View>
            </View>

            <View style={styles.conditions}>
              <CheckBox
                      style = {styles.CheckBox}
                      value={consentsToToS}
                      onValueChange={setToSConsent}
                />
              <View style={styles.checkBoxTextBox}>
                <Text style ={styles.CheckBoxText}>I've read and understood the ToS</Text>
              </View>
            </View>
            
            <View>
              
            </View>
              <TouchableOpacity style={styles.buttonVertical} onPress={()=>{
                    setPage(<Scan setPage={setPage} setPopUp={setPopUp} scanFromRegistration={true} usernameProp={usernameProp} emailProp={emailProp} passwordProp={passwordProp} repeatPasswordProp={repeatPasswordProp} addressProp={address} newsLetterProp={wantsNewsletter} tosProp={consentsToToS}/>)
                }}>
                <Text style={styles.buttonText}>{'Scan license (optional)'}</Text>
              </TouchableOpacity>

              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  style={styles.buttonHorizontal}
                  onPress={() => {
                    setPopUp(<RegisterFirst setPage={setPage} setPopUp={setPopUp} usernameProp={usernameProp} emailProp={emailProp} passwordProp={passwordProp} repeatPasswordProp={repeatPasswordProp} addressProp={address} newsLetterProp={wantsNewsletter} tosProp={consentsToToS} />);
                  }}
                >
                  <Text style={styles.buttonText}>Back</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.buttonHorizontal}
                  onPress={() => {
                    if(consentsToToS){
                      saveRegisteredUser().then(() =>{
                        setPage(<Home setPage={setPage} setPopUp={setPopUp}/>);
                      }
                      )

                    }
                    
                  }}
                >
                  <Text style={styles.buttonText}>Confirm</Text>
                </TouchableOpacity>
              </View> 
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
    buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginHorizontal: 0,
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

    buttonVertical: {
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
    buttonHorizontal: {
      width: 95,
      height: 40,
      backgroundColor: RefactoredStyles.colors.turquoiseLightBlue,
      borderRadius: RefactoredStyles.borderRadius.buttonBorderRadius,
      flexDirection: 'row',
      padding: 8,
      alignItems: 'center',
      justifyContent: 'center',
    },
    buttonText: {
        color: RefactoredStyles.colors.white,
        fontWeight: RefactoredStyles.fontWeight.buttonText,
        fontSize: RefactoredStyles.fontSize.buttonText,
    },
    conditions: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      width: '80%',
      marginBottom: '5%'
    },
    CheckBox: {
      borderRadius: 5,
      marginLeft: '10%',
      marginRight: '10%',
      color: RefactoredStyles.colors.black,
    },
    CheckBoxText: {
      color: RefactoredStyles.colors.white,
        fontWeight: RefactoredStyles.fontWeight.buttonText,
        fontSize: 12,

    },
    checkBoxTextBox: {
      backgroundColor: RefactoredStyles.colors.turquoiseLightBlue,
      padding: 10,
      borderRadius: RefactoredStyles.borderRadius.buttonBorderRadius,
    }
  });