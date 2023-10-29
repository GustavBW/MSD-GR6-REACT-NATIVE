import React, { useEffect, useState, useRef } from "react";
import { SafeAreaView, TextInput, View,StyleSheet, Pressable, Text, Modal, Button, TouchableOpacity, Animated } from "react-native"
import { RefactoredStyles, StylingDefaults } from '../ts/styles';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors } from "react-native/Libraries/NewAppScreen";
import RegisterFirst from "./RegisterFirst";
import License from "../pages/License";
import storage, { KnownKeys } from "../ts/storage";
import { User } from "../ts/types";
/* import ProfilePopUp from "./Profile";
 */
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
    const [token, setToken] = useState("");
    const [inputsAreValid, setInputsAreValid] = useState(false);
    const [modalVisible, setModalVisible] = useState(true);
    const [userData, setUserData] = useState<User | undefined>()
    const translateY = useRef(new Animated.Value(0)).current;
    const closeLogin = () => {
        Animated.timing(translateY, {
          toValue: 1000, 
          duration: 500,
          useNativeDriver: true,
        }).start(() => {
          setModalVisible(false);
          setPopUp(<></>);
        });
      };
      
    useEffect( () => {
      const loadUserData = async () => {
        try{
          setUserData(await storage.load<User | undefined>({ key: KnownKeys.userData }))
        }catch(ignored){}
      }
      loadUserData();
    }

    )
    
      return (
        <View style={styles.container}>
          <Modal animationType="slide" transparent={true} visible={modalVisible}>
            <Animated.View
              style={[
                styles.modal,
                {
                  transform: [{ translateY: translateY }],
                }
              ]}
            >
              <LinearGradient
                colors={RefactoredStyles.subGradient}
                style={styles.linearGradient}
              >
                <View style={styles.popUpHeader}>
                  <Text style={styles.modalText}>Login</Text>
                  <TouchableOpacity style={styles.closeBtn} onPress={closeLogin}>
                    <Text style={styles.closeBtnText}>X</Text>
                  </TouchableOpacity>
                </View>
    
                
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
                <TouchableOpacity style={styles.button} onPress={()=>{
                  if(userData && username == userData.username && password == userData.passwordHash){
                    storage.save({key: KnownKeys.isLoggedIn, data: "true"});
                    setPage( <License setPage={setPage} setPopUp={setPopUp} /> );
                  }
                 }
                }>
                  <Text style={styles.buttonText}>Login</Text>
                </TouchableOpacity>
    
                <TouchableOpacity style={styles.button} onPress={()=>{
                    setPopUp(<RegisterFirst setPage={setPage} setPopUp={setPopUp}/>)
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
            borderRadius: RefactoredStyles.borderRadius.defaultBorderRadius,
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

