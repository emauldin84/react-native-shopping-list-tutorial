import React, {} from 'react'
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native'
import Icon from 'react-native-vector-icons/dist/FontAwesome'
Icon.loadFont()

const ListItem = ({item, deleteItem}) => {
    return(
        
        <TouchableOpacity style={styles.listItem}>
            <View style={styles.listItemView}>
                <View style={styles.itemLeft}>
                    <Icon 
                        name="edit" 
                        size={20} 
                        color='#c2bad8' 
                        />
                    <Text style={styles.listItemText}>{item.item}</Text>
                </View>
                <Icon 
                    name="remove" 
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