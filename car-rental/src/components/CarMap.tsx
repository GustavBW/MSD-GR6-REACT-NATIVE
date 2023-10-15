import React from 'react';
import { StyleSheet, View,Text } from 'react-native';
import { CarData } from '../ts/types';
import { MapMarker, WebViewLeaflet, MapLayerType } from 'react-native-webview-leaflet';

const mapBoxToken = "pk.eyJ1IjoiZ3VzdGF2YnciLCJhIjoiY2xuZno0Znl5MGJjYTJxbWk0cm1jY24xNSJ9.NdCcfyzq5ltuXHkjzrzZLQ";
const layerDefinitions = [
    {
        baseLayerName: 'OpenStreetMap',  // the name of the layer, this will be seen in the layer selection control
        baseLayerIsChecked: true,  // if the layer is selected in the layer selection control
        layerType: MapLayerType.WMS_TILE_LAYER,  // Optional: a MapLayerType enum specifying the type of layer see "Types of Layers" below. Defaults to TILE_LAYER
        baseLayer: true,
        // url of tiles
        url: `https://api.tiles.mapbox.com/v4/mapbox.streets/{z}/{x}/{y}.png?access_token=${mapBoxToken}`,
        // attribution string to be shown for this layer
    }
]

const Loading = (): JSX.Element => {
    return (
        <View style={styles.container}>
            <Text>Loading...</Text>
        </View>
    );
}

export default function CarMap({cars}: {cars: CarData[]}): JSX.Element {
    const webViewLeaflet = React.useRef<WebViewLeaflet>(null);

    const getMarkers = (cars: CarData[]): MapMarker[] => {
        return cars.map(car => {
            return {
                id: car.id + "",
                position: {lat: car.lat, lon: car.lon},
                title: car.manufacturer,
                icon: 'car',
                iconColor: 'blue',
                size: [30, 30],
                iconAnchor: {x: 15, y: 15},
                onClick: () => console.log("clicked on car: " + car.id)
                
            }
        });
    }

    return (
        <WebViewLeaflet
            ref={webViewLeaflet}
            mapCenterPosition={{lat: 55.366, lon: 10.4275}}
            zoom={14}
            mapLayers={layerDefinitions}
            mapMarkers={getMarkers(cars)}
            onMessageReceived={(message) => {}}
            doShowDebugMessages={true}
            loadingIndicator={Loading}
        />
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    map: {
      width: '100%',
      height: '100%',
    },
  });