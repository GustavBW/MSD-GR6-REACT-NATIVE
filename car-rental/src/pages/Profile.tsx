import React, { useEffect } from 'react';
import { DimensionValue, Image, Pressable, StyleSheet, SafeAreaView, TextInput, View, Keyboard } from 'react-native';

export interface ProfileProps {
    setPage: (view: JSX.Element) => void;
    setPopUp: (view: JSX.Element) => void;
}

export default function Profile({setPage, setPopUp}: ProfileProps): JSX.Element {
    return (
        <View>
            Profile

        </View>
    )
}