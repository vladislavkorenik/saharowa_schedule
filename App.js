import moment from 'moment'
import { extendMoment } from 'moment-range'
import Swiper from 'react-native-animated-swiper'
import React, { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-community/async-storage'
import { StyleSheet, View, StatusBar, ActivityIndicator } from 'react-native'

import { DateSelector, SubjectList } from './src/components'

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  loader: {
    flex: 1
  }
})

const App = () => {
  const [schedules, setSchedules] = useState({})
  const [scheduleList, setScheduleList] = useState([])

  const hasSchedule = !!Object.keys(schedules).length
  const momentVar = extendMoment(moment)
  /*
  const interval = 'month'
  const count = 2
  const dateNow = momentVar(new Date())

  const range = momentVar.rangeFromInterval(interval, count, dateNow)
  //generate 2 month date range from now
  */

  const dates = [moment(new Date(), 'YYYY-MM-DD'), moment('2020-09-13', 'YYYY-MM-DD')]
  const range = momentVar.range(dates)

  const days = Array.from(range.by('day'))

  const generateScheduleList = (dateNumber, schedulesObj) => {
    return (
      <View key={days[dateNumber]}>
        <DateSelector day={days[dateNumber]} schedules={schedulesObj} />
        <SubjectList day={days[dateNumber]} schedules={schedulesObj} />
      </View>
    )
  }

  const storeData = async (value) => {
    try {
      await AsyncStorage.setItem('schedule', JSON.stringify(value))
    } catch (e) {
      // saving error
    }
  }

  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('schedule')
      return jsonValue != null ? JSON.parse(jsonValue) : {}
    } catch (e) {
      // error reading value
    }
  }

  const updateScheduleState = async () => {
    const dataFromStorage = await getData()
    const hasDataFromStorage = Object.keys(dataFromStorage).length

    if (!hasSchedule && hasDataFromStorage) {
      setSchedules(dataFromStorage)
      setScheduleList([generateScheduleList(0, dataFromStorage), generateScheduleList(1, dataFromStorage)])
    }

    if (!hasDataFromStorage && !hasSchedule) {
      const res = await fetch('https://api.npoint.io/232b814040601adb115e')
      const json = await res.json()

      await storeData(json)
      setSchedules(json)
      setScheduleList([generateScheduleList(0, json), generateScheduleList(1, json)])
    }
  }

  useEffect(() => {
    updateScheduleState().then()
  })

  const onScrollHandler = (setSchedule, schedule) => {
    if (days[schedule.length]) {
      setSchedule([...schedule, generateScheduleList(schedule.length, schedules)])
    }
  }

  return (
    <>
      <StatusBar backgroundColor="#8b00cc" />
      {!hasSchedule ? (
        <ActivityIndicator size="large" color="#8b00cc" style={styles.loader} animating={!hasSchedule} />
      ) : (
        <View style={styles.container}>
          <Swiper onScroll={() => onScrollHandler(setScheduleList, scheduleList)}>{scheduleList}</Swiper>
        </View>
      )}
    </>
  )
}

export default App
