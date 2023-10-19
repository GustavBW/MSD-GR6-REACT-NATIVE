import React, { useMemo, useState } from 'react';
import { Image, StyleSheet, View,TouchableOpacity, TextInput, Text } from 'react-native';
import { StylingDefaults } from '../ts/styles';
import Scan from './Scan';


export interface LicenseProps {
    setPage: (view: JSX.Element) => void;
    setPopUp: (view: JSX.Element) => void;
    }

export default function License({setPage,setPopUp}:LicenseProps): JSX.Element {
  const [scannedLicense, setScannedLicense] = useState<string | null>(null);

  const defaultLicense = require('./drivers-license-default.png');

  const [expirationDate, setExpirationDate] = useState<string>('');
  const [creationDate, setCreationDate] = useState<string>('');
  const [surname, setSurname] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [nationality, setNationality] = useState<string>('');
  const [cpr, setCpr] = useState<string>('');
  const [id, setId] = useState<string>('');
  const snapPoints = useMemo(() => ['25%', '50%'], []);

  // You can set the scannedLicense state based on some condition
  // For example, here I'm setting it to a non-empty string when the scanned license exists
  const checkDriverLicense = () => {
    
    /* if ("ok" button pressed) {
      setScannedLicense('./drivers-license.png');
    } */
  };

  return (
    <View style={styles.LicenseContainer}>
             
      <Image
        style={styles.imageStyle}
        source={scannedLicense ? { uri: scannedLicense } : defaultLicense}
      />

      <View style= {styles.driverLicensInputs}>
        <TouchableOpacity style={styles.closeBtn} onPress={
            () => {
                setPage(<Scan setPage={setPage} setPopUp={setPopUp}/>);
            }
        }
        >
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

   

      </View>


     



    </View>
  );
}

const styles = StyleSheet.create({
  LicenseContainer: {
    flexDirection: 'column',
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 15,
  },

  imageStyle: {
    width: '100%',
    height: 300,
    resizeMode: 'contain',
    borderRadius: 15,
    marginTop: '5%',
  },
  
  driverLicensInputs: {
    width: '100%',
    backgroundColor: StylingDefaults.colors.blueDark.hsl,
    overflow: 'scroll',
  },
  input: {
    height: 40,
    margin: 12,
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
    top: "1%",
    right: "1%",
    justifyContent: 'center',
    alignItems: 'center',
  },

  closeBtnText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  }

});
