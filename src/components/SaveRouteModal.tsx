import React, {useEffect} from 'react';
import {View, StyleSheet, Modal, TextInput} from 'react-native';
import {Button} from '../components/Button'

type SaveRouteModal = {
    createFunc(name : string): void,
    cancelFunc(): void,
    continueFunc(): void,
    modalVisible: boolean
}

export  const SaveRouteModal : React.FC<SaveRouteModal> = ({createFunc, cancelFunc, modalVisible, continueFunc} : SaveRouteModal) => {
    const [value, onChangeText] = React.useState('');
    const [disabled, setDisabled] = React.useState(false);

    useEffect(() => {
        value.trim() ? setDisabled(false) : setDisabled(true);
    }, [value])
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
        >
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <TextInput
                        style={styles.input}
                        onChangeText={text => onChangeText(text)}
                        value={value}
                    />
                    <View style={value.trim() ? styles.activeButton : styles.notActiveButton}>
                        <Button 
                        title="Сохранить" 
                        clickCallback={() => createFunc(value)} 
                        disabled={disabled}/>
                    </View>
                    <View style={styles.button}>
                        <Button title="Удалить" clickCallback={cancelFunc} />
                    </View>
                    <View style={styles.button}>
                        <Button title="Продолжить" clickCallback={continueFunc} />
                    </View>
                </View>
            </View>
        </Modal>
    );
};

 const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 24,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
    },
    button: {
        marginBottom: 16
    },
    activeButton: {
        marginBottom: 16
    },
    notActiveButton: {
        marginBottom: 16,
        opacity: 0.5
    },
    input: {
        height: 40,
        minWidth: 120,
        borderColor: '#733651',
        borderBottomWidth: 1 ,
        marginBottom: 16
    }
})