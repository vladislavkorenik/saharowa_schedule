import moment from 'moment'
import React, { useState } from 'react'
import DatePicker from 'react-native-datepicker'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { StyleSheet, View, Text, Modal, TouchableHighlight } from 'react-native'

import { w } from '../consts/constants'
import { SubjectList } from './SubjectList'
import { UpdateButton } from './UpdateButton'

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
  const dateNow = moment(new Date())
  const minDate = dateNow.format('DD.MM.YY')
  const maxDate = dateNow.add(2, 'M').format('DD.MM.YY')

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
        <UpdateButton reloadApp={props.reloadApp} />
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

          <SubjectList day={moment(date, 'DD.MM.YY')} schedules={props.schedules} />
        </Modal>
      </View>
    </>
  )
}

export { DateSelector }
