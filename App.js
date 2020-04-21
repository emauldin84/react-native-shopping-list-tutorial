import React, {useState} from 'react'
import {View, Text, StyleSheet, Image, FlatList, Alert} from 'react-native'


import Header from './components/Header'
import ListItem from './components/ListItem'
import AddItem from './components/AddItem'
import ItemDetailsModal from './components/ItemDetailsModal'

const App = () => {
  const [items, setItems] = useState([
    {id: Math.random().toString(), item: 'Milk', details: '2% in a carton.'},
    {id: Math.random().toString(), item: 'Eggs', details: ''},
    {id: Math.random().toString(), item: 'Bread', details: ''},
    {id: Math.random().toString(), item: 'Juice', details: ''},
  ])
  const [modalVisible, setModalVisible] = useState(false)

  const deleteItem = (id) => {
    setItems(prevItems => {
      return prevItems.filter(item => {
        return item.id != id
      })
    })
  }

  const addItem = (item) => {
    if(!item){
      Alert.alert('Error', 'Please enter an item')
    }else{
      setItems(prevItems => {
        return [
          {
            id: Math.random().toString(), 
            item: item
          },
          ...prevItems
        ]
      })
    }
  }

  const toggleModal = () => {
    setModalVisible(!modalVisible)
  }


  return(
    <View style={styles.container}>
      <Header/>
      <ItemDetailsModal modalVisible={modalVisible} toggleModal={toggleModal}/>
      <AddItem addItem={addItem}/>
      <FlatList 
        data={items}
        renderItem={({item}) => <ListItem item={item} deleteItem={deleteItem} toggleModal={toggleModal}/>}
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