import React, { useState } from 'react'
import {View, Text, StyleSheet, TextInput, TouchableOpacity} from 'react-native'
import Icon from 'react-native-vector-icons/dist/AntDesign'
Icon.loadFont()

const AddItem = ({handleAddItem}) => {
    const [text, setText] = useState('')

    const onChange=(textValue) => {
        setText(textValue)
        
    }
    const handleSubmit = () => {
        handleAddItem(text)
        setText('')
    }

    let button = text ? <TouchableOpacity style={styles.btn} onPress={handleSubmit}>
                            <Text style={styles.btnText}><Icon name="plus" size={20}/>Add Item</Text>
                        </TouchableOpacity>
                        :
                        <TouchableOpacity style={styles.disabledBtn}>
                            <Text style={styles.disabledBtnText}><Icon name="plus" size={20}/>Add Item</Text>
                        </TouchableOpacity>

    return(
        <View style={styles.container}>
            <TextInput placeholder='Add Item...' style={styles.input} onChangeText={onChange} value={text} />
            {button}
        </View>
    )
}

    const styles = StyleSheet.create({
        input: {
            height: 60,
            padding: 8,
            fontSize: 16,
            alignSelf: 'center',
            width: '80%'
        },
        btn: {
            backgroundColor: '#c2bad8',
            padding: 9,
            margin: 5,
            width: 200,
            alignSelf: 'center',
            marginBottom: 15,
        },
        btnText: {
            color: 'darkslateblue',
            fontSize: 20,
            textAlign: 'center'
        },
        disabledBtn: {
            backgroundColor: '#eee',
            padding: 9,
            margin: 5,
            width: 200,
            alignSelf: 'center',
            marginBottom: 15,
        },
        disabledBtnText: {
            color: '#aaa',
            fontSize: 20,
            textAlign: 'center'
        }
        
})

export default AddItem