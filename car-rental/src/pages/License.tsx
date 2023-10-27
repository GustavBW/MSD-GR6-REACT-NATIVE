import React, { useMemo, useState } from 'react';
import { Image, StyleSheet, View,TouchableOpacity, TextInput, Text, Modal, Button, Animated, ScrollView } from 'react-native';
import { StylingDefaults } from '../ts/styles';
import { SafeAreaView } from "react-native-safe-area-context";
import Home from './Home';
import Scan from './Scan';
import { CarData, LicenseLocal, User } from '../ts/types';
import storage, { KnownKeys } from "../ts/storage";
import * as MediaLibrary from 'expo-media-library';

export interface LicenseProps {
    setPage: (view: JSX.Element) => void;
    setPopUp: (view: JSX.Element) => void;
}

export default function License({setPage,setPopUp}:LicenseProps): JSX.Element {

  const defaultLicense = require('./drivers-license-default.png');

  const [expirationDate, setExpirationDate] = useState<string>('');
  const [creationDate, setCreationDate] = useState<string>('');
  const [surname, setSurname] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [nationality, setNationality] = useState<string>('');
  const [cpr, setCpr] = useState<string>('');
  const [id, setId] = useState<string>('');
  const [isModalVisible, setIsModalVisible] = useState(true);
  const translateY = useState(new Animated.Value(0))[0];
  const [email, setEmail] = useState<string|null>('');
  const [changeEmail, isEmailView] = useState(false);
  const [licenseData, setLicenseData] = useState<LicenseLocal | undefined>();
  const [userData, setUserData] = useState<User>();
  const [licenseImage, setLicenseImage] = useState<MediaLibrary.Asset | undefined>();


  React.useEffect(() => {
    const loadLicenseData = async () => {
      setLicenseData(await storage.load<LicenseLocal>({key: KnownKeys.licenseData}))
      setUserData(await storage.load<User>({key: KnownKeys.userData}))
      setLicenseImage(await storage.load<MediaLibrary.Asset>({key: KnownKeys.licenseImage}))
    }
    loadLicenseData();
  }, [])

  const closeLicense = () => {
    storage.save({key: KnownKeys.licenseData, data: {
      expirationDate: expirationDate,
      creationDate: creationDate,
      surname: surname,
      name: name,
      nationality: nationality,
      cpr: cpr,
      id: id,
      userId: userData?.id,
      pictureUrl: licenseImage?.uri
    }})
    Animated.timing(translateY, {
      toValue: 1000, 
      duration: 100,
      useNativeDriver: true,
    }).start(() => {
      setIsModalVisible(false);
    });
  }

  const openLicense = () => {
    setIsModalVisible(true);
    Animated.timing(translateY, {
      toValue: 0, 
      duration: 500,
      useNativeDriver: true,
    }).start();
  }

  const changeEmailView = () => {
    isEmailView(true);
  }


  return (
    <SafeAreaView style={styles.LicenseContainer} >
             
      <Image
        style={licenseImage ? styles.imageStyle: styles.DefaultImageStyle}
        source={licenseImage ? { uri: licenseImage.uri } : defaultLicense}
      />

      <ScrollView style= {styles.driverLicensInputs}>
        <TouchableOpacity style={styles.closeBtn} onPress= {openLicense}>
                <Text style={styles.closeBtnText}>X</Text>
        </TouchableOpacity> 

        <TextInput
          style={styles.input}
          placeholder="Expiration Date"
          onChangeText={(text) => setExpirationDate(text)}
        />

        <TextInput
          style={styles.input}
          placeholder="Creation Date"
          onChangeText={(text) => setCreationDate(text)}
        />

        <TextInput
          style={styles.input}
          placeholder="Surname"
          onChangeText={(text) => setSurname(text)}
        />

        <TextInput
          style={styles.input}
          placeholder="Name"
          onChangeText={(text) => setName(text)}
        />

        <TextInput
          style={styles.input}
          placeholder="Nationality"
          onChangeText={(text) => setNationality(text)}
        />
        
        <TextInput
          style={styles.input}
          placeholder="CPR"
          onChangeText={(text) => setCpr(text)}
        />

        <TextInput
          style={styles.input}
          placeholder="ID"
          onChangeText={(text) => setId(text)}
        />
      </ScrollView>
      <Modal
        transparent={true}
        visible={isModalVisible}
        animationType="slide"
        style={styles.modalContainer}
      >
        <View style={styles.modalContent}>
          <View style={styles.modalTitle}>
              <Text style={styles.modalTitleText}>
                {/* get the username value */}
                {userData?.username}
              </Text>
              <TouchableOpacity style={styles.modalCloseBtn} onPress={closeLicense}>
                <Text style = {styles.modalCloseBtnText} >
                  X
                </Text>
              </TouchableOpacity>
          </View>

          <View style={styles.informationContainer}>
            <Text style={styles.informatonTxt}>Information</Text>
            <View style={styles.drawLine}></View>

            <View style={styles.emailContainer}>
              <Text style={styles.emailTxt}>Email:</Text>
              <View style={styles.drawBox}>
                <Text>Emailvalue</Text>
              </View>
            </View>

            <View style={styles.usernameContainer}>
              <Text style={styles.usernameTxt}>Username:</Text>
              <View style={styles.drawBox}>
                <Text>{userData?.username}</Text>
              </View>
            </View>
          </View>
          <View style={styles.settingsContainer}>
            <Text style={styles.informatonTxt}>Settings</Text>
            <View style={styles.drawLine}></View>
              <TouchableOpacity style={styles.settingsBtns} onPress={()=>{
                    setPage(<Scan setPage={setPage} setPopUp={setPopUp}/>);
                }}>
                <Text style={styles.settingsBtnsTxt}>
                  (Re-)Scan license
                </Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.settingsBtns}>
                <Text style={styles.settingsBtnsTxt}>
                  Change email
                </Text>
              </TouchableOpacity >

              <TouchableOpacity style={styles.settingsBtns}>
                <Text style={styles.settingsBtnsTxt}>
                  Change Password
                </Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.settingsBtns}>
                <Text style={styles.settingsBtnsTxt}>
                  Payment method
                </Text>
              </TouchableOpacity>
          </View>

          <View style={styles.homePageAndLogOutContainer}>
            <TouchableOpacity style={styles.homePageAndLogOutBtns} onPress={()=>{
                    setPage(<Home setPage={setPage} setPopUp={setPopUp}/>);
                }}>
              <Text style={styles.homePageAndLogOutBtnsTxt}>
                Home
              </Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.homePageAndLogOutBtns} onPress={() =>{
                    setPage(<Home setPage={setPage} setPopUp={setPopUp} />);
                  }}>
              <Text style={styles.homePageAndLogOutBtnsTxt}>
                Log Out
              </Text>
            </TouchableOpacity>

          </View>
          
        </View>
      </Modal>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  LicenseContainer: {
    width: '100%',
    height: '100%',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: StylingDefaults.colors.blueDark.hsl,
    borderRadius: 15,
  },
  DefaultImageStyle: {
    width: '100%',
    height: 300,
    borderRadius: 15,
  },
  imageStyle: {
    width: 400,
    height: 400,
    resizeMode: 'contain',
    borderRadius: 15,
    transform: [{rotate: '-90deg'}]
  },
  
  driverLicensInputs: {
    width: '100%',
    backgroundColor: StylingDefaults.colors.blueDark.hsl,
  },
  input: {
    height: 40,
    margin: 11,
    borderWidth: 1,
    borderRadius: 15,
    backgroundColor: 'white',
    padding: 10,
    width: '80%',
    alignSelf: 'center',
    color: "black",
  },

  closeBtn: {
    zIndex: 3,
    borderWidth: 2,
    borderColor: ' rgb(251,91,90)',
    color: 'white',
    borderRadius: 15,
    width: 30,
    height: 30,
    position: 'absolute',
    top: "2%",
    right: "2%",
    justifyContent: 'center',
    alignItems: 'center',
  },

  closeBtnText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  modalContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    position: 'absolute',
    width: '100%',
    height: '90%',
    top : '12%',
    zIndex: 3,
    backgroundColor: StylingDefaults.colors.blueDark.hsl,
    borderRadius: 50,
    borderBottomEndRadius: 0,
    borderBottomStartRadius: 0,
    alignItems: 'flex-start',
    padding: '2%',
    paddingBottom: '5%',
  },
  modalTitle: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '2%',
  },
  modalTitleText : {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  modalCloseBtn: {
    borderWidth: 2,
    borderColor: ' rgb(251,91,90)',
    color: 'white',
    borderRadius: 15,
    height: 30,
  },
  modalCloseBtnText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    margin : 'auto',
    width: 25,
    textAlign: 'center',
  },
  informationContainer: {
    width: '100%',
    padding: '2%',
  },
  informatonTxt: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: '2%',
  },
  drawLine: {
    width: '100%',
    height: 2,
    backgroundColor: 'white',
    marginBottom: '5%',
  },
  emailContainer: {
    flexDirection: 'row',
    width: '100%',
    marginBottom: '3%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  emailTxt: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 15,
    marginRight: '2%',
    width: '20%',

  },
  drawBox: {
    width: '80%',
    backgroundColor: StylingDefaults.colors.BlueAndGreen[1],
    borderRadius: 15,
    padding: '2%',
  },
  usernameContainer: {
    flexDirection: 'row',
    width: '100%',
    marginBottom: '2%',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  usernameTxt: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 15,
    marginRight: '2%',

  },
  settingsContainer: {
    width: '100%',
    padding: '2%',
  },
  settingsBtns: {
    backgroundColor: StylingDefaults.colors.test[0],
    borderRadius: 15,
    padding: '3%',
    marginBottom: '3%',
  },
  settingsBtnsTxt: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 15,
    textAlign: 'center',
  },
  homePageAndLogOutContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    padding: '2%',
  },
  homePageAndLogOutBtns: {
    backgroundColor: StylingDefaults.colors.test[0],
    borderRadius: 15,
    padding: '4%',
    marginTop: 'auto',
    width: '45%',
  },
  homePageAndLogOutBtnsTxt: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 15,
    textAlign: 'center',
  },


  

  

});
