import React, {useState, useEffect} from 'react'
import {View, Text, StyleSheet, Modal, TextInput, TouchableWithoutFeedback, Keyboard, Alert} from 'react-native'
import Icon from 'react-native-vector-icons/dist/AntDesign'
Icon.loadFont()

const ItemDetailsModal = ({modalVisible, setModalVisible, selectedItem, handleUpdateItem, deleteItem}) => {
    const [editingTitle, setEditingTitle] = useState(false)
    const [editingDetails, setEditingDetails] = useState(false)
    const [titleText, setTitleText] = useState('')
    const [detailsText, setDetailsText] = useState('')

    useEffect(() => {
        setTitleText(selectedItem.item)
    }, [selectedItem.item])
    useEffect(() => {
        setDetailsText(selectedItem.details)
    }, [selectedItem.details])

    const onTitleChange=(textValue) => {
        setTitleText(textValue)
    }
    const onDetailsChange=(textValue) => {
        setDetailsText(textValue)
    }

    const handleBlur = () => {
        handleUpdateItem(selectedItem.id, titleText, detailsText)
        setEditingTitle(false)
        setEditingDetails(false)
        
    }
    const handleDeleteAndClose = () => {
        deleteItem(selectedItem.id)
        setModalVisible(false)
    }

    const handleCloseModal = () => {
        if(!titleText){
            Alert.alert(
                'Hold up!',
                'Item Title is Required before close',
                [
                    {
                        text: "Cancel",
                        style: 'cancel'
                    },
                    {
                        text: "Delete Item Permanently",
                        onPress: handleDeleteAndClose
                    }
                ])
        }else{
            setModalVisible(false)
            setEditingTitle(false)
            setEditingDetails(false)
        }
    }
    const itemTitleDisplay = !editingTitle ? 
    <View style={styles.modalContent}>
        <Text style={selectedItem.item ? {...styles.text, ...styles.itemTitle} : {...styles.text, ...styles.itemTitle, ...styles.lightGreyFont}} onPress={() => setEditingTitle(true)}>{selectedItem.item ? selectedItem.item : 'Enter Item Title'}</Text>
    </View> :
    <View style={styles.modalContent}>
            <View onBlur={handleBlur}>
                <TextInput placeholder='Enter Item Title' style={{...styles.text ,...styles.itemTitle, ...styles.textInput}} onChangeText={onTitleChange} value={titleText} />
            </View>
    </View>

    const itemDetailsDisplay = !editingDetails ? 
    <View style={styles.modalContent}>
        <Text style={selectedItem.details ? {...styles.text, ...styles.itemDetails} : {...styles.text, ...styles.itemDetails, ...styles.lightGreyFont}} onPress={() => setEditingDetails(true)}>{selectedItem.details ? selectedItem.details : 'Enter Item Details'}</Text>
    </View> :
    <View style={styles.modalContent}>
            <View onBlur={handleBlur}>
                <TextInput placeholder='Enter Item Details' style={{...styles.text, ...styles.itemDetails, ...styles.textInput}} onChangeText={onDetailsChange} value={detailsText} />
            </View>
    </View>

    return(
        <Modal visible={modalVisible} animationType='slide'>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.modalContainer}>
                    <Icon 
                        name="close" 
                        size={30}
                        style={{...styles.modalClose}} 
                        onPress={handleCloseModal} 
                    />
                    {itemTitleDisplay}
                    {itemDetailsDisplay}
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
            paddingHorizontal: 20,
            marginTop: 20,
            
        },
        text:{
            padding: 8,
            borderWidth: 1,
            borderColor: '#fff',
            height: 50
        },
        itemTitle: {
            fontSize: 30,
            marginBottom: 10,
        },
        itemDetails: {
            fontSize: 20,
        },

        textInput: {
            borderColor: '#eee',
            borderRadius: 3,
        },
        lightGreyFont: {
            color: '#ccc'
        }
})

export default ItemDetailsModal