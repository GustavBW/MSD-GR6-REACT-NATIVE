import React, { useEffect, useState, useRef } from 'react';
import { Text, View, TouchableOpacity, Image, Button, SafeAreaView } from 'react-native';
import { Camera, CameraType } from 'expo-camera';
import * as FileSystem from 'expo-file-system';
import License from './License';
import storage,{KnownKeys} from '../../src/ts/storage'
import * as MediaLibrary from 'expo-media-library';
import { CarData } from '../ts/types';

interface ScanProps {
  setPage: (view: JSX.Element) => void;
  setPopUp: (view: JSX.Element) => void;
}

export default function Scan({ setPage, setPopUp }: ScanProps): JSX.Element {
  const [hasCameraPermission, setHasCameraPermission] = useState<boolean | null>(null);
  const [hasMediaLibraryPermission, setHasMediaLibraryPermission] = useState<boolean | null>(null);
  const [isPreviewing, setIsPreviewing] = useState(false);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
 
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
          // If the album doesn't exist, you can create it
          const newAlbum = await MediaLibrary.createAlbumAsync('driverLicense', asset, false);
        }
        console.log('Photo saved to album!');
        console.log('Photo: ', asset);
  
        // Save the image data with the key
        storage.save({ key: KnownKeys.licenseImage, data: asset });
  
        // Load the saved image data and log it
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
    <SafeAreaView style={{ flex: 1 }}>
      {isPreviewing ? (
        <View style={{ flex: 1 }}>
          {capturedImage && <Image source={{ uri: capturedImage }} style={{ flex: 1 }} />}
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Button title="Scan Again" onPress={resetPreview} />
            <Button title="Save" onPress= {() =>{
              saveImage().then(() => {
                setPage(<License setPage={setPage} setPopUp={setPopUp}/>);
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
    </SafeAreaView>
  );
}
