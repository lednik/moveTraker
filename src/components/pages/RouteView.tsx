import React, {useState, useEffect, memo} from 'react';
import {View, StyleSheet, ActivityIndicator} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import {data} from '../../types/types'
import {Button} from '../Button'
import {Map} from '../Map'
import {fs, dirPath} from '../../params/path'

export  const RouteView : React.FC = memo(() => {
    const navigation = useNavigation();
    const route = useRoute();
    const [routeData, setRoute] = useState<data>()
    useEffect(() => {
        let filePath = dirPath + '/' + route.params.routeName;
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
                <Button title="Назад" clickCallback={() => navigation.navigate('Home')} />
            </View>
        </View>
    );
    
});

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