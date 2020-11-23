import React from 'react';
import {Text, View, StyleSheet, Pressable} from 'react-native';

type Button = {
    title: string
    clickCallback(): void
}
export  const Button : React.FC<Button> = ({title, clickCallback}) => {
    const styles = StyleSheet.create({
        button: {
            width: '60%',
            backgroundColor: '#733651',
            paddingHorizontal: 20,
            paddingVertical: 10,
            borderRadius: 6,
            alignItems: "center"
        },
        text: {
            color: '#ffff',
            fontSize: 22
        }
    })
    return (
        <Pressable onPress={clickCallback} style={styles.button}>
            <Text style={styles.text}>{title}</Text>
        </Pressable>
    );
    
};