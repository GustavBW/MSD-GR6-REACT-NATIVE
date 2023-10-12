import React from "react";
import { SafeAreaView, TextInput, View,StyleSheet, Pressable, Text, Modal, Button, TouchableOpacity, Animated } from "react-native"

interface profileProps {
    setPage: (view: JSX.Element) => void;
    setPopUp: (view: JSX.Element) => void;
}

export default function Profile({
    setPage,
    setPopUp,
}: profileProps
) : JSX.Element {
    return (
        <View>
            <Text>Profile</Text>
        </View>
    );
}