import React, {useState, useEffect} from 'react';
import {StyleSheet, View,  FlatList, SafeAreaView} from 'react-native';
import RNFetchBlob from 'rn-fetch-blob'
import {data, RoutesType} from '../types/types'
import {Button} from './Button'

// type RoutesType = {
//     toStartView(): void,
//     showRoute(value: string): void
// }

const fs = RNFetchBlob.fs

export  const RoutesView : React.FC<RoutesType> = ({toStartView, showRoute}) => {

    let [routes, setRoutes] = useState<string[]>([])
   
    useEffect(() => {
        // ПУТИ
        const dirs = RNFetchBlob.fs.dirs 
        let dirPath = dirs.CacheDir + '/routes' //ПУТЬ ДО ПАПКИ С ФАЙЛАМИ
        RNFetchBlob.fs.ls(dirPath)
            .then((files) => {
                setRoutes(files)
            })
    }, []);

    const renderItem = ({ item }) => (
        <View style={styles.button}>
            <Button title={item.replace('.json', '')} clickCallback={() => showRoute(item)} key={item} />
        </View>
    );

    return (
        <View style={styles.routes}>
            {/* {listItems} */}
            <SafeAreaView style={styles.container}>
                <FlatList
                    data={routes}
                    renderItem={renderItem}
                    keyExtractor={(item) => item}
                />
            </SafeAreaView>
            <View style={styles.bottom}>
                <Button title="На главную" clickCallback={toStartView} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    routes: {
        flex: 1,
        // width: '100%',
        // alignItems: 'center',
        justifyContent: 'center',
    },
    button: {
        marginBottom: 24,
        alignItems: 'center'
    },
    container: {
        flex: 1,
        marginVertical: 24
    },
    bottom: {
        marginBottom: 24,
        alignItems: 'center'
    }
})