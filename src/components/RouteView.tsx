import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Text, ActivityIndicator} from 'react-native';
import RNFetchBlob from 'rn-fetch-blob'
import {data, _RouteView} from '../types/types'
import {Button} from './Button'
import {Map} from './Map'

export  const RouteView : React.FC<_RouteView> = ({route, toStartView}) => {
    let [routeData, setRoute] = useState<data>()
    useEffect(() => {
        // console.log('routeData from route', routeData);
        // ПУТИ
        let dirs = RNFetchBlob.fs.dirs 
        let dirPath = dirs.CacheDir + '/routes' //ПУТЬ ДО ПАПКИ С ФАЙЛАМИ
        let filePath = dirPath + '/' + route
        RNFetchBlob.fs.readFile(filePath, 'utf8')
            .then((data) => {
                console.log('not parse', data);
                console.log('parse', JSON.parse(data).date);
                setRoute(JSON.parse(data));
            })
    }, []);

    return (
        <View style={styles.routeView}>
            {routeData ? (
                <Map region={routeData.region} coordinates={routeData.coordinates} />
            ) : (
                <ActivityIndicator size="large" color="#733651" />
            )}
            <View style={styles.button}>
                <Button title="Назад" clickCallback={toStartView} />
            </View>
        </View>
    );
    
};
const fs = RNFetchBlob.fs
const styles = StyleSheet.create({
    routeView: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    button: {
        position: "absolute",
        bottom: 20,
        width: '100%',
        height: 40,
        alignItems: "center",
        zIndex: 10
    }
})