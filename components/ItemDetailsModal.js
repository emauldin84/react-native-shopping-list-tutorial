import React, {} from 'react'
import {View, Text, StyleSheet, Modal, TouchableWithoutFeedback, Keyboard} from 'react-native'
import Icon from 'react-native-vector-icons/dist/FontAwesome'
Icon.loadFont()

const ItemDetailsModal = ({modalVisible, handleToggleModal, selectedItem}) => {
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
                    <View style={styles.modalContent}>
                    <Text style={styles.itemTitle}>{selectedItem.item}</Text>
                        <Text style={styles.itemDetails}>{selectedItem.details}</Text>
                    </View>
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
            alignItems: 'center',
            
        },
        itemTitle: {

        }
})

export default ItemDetailsModal