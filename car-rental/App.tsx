import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { CarData } from './src/ts/types';
import BlurPage from './src/components/BlurPage';
import Home from './src/pages/Home';
import storage from './src/ts/storage';
import { KnownKeys } from './src/ts/storage';
import AsyncStorage from '@react-native-async-storage/async-storage';
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
    const fetchBackendData = async () => {
      let cars: CarData[] = [];
      let serverData: any;
      let localFound: boolean = false;
      try {
        cars = await storage.getAllDataForKey<CarData>(KnownKeys.carData);
        if(cars.length > 0){
          console.log("Fetched data from local storage")
          setCarData(cars);
          localFound = true;
        }
      }catch (error){
        console.error("Error fetching data from local storage: \n", error);
        console.log("Fetching data from server instead")
      }
      if(!localFound){
        console.log("No data available locally, fetching from server")
        try{
          serverData = await fetch('http://192.168.3.5:3000/car-data');
        }catch(networkError){
          console.log("Error fetching data from server: \n", networkError)
          console.log((networkError as Error).stack);
          setNetworkError(networkError as Error);
          return;
        }
        try{
          cars = await serverData.json();
          const asArray = [];
          for(let car of cars){
            asArray.push(car as CarData);
          }
          setCarData(cars as CarData[]);
        }catch (error){
          console.log("Data formatting error: \n", error)
          setNetworkError(error as Error);
          return;
        }
      }
      await storage.save({
        key: KnownKeys.carData,
        data: JSON.stringify(cars)
      });
      setCurrentView(<Home setPopUp={setPopUp} setPage={setPage} />);
    }
    fetchBackendData();
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
