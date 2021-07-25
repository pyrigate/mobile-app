import React from 'react'
import { List } from 'react-native-paper'

// @ts-ignore
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

const iconSize = 34
const activeColor = '#32cd32'
const inactiveColor = '#dc143c'

export const PumpIcon = ({ active }: { active: boolean }) => {
  const icon =
    <MaterialCommunityIcons
      name={active ? 'water-pump' : 'water-pump-off'}
      color={active ? activeColor : inactiveColor}
      size={iconSize}
    />

  return (
    <List.Icon icon={() => icon}/>
  )
}

export const SensorIcon = ({ active }: { active: boolean }) => {
  const icon =
    <MaterialCommunityIcons
      name='chart-bell-curve-cumulative'
      color={active ? activeColor : inactiveColor}
      size={iconSize}
    />

  return (
    <List.Icon icon={() => icon}/>
  )
}

export const MailIcon = () => (
  <List.Icon
    icon={() =>
      <MaterialCommunityIcons
        name='email'
        color='#b695c0'
        size={34}
      />
    }
  />
)
