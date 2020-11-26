import React, {useState, useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import GetLocation from 'react-native-get-location'
import {fs, dirPath} from '../../params/path'
import {_WalkingView, data, Latlng} from '../../types/types'
import {Button} from '../Button'
import {Map} from '../Map'
import {SaveRouteModal} from '../SaveRouteModal'

export  const WalkingView : React.FC = ({navigation}) => {

    const [coordinates, setCoordinates] = useState<Latlng[]>([]);
    const [modalVisible, setModalVisible] = useState(false);

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
    const createFile = (data: data, routeName : string | undefined) => {
        let path =  dirPath + '/' + routeName + '.json'
        let json = JSON.stringify(data)
        fs.mkdir(dirPath)
            .then(()=>{ 
                console.log('mkdir done');
            })
        // СОЗДАНИЕ ФАЙЛА
        fs.createFile(path, json, 'utf8')
            .then(()=>{ 
                console.log('create file done');
            })
    }
    const stopWalkingFunc = (isSave : boolean, routeName?: string) => {
        if (isSave) {
            console.log('routeName',routeName);
            let data = createData();
            createFile(data, routeName);
        }
        // stopWalking();
        navigation.navigate('Home')
    }
    const getGeoData = () => {
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
                getGeoData();
                // тут еще можно каунтер завести, в случае успеха геозапроса сбрасывать
                // а в случае n-ного количества ошибок подряд выводить инфу пользователю,
                // что есть проблемы с получением данных
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
                <Button title="Сохранить" clickCallback={() => setModalVisible(true)} />
            </View>
            <SaveRouteModal 
                createFunc={(value) => stopWalkingFunc(true, value)} 
                cancelFunc={() => stopWalkingFunc(false)}
                continueFunc={() => setModalVisible(false)}
                modalVisible={modalVisible}
            />
        </View>
    );
};
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