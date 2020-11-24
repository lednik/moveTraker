import React from 'react';
import {View, StyleSheet} from 'react-native';

import {Button} from './Button'
import {Map} from './Map'

type data = {
    coordinates : any[],
    region : object,
    date : string
}

type RouteView = {
    route: data,
    toStartView(): void
}

export  const RouteView : React.FC<RouteView> = ({route, toStartView}) => {
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
            alignItems: "center"
        }
    })
    return (
        <View style={styles.routeView}>
            <Map region={route.region} coordinates={route.coordinates} />
            <View style={styles.button}>
                <Button title="Назад" clickCallback={toStartView} />
            </View>
        </View>
    );
    
};