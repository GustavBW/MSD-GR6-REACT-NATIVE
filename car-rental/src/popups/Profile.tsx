/* import React, { useCallback, useMemo, useRef } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import BottomSheet, {BottomSheetView} from '@gorhom/bottom-sheet';

interface ProfileProps {
    setPage: (view: JSX.Element) => void;
    setPopUp: (view: JSX.Element) => void;
}

export default function Profile({setPage, setPopUp}: ProfileProps): JSX.Element {
    return (
        <View style={styles.container}>
            <BottomSheet>
                <BottomSheetView style={styles.contentContainer}>
                    <Text>Awesome</Text>
                </BottomSheetView>
            </BottomSheet>
        </View>
      );
    };
    
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        padding: 24,
        backgroundColor: 'grey',
      },
      contentContainer: {
        flex: 1,
        alignItems: 'center',
      },
    }); */