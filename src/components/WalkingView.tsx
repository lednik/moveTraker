import React, {useState, useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import GetLocation from 'react-native-get-location'
import RNFetchBlob from 'rn-fetch-blob'
import {_WalkingView, data, Latlng} from '../types/types'
import {Button} from './Button'
import {Map} from './Map'

export  const WalkingView : React.FC<_WalkingView> = ({stopWalking}) => {
    
    let [count, setCount] = useState(0)
    let [coordinates, setCoordinates] = useState<Latlng[]>([]);

    const setCoordinatesFunc = (long: number, lat : number) => {
        let newArray : Latlng[] = [...coordinates, { latitude: lat, longitude: long}]
        setCoordinates(newArray)
    }
    const setRegionFunc = (long: number, lat : number) => {
        setRegion({
            latitude: lat,
            longitude: long,
            latitudeDelta: 0.00922,
            longitudeDelta: 0.00421
        })
    }
    const createData = () => {
        // ФОРМИРОВАНИЕ ДАННЫХ МАРШРУТА
        let date = new Date();
        let dateString: string = date.getHours() + ' : ' + date.getMinutes() + ' : ' + date.getMilliseconds();
        let data : data = {
            coordinates,
            region,
            date: dateString
        }
        return data;
    }
    const createFile = (data: data) => {
        let dirs = RNFetchBlob.fs.dirs 
        let dirPath = dirs.CacheDir + '/routes' //ПУТЬ ДО ПАПКИ С ФАЙЛАМИ
        let path =  dirPath + '/' + data.date + '.json' //ПУТЬ ДО СОЗДАВАЕМОГО ФАЙЛА
        let json = JSON.stringify(data) //ТЕЛО НОВОГО ДОКУМЕНТА
        // СОЗДАНИЕ ПАПКИ ПРИ ЕЕ ОТСУТСТВИИ
        RNFetchBlob.fs.mkdir(dirPath)
            .then(()=>{ 
                console.log('mkdir done');
            })
        // СОЗДАНИЕ ФАЙЛА
        RNFetchBlob.fs.createFile(path, json, 'utf8')
            .then(()=>{ 
                console.log('create file done');
            })
    } 
    const stopWalkingFunc = () => {
        let data = createData();
        createFile(data);
        stopWalking();
    }
    const getGeoData = () => {
        console.log('getGeoData');
        
        GetLocation.getCurrentPosition({
            enableHighAccuracy: true,
            timeout: 5000,
        })
            .then(location => {
                setRegionFunc(location.longitude, location.latitude)
                setCoordinatesFunc(location.longitude, location.latitude)
            })
            .catch(error => {
                const { code, message } = error;
                console.warn(code, message);
            })
    }
    useEffect(() => {
        getGeoData();
    }, [coordinates]);
    
    let [region, setRegion] = useState({
        latitude: 0,
        longitude: 0,
        latitudeDelta: 0.0022,
        longitudeDelta: 0.0021,
    });
    return (
        <View style={styles.walkingView}>
            <Map region={region} coordinates={coordinates} />
            <View style={styles.button}>
                <Button title="Пришли" clickCallback={stopWalkingFunc} />
            </View>
        </View>
    );
};
const fs = RNFetchBlob.fs
const styles = StyleSheet.create({
    walkingView: {
        flex: 1
    },
    text: {
        fontSize: 32,
        marginBottom: 24
    },
    button: {
        position: "absolute",
        bottom: 20,
        width: '100%',
        height: 40,
        alignItems: "center"
    }
})