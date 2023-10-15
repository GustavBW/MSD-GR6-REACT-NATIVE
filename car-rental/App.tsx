import 'react-native-gesture-handler';
import React, { useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { CarData } from './src/ts/types';
import BlurPage from './src/components/BlurPage';
import storage from './src/ts/storage';
import { KnownKeys } from './src/ts/storage';
import {StylingDefaults} from './src/ts/styles';
import PageStack from './src/components/PageStack';

export default function App() {
  const [popUp, setDialog] = useState<JSX.Element>(<></>);

  const setPopUp = (view: JSX.Element) => {
    setDialog(view);
  }

  return (
    <View style={styles.container}>
      <PageStack setPopUp={setPopUp}/>
      <View>
          {popUp}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: StylingDefaults.colors.blueBase.hsl,
  },
});
