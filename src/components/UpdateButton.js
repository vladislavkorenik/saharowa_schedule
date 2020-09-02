import React from 'react'
import { DevSettings, StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import AsyncStorage from '@react-native-community/async-storage'

const styles = StyleSheet.create({
  updateIcon: {
    color: 'white',
    position: 'absolute',
    right: 10,
    top: 3
  }
})

const removeValue = async () => {
  try {
    await AsyncStorage.removeItem('schedule')
  } catch (e) {
    // remove error
  }
}

export const UpdateButton = () => {
  return (
    <>
      <Icon
        name="update"
        size={30}
        style={styles.updateIcon}
        onPress={() => {
          removeValue().then()
          DevSettings.reload()
        }}
      />
    </>
  )
}
