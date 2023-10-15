import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import AllCars from '../pages/AllCars';
import { CarData, Pages, StackParamList } from '../ts/types';
import Splash from '../pages/Splash';
import License from '../pages/License';
import Profile from '../pages/Profile';
import Home from '../pages/Home';
import PaymentFirst from '../pages/PaymentFirst';
import PaymentSecond from '../pages/PaymentSecond';
import Scan from '../pages/Scan';
import storage, { KnownKeys } from '../ts/storage';

interface PageStackProps {
    setPopUp: (view: JSX.Element) => void;
}

const Stack = createStackNavigator<StackParamList>();

export default function PageStack({setPopUp}: PageStackProps): JSX.Element {
    const [networkError, setNetworkError] = React.useState<Error | null>(null);
    const [cars, setCarData] = React.useState<CarData[]>([]);
    const [appIsReady, setAppIsReady] = React.useState<boolean>(false);
    const setPage = (view: JSX.Element) => {
        console.error("You're using the wrong setPage method. Please use the navigation prop instead.");
    }

    React.useEffect(() => {
        const doTheThing = async () => {
          let localData: CarData[] | undefined;
          try {
            await storage.sync();
            localData = await storage.getAllDataForKey<CarData>(KnownKeys.carData);
            if(localData.length > 0){
              console.log("Fetched data from local storage")
              setCarData(localData);
              return;
            }
          }catch (error){
            console.error("Error fetching data from local storage: \n", error);
            console.log("Fetching data from server instead")
          }
          let serverData;
          try{
            const serverDataJson = await fetch('http://localhost:3000/car-data');
            serverData = await serverDataJson.json();
            console.log("Fetched data from server")
            console.table(serverDataJson)
            setCarData(serverData as CarData[]);
          }catch (error){
            console.log("Error fetching data from server: \n", error)
            setNetworkError(error as Error);
            return;
          }
          setAppIsReady(true);
          await storage.save({
            key: KnownKeys.carData,
            data: serverData
          });
        }
        doTheThing();
      },[]);
    

  return (
    <Stack.Navigator initialRouteName={appIsReady ? Pages.Home : Pages.Splash}>
      <Stack.Screen name={Pages.AllCars} component={AllCars} initialParams={{cars, setPopUp}} />
      <Stack.Screen name={Pages.Splash} component={Splash} />
      <Stack.Screen name={Pages.Home} component={Home} initialParams={{cars,setPopUp}} />
    </Stack.Navigator>
  );
}