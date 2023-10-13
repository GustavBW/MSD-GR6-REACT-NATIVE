import React, { useEffect } from 'react';
import { DimensionValue, Image, Pressable, StyleSheet, SafeAreaView, Text, View, Keyboard } from 'react-native';

export interface ConfirmationProps {
    setPage: (view: JSX.Element) => void;
    setPopUp: (view: JSX.Element) => void;
}

export default function Confirmation({setPage, setPopUp}: ConfirmationProps): JSX.Element {
    return (
        <View>
            <Text>Confirmation</Text>

        </View>
    )
}