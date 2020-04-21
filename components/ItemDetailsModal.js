import React, {useState, useEffect} from 'react'
import {View, Text, StyleSheet, Modal, TextInput, TouchableWithoutFeedback, Keyboard, Alert} from 'react-native'
import Icon from 'react-native-vector-icons/dist/FontAwesome'
Icon.loadFont()

const ItemDetailsModal = ({modalVisible, setModalVisible, selectedItem, handleUpdateItem}) => {
    const [isEditing, setIsEdting] = useState(false)
    const [titleText, setTitleText] = useState('')
    const [detailsText, setDetailsText] = useState('')

    useEffect(() => {
        console.log('running useEffect 1')
        setTitleText(selectedItem.item)
    }, [selectedItem.item])
    useEffect(() => {
        console.log('running useEffect 2')
        setDetailsText(selectedItem.details)
    }, [selectedItem.details])

    const onTitleChange=(textValue) => {
        setTitleText(textValue)
    }
    const onDetailsChange=(textValue) => {
        setDetailsText(textValue)
    }

    const handleBlur = async () => {
        await handleUpdateItem(selectedItem.id, titleText, detailsText)
        // setTitleText(selectedItem.item)
        // setDetailsText(selectedItem.details)
        setIsEdting(false)
        
    }

    const handleCloseModal = () => {
        if(!titleText){
            Alert.alert('Error', 'Please enter an item')
        }else{
            setModalVisible(false)
        }
    }
    const itemDisplay = !isEditing ? 
    <View style={styles.modalContent}>
        <Text style={styles.itemTitle} onPress={() => setIsEdting(true)}>{selectedItem.item}</Text>
        <Text style={styles.itemDetails} onPress={() => setIsEdting(true)}>{selectedItem.details ? selectedItem.details : 'Item Details'}</Text>
    </View> :
    <View style={styles.modalContent}>
            <View onBlur={handleBlur}>
                <TextInput placeholder='Item Title' style={styles.itemTitle} onChangeText={onTitleChange} value={titleText} />
                <TextInput placeholder='Item Details' style={styles.itemDetails} onChangeText={onDetailsChange} value={detailsText} />
            </View>
    </View>

    return(
        <Modal visible={modalVisible} animationType='slide'>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.modalContainer}>
                    <Icon 
                        name="close" 
                        size={20}
                        style={{...styles.modalClose}} 
                        onPress={handleCloseModal} 
                    />
                    {itemDisplay}
                </View>
            </TouchableWithoutFeedback>
        </Modal>
    )
}

    const styles = StyleSheet.create({
        modalContainer:{
            flex: 1
        },
        modalClose:{
            alignSelf: 'flex-end',
            padding: 10,
            margin: 10, 
            marginTop: 50,
            marginBottom: 0,
        },
        modalContent:{
            justifyContent: 'center',
            paddingHorizontal: 20,
            
        },
        itemTitle: {
            paddingBottom: 15,
            fontSize: 30,
            backgroundColor: '#c2bad8'
        },
        itemDetails: {
            paddingBottom: 15,
            fontSize: 20,
            backgroundColor: '#c2bad8'
        },
        input: {
            height: 60,
            padding: 8,
            fontSize: 16,
            alignSelf: 'center',
            width: '80%'
        },
})

export default ItemDetailsModal