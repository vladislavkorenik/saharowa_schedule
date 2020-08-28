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
    padding: 5,
    color: 'white',
    textAlign: 'center',
    backgroundColor: '#8b00cc'
  }
})

const SubjectList = (props) => {
  const dayName = props.day.format('dddd')
  const localSchedule = schedule[dayName.toLowerCase()]

  const renderItem = ({ item }) => {
    if (item.week === 'all') {
      return <SubjectItem subject={item} />
    }

    const currentAcademicWeek = props.day.week() - 35
    const weekType = currentAcademicWeek % 2 === 0 ? 'even' : 'odd'

    if (item.week === weekType) {
      return <SubjectItem subject={item} />
    }
    if (item.weeks) {
      const hasSubjectOnceAWeek = item.weeks.some((weekValue) => weekValue === currentAcademicWeek)

      if (hasSubjectOnceAWeek) {
        return <SubjectItem subject={item} />
      }
    }
  }
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
