import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { Car } from './src/ts/types';
import BlurPage from './src/components/BlurPage';
import Home from './src/pages/Home';

export default function App() {
  //show loading spinner on null
  const [carData, setCarData] = useState<Car[] | null>(null);
  const [networkError, setNetworkError] = useState<Error | null>(null);
  const [blurPage, setBlurPage] = useState<JSX.Element>(<></>);
  const [popUp, setDialog] = useState<JSX.Element>(<></>);

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
  },
});
