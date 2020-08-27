import React, { useState } from 'react'
import { StyleSheet, ScrollView, View, StatusBar } from 'react-native'
import moment from 'moment'
import { extendMoment } from 'moment-range'
import { SubjectList } from './src'
import { w } from './constants'

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})

const momentVar = extendMoment(moment)
const interval = 'month'
const count = 2
const dateNow = momentVar(new Date())

const range = momentVar.rangeFromInterval(interval, count, dateNow)
const days = Array.from(range.by('day'))

const generateScheduleList = (index) => {
  return <SubjectList day={days[index]} key={days[index]} />
}
const onScrollHandler = (index, setIndex, setScheduleList, scheduleList) => {
  if (days[index]) {
    setScheduleList([...scheduleList, generateScheduleList(index)])
    setIndex(index + 1)
  }
}

const App: () => React$Node = () => {
  const [scheduleList, setScheduleList] = useState([
    <SubjectList day={days[0]} key={days[0]} />,
    <SubjectList day={days[1]} key={days[1]} />
  ])
  const [index, setIndex] = useState(2)

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <View style={styles.container}>
        <ScrollView
          decelerationRate="normal"
          horizontal
          snapToInterval={w}
          showsHorizontalScrollIndicator={false}
          onMomentumScrollEnd={() => onScrollHandler(index, setIndex, setScheduleList, scheduleList)}
        >
          {scheduleList}
        </ScrollView>
      </View>
    </>
  )
}

export default App
