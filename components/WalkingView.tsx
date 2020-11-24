import React, {useState, useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import GetLocation from 'react-native-get-location'
import RNFetchBlob from 'rn-fetch-blob'
const fs = RNFetchBlob.fs


import {Button} from './Button'
import {Map} from './Map'


type WalkingView = {
    stopWalking(): void
}
type data = {
    coordinates : any[],
    region : object,
    date : string
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
        // ФОРМИРОВАНИЕ ДАННЫХ МАРШРУТА
        let date = new Date();
        let dateString: string = date.getHours() + ' : ' + date.getMinutes() + ' : ' + date.getMilliseconds();
        let data : data = {
            coordinates,
            region,
            date: dateString
        }
        let json = JSON.stringify(data)
        // ПУТИ
        const dirs = RNFetchBlob.fs.dirs 
        let dirPath = dirs.CacheDir + '/routes' //ПУТЬ ДО ПАПКИ С ФАЙЛАМИ
        let path =  dirPath + '/' + data.date + '.json' //ПУТЬ ДО СОЗДАВАЕМОГО ФАЙЛА
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
        stopWalking();
    }
    useEffect(() => {
        setTimeout(()=> {
            setCount(count + 1);
        },5000)
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
            {/* <MapView region={region}  style={styles.map}>
                <Polyline
                    coordinates={coordinates}
                    strokeColor="#A60000"
                    strokeWidth={2}
                />
            </MapView> */}
            <Map region={region} coordinates={coordinates} />
            <View style={styles.button}>
                <Button title="Пришли" clickCallback={stopWalkingFunc} />
            </View>
        </View>
    );
    
};