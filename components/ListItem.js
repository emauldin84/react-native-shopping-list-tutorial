import React, {} from 'react'
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native'
import Icon from 'react-native-vector-icons/dist/AntDesign'
Icon.loadFont()

const ListItem = ({item, deleteItem, handleItemView}) => {
    return(
        <TouchableOpacity style={styles.listItem} onPress={() => handleItemView(item.id, item.item, item.details)}>
            <View style={styles.listItemView}>
                <View style={styles.itemLeft} >
                    <Text style={styles.listItemText}>{item.item}</Text>
                </View>
                <Icon 
                    name="close" 
                    size={20} 
                    color='firebrick' 
                    onPress={() => deleteItem(item.id)}
                    />
            </View>
        </TouchableOpacity>
    )
}


const styles = StyleSheet.create({
    listItem:{
        padding: 15,
        backgroundColor: '#f8f8f8',
        borderBottomWidth: 1,
        borderBottomColor: '#eee'
    },
    listItemView:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    listItemText:{
        fontSize: 18,
        marginLeft: 10,
    },
    itemLeft: {
        flexDirection: 'row',
        justifyContent: 'center'
    }
})

export default ListItem