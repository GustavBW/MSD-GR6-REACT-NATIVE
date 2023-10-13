import React, { useEffect } from 'react';
import { DimensionValue, Image, Pressable, StyleSheet, SafeAreaView, Text, View, Keyboard } from 'react-native';

export interface RegisterProps {
    setPage: (view: JSX.Element) => void;
    setPopUp: (view: JSX.Element) => void;
}

export default function RegisterSecond({setPage, setPopUp}: RegisterProps): JSX.Element {
    return (
        <View>
            <Text>RegisterSecond</Text>
        </View>
    )
}