import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {_StartView} from '../types/types'
import {Button} from './Button'

export  const StartView : React.FC<_StartView> = ({startWalking, showRoutes} : _StartView) => {
    const styles = StyleSheet.create({
        startView: {
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
        },
        text: {
            fontSize: 32,
            marginBottom: 24
        }
    })
    return (
        <View style={styles.startView}>
            <Text style={styles.text}>Прогуляемся?</Text>
            <Button title="Погнали" clickCallback={startWalking} />
            <Text style={styles.text}>Прогулки</Text>
            <Button title="Список" clickCallback={showRoutes} />
        </View>
    );
    
};