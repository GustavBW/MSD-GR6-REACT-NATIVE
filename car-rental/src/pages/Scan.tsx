import React, { useEffect } from 'react';
import { DimensionValue, Image, Pressable, StyleSheet, SafeAreaView, Text, View, Keyboard } from 'react-native';

export interface ScanProps {
    setPage: (view: JSX.Element) => void;
    setPopUp: (view: JSX.Element) => void;
}

export default function Scan({setPage, setPopUp}: ScanProps): JSX.Element {
    return (
        <View>
            <Text>Scan</Text>

        </View>
    )
}