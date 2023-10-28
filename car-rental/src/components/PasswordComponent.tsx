import React, { useEffect, useState } from 'react';
import { View, StyleSheet, TextInput, Button, Text, TouchableOpacity } from 'react-native';
import storage, { KnownKeys } from '../ts/storage';
import { User } from '../ts/types';
import { StylingDefaults } from '../ts/styles';
interface PasswordChangeComponentProps {
    closePasswordComponent: () => void;
  }

export default function PasswordComponent({ closePasswordComponent }: PasswordChangeComponentProps) {
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");
    const [user, setUser] = useState<User |undefined>();

    useEffect(() => {
        getPasswordValue();
    }, []);
  
    const getPasswordValue = async () => {
        const currentUser = await storage.load<User>({ key: KnownKeys.userData });
        setUser(currentUser);
        return currentUser.passwordHash;
    }

    const updatePassword = async () => {
        storage.save({key: KnownKeys.userData, data: {
            id: user?.id,
            licenseId: user?.licenseId,
            username: user?.username,
            passwordHash: newPassword,
            email: user?.email,
            consentsToToS: user?.consentsToToS,
            recievesNewsletter: user?.recievesNewsletter,
            homeAddr: user?.homeAddr

        }})
    }

    const backToProfile  = () => {
        // call the function from License to close the view
        closePasswordComponent(); 
    };
    return (
      <View style={styles.emailContainer}>
        <Text style={styles.informatonTxt}>Update Password</Text>
        <View style={styles.drawLine}></View>
        <TextInput           
          style={styles.input}
          secureTextEntry={true}
          placeholder="Current password"
          onChangeText={setCurrentPassword}
        />
        <TextInput           
          style={styles.input}
          secureTextEntry={true}
          placeholder="New password"
          onChangeText={setNewPassword}
        />
        <TextInput           
          style={styles.input}
          secureTextEntry={true}
          placeholder="Repeat password"
          onChangeText={setRepeatPassword}
        />
        <View style={styles.updateAndBackBtns}>
            <TouchableOpacity style={styles.btns} onPress={backToProfile}  >
                <Text style = {styles.textStyle}>
                    Back
                </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btns} onPress={async () => {
                if (currentPassword === (await getPasswordValue()) && currentPassword !== newPassword && repeatPassword == newPassword) {
                    updatePassword().then(() => {
                      backToProfile();
                    });
                  }
                
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
        marginBottom: '50%',
    },
    input: {
        height: 40,
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

  