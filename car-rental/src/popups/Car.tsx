import React, { useEffect } from 'react';
import { DimensionValue, Image, Pressable, StyleSheet, SafeAreaView, Text, View, Keyboard } from 'react-native';
import { CarData } from '../ts/types';

export interface CarProps {
    setPage: (view: JSX.Element) => void;
    setPopUp: (view: JSX.Element) => void;
    car: CarData;
}

export default function Car({setPage, setPopUp, car}: CarProps): JSX.Element {
    return (
        <View>
            <Text>{car.manufacturer}</Text>

        </View>
    )
}