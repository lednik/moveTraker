import React, { memo } from 'react';
import {Text, View, StyleSheet} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {Button} from '../Button'

export  const StartView : React.FC = memo(() => {
    const navigation = useNavigation();
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
            <Button title="Погнали" clickCallback={ () => navigation.navigate('WalkingView')} />
            <Text style={styles.text}>Прогулки</Text> 
            <Button title="Список" clickCallback={() => navigation.navigate('RoutesView')} />
        </View>
    );
    
});