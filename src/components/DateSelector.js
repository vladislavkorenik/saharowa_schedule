import moment from 'moment'
import React, { useState } from 'react'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { StyleSheet, View, Text, Modal, TouchableHighlight } from 'react-native'
import DatePicker from 'react-native-datepicker'

import { w } from '../consts/constants'
import { SubjectList } from './SubjectList'

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#8b00cc',
    position: 'relative'
  },
  date: {
    width: w
  },
  whiteText: {
    color: 'white',
    textAlignVertical: 'bottom'
  },
  dateContainer: {
    flexDirection: 'row',
    alignSelf: 'center',
    position: 'absolute'
  },
  closeIcon: {
    color: 'white',
    textAlignVertical: 'bottom'
  },
  modalMenuContainer: {
    backgroundColor: '#8b00cc',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end'
  }
})

const DateSelector = (props) => {
  /*
  const dateNow = moment(new Date())
  const minDate = dateNow.format('DD.MM.YY')
  const maxDate = dateNow.add(2, 'M').format('DD.MM.YY')
  //generate 2 month date range from now
  */

  const minDate = moment('2020-09-01').format('DD.MM.YY')
  const maxDate = moment('2020-09-13').format('DD.MM.YY')

  const [date, setDate] = useState(props.day.format('DD.MM.YY'))
  const [modalVisible, setModalVisible] = useState(false)

  return (
    <>
      <View style={styles.container}>
        <View style={styles.dateContainer}>
          <Text style={styles.whiteText}>{props.day.format('dddd')}</Text>
          <Icon name="today" size={17} style={styles.whiteText} />
        </View>

        <DatePicker
          style={styles.date}
          date={props.day.format('DD.MM.YY')}
          mode="date"
          placeholder="select date"
          format="DD.MM.YY"
          minDate={minDate}
          maxDate={maxDate}
          showIcon={false}
          customStyles={{
            dateInput: {
              borderWidth: 0,
              marginTop: 15
            },
            dateText: {
              color: 'white'
            },
            placeholderText: {
              color: 'white'
            }
          }}
          onDateChange={(newDate) => {
            setDate(newDate)
            if (newDate !== props.day.format('DD.MM.YY')) setModalVisible(true)
          }}
        />
      </View>
      <View>
        <Modal visible={modalVisible} animationType="slide">
          <View style={styles.modalMenuContainer}>
            <Text style={styles.whiteText}>{date}</Text>
            <TouchableHighlight
              onPress={() => {
                setModalVisible(!modalVisible)
              }}
            >
              <Icon name="close" size={30} style={styles.closeIcon} />
            </TouchableHighlight>
          </View>

          <SubjectList day={props.days[props.days.findIndex((item) => item.format('DD.MM.YY') === date)]} />
        </Modal>
      </View>
    </>
  )
}

export { DateSelector }
