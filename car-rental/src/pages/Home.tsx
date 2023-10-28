import React, { useEffect } from 'react';
import { TouchableOpacity, Image, Pressable, StyleSheet, SafeAreaView, TextInput, View, Keyboard } from 'react-native';
import { StylingDefaults } from '../ts/styles';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faUser, faBars, faCarSide } from '@fortawesome/free-solid-svg-icons'
import { CarData, User } from '../ts/types';
import Login from '../popups/Login';
import { Menu } from '../popups/Menu';
import Car from '../popups/Car';
import CarMap from '../components/CarMap';
import License from './License';
import storage, {KnownKeys} from '../ts/storage';

export interface HomeProps {
    setPage: (view: JSX.Element) => void;
    setPopUp: (view: JSX.Element) => void;
    selectedCar?: CarData;
}

export default function Home({setPage, setPopUp, selectedCar}: HomeProps): JSX.Element {
    const [address, setAddress] = React.useState<string>("");
    const [inputFocused, setInputFocused] = React.useState<boolean>(false);
    const [cars, setCars] = React.useState<CarData[]>([]);
    const [isLoggedIn, setLoggedIn] = React.useState<String>("false");

    React.useEffect(() => {
        const loadCars = async () => {
            const fromStorage = await storage.load<string>({key: KnownKeys.carData});
            const fullParsed = await JSON.parse(fromStorage);
            setCars(fullParsed)
        }
        loadCars()
    }, [])

    const loadLoggedIn = async ()=>{
        const loadLoggedIn = await storage.load<String>({key: KnownKeys.isLoggedIn});
        setLoggedIn(loadLoggedIn)
    }
    loadLoggedIn();

    const appendOutofBoundsPressCapture = (): JSX.Element => {
        if(inputFocused){
            return (
                <Pressable style={{zIndex: 1, position: "absolute", width: "100%", height: "100%"}} 
                    onPress={() => {
                        setInputFocused(false);
                        Keyboard.dismiss();
                    }}
                />
            );
        }
        return (<></>);
    }

    return (
        <SafeAreaView style={styles.homeContainer}>
            {appendOutofBoundsPressCapture()}
            <CarMap cars={cars} 
                setPopUp={setPopUp} 
                setPage={setPage} 
                selectedCar={selectedCar}
            />
            <View style={styles.lowerMenu}>
                <TouchableOpacity style={styles.iconButton}
                    onPress={() => {
                        setPopUp(<Menu cars={cars} setPopUp={setPopUp} setPage={setPage}/>)
                    }}
                >
                    <FontAwesomeIcon icon={faBars} size={StylingDefaults.iconSize} color={StylingDefaults.colors.blueBase.hsl} />
                </TouchableOpacity>

                <TextInput
                    style={ inputFocused ? {
                        ...styles.input,
                        ...styles.inputWhenFocused
                    } : styles.input}
                    placeholder="University of Southern Denmark"
                    inputMode="text"
                    defaultValue={address}
                    onFocus={() => {
                        console.log("Showing input")
                        setInputFocused(true);
                    }}
                    onBlur={() => {
                        console.log("Hiding input")
                        setInputFocused(false);
                    }}
                />
                <TouchableOpacity style={styles.iconButton}
                    onPress={() => {
                        loadLoggedIn();     
                        if(isLoggedIn == "true"){
                            setPage(<License setPage={setPage} setPopUp={setPopUp}/>)
                        }
                        else{
                            setPopUp(<Login setPopUp={setPopUp} setPage={setPage}/>)
                        }
                    }}
                >                    
                    <FontAwesomeIcon icon={faUser} size={StylingDefaults.iconSize} color={StylingDefaults.colors.blueBase.hsl} />
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

const heightOfMenuPercent = 5;

const styles = StyleSheet.create({
    homeContainer: {
        flex: 1,
    },
    lowerMenu: {
      position: "absolute",
      bottom: 0,
      height: "10%",
      paddingBottom: 10,
      display: 'flex', // Set display value to flex
      flexDirection: 'row', // Horizontal layout for the menu items
      justifyContent: 'space-evenly', // Space evenly between menu items
      alignItems: 'center', // Center items vertically
      width: "100%",
      zIndex: 1,
      backgroundColor: StylingDefaults.colors.blueDark.hsl,
    },
    iconButton: {
      flex: 1, // Each button takes up equal space horizontally
      justifyContent: 'center', // Center text vertically
      alignItems: 'center', // Center text horizontally
      marginHorizontal: 5, // Add horizontal margin between buttons
      paddingVertical: 10, // Vertical padding for buttons
    },
    icon: {
        width: "100%",
        height: "100%",
        alignSelf: "center"
    },
    input: {
      zIndex: 3,
      flex: 2, // Takes up twice the space of the buttons
      paddingHorizontal: 10, // Add horizontal padding for the input
      borderWidth: 1, // Add border for the input
      width: "90%",
      height: "66%",
      borderColor: 'black', // Border color
      borderRadius: StylingDefaults.borderRadius, // Rounded corners for the input
      backgroundColor: StylingDefaults.colors.blueBase.hsl, // White background for the input
      textAlign: 'center', // Center text horizontally,
      alignItems: 'center', // Center text vertically
    },
    inputWhenFocused: {
        bottom: "100%",
        shadowColor: StylingDefaults.colors.blueDark.hsl,
        shadowOffset: {
            width: 0,
            height: 0
        },
        shadowOpacity: 1,
        shadowRadius: 30,
        elevation: 5,
        backgroundColor: StylingDefaults.colors.blueBase.hsl,
        width: "100%",
    }
  });
  