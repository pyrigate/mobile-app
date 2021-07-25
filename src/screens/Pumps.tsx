import React from 'react'
import { StyleSheet, View, ViewStyle } from 'react-native'
import { List } from 'react-native-paper'

import { usePumps } from '../hooks/Pumps'
import type { Pump as PumpType } from '../hooks/Pumps'
import { DataList } from '../components/DataList'
import { PumpIcon } from '../Icons'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 10,
  },
})

type PumpProps = {
  name: string
  gpioPin: number
  active: boolean
}

const Pump = (props: PumpProps) => {
  const { name, gpioPin, active } = props

  return (
    <List.Item
      title={name}
      description={`GPIO pin ${gpioPin}`}
      titleStyle={{ fontSize: 18, fontWeight: 'bold' }}
      left={() => <PumpIcon active={active} />}
    />
  )
}

export const PumpsScreen = () => (
  <DataList<PumpType>
    hook={usePumps}
    formatError={error => `Failed to load pumps: ${error}`}
    renderItem={({ item }) => <Pump {...item} />}
    keyExtractor={item => `${item.name}${item.gpioPin}`}
  />
)
