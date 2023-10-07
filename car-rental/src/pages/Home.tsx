import React, { useEffect } from 'react';
import { Button, DimensionValue, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import Map, {Marker} from 'react-map-gl';
import mapboxgl from 'mapbox-gl';
import { StylingDefaults } from '../ts/styles';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faUser, faBars, faCarSide } from '@fortawesome/free-solid-svg-icons'
import { Car } from '../ts/types';

export interface HomeProps {
    setPage: (view: JSX.Element) => void;
    setPopUp: (view: JSX.Element) => void;
    cars: Car[];
}

enum Actives {
    menu,
    profile,
    input,
    neither
}

export default function Home({setPage, setPopUp, cars}: HomeProps){
    const [address, setAddress] = React.useState<string>("");
    const [currentlyActive, setCurrentlyActive] = React.useState<Actives>(Actives.neither);
    const [carMarkers, setMarkers] = React.useState<JSX.Element[]>([]);

    const getCarMarker = (car: Car, key: number): JSX.Element => {
        console.log("Generating marker for car", car)
        return (
            <Marker key={key} 
                longitude={car.lon} 
                latitude={car.lat} 
                anchor="bottom"
                pitchAlignment='viewport'
                onClick={() => {console.log("Showing Car popup with car", car)}}
                >
                <FontAwesomeIcon icon={faCarSide} size={StylingDefaults.iconSize} color={StylingDefaults.colors.blueBase.hsl} />
            </Marker>
        )
    }
    useEffect(() => {
        console.log("Cars changed, updating markers")
        const newMarkers = cars.map((car, index) => getCarMarker(car, index));
        setMarkers(newMarkers);
        console.log("Markers updated, cars: ", cars, "markers: ", newMarkers)
    },[cars]);

    return (
        <View style={styles.homeContainer}>
            <Map
                mapLib={mapboxgl}
                initialViewState={{
                longitude: 10.4275,
                latitude: 55.366,
                zoom: 14
                }}
                mapStyle="mapbox://styles/mapbox/streets-v9"
                mapboxAccessToken={"pk.eyJ1IjoiZ3VzdGF2YnciLCJhIjoiY2xuZno0Znl5MGJjYTJxbWk0cm1jY24xNSJ9.NdCcfyzq5ltuXHkjzrzZLQ"}
            >
                {carMarkers}
            </Map>
            <View style={styles.lowerMenu}>
                <Pressable style={styles.iconButton}
                    onPress={() => {
                        console.log("Showing menu");
                        setCurrentlyActive(Actives.menu);
                    }}
                >
                    <FontAwesomeIcon icon={faBars} size={StylingDefaults.iconSize} color={StylingDefaults.colors.blueBase.hsl} />
                </Pressable>
                <TextInput
                    style={{...styles.input, backgroundColor: currentlyActive == Actives.input ? StylingDefaults.colors.greenBase.hsl :  StylingDefaults.colors.blueBase.hsl}}
                    placeholder="University of Southern Denmark"
                    inputMode="text"
                    defaultValue={address}
                    onFocus={() => {
                        console.log("Showing input")
                        setCurrentlyActive(Actives.input);
                    }}
                    onBlur={() => {
                        console.log("Hiding input")
                        setCurrentlyActive(Actives.neither);
                    }}
                />
                <Pressable style={styles.iconButton}
                    onPress={() => {
                        console.log("Showing profile")
                        setCurrentlyActive(Actives.profile);
                    }}
                >                    
                    <FontAwesomeIcon icon={faUser} size={StylingDefaults.iconSize} color={StylingDefaults.colors.blueBase.hsl} />
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
      bottom: heightOfMenuPercent + "%" as DimensionValue,
      height: heightOfMenuPercent + "%" as DimensionValue,
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
      flex: 2, // Takes up twice the space of the buttons
      paddingHorizontal: 10, // Add horizontal padding for the input
      borderWidth: 1, // Add border for the input
      width: "90%",
      height: "66%",
      borderColor: 'black', // Border color
      borderRadius: StylingDefaults.borderRadius, // Rounded corners for the input
      backgroundColor: StylingDefaults.colors.blueBase.hsl, // White background for the input
      textAlign: 'center', // Center text horizontally
      textOverflow: 'ellipsis', // Ellipsis overflow for the input
    },
  });
  