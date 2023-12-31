import React, { useEffect, useState, useRef } from 'react';
import { Text, View, Image, Button } from 'react-native';
import { Camera, CameraType } from 'expo-camera';
import License from './License';
import storage,{KnownKeys} from '../../src/ts/storage'
import * as MediaLibrary from 'expo-media-library';
import { CarData } from '../ts/types';
import RegisterSecond from '../popups/RegisterSecond';
import Home from './Home';
import PaymentFirst from './PaymentFirst';

interface ScanProps {
  setPage: (view: JSX.Element) => void;
  setPopUp: (view: JSX.Element) => void;
  scanFromRegistration?: boolean,
  scanFromPayment?: boolean,
  car?: CarData,
  usernameProp?: string,
  emailProp?: string,
  passwordProp?: string,
  repeatPasswordProp?: string,
  addressProp?: string,
  tosProp?: boolean,
  newsLetterProp?: boolean
}

export default function Scan({ 
   setPage,
   setPopUp,
   scanFromRegistration = false,
   scanFromPayment = false,
   car = {
     model: '',
     manufacturer: '',
     year: 0,
     weightKg: 0,
     dkkPrKm: 0,
     dimensions: [],
     lat: 0,
     lon: 0,
     available: false,
     id: 0
   } ,
   usernameProp = "",
    emailProp  = "",
    passwordProp = "",
    repeatPasswordProp = "",
    addressProp = "",
    tosProp = false,
    newsLetterProp = false,
  }: ScanProps): JSX.Element {
  const [hasCameraPermission, setHasCameraPermission] = useState<boolean | null>(null);
  const [hasMediaLibraryPermission, setHasMediaLibraryPermission] = useState<boolean | null>(null);
  const [isPreviewing, setIsPreviewing] = useState(false);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [isLoggedIn, setLoggedIn] = useState<String>("false");
 
const [photo, setPhoto] = useState<MediaLibrary.Asset | undefined>();
const cameraRef = useRef<Camera | null>(null);

  useEffect(() => {
    (async () => {
      const cameraPermission = await Camera.requestCameraPermissionsAsync();
      const mediaLibraryPermission = await MediaLibrary.requestPermissionsAsync();
      setHasCameraPermission(cameraPermission.status === 'granted');
      setHasMediaLibraryPermission(mediaLibraryPermission.status === 'granted');
      })();
  }, []);

  const takePicture = async () => {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync();
      setCapturedImage(photo.uri);
      setIsPreviewing(true);
    }
  };

  const resetPreview = () => {
    setCapturedImage(null);
    setIsPreviewing(false);
  };

  const saveImage = async () => {
    if (capturedImage) {
      try {
        console.log('Saving image...');
        const asset: MediaLibrary.Asset = await MediaLibrary.createAssetAsync(capturedImage);
        const album = await MediaLibrary.getAlbumAsync('driverLicense');
        if (album) {
          await MediaLibrary.addAssetsToAlbumAsync([asset], album);
          console.log('Photo added to album!');
        } else {
          const newAlbum = await MediaLibrary.createAlbumAsync('driverLicense', asset, false);
        }
        console.log('Photo saved to album!');
        console.log('Photo: ', asset);
  
        storage.save({ key: KnownKeys.licenseImage, data: asset });
  
        const loadedImage = await storage.load<MediaLibrary.Asset>({ key: KnownKeys.licenseImage });
        console.log('Loaded Image: ', loadedImage);
  
  
        setPhoto(loadedImage);
        setIsPreviewing(false);
      } catch (error) {
        console.error(`Error saving image: ${error}`);
      }
    }
  };
  
  if (hasCameraPermission === undefined) {
    return <Text>Requesting permissions...</Text>
  } else if (!hasCameraPermission) {
    return <Text>Permission for camera not granted. Please change this in settings.</Text>
  }

  return (
        <View style={{ flex: 1 }}>
      {isPreviewing ? (
        <View style={{ flex: 1 }}>
          {capturedImage && <Image source={{ uri: capturedImage }} style={{ flex: 1 }} />}
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Button title="Scan Again" onPress={resetPreview} />
            <Button title="Save" onPress= {() =>{
              saveImage().then(() => {
                  if(scanFromRegistration){
                    setPage(<Home setPage={setPage} setPopUp={setPopUp} />)
                    setPopUp(<RegisterSecond setPage={setPage} setPopUp={setPopUp} usernameProp={usernameProp} emailProp={emailProp} passwordProp={passwordProp} repeatPasswordProp={repeatPasswordProp} addressProp={addressProp} newsLetterProp={newsLetterProp} tosProp={tosProp}  />)
                  }
                  else if(scanFromPayment){
                    setPage(<PaymentFirst setPage={setPage} setPopUp={setPopUp} car={car}/>)
                  }
                  else{
                    setPage(<License setPage={setPage} setPopUp={setPopUp}/>);
                  }
              });
            }} />
          </View>
        </View>
      ) : (
        <Camera style={{ flex: 1 }} type={CameraType.back} ref={cameraRef}>
          <View
            style={{
              flex: 1,
              backgroundColor: 'transparent',
              flexDirection: 'row',
            }}
          >
          </View>
        </Camera>
      )}
      <Button
        title='Scan'
        onPress= {() => {
          takePicture();
        }}
      />
    </View>
  );
}
