import React from 'react'
import { StyleSheet, View, Text } from 'react-native'

const styles = StyleSheet.create({
  cyanColor: {
    fontWeight: 'bold',
    color: '#4dff4d'
  },
  redColor: {
    fontWeight: 'bold',
    color: 'red'
  },
  yellowColor: {
    fontWeight: 'bold',
    color: 'yellow'
  },
  blueColor: {
    fontWeight: 'bold',
    color: '#0000cc'
  },
  whiteColor: {
    color: 'white',
    textAlign: 'right'
  },
  coupleContainer: {
    marginLeft: 5
  },
  coupleNameContainer: {
    flexDirection: 'row'
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#8b00cc',
    padding: 12,
    height: 63,
    margin: 10,
    marginTop: 5,
    marginBottom: 0,
    overflow: 'hidden',
    position: 'relative'
  },
  coupleLocation: {
    color: 'white',
    fontSize: 12
  },
  teacherNameContainer: {
    position: 'absolute',
    right: 5,
    bottom: 5
  },
  teacherName: {
    color: 'white',
    fontSize: 12,
    flexWrap: 'wrap',
    textAlign: 'right'
  }
})

const SubjectItem = ({ subject }) => {
  const coupleTypeColor =
    subject.coupleType === 'ЛЗ'
      ? styles.redColor
      : subject.coupleType === 'ЛК'
      ? styles.cyanColor
      : subject.coupleType === 'ПЗ'
      ? styles.yellowColor
      : subject.coupleType === 'Факультатив'
      ? styles.blueColor
      : {}

  return (
    <>
      <View style={styles.container}>
        <Text>{subject.time} </Text>
        <View style={styles.coupleContainer}>
          <View style={styles.coupleNameContainer}>
            <Text style={styles.whiteColor}>{subject.coupleName}</Text>
            <Text style={coupleTypeColor}> {subject.coupleType ? `(${subject.coupleType})` : ''}</Text>
          </View>
          <Text style={styles.coupleLocation}>{subject.coupleLocation}</Text>
        </View>
        <View style={styles.teacherNameContainer}>
          <Text style={styles.teacherName}>{subject.teacherName} </Text>
        </View>
      </View>
    </>
  )
}

export default SubjectItem
