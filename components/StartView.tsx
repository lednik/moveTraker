import React from 'react';
import {Text, View, StyleSheet} from 'react-native';

import {Button} from './Button'
type StartView = {
    startWalking(): void
}

export  const StartView : React.FC<StartView> = ({startWalking}) => {
    const startNewWalk = () => {
        startWalking();
    }
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
        </View>
    );
    
};