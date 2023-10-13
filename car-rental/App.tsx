import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { CarData } from './src/ts/types';
import BlurPage from './src/components/BlurPage';
import Home from './src/pages/Home';
import storage from './src/ts/storage';
import { KnownKeys } from './src/ts/storage';
import {StylingDefaults} from './src/ts/styles';
import { createStackNavigator } from 'react-navigation-stack';

export default function App() {
  //show loading spinner on null
  const [carData, setCarData] = useState<CarData[]>([]);
  const [networkError, setNetworkError] = useState<Error | null>(null);
  const [blurPage, setBlurPage] = useState<JSX.Element>(<></>);
  const [popUp, setDialog] = useState<JSX.Element>(<></>);

  React.useEffect(() => {
    const doTheThing = async () => {
      const localData = await storage.getAllDataForKey(KnownKeys.carData);
      if(localData.length > 0){
        console.log("Fetched data from local storage")
        setCarData(localData as unknown as CarData[]);
        return;
      }
      let serverData;
      let serverDataJson;
      try{
        serverData = await fetch('http://localhost:3000/car-data');
        serverDataJson = await serverData.json();
        console.log("Fetched data from server")
        console.table(serverDataJson)
      }catch (error){
        setNetworkError(error as Error);
        return;
      }
      setCarData(serverDataJson as CarData[]);
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

  const [currentView, setCurrentView] = useState<JSX.Element>(<Home setPage={setPage} setPopUp={setPopUp} cars={carData}/>);
  const Stack = createStackNavigator({
    Home: {
      screen: Home, 
      path: "home",
      params: {
        setPage: setPage,
        setPopUp: setPopUp,
        cars: carData
      },
      navigationOptions: {
        headerShown: false
      }
    }
  });
  

  return (
    <View style={styles.container}>
      {currentView}
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
