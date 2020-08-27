import React from 'react'
import { StyleSheet, View, Text, FlatList } from 'react-native'
import { w } from '../constants'
import { schedule } from '../schedule'
import SubjectItem from './SubjectItem'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: w,
    backgroundColor: 'white'
  },
  date: {
    margin: 3,
    padding: 5,
    color: 'white',
    textAlign: 'center',
    backgroundColor: '#8b00cc'
  }
})

const SubjectList = (props) => {
  const dayName = props.day.format('dddd')
  const localSchedule = schedule[dayName.toLowerCase()]

  const renderItem = ({ item }) => <SubjectItem subject={item} />
  return (
    <>
      <View style={styles.container}>
        <Text style={styles.date}>
          {dayName} {props.day.format('DD.MM.YY')}
        </Text>
        <FlatList
          data={localSchedule}
          renderItem={renderItem}
          keyExtractor={(item) => {
            return item.time + Math.random()
          }}
        />
      </View>
    </>
  )
}

export { SubjectList }
