import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import AllCars from '../pages/AllCars';
import { CarData, Pages, StackParamList } from '../ts/types';
import type { NavigationProp } from '@react-navigation/native';
import Splash from '../pages/Splash';
import License from '../pages/License';
import Profile from '../pages/Profile';
import Home from '../pages/Home';
import PaymentFirst from '../pages/PaymentFirst';
import PaymentSecond from '../pages/PaymentSecond';
import Scan from '../pages/Scan';
import storage, { KnownKeys } from '../ts/storage';
import { useNavigation } from '@react-navigation/native';

interface PageStackProps {
    setPopUp: (view: JSX.Element) => void;
}

const Stack = createStackNavigator<StackParamList>();

export default function PageStack({setPopUp}: PageStackProps): JSX.Element {
    const [networkError, setNetworkError] = React.useState<Error | null>(null);
    const [cars, setCarData] = React.useState<CarData[]>([]);
    const setPage = (view: JSX.Element) => {
        console.error("You're using the wrong setPage method. Please use the navigation prop instead.");
    }
    const navigation = useNavigation<NavigationProp<StackParamList>>();

    React.useEffect(() => {
        const doTheThing = async () => {
          let cars: CarData[] = [];
          try {
            cars = await storage.getAllDataForKey<CarData>(KnownKeys.carData);
            if(cars.length > 0){
              console.log("Fetched data from local storage")
              setCarData(cars);              
              navigation.navigate(Pages.Home, {cars, setPopUp});
              return;
            }
          }catch (error){
            console.error("Error fetching data from local storage: \n", error);
            console.log("Fetching data from server instead")
          }
          try{
            const serverDataJson = await fetch('http://localhost:3000/car-data');
            cars = await serverDataJson.json();
            console.log("Fetched data from server")
            console.table(serverDataJson)
            setCarData(cars as CarData[]);
          }catch (error){
            console.log("Error fetching data from server: \n", error)
            setNetworkError(error as Error);
            navigation.navigate(Pages.Home, {cars, setPopUp});
            return;
          }

          navigation.navigate(Pages.Home, {cars, setPopUp});
          await storage.save({
            key: KnownKeys.carData,
            data: cars
          });
        }
        setTimeout(doTheThing, 1000);
      },[]);
    

  return (
    <Stack.Navigator initialRouteName={Pages.Splash}
        screenOptions={{headerShown:false}}
    >
        <Stack.Screen name={Pages.AllCars} 
            component={AllCars} 
            initialParams={{cars, setPopUp}} 
        />
        <Stack.Screen name={Pages.Splash} 
            component={Splash} 
        />
        <Stack.Screen name={Pages.Home} 
            component={Home} 
            initialParams={{cars,setPopUp}} 
        />
    </Stack.Navigator>
  );
}