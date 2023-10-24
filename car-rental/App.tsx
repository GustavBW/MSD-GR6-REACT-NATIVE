import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { CarData } from './src/ts/types';
import BlurPage from './src/components/BlurPage';
import Home from './src/pages/Home';
import storage from './src/ts/storage';
import { KnownKeys } from './src/ts/storage';
import {StylingDefaults} from './src/ts/styles';
import Splash from './src/pages/Splash';

export default function App() {
  //show loading spinner on null
  const [carData, setCarData] = useState<CarData[]>([]);
  const [networkError, setNetworkError] = useState<Error | null>(null);
  const [blurPage, setBlurPage] = useState<JSX.Element>(<></>);
  const [popUp, setDialog] = useState<JSX.Element>(<></>);
  const [currentView, setCurrentView] = useState<JSX.Element>(<Splash error={networkError} />);

  React.useEffect(() => {
    const doTheThing = async () => {
      let cars: CarData[] = [];
      let serverData: any;
      try {
        cars = await storage.getAllDataForKey<CarData>(KnownKeys.carData);
        if(cars.length > 0){
          console.log("Fetched data from local storage")
          setCarData(cars);
          return;
        }
      }catch (error){
        console.error("Error fetching data from local storage: \n", error);
        console.log("Fetching data from server instead")
      }
      try{
        serverData = await fetch('http://192.168.0.167:3000/car-data');
      }catch(networkError){
        console.log("Error fetching data from server: \n", networkError)
        console.log((networkError as Error).stack);
        setNetworkError(networkError as Error);
        return;
      }
      try{
        cars = await serverData.json();
        setCarData(cars as CarData[]);
      }catch (error){
        console.log("Data formatting error: \n", error)
        setNetworkError(error as Error);
        return;
      }
      storage.save({
        key: KnownKeys.carData,
        data: cars
      });
      setCurrentView(<Home cars={cars} setPopUp={setPopUp} setPage={setPage} />);
    }
    setTimeout(doTheThing, 1000);
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
