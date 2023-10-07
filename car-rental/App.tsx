import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { Car } from './src/ts/types';
import BlurPage from './src/components/BlurPage';
import Home from './src/pages/Home';
import storage from './src/ts/storage';
import { KnownKeys } from './src/ts/storage';

export default function App() {
  //show loading spinner on null
  const [carData, setCarData] = useState<Car[] | null>(null);
  const [networkError, setNetworkError] = useState<Error | null>(null);
  const [blurPage, setBlurPage] = useState<JSX.Element>(<></>);
  const [popUp, setDialog] = useState<JSX.Element>(<></>);

  React.useEffect(() => {
    const doTheThing = async () => {
      const localData = await storage.getAllDataForKey(KnownKeys.carData);
      if(localData.length > 0){
        setCarData(localData as unknown as Car[]);
        return;
      }
      let serverData;
      let serverDataJson;
      try{
        serverData = await fetch('http://localhost:3000/car-data');
        serverDataJson = await serverData.json();
      }catch (error){
        setNetworkError(error);
        return;
      }
      setCarData(serverDataJson as Car[]);
      await storage.save({
        key: KnownKeys.carData,
        data: serverDataJson
      });
    }
    doTheThing();
  },[]);

  const setPage = (view: JSX.Element) => {
      //Delegating helper methods 
      if(view != currentView){
        setBlurPage(<></>);
        setDialog(<></>);
      }
      setCurrentView(view);
  }

  const setPopUp = (view: JSX.Element) => {
    //Delegating helper methods 
    setDialog(view);
    setBlurPage(<BlurPage />);
  }

  const [currentView, setCurrentView] = useState<JSX.Element>(<Home setPage={setPage} setPopUp={setPopUp}/>);

  return (
    <View style={styles.container}>
      {currentView}
      {blurPage}
      {popUp}
    </View>
  );

  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    width:"100%",
    height:"100%"
  },
});
