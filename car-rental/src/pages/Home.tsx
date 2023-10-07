import React from 'react';
import { Button, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import Map from 'react-map-gl';
import mapboxgl from 'mapbox-gl';
import { colors } from '../ts/styles';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faUser, faBars } from '@fortawesome/free-solid-svg-icons'

export interface HomeProps {
    setPage: (view: JSX.Element) => void;
    setPopUp: (view: JSX.Element) => void;
}

const iconSize = 40;

export default function Home({setPage, setPopUp}: HomeProps){
    const [address, setAddress] = React.useState<string>("");
    
    return (
        <View style={styles.homeContainer}>
            <Map
                mapLib={mapboxgl}
                initialViewState={{
                longitude: 10.4275,
                latitude: 55.366,
                zoom: 14
                }}
                style={styles.mapView}
                mapStyle="mapbox://styles/mapbox/streets-v9"
                mapboxAccessToken={"pk.eyJ1IjoiZ3VzdGF2YnciLCJhIjoiY2xuZno0Znl5MGJjYTJxbWk0cm1jY24xNSJ9.NdCcfyzq5ltuXHkjzrzZLQ"}
            />;
            <View style={styles.lowerMenu}>
                <Pressable style={styles.iconButton}
                    onPress={() => {
                        console.log("Showing menu")
                    }}
                >
                    <FontAwesomeIcon icon={faBars} size={iconSize} color={colors.blueBase.hsl} />
                </Pressable>
                <TextInput
                    style={styles.input}
                    placeholder="University of Southern Denmark"
                    keyboardType="alphabetic"
                />
                <Pressable style={styles.iconButton}
                    onPress={() => {
                        console.log("Showing profile")
                    }}
                >                    
                    <FontAwesomeIcon icon={faUser} size={iconSize} color={colors.blueBase.hsl} />
                </Pressable>
            </View>
        </View>
    )
}

const heightOfMenuPercent = 5;

const styles = StyleSheet.create({
    homeContainer: {
      flex: 1,
      overflow: 'hidden', // Prevent children from overflowing
    },
    mapView: {
      zIndex: 0,
      width: "100%"
    },
    lowerMenu: {
      position: "absolute",
      bottom: heightOfMenuPercent + "%",
      height: heightOfMenuPercent + "%",
      display: 'flex', // Set display value to flex
      flexDirection: 'row', // Horizontal layout for the menu items
      justifyContent: 'space-evenly', // Space evenly between menu items
      alignItems: 'center', // Center items vertically
    width: "100%",
      zIndex: 1,
      backgroundColor: colors.blueDark.hsl,
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
      flex: 2, // Takes up twice the space of the buttons
      paddingHorizontal: 10, // Add horizontal padding for the input
      borderWidth: 1, // Add border for the input
      width: "90%",
      height: "66%",
      borderColor: 'black', // Border color
      borderRadius: 10, // Rounded corners for the input
      backgroundColor: colors.blueBase.hsl, // White background for the input
      textAlign: 'center', // Center text horizontally
      textOverflow: 'ellipsis', // Ellipsis overflow for the input
    },
  });
  