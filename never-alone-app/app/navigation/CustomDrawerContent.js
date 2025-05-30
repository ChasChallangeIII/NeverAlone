import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer'

const CustomDrawerContent = (props) => {
  return (
      <DrawerContentScrollView {...props}>
          <DrawerItemList {...props}/>
   </DrawerContentScrollView>
  )
}

export default CustomDrawerContent

const styles = StyleSheet.create({})