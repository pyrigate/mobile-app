import React from 'react'
import { StyleSheet, View, ViewStyle } from 'react-native'
import { List } from 'react-native-paper'

import { useSensors } from '../hooks/Sensors'
import type { Sensor as SensorType } from '../hooks/Sensors'
import { DataList } from '../components/DataList'
import { SensorIcon } from '../Icons'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 10,
  },
})

type SensorProps = {
  name: string
  gpioPin: number
  active: boolean
}

const Sensor = (props: SensorProps) => {
  const { name, gpioPin, active } = props

  return (
    <List.Item
      title={name}
      description={`GPIO pin ${gpioPin}`}
      titleStyle={{ fontSize: 18, fontWeight: 'bold' }}
      left={() => <SensorIcon active={active} />}
    />
  )
}

export const SensorsScreen = () => (
  <DataList<SensorType>
    hook={useSensors}
    formatError={error => `Failed to load sensors: ${error}`}
    renderItem={({ item }) => <Sensor {...item} />}
    keyExtractor={item => `${item.name}${item.gpioPin}`}
  />
)
