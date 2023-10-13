import React, { useEffect } from 'react';
import { DimensionValue, Image, Pressable, StyleSheet, SafeAreaView, Text, View, Keyboard } from 'react-native';

export interface LicenseProps {
    setPage: (view: JSX.Element) => void;
    setPopUp: (view: JSX.Element) => void;
}

export default function License({setPage, setPopUp}: LicenseProps): JSX.Element {
    return (
        <View>
            <Text>License</Text>

        </View>
    )
}