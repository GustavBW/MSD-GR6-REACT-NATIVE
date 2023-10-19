import React from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image, DimensionValue } from "react-native";
import { StylingDefaults } from "../ts/styles";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faCarSide } from "@fortawesome/free-solid-svg-icons";
import { CarData } from "../ts/types";
import Car from "../popups/Car";

export default function CarMap({cars, setPopUp, setPage, selectedCar}: 
    {
        cars: CarData[], 
        setPopUp: (view: JSX.Element) => void,
        setPage: (view: JSX.Element) => void,
        selectedCar?: CarData
    }
): JSX.Element {
    let minLat = Number.MAX_VALUE;
    let maxLat = Number.MIN_VALUE;
    let minLon = Number.MAX_VALUE;
    let maxLon = Number.MIN_VALUE;
    for(let car of cars){
        if(car.lat < minLat){
            minLat = car.lat;
        }
        if(car.lat > maxLat){
            maxLat = car.lat;
        }
        if(car.lon < minLon){
            minLon = car.lon;
        }
        if(car.lon > maxLon){
            maxLon = car.lon;
        }
    }
    const diffLat = Math.abs(minLat-maxLat);
    const diffLon = Math.abs(minLon-maxLon);

    const getCarMarker = (car: CarData, key: number): JSX.Element => {
        const normLat = car.lat - minLat;
        const normLon = car.lon - minLon;
        const latPercent = normLat/diffLat;
        const lonPercent = normLon/diffLon;
        const approxLat = latPercent * 100 + "%";
        const approxLon = lonPercent * 100 + "%";

        let calculatedStylings = {...styles.car, ...{
            left: approxLat as DimensionValue,
            top: approxLon as DimensionValue,
        }};
        let iconStylings = {...styles.carIcon};
        if(selectedCar && selectedCar.id === car.id){
            calculatedStylings = {...calculatedStylings, ...styles.carSelected};
            iconStylings = {...iconStylings, color: "gold"};
        }
        
        return (
            <TouchableOpacity key={key} style={calculatedStylings} 
                onPress={() => {
                    setPopUp(<Car car={car} setPopUp={setPopUp} setPage={setPage} />)
                }}
            >
                <FontAwesomeIcon icon={faCarSide} 
                    size={StylingDefaults.iconSize} 
                    style={iconStylings} 
                />
            </TouchableOpacity>
        );
    }

    return (
        <View style={styles.container}>
            <Image source={require('./map.png')} 
                style={styles.mapView}
                resizeMode='cover'
            /> 
            <View style={styles.markers}>
                {cars.map((car, index) => getCarMarker(car, index))}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        position: "absolute",
        width: "100%",
        height: "100%",
        zIndex: 0,
    },
    mapView: {
      zIndex: 0,
      position: "absolute",
      width: "100%",
      height: "100%"
    },
    markers: {
        zIndex: 1,
        position: "absolute",
        width: "80%",
        height: "80%",
        top: "10%",
        left: "10%",
    },
    carIcon: {
        flex: 1,
        color: StylingDefaults.colors.blueBase.hsl,
        shadowColor: "black",
        shadowOffset: {
            width: 0,
            height: 0
        },
        shadowOpacity: 1,
        shadowRadius: 3,
        elevation: 5,
        alignSelf: "center",
    },
    car: {
        flex: 1,
        position: "absolute",
        zIndex: 4,
    },
    carSelected: {
        color: StylingDefaults.colors.greenBase.hsl,
        borderBottomWidth: 3,
        borderTopWidth: 3,
        borderColor: "black",
        borderRadius: 100,
    }
});