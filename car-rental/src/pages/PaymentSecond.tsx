import React, { useEffect } from 'react';
import { DimensionValue, Image, Pressable, StyleSheet, SafeAreaView, Text, View, Keyboard } from 'react-native';

export interface PaymentProps {
    setPage: (view: JSX.Element) => void;
    setPopUp: (view: JSX.Element) => void;
}

export default function PaymentSecond({setPage, setPopUp}: PaymentProps): JSX.Element {
    return (
        <View>
            <Text>Payment</Text>

        </View>
    )
}