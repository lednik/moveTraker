import React, {useState, useEffect} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import MapView, { Polyline } from 'react-native-maps';
import GetLocation from 'react-native-get-location'

import {Button} from './Button'

type WalkingView = {
    stopWalking(): void
}

export  const WalkingView : React.FC<WalkingView> = ({stopWalking}) => {
    
    let [count, setCount] = useState(0)
    let [coordinates, setCoordinates] = useState<object[]>([]);

    const setCoordinatesFunc = (long: number, lat : number) => {
        let newArray : object[] = [...coordinates, { latitude: lat, longitude: long}]
        setCoordinates(newArray)
        console.log('coordinates', coordinates);
    }
    const setRegionFunc = (long: number, lat : number) => {
        setRegion({
            latitude: lat,
            longitude: long,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421
        })
    }
    const stopWalkingFunc = () => {
        stopWalking();
    }
    useEffect(() => {
        setTimeout(()=> {
            setCount(count + 1);
            console.log(count);
        },5000)
        GetLocation.getCurrentPosition({
            enableHighAccuracy: true,
            timeout: 5000,
        })
        .then(location => {
            console.log(location.latitude);
            console.log(location.longitude);
            setRegionFunc(location.longitude, location.latitude)
            setCoordinatesFunc(location.longitude, location.latitude)
        })
        .catch(error => {
            const { code, message } = error;
            console.warn(code, message);
        })
    }, [count]);
    const styles = StyleSheet.create({
        walkingView: {
            flex: 1,
            // alignItems: 'center',
            // justifyContent: 'center',
        },
        text: {
            fontSize: 32,
            marginBottom: 24
        },
        map: {
            width: '100%', 
            height: '100%', 
            flex: 1
        },
        button: {
            position: "absolute",
            bottom: 20,
            width: '100%',
            height: 40,
            alignItems: "center"
        }
    })
    let [region, setRegion] = useState({
        latitude: 0,
        longitude: 0,
        latitudeDelta: 0.00022,
        longitudeDelta: 0.00021,
    });
    return (
        <View style={styles.walkingView}>
            <MapView region={region}  style={styles.map}>
                <Polyline
                    coordinates={coordinates}
                    strokeColor="#A60000"
                    strokeWidth={2}
                />
            </MapView>
            <View style={styles.button}>
                <Button title="Пришли" clickCallback={stopWalkingFunc} />
            </View>
        </View>
    );
    
};