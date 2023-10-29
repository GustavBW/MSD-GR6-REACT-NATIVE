import React, { useState } from 'react';
import { Image, StyleSheet, View,TouchableOpacity, TextInput, Text, Modal, Animated, ScrollView } from 'react-native';
import { StylingDefaults } from '../ts/styles';
import { SafeAreaView } from "react-native-safe-area-context";
import Home from './Home';
import Scan from './Scan';
import { LicenseLocal, User } from '../ts/types';
import storage, { KnownKeys } from "../ts/storage";
import * as MediaLibrary from 'expo-media-library';
import EmailComponent from '../components/EmailComponent';
import PasswordComponent from '../components/PasswordComponent';
import DateTimePicker from "@react-native-community/datetimepicker"


export interface LicenseProps {
    setPage: (view: JSX.Element) => void;
    setPopUp: (view: JSX.Element) => void;
}

export default function License({setPage,setPopUp}:LicenseProps): JSX.Element {

  const defaultLicense = require('./drivers-license-default.png');

  const [expirationDate, setExpirationDate] = useState<Date | undefined>(new Date());
  const [showExpirationDatePicker, setShowExpirationDatePicker] = useState(false);
  const [creationDate, setCreationDate] = useState<Date |undefined>(new Date());
  const [showCreationDatePicker, setShowCreationDatePicker] = useState(false);
  const [surname, setSurname] = useState<string |undefined>('');
  const [name, setName] = useState<string |undefined>('');
  const [nationality, setNationality] = useState<string |undefined>('');
  const [cpr, setCpr] = useState<string |undefined>('');
  const [id, setId] = useState<string |undefined>('');
  const [isModalVisible, setIsModalVisible] = useState(true);
  const translateY = useState(new Animated.Value(0))[0];
  const [emailView, setEmailView] = useState(false);
  const [passwordView, setPasswordView] = useState(false);
  const [licenseData, setLicenseData] = useState<LicenseLocal | undefined>();
  const [userData, setUserData] = useState<User>();
  const [licenseImage, setLicenseImage] = useState<MediaLibrary.Asset | undefined>();

  
  React.useEffect(() => {
    const loadLicenseData = async () => {
      try {
        const loadedLicenseData = await storage.load<LicenseLocal>({ key: KnownKeys.licenseData });
        console.log("loaded date are \n" + JSON.stringify(loadedLicenseData, null, 2));
        setLicenseData(loadedLicenseData);
        setExpirationDate(loadedLicenseData?.expirationDate);
        setCreationDate(loadedLicenseData?.creationDate);
        setSurname(loadedLicenseData?.surname);
        setName(loadedLicenseData?.name);
        setNationality(loadedLicenseData?.nationality);
        setCpr(loadedLicenseData?.socialSecurityNumber);
        setId(loadedLicenseData?.licenseId);
        const loadedImage = await storage.load<MediaLibrary.Asset>({ key: KnownKeys.licenseImage });
        setLicenseImage(loadedImage);
      } catch (error) {
        console.error(`Error loading image: ${error}`);
      }
    };
    loadLicenseData();
  }, [])
  const loadUserData = async () => {
    try{
      setUserData(await storage.load<User>({ key: KnownKeys.userData }));
    }catch(error){
      console.error('user not found')
    }
  }
  React.useEffect(() => {
    loadUserData();
  }, []);
  const closeLicense = async () => {
    Animated.timing(translateY, {
      toValue: 1000, 
      duration: 100,
      useNativeDriver: true,
    }).start(() => {
      setIsModalVisible(false);
    });
  }

  const saveLicenseDate = async () => {
    storage.save({key: KnownKeys.licenseData, data: {
      expirationDate: expirationDate,
      creationDate: creationDate,
      surname: surname,
      name: name,
      nationality: nationality,
      socialSecurityNumber: cpr,
      licenseId: id,
      userId: userData?.id,
      pictureUrl: licenseImage?.uri
    }})
    const loadedLicenseData = await storage.load<LicenseLocal>({ key: KnownKeys.licenseData });
    console.log("saved date are \n" + JSON.stringify(loadedLicenseData, null, 2));
  }

  const openLicense = () => {
    setIsModalVisible(true);
    Animated.timing(translateY, {
      toValue: 0, 
      duration: 500,
      useNativeDriver: true,
    }).start();
  }

const toggleEmailView = (show: boolean) => {
  setEmailView(show);
  loadUserData();
};

const togglePasswordView = (show: boolean) => {
  setPasswordView(show);
  loadUserData();
};

const getExpirationValue:any = () => {
  try {
    if (expirationDate && expirationDate.toString() !== undefined) {
      return expirationDate;
    } else {
      return new Date();
    }
  } catch (error) {
    console.error(error);
  }
};

const getCreationValue: any = () => {
  try {
    if (creationDate && creationDate.toString() !== undefined) {
      return creationDate;
    } else {
      return new Date();
    }
  } catch (error) {
    console.error(error);
  }
};

const expirationValue = getExpirationValue()?.toString().substring(0, 10);
const creationValue =  getCreationValue()?.toString().substring(0, 10);
/* const expirationValueInDateFormat: Date = new Date(Date.parse(expirationValue));
 */





  return (
    <SafeAreaView style={styles.LicenseContainer} >
      <Image
        style={licenseImage ? styles.imageStyle: styles.DefaultImageStyle}
        source={licenseImage ? { uri: licenseImage.uri } : defaultLicense}
      />

      <ScrollView style= {styles.driverLicensInputs}>
        <TouchableOpacity style={styles.closeBtn} onPress={openLicense}>
                <Text style={styles.closeBtnText}>X</Text>
        </TouchableOpacity> 

        <TouchableOpacity onPress={() => setShowExpirationDatePicker(true)}>
          <TextInput
            style={styles.input}
            value={expirationDate?.toString()}
            placeholder="Expiration Date"
            editable={false}
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setShowCreationDatePicker(true)}>
          <TextInput
            style={styles.input}
            value={creationDate?.toString()}
            placeholder="Creation Date"
            editable={false}
          />
        </TouchableOpacity>

        {showExpirationDatePicker && (
          <DateTimePicker
            value={new Date()}
            mode="date"
            is24Hour={true}
            display="default"
            onChange={(event, selectedDate) => {
              setShowExpirationDatePicker(false);
              if (selectedDate) {
                setExpirationDate(selectedDate);
              }
            }}
          />
        )}

        {showCreationDatePicker && (
          <DateTimePicker
            value={new Date()}
            mode="date"
            is24Hour={true}
            display="default"
            onChange={(event, selectedDate) => {
              setShowCreationDatePicker(false);
              if (selectedDate) {
                setCreationDate(selectedDate);
              }
            }}
          />
        )}
        <TextInput
          style={styles.input}
          value={surname}
          placeholder="Surname"
          onChangeText={setSurname}
        />

        <TextInput
          style={styles.input}
          value={name}
          placeholder="Name"
          onChangeText={setName}
        />

        <TextInput
          style={styles.input}
          value={nationality}
          placeholder="Nationality"
          onChangeText={setNationality}
        />
        
        <TextInput
          style={styles.input}
          value={cpr}
          placeholder="CPR"
          onChangeText={setCpr}
        />

        <TextInput
          style={styles.input}
          value={id}
          placeholder="ID"
          onChangeText={setId}
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
                {userData?.username}
              </Text>
              <TouchableOpacity style={styles.modalCloseBtn} onPress={closeLicense}>
                <Text style = {styles.modalCloseBtnText} >
                  X
                </Text>
              </TouchableOpacity>
          </View>

        {emailView ? (
        <EmailComponent closeEmailComponent={() => toggleEmailView(false)} />
        ) : passwordView ? (
        <PasswordComponent closePasswordComponent={() => togglePasswordView(false)} />
        ) : (
        <View style = {{ width:'100%' }}>
         <View style={styles.informationContainer}>
          <Text style={styles.informatonTxt}>Information</Text>
          <View style={styles.drawLine}></View>

          <View style={styles.emailContainer}>
            <Text style={styles.emailTxt}>Email:</Text>
            <View style={styles.drawBox}>
              <Text>{userData?.email}</Text>
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

              <TouchableOpacity style={styles.settingsBtns} onPress={() => setEmailView(true)}>
                <Text style={styles.settingsBtnsTxt}>
                  Change email
                </Text>
              </TouchableOpacity >

              <TouchableOpacity style={styles.settingsBtns} onPress={() => setPasswordView(true)}>
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
                    saveLicenseDate().then(() => {
                      setPage(<Home setPage={setPage} setPopUp={setPopUp} />);
                    })
                    
                  }}>
              <Text style={styles.homePageAndLogOutBtnsTxt}>
                Log Out
              </Text>
            </TouchableOpacity>
          </View>
        </View>)}
          
          
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
