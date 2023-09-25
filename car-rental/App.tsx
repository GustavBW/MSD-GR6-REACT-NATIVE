import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { Car } from './src/ts/types';

export default function App() {
  const [clickCount,setClickCount] = useState(0);
  //show loading spinner on null
  const [carData, setCarData] = useState<Car[] | null>(null);
  const [networkError, setNetworkError] = useState<Error | null>(null);

  React.useEffect(() => {
    //Check local storage first, else:
    fetch('https://localhost:3000/car-data')
    .catch(err => {
      console.log("Networking error: \n"+err);
      setNetworkError(err);
    }).then(res => res?.json())
    .catch(err => console.log("Data formatting error: \n"+err))
    .then(data => setCarData(data as Car[]));
  })


  return (
    <View style={styles.container}>
      <Text>Open up App.tsx to start working on your app!</Text>
      <StatusBar style="auto" />
      <Button onPress={()=>setClickCount(clickCount+1)} title={clickCount+''}></Button>
      

    </View>
  );

  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
