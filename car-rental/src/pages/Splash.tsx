import React, { useEffect } from 'react';
import { Animated, Image, StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { StylingDefaults } from '../ts/styles';

export default function Splash({ error }: { error: Error | null }): JSX.Element {

    const fadeAnim = React.useRef(new Animated.Value(0)).current; // Initial value for opacity: 0

    useEffect(() => {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 10000,
        useNativeDriver: true,
      }).start();
    }, [fadeAnim]);

    return (
        <View style={styles.container}>
            <LinearGradient 
                 colors={[StylingDefaults.colors.blueBase.hsl, StylingDefaults.colors.greenBase.hsl]}
                 style={{...StyleSheet.absoluteFillObject, zIndex: -1}}
            />
            <Image source={require('./icon.png')} 
                style={styles.image}
                resizeMethod='resize'
                resizeMode='contain'
            />
            <Text style={styles.title}>Need4Car™</Text>
            <Text style={styles.error}>{error?.message}</Text>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    title: {
        fontSize: StylingDefaults.fontSize.title,
        textAlign: "center",
        padding: "10%"
    },
    image: {
        width: "100%",
        height: "20%",
    },
    error: {
        color: "red",
        textAlign: "center",
        padding: "10%"
    }
})