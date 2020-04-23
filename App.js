import React, { useState, useEffect } from 'react'
import {View, Text, StyleSheet, Image, FlatList, Alert} from 'react-native'
import firestore from '@react-native-firebase/firestore'

import Header from './components/Header'
import ListItem from './components/ListItem'
import AddItem from './components/AddItem'
import ItemDetailsModal from './components/ItemDetailsModal'

const App = () => {
  const [items, setItems] = useState([])
  const [modalVisible, setModalVisible] = useState(false)
  const [selectedItem, setSelectedItem] = useState({})

  useEffect(() => {
    fetchSetItems()
    console.log(items)
  }, [])

  const fetchSetItems = () => {
    firestore()
    .collection('items')
    .get()
    .then(querySnapshot => {
      const items = querySnapshot.docs.map(item => {
        return {
          id: item.id,
          item: item.data().item,
          details: item.data().details
        }
      })
      setItems(items)
    })
  }
  const deleteItem = (id) => {
    firestore()
    .collection('items')
    .doc(id)
    .delete()
    .then(() => {
      fetchSetItems()
    })
    // setItems(prevItems => {
    //   return prevItems.filter(item => {
    //     return item.id != id
    //   })
    // })
  }

  const handleAddItem = (item) => {
    if(!item){
      Alert.alert('Error', 'Please enter an item')
    }else{
      // setItems(prevItems => {
      //   return [
      //     {
      //       id: Math.random().toString(), 
      //       item: item
      //     },
      //     ...prevItems
      //   ]
      // })
      firestore()
      .collection('items')
      .doc(Math.random().toString())
      .set({
        item: item,
        details: '',
      })
      .then(() => {
        fetchSetItems()
      })
    }
  }

  const handleOpenModal = () => {
    setModalVisible(!modalVisible)
  }

  const handleSelectedItem = (id, item, details) => {
    setSelectedItem({
      id,
      item,
      details
    })
  }

  const handleItemView = (id, item, details) => {
    handleOpenModal()
    handleSelectedItem(id, item, details)
  }

  const handleUpdateItem = (id, title, details) => {
    let newItems = items.map(item => {
      if (item.id === id){
        return {
          id,
          item: title,
          details
        }
      } else {
        return item
      }
    })
    setItems(newItems)
    handleSelectedItem(id, title, details)
}


  return(
    <View style={styles.container}>
      <Header/>
      <ItemDetailsModal modalVisible={modalVisible} setModalVisible={setModalVisible} selectedItem={selectedItem} handleUpdateItem={handleUpdateItem} deleteItem={deleteItem}/>
      <AddItem handleAddItem={handleAddItem}/>
      <FlatList 
        data={items}
        renderItem={({item}) => <ListItem item={item} deleteItem={deleteItem} handleItemView={handleItemView}/>}
        style={styles.itemList}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    paddingTop: 60,
  },
  itemList: {
    // flex: 1
  }
})

export default App