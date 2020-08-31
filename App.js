import moment from 'moment'
import React, { useState } from 'react'
import { extendMoment } from 'moment-range'
import Swiper from 'react-native-animated-swiper'
import { StyleSheet, View, StatusBar } from 'react-native'

import { DateSelector, SubjectList } from './src/components'

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})

const momentVar = extendMoment(moment)
/*
const interval = 'month'
const count = 2
const dateNow = momentVar(new Date())

const range = momentVar.rangeFromInterval(interval, count, dateNow)
//generate 2 month date range from now
*/

const dates = [moment('2020-09-01', 'YYYY-MM-DD'), moment('2020-09-06', 'YYYY-MM-DD')]
const range = momentVar.range(dates)

const days = Array.from(range.by('day'))

const App = () => {
  const generateScheduleList = (dateNumber) => {
    return (
      <View key={days[dateNumber]}>
        <DateSelector day={days[dateNumber]} days={days} />
        <SubjectList day={days[dateNumber]} />
      </View>
    )
  }

  const [scheduleList, setScheduleList] = useState([generateScheduleList(0), generateScheduleList(1)])
  const [index, setIndex] = useState(2)

  const onScrollHandler = (dateNumber, setDateNumber, setSchedule, schedule) => {
    if (days[dateNumber]) {
      setSchedule([...schedule, generateScheduleList(dateNumber)])
      setDateNumber(dateNumber + 1)
    }
  }

  return (
    <>
      <StatusBar backgroundColor="#8b00cc" />
      <View style={styles.container}>
        <Swiper onScroll={() => onScrollHandler(index, setIndex, setScheduleList, scheduleList)}>{scheduleList}</Swiper>
      </View>
    </>
  )
}

export default App
