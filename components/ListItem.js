import React, {} from 'react'
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native'
import Icon from 'react-native-vector-icons/dist/FontAwesome'

const ListItem = ({item}) => {
    return(
        
        <TouchableOpacity style={styles.listItem}>
            <View style={styles.listItemView}>
                <Text style={styles.listItemText}>{item.item}</Text>
                <Icon name="remove" size={20} color='firebrick'/>
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
        fontSize: 18
    }
})

export default ListItem