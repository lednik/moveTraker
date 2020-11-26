import React, {useState, useEffect} from 'react';
import {View, StyleSheet, ActivityIndicator} from 'react-native';
import {data, _RouteView} from '../../types/types'
import {Button} from '../Button'
import {Map} from '../Map'
import {fs, dirPath} from '../../params/path'

export  const RouteView : React.FC<_RouteView> = ({route, toStartView} : _RouteView) => {
    let [routeData, setRoute] = useState<data>()
    useEffect(() => {
        let filePath = dirPath + '/' + route
        fs.readFile(filePath, 'utf8')
            .then((data) => {
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