import React, {useState} from 'react'
import {View, Text, StyleSheet, Image, FlatList} from 'react-native'


import Header from './components/Header'
import ListItem from './components/ListItem'

const App = () => {
  const [items, setItems] = useState([
    {id: Math.random(), item: 'Milk'},
    {id: Math.random(), item: 'Eggs'},
    {id: Math.random(), item: 'Bread'},
    {id: Math.random(), item: 'Juice'},
  ])


  return(
    <View style={styles.container}>
      <Header/>
      <FlatList 
        data={items}
        renderItem={({item}) => <ListItem item={item}/>}
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