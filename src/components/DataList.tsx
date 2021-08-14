import React, { useEffect, useState } from 'react'
import {
  FlatList,
  FlatListProps,
  ListRenderItem,
  SafeAreaView,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native'
import { List } from 'react-native-paper'

import { ErrorScreen } from '../components/Error'
import { Loader } from '../components/Loader'
import { HookType } from '../hooks/Endpoint'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 10,
  },
})

type DataListProps<T> = {
  hook: () => HookType<T>
  formatError: (error: Error | number | null) => string
  renderItem: FlatListProps<T>['renderItem']
  keyExtractor: FlatListProps<T>['keyExtractor']
}

export function DataList<T>(props: DataListProps<T>) {
  const { hook, formatError, renderItem, keyExtractor } = props
  const { data, loading, errored, fetch } = hook()
  const [refreshing, setRefreshing] = useState(false)

  useEffect(() => {
    if (refreshing) {
      fetch().finally(() => setRefreshing(false))
    }
  }, [refreshing])

  if (loading) {
    return <Loader />
  }

  if (errored) {
    return <ErrorScreen message={formatError(errored)} />
  }

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        onRefresh={() => setRefreshing(true)}
        refreshing={refreshing}
      />
    </SafeAreaView>
  )
}
