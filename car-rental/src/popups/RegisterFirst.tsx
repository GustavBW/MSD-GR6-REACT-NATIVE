import React, { useState } from "react";
import { SafeAreaView, TextInput, View,StyleSheet, Pressable, Text, Modal, Button, TouchableOpacity, Animated } from "react-native"
interface RegisterFirstProps {
    setPage: (view: JSX.Element) => void;
    setPopUp: (view: JSX.Element) => void;
}

export default function RegisterFirst({
    setPage,
    setPopUp,
}: RegisterFirstProps
) : JSX.Element {
    return (
        <View>
            <Text>Register First</Text>
        </View>
    );
}