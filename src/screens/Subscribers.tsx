import React from 'react'
import { ViewStyle } from 'react-native'
import { List } from 'react-native-paper'

// @ts-ignore
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

import { useSubscribers } from '../hooks/Subscribers'
import type { Subscriber as SubscriberType } from '../hooks/Subscribers'
import { DataList } from '../components/DataList'
import { MailIcon } from '../Icons'

const Subscriber = ({ mail }: { mail: string }) => {
  return (
    <List.Item
      title={mail}
      titleStyle={{ fontSize: 18, fontWeight: 'bold' }}
      left={() => <MailIcon />}
    />
  )
}

export const SubscribersScreen = () => (
  <DataList<SubscriberType>
    hook={useSubscribers}
    formatError={error => `Failed to load subscribers: ${error}`}
    renderItem={({ item }) => <Subscriber {...item} />}
    keyExtractor={item => item.mail}
  />
)
