import React, {useState, useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import RNFetchBlob from 'rn-fetch-blob'
import {data, _RouteView} from '../types/types'
import {Button} from './Button'
import {Map} from './Map'

const fs = RNFetchBlob.fs

// type data = {
//     coordinates : any[],
//     region : object,
//     date : string
// }

// type RouteView = {
//     route: string,
//     toStartView(): void
// }

export  const RouteView : React.FC<_RouteView> = ({route, toStartView}) => {
    let [routeData, setRoute] = useState<data>({
        coordinates: [],
        region: {},
        date: ''
    })
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

    useEffect(() => {
        console.log('route from route', route);
        
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
            <Map region={routeData.region} coordinates={routeData.coordinates} />
            <View style={styles.button}>
                <Button title="Назад" clickCallback={toStartView} />
            </View>
        </View>
    );
    
};