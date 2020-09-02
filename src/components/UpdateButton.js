import React from 'react'
import { StyleSheet, Alert } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { useNetInfo } from '@react-native-community/netinfo'

const styles = StyleSheet.create({
  updateIcon: {
    color: 'white',
    position: 'absolute',
    right: 10,
    top: 3
  }
})

export const UpdateButton = (props) => {
  const netInfo = useNetInfo()

  return (
    <>
      <Icon
        name="update"
        size={30}
        style={styles.updateIcon}
        onPress={() => {
          netInfo.isConnected ? props.reloadApp() : Alert.alert('Please connect to the internet to update schedule!')
        }}
      />
    </>
  )
}
