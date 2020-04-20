import React, {useState} from 'react'
import {View, Text, StyleSheet, Image, FlatList, Alert} from 'react-native'


import Header from './components/Header'
import ListItem from './components/ListItem'
import AddItem from './components/AddItem'

const App = () => {
  const [items, setItems] = useState([
    {id: Math.random().toString(), item: 'Milk'},
    {id: Math.random().toString(), item: 'Eggs'},
    {id: Math.random().toString(), item: 'Bread'},
    {id: Math.random().toString(), item: 'Juice'},
  ])

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


  return(
    <View style={styles.container}>
      <Header/>
      <AddItem addItem={addItem}/>
      <FlatList 
        data={items}
        renderItem={({item}) => <ListItem item={item} deleteItem={deleteItem}/>}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    paddingTop: 60,
  },
})

export default App