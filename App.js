import React, { useState, useEffect } from 'react'
import {View, Text, StyleSheet, Image, FlatList, Alert} from 'react-native'
import firestore from '@react-native-firebase/firestore'

import Header from './components/Header'
import ListItem from './components/ListItem'
import AddItem from './components/AddItem'
import ItemDetailsModal from './components/ItemDetailsModal'
import Spinner from './components/Spinner'

const App = () => {
  const [items, setItems] = useState([])
  const [modalVisible, setModalVisible] = useState(false)
  const [selectedItem, setSelectedItem] = useState({})
  const [fetching, setFetching] = useState(true)

  useEffect(() => {
    fetchSetItems()
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
      setFetching(false)
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

  const handleUpdateItem = (id, title, details, cb) => {
    // let newItems = items.map(item => {
    //   if (item.id === id){
    //     return {
    //       id,
    //       item: title,
    //       details
    //     }
    //   } else {
    //     return item
    //   }
    // })
      firestore()
      .collection('items')
      .doc(id)
      .update({
        item: title,
        details: details
      })
      .then(() => {
        fetchSetItems()
      })
      .then(() => {
        handleSelectedItem(id, title, details)
        return 'done'
      })
      .then(() => {
        cb()
      })
      .catch(err => {
        console.log(err)
      })
}

let screenDisplay = !fetching ? 
        <FlatList 
          data={items}
          renderItem={({item}) => <ListItem item={item} deleteItem={deleteItem} handleItemView={handleItemView}/>}
          style={styles.itemList}
        /> :
        <Spinner />

  return(
    <View style={styles.container}>
      <Header/>
      <ItemDetailsModal modalVisible={modalVisible} setModalVisible={setModalVisible} selectedItem={selectedItem} handleUpdateItem={handleUpdateItem} deleteItem={deleteItem}/>
      <AddItem handleAddItem={handleAddItem}/>
      {screenDisplay}
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