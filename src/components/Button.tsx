import React from 'react';
import {Text, StyleSheet, Pressable} from 'react-native';
import {colors} from '../params/colors'

type Button = {
    title: string
    clickCallback(): void,
    disabled? : boolean
}

export  const Button : React.FC<Button> = ({title, clickCallback, disabled = false} : Button) => {
    return (
        <Pressable disabled={disabled} onPress={clickCallback} style={styles.button}>
            <Text style={styles.text}>{title}</Text>
        </Pressable>
    );
    
};

const styles = StyleSheet.create({
    button: {
        width: '60%',
        backgroundColor: colors.primary,
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 6,
        alignItems: "center"
    },
    text: {
        color: colors.text,
        fontSize: 22
    }
})