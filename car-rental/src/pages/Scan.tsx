import React, { useEffect, useState, useRef } from 'react';
import { Text, View, TouchableOpacity, Image, Button } from 'react-native';
import { Camera, CameraType } from 'expo-camera';
import * as FileSystem from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library';
import License from './License';

interface ScanProps {
  setPage: (view: JSX.Element) => void;
  setPopUp: (view: JSX.Element) => void;
  username?: string;
  password?: string;
  imagePath : string | undefined;
}

export default function Scan({ setPage, setPopUp,username,password,imagePath }: ScanProps): JSX.Element {
  const [hasCameraPermission, setHasCameraPermission] = useState<boolean | null>(null);
  const [hasMediaLibraryPermission, setHasMediaLibraryPermission] = useState<boolean | null>(null);
  const [isFrontCamera, setIsFrontCamera] = useState(false);
  const [isPreviewing, setIsPreviewing] = useState(false);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
/*   const [photo, setPhoto] = useState<FileSystem.FileInfo | undefined>();
 */  
const [photo, setPhoto] = useState<FileSystem.FileInfo | undefined>();
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
        const asset:any = await MediaLibrary.createAssetAsync(capturedImage);
        const album = await MediaLibrary.getAlbumAsync('YourAlbumName');
        if (album) {
          await MediaLibrary.addAssetsToAlbumAsync([asset], album);
          console.log('Photo added to album!');
        } else {
          // If the album doesn't exist, you can create it
          const newAlbum = await MediaLibrary.createAlbumAsync('YourAlbumName', asset, false);
        }
        console.log('Photo saved to album!');
        console.log('Photo: ', asset);
        setPhoto(asset);
        imagePath = asset.uri;
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
                console.log("username: ", username);
                console.log("imagePath: ", imagePath);
                setPage(<License setPage={setPage} setPopUp={setPopUp} imagePath={imagePath} username={username} password={password} />);
              });
            }} />
          </View>
        </View>
      ) : (
        <Camera style={{ flex: 1 }} type={isFrontCamera ? CameraType.front : CameraType.back} ref={cameraRef}>
          <View
            style={{
              flex: 1,
              backgroundColor: 'transparent',
              flexDirection: 'row',
            }}
          >
            <TouchableOpacity
              style={{
                flex: 0.1,
                alignSelf: 'flex-end',
                alignItems: 'center',
              }}
              onPress={() => {
                setIsFrontCamera(!isFrontCamera);
              }}
            >
              <Text style={{ fontSize: 18, marginBottom: 10, color: 'white' }}>
                Flip
              </Text>
            </TouchableOpacity>
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
