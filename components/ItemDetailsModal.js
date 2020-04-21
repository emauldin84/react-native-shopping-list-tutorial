import React, {useState, useEffect} from 'react'
import {View, Text, StyleSheet, Modal, TextInput, TouchableOpacity, TouchableWithoutFeedback, Keyboard} from 'react-native'
import Icon from 'react-native-vector-icons/dist/FontAwesome'
Icon.loadFont()

const ItemDetailsModal = ({modalVisible, handleToggleModal, selectedItem, handleUpdateItem}) => {
    const [isEditing, setIsEdting] = useState(false)
    const [titleText, setTitleText] = useState('')
    const [detailsText, setDetailsText] = useState('')

    useEffect(() => {
        setTitleText(selectedItem.item)
        setDetailsText(selectedItem.details)
    }, [selectedItem])

    // console.log('isEditing', isEditing)
    // console.log('titleText STATE', titleText)
    // console.log('detailsText STATE', detailsText)
    // console.log('selectedItem.item PROPS', selectedItem.item)
    // console.log('selectedItem.details PROPS', selectedItem.details)
    // console.log('selectedItem.id PROPS', selectedItem.id)

    const onTitleChange=(textValue) => {
        setTitleText(textValue)
    }
    const onDetailsChange=(textValue) => {
        setDetailsText(textValue)
    }

    const handleBlur = () => {
        console.log('SAVING')
        console.log('selectedItem.id', selectedItem.id)
        handleUpdateItem(selectedItem.id, titleText, detailsText)
        setIsEdting(false)
    }
    const itemDisplay = !isEditing ? 
    <View style={styles.modalContent}>
        <Text style={styles.itemTitle} onPress={() => setIsEdting(true)}>{selectedItem.item}</Text>
        <Text style={styles.itemDetails} onPress={() => setIsEdting(true)}>{selectedItem.details ? selectedItem.details : 'Item Details'}</Text>
    </View> :
    <View style={styles.modalContent}>
        <TouchableWithoutFeedback>
            <View onBlur={handleBlur}>
                <TextInput placeholder='Item Title' style={styles.itemTitle} onChangeText={onTitleChange} value={titleText} />
                <TextInput placeholder='Item Details' style={styles.itemDetails} onChangeText={onDetailsChange} value={detailsText} />
            </View>
        </TouchableWithoutFeedback>
    </View>

    return(
        <Modal visible={modalVisible} animationType='slide'>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.modalContainer}>
                    <Icon 
                        name="close" 
                        size={20}
                        style={{...styles.modalClose}} 
                        onPress={handleToggleModal} 
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
            paddingLeft: 20,
            
        },
        itemTitle: {
            paddingBottom: 15,
            fontSize: 30
        },
        itemDetails: {
            paddingBottom: 15,
            fontSize: 20
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