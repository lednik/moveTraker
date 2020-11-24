import React from 'react';
import {StyleSheet} from 'react-native';
import MapView, { Polyline } from 'react-native-maps';

type MapType = {
    region: object,
    coordinates: object[]
}
type data = {
    coordinates : any[],
    region : object,
    date : string
}

export  const Map : React.FC<MapType> = ({region, coordinates}) => {
    
    const styles = StyleSheet.create({
        map: {
            width: '100%', 
            height: '100%', 
            flex: 1
        }
    })
    return (
        <MapView region={region}  style={styles.map}>
            <Polyline
                coordinates={coordinates}
                strokeColor="#A60000"
                strokeWidth={2}
            />
        </MapView>
    );
    
};