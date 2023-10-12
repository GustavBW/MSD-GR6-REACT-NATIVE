import React, { useEffect } from 'react';
import { DimensionValue, Image, Pressable, StyleSheet, SafeAreaView, TextInput, View, Keyboard } from 'react-native';
import { StylingDefaults } from '../ts/styles';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faUser, faBars, faCarSide } from '@fortawesome/free-solid-svg-icons'
import { Car } from '../ts/types';
import Login from '../popups/Login';

export interface HomeProps {
    setPage: (view: JSX.Element) => void;
    setPopUp: (view: JSX.Element) => void;
    cars: Car[];
}

export default function Home({setPage, setPopUp, cars}: HomeProps): JSX.Element {
    const [address, setAddress] = React.useState<string>("");
    const [carMarkers, setMarkers] = React.useState<JSX.Element[]>([]);
    const [inputFocused, setInputFocused] = React.useState<boolean>(false);

    const getCarMarker = (car: Car, key: number): JSX.Element => {
        console.log("Generating marker for car", car)
        return (
            <></>
        )
    }
    useEffect(() => {
        console.log("Cars changed, updating markers")
        const newMarkers = cars.map((car, index) => getCarMarker(car, index));
        setMarkers(newMarkers);
        console.log("Markers updated, cars: ", cars, "markers: ", newMarkers)
    },[cars]);

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
            <Image source={require('./map.png')} 
                style={styles.mapView}
                resizeMode='cover'
            />
            <View style={styles.lowerMenu}>
                <Pressable style={styles.iconButton}
                    onPress={() => {
                        console.log("Showing menu");
         
                    }}
                >
                    <FontAwesomeIcon icon={faBars} size={StylingDefaults.iconSize} color={StylingDefaults.colors.blueBase.hsl} />
                </Pressable>

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
                <Pressable style={styles.iconButton}
                    onPress={() => {
                        setPopUp(<Login setPopUp={setPopUp} setPage={setPage}/>)
                    }}
                >                    
                    <FontAwesomeIcon icon={faUser} size={StylingDefaults.iconSize} color={StylingDefaults.colors.blueBase.hsl} />
                </Pressable>
            </View>
        </SafeAreaView>
    )
}

const heightOfMenuPercent = 5;

const styles = StyleSheet.create({
    homeContainer: {
        flex: 1,
    },
    mapView: {
      zIndex: 0,
      position: "absolute",
      width: "100%",
      height: "100%"
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
      zIndex: 1,
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
        zIndex: 2,
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
  