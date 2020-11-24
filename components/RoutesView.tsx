import React, {useState, useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import RNFetchBlob from 'rn-fetch-blob'
const fs = RNFetchBlob.fs

import {Button} from './Button'

type RoutesType = {
    toStartView(): void,
    showRoute(value: string): void
}

export  const RoutesView : React.FC<RoutesType> = ({toStartView, showRoute}) => {
    let [routes, setRoutes] = useState<string[]>([])
    const styles = StyleSheet.create({
        routes: {
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
        },
        button: {
            marginBottom: 24
        }
    })
    const listItems = routes.map((route, index) => {
        let routeName = route.replace('.json', '')
        return(
            <View style={styles.button}>
                <Button title={routeName} clickCallback={() => showRoute(route)} key={index} />
            </View>
        )
    });
   
    useEffect(() => {
        // ПУТИ
        const dirs = RNFetchBlob.fs.dirs 
        let dirPath = dirs.CacheDir + '/routes' //ПУТЬ ДО ПАПКИ С ФАЙЛАМИ
        RNFetchBlob.fs.ls(dirPath)
            .then((files) => {
                setRoutes(files)
            })
    }, []);
    return (
        <View style={styles.routes}>
            {listItems}
            <Button title="На главную" clickCallback={toStartView} />
        </View>
    );
    
};