import React, { useEffect } from 'react';
import { DimensionValue, Image, Pressable, StyleSheet, SafeAreaView, TextInput, View, Keyboard } from 'react-native';

export interface RegisterProps {
    setPage: (view: JSX.Element) => void;
    setPopUp: (view: JSX.Element) => void;
}

export default function RegisterSecond({setPage, setPopUp}: RegisterProps): JSX.Element {
    return (
        <View>
            RegisterSecond
        </View>
    )
}