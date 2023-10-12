import React, { useEffect } from 'react';
import { DimensionValue, Image, Pressable, StyleSheet, SafeAreaView, TextInput, View, Keyboard } from 'react-native';

export interface PaymentProps {
    setPage: (view: JSX.Element) => void;
    setPopUp: (view: JSX.Element) => void;
}

export default function PaymentFirst({setPage, setPopUp}: PaymentProps): JSX.Element {
    return (
        <View>
            Payment First

        </View>
    )
}