/* import React, { useEffect } from 'react';
import { DimensionValue, Image, Pressable, StyleSheet, SafeAreaView, Text, View, Keyboard } from 'react-native';
import { Camera, useCameraDevice } from 'react-native-vision-camera';

 interface ScanProps {
    setPage: (view: JSX.Element) => void;
    setPopUp: (view: JSX.Element) => void;
}



export default function Scan({setPage, setPopUp}: ScanProps): JSX.Element {
    const device = useCameraDevice('back')


  if (device == null) return <></>
  return (
    <Camera
      style={StyleSheet.absoluteFill}
      device={device}
      isActive={true}
    />
  )
}

 */