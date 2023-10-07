import React from 'react';
import { Button, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import Map from 'react-map-gl';
import mapboxgl from 'mapbox-gl';
import { colorsHSL } from '../ts/styles';


export interface HomeProps {
    setPage: (view: JSX.Element) => void;
    setPopUp: (view: JSX.Element) => void;
}

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
                >Menu</Pressable>
                <TextInput
                    style={styles.input}
                    placeholder="AddressBar"
                    keyboardType="alphabetic"
                />
                <Pressable style={styles.iconButton}
                    onPress={() => {
                        console.log("Showing profile")
                    }}
                >Profile</Pressable>
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
      flex: 1, // Takes up 80% of the screen height
      zIndex: 0,
      width: "100%",
    },
    lowerMenu: {
      position: "absolute",
      bottom: heightOfMenuPercent + "%",
      height: heightOfMenuPercent + "%",
      flex: 0.2, // Takes up 20% of the screen height
      flexDirection: 'row', // Horizontal layout for the menu items
      justifyContent: 'space-between', // Space evenly between menu items
      alignItems: 'center', // Center items vertically
      padding: 10, // Add padding for spacing
      zIndex: 1,
      backgroundColor: 'hsla(' + colorsHSL.blueBase.h + "," + colorsHSL.blueBase.s + "%," + colorsHSL.blueBase.l + "%, .5)", // Background color for the menu
    },
    iconButton: {
      flex: 1, // Each button takes up equal space horizontally
      justifyContent: 'center', // Center text vertically
      alignItems: 'center', // Center text horizontally
      borderWidth: 1, // Add border for visual separation
      borderColor: 'black', // Border color
      borderRadius: 5, // Rounded corners for buttons
      marginHorizontal: 5, // Add horizontal margin between buttons
      paddingVertical: 10, // Vertical padding for buttons
    },
    input: {
      flex: 2, // Takes up twice the space of the buttons
      paddingHorizontal: 10, // Add horizontal padding for the input
      borderWidth: 1, // Add border for the input
      borderColor: 'black', // Border color
      borderRadius: 5, // Rounded corners for the input
    },
  });
  