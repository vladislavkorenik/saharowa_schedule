import React from 'react'
import { View, FlatList, Text } from 'react-native'

import SubjectItem from './SubjectItem'
import { schedule } from '../consts/schedule'

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
      <View>
        {!localSchedule.length ? (
          <Text style={{ textAlign: 'center', marginTop: 10, fontWeight: 'bold' }}>Расписание не найдено</Text>
        ) : (
          <FlatList
            data={localSchedule}
            renderItem={renderItem}
            keyExtractor={(item) => {
              return item.time + Math.random()
            }}
          />
        )}
      </View>
    </>
  )
}

export { SubjectList }
