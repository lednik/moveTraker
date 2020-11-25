import React, {useState, useEffect} from 'react';
import {StyleSheet, View,  FlatList, SafeAreaView, ActivityIndicator, Pressable, Image} from 'react-native';
import RNFetchBlob from 'rn-fetch-blob'
import {data, RoutesType} from '../types/types'
import {Button} from './Button'

const fs = RNFetchBlob.fs

export  const RoutesView : React.FC<RoutesType> = ({toStartView, showRoute}) => {

    let [routes, setRoutes] = useState<string[]>()
    const getRoutes = () => {
        const dirs = RNFetchBlob.fs.dirs 
        let dirPath = dirs.CacheDir + '/routes' //ПУТЬ ДО ПАПКИ С ФАЙЛАМИ
        RNFetchBlob.fs.ls(dirPath)
            .then((files) => {
                setRoutes(files)
            })
    }
    const deleteRoute = (route : string) => {
        const dirs = RNFetchBlob.fs.dirs 
        let dirPath = dirs.CacheDir + '/routes/' + route //ПУТЬ ДО Файла
        RNFetchBlob.fs.unlink(dirPath)
            .then(() => {
                getRoutes();
            })
    }

    const renderItem = ({ item }) => (
        <View style={styles.button}>
            <Button title={item.replace('.json', '')} clickCallback={() => showRoute(item)} key={item} />
            <Pressable onPress={() => {deleteRoute(item)}} style={styles.delete}>
                <Image
                    style={styles.deleteImage}
                    source={require('../svg/trash.png')}
                />
            </Pressable>
        </View>
    );

    useEffect(() => { getRoutes(); }, [] );

    return (
        <View style={styles.routes}>
            {routes ? (
                <SafeAreaView style={styles.container}>
                    <FlatList
                        data={routes}
                        renderItem={renderItem}
                        keyExtractor={(item) => item}
                    />
                </SafeAreaView>
            ) : (
                <ActivityIndicator size="large" color="#733651" />
            )}
            
            <View style={styles.bottom}>
                <Button title="На главную" clickCallback={toStartView} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    routes: {
        flex: 1,
        justifyContent: 'center',
    },
    button: {
        marginBottom: 24,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center'
    },
    container: {
        flex: 1,
        marginTop: 48,
        marginBottom: 140
    },
    bottom: {
        marginBottom: 24,
        position: 'absolute',
        bottom: 16,
        width: '100%',
        alignItems: 'center'
    },
    delete: {
        width: 24,
        height: 24,
        marginLeft: 8
    },
    deleteImage: {
        width: 24,
        height: 24
    }
})