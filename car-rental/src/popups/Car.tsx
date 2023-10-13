import React, { useEffect } from 'react';
import { DimensionValue, Image, Pressable, StyleSheet, SafeAreaView, Text, View, Keyboard } from 'react-native';
import { Car } from '../ts/types';

export interface CarProps {
    setPage: (view: JSX.Element) => void;
    setPopUp: (view: JSX.Element) => void;
    car: Car;
}

export default function Car({setPage, setPopUp}: CarProps): JSX.Element {
    return (
        <View>
            <Text>Car</Text>

        </View>
    )
}