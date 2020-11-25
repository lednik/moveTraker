import React, {useState, useEffect} from 'react';
import {StyleSheet} from 'react-native';
import MapView, { Polyline, Marker} from 'react-native-maps';
import {MapType, _Marker, Latlng} from '../types/types'

export  const Map : React.FC<MapType> = ({region, coordinates}) => {
    const [markers, setMarkers] = useState<_Marker[]>([])
    
    const createMarker = (coordinate : Latlng, title : string , description: string) => {
        return {
            latlng: {
                latitude: coordinate.latitude,
                longitude: coordinate.longitude
            },
            title,
            description
        }
    }

    useEffect(()=> {
        let newArray:_Marker[] = [];

        if(coordinates.length > 0) {
            let firstMarker = createMarker(coordinates[0], 'Start', 'Начало маршрута');
            newArray.push(firstMarker);
        }

        if(coordinates.length > 1) {
            let secondMarker = createMarker(coordinates[coordinates.length-1], 'You', 'Конечная точка маршрута');
            newArray.push(secondMarker);
        }

        setMarkers(newArray);
    }, [coordinates])
    return (
        <MapView region={region}  style={styles.map}>
            <Polyline
                coordinates={coordinates}
                strokeColor="#A60000"
                strokeWidth={2}
            />
            {markers.map((marker, index) => (
                <Marker
                    key={index}
                    coordinate={marker.latlng}
                    title={marker.title}
                    description={marker.description}
                />
            ))}
        </MapView>
    );
};
const styles = StyleSheet.create({
    map: {
        width: '100%', 
        height: '100%', 
        flex: 1
    }
})