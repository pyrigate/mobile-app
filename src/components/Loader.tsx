import React from 'react'
import { ActivityIndicator, StyleSheet, View } from 'react-native'

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    alignContent: 'center',
    justifyContent: 'center',
  }
})

export const Loader = () => (
  <View style={styles.centered}>
    <ActivityIndicator size='large' color='#0f85d1' />
  </View>
)
