import React from 'react'
import { StyleSheet, ScrollView, View, Text, StatusBar } from 'react-native'
import moment from 'moment'
import { extendMoment } from 'moment-range'

const momentVar = extendMoment(moment)
const interval = 'month'
const count = 2
const dateNow = momentVar(new Date())

const range = momentVar.rangeFromInterval(interval, count, dateNow)
const days = Array.from(range.by('day'))
const allDaysArray = days.map((m) => m.format('DD.MM.YYYY'))

console.log(allDaysArray)

const App: () => React$Node = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <View>
        <ScrollView sna decelerationRate="normal" horizontal>
          <Text>{days.join(',')}</Text>
        </ScrollView>
      </View>
    </>
  )
}

const styles = StyleSheet.create({})

export default App
