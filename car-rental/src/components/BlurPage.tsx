import React, { useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';

export default function BlurPage(){
    return (
        <View style={styles.blurPage}>
            <Text>BlurPage</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    blurPage: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,

        backgroundColor: "rgba(0,0,0,0.5)"
    }
})