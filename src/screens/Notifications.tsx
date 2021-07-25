import React from 'react'
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native'
import { List, Text } from 'react-native-paper'

// @ts-ignore
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

import { useNotifications } from '../hooks/Notifications'
import type { Notification as NotificationType } from '../hooks/Notifications'
import { DataList } from '../components/DataList'

const styles = StyleSheet.create({
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  datetimeView: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-end',
  }
})

const NotificationIcon = (props: ViewStyle) => (
  <List.Icon
    {...props}
    color='#b695c0'
    icon={() =>
      <MaterialCommunityIcons
        name='bell'
        color='#b695c0'
        size={34}
      />
    }
  />
)

const Notification = (props: NotificationType) => {
  const { type, description, dateString } = props

  const date = new Date(dateString)

  return (
    <List.Item
      title={type}
      titleStyle={styles.title}
      description={description}
      left={() => <NotificationIcon />}
      right={() => {
        return (
          <View style={styles.datetimeView}>
            <Text>{date.toDateString()}</Text>
            <Text>{date.toLocaleTimeString('da-DK')}</Text>
          </View>
        )
      }}
    />
  )
}

export const NotificationsScreen = () => (
  <DataList<NotificationType>
    hook={useNotifications}
    formatError={error => `Failed to load notifications: ${error}`}
    renderItem={({ item }) => <Notification {...item} />}
    keyExtractor={item => item.type + item.dateString}
  />
)
