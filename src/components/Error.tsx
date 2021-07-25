import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

import { useTheme } from 'react-native-paper'

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignSelf: 'center',
    paddingHorizontal: 20,
  },
  message: {
    fontSize: 20,
  },
})

export const ErrorScreen = ({ message }: { message: string }) => {
  const { colors } = useTheme()

  return (
    <View style={styles.centered}>
      <Text style={[styles.message, { color: colors.text }]}>{message}</Text>
    </View>
  )
}
