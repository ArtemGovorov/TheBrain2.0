import React from 'react'
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'

export default function ({ message = 'Loading...' }) {
  return (
    <View style={styles.main}>
      <ActivityIndicator
        animating
        style={styles.centering}
        size='large'
      />
      <Text style={styles.loading}>{message}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  main: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 60
  },
  centering: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  loading: {
    textAlign: 'center',
    color: 'white',
    fontFamily: 'Exo2-Bold',
    marginTop: 10
  }
})