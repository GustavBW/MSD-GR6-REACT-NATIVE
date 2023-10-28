import React, { useEffect, useState } from 'react';
import { View, StyleSheet, TextInput, Button, Text, TouchableOpacity } from 'react-native';
import storage, { KnownKeys } from '../ts/storage';
import { User } from '../ts/types';
import { StylingDefaults } from '../ts/styles';
interface EmailChangeComponentProps {
    closeEmailComponent: () => void;
  }

export default function EmailChangeComponent({ closeEmailComponent }: EmailChangeComponentProps) {
    const [email, setEmail] = useState("");
    const [user, setUser] = useState<User |undefined>();

    useEffect(() => {
        getEmailValue();
    }, []);
  
    const getEmailValue = async () => {
        const currentUser = await storage.load<User>({ key: KnownKeys.userData });
        setUser(currentUser);
        setEmail(currentUser.email);
    }

    const updateEmail = async () => {
        storage.save({key: KnownKeys.userData, data: {
            id: user?.id,
            licenseId: user?.licenseId,
            username: user?.username,
            passwordHash: user?.passwordHash,
            email: email,
            consentsToToS: user?.consentsToToS,
            recievesNewsletter: user?.recievesNewsletter,
            homeAddr: user?.homeAddr
        }})
    }

    const backToProfile  = () => {
        // call the function from License to close the view
        closeEmailComponent(); 
    };


  
    return (
      <View style={styles.emailContainer}>
        <Text style={styles.informatonTxt}>Update Email</Text>
        <View style={styles.drawLine}></View>
        <TextInput           
          style={styles.input}
          value={email}
          placeholder="New Email"
          onChangeText={setEmail}
        />
        <View style={styles.updateAndBackBtns}>
            <TouchableOpacity style={styles.btns} onPress={backToProfile}  >
                <Text style = {styles.textStyle}>
                    Back
                </Text>

            </TouchableOpacity>
            <TouchableOpacity style={styles.btns} onPress={() => {
                updateEmail().then(() => {
                    backToProfile();
                })
            }}>
                <Text style = {styles.textStyle}>
                    Update
                </Text>
            </TouchableOpacity>
        </View>
        
      </View>
    );
}

const styles = StyleSheet.create({
    emailContainer: {
        display: 'flex',
        flexDirection : 'column',
        width: '100%',
        height: 'auto',
        marginBottom: '3%',
        justifyContent: 'center',
        alignItems: 'center',
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
    input: {
        height: 40,
        marginTop: '50%',
        marginBottom: '2%',
        borderWidth: 1,
        borderRadius: 15,
        backgroundColor: 'white',
        padding: 10,
        width: '100%',
        alignSelf: 'center',
        color: "black",
    },
    updateAndBackBtns : {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        padding: '2%',
    },
    btns: {
        backgroundColor: StylingDefaults.colors.test[0],
        borderRadius: 15,
        padding: '4%',
        marginTop: 'auto',
        width: '45%',
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 15,
        textAlign: 'center',
    },
    
})

  