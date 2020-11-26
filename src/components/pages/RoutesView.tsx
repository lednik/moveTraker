import React, {useState, useEffect, memo} from 'react';
import {StyleSheet, View,  FlatList, SafeAreaView, ActivityIndicator, Pressable, Image} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {fs, dirPath} from '../../params/path'
import {Button} from '../Button'

export  const RoutesView : React.FC = memo(() => {
    const navigation = useNavigation();
    let [routes, setRoutes] = useState<string[]>()
    const getRoutes = () => {
        fs.ls(dirPath)
            .then((files) => {
                setRoutes(files)
            })
    }
    const deleteRoute = (route : string) => {
        const dirs = fs.dirs 
        let dirPath = dirs.CacheDir + '/routes/' + route //ПУТЬ ДО Файла
        fs.unlink(dirPath)
            .then(() => {
                getRoutes();
            })
    }

    const renderItem = ({ item }) => (
        <View style={styles.button}>
            <Button title={item.replace('.json', '')} clickCallback={() => navigation.navigate({name : 'RouteView', params: {routeName : item}})} key={item} />
            <Pressable onPress={() => {deleteRoute(item)}} style={styles.delete}>
                <Image
                    style={styles.deleteImage}
                    source={require('../../svg/trash.png')}
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
                <Button title="На главную" clickCallback={() => navigation.navigate('Home')} />
            </View>
        </View>
    );
});

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