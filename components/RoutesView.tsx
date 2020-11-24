import React from 'react';
import {StyleSheet, View, Text} from 'react-native';

import {Button} from './Button'

type data = {
    coordinates : any[],
    region : object,
    date : string
}
type RoutesType = {
    routes: data[],
    toStartView(): void,
    showRoute(route: data): void
}
export  const RoutesView : React.FC<RoutesType> = ({routes, toStartView, showRoute}) => {
    const listItems = routes.map((route) =>
        <Button title={route.date} clickCallback={() => showRoute(route)} />
        // <Text>{route.date}</Text>
    );
    // const showRouteFunc = (route : data) => {
    //     console.log('route', route);
    // }
    const styles = StyleSheet.create({
        routes: {
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
        }
    })
    return (
        <View style={styles.routes}>
            {listItems}
            <Button title="На главную" clickCallback={toStartView} />
        </View>
    );
    
};