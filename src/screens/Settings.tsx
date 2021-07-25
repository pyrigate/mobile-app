import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import {
  Button,
  Checkbox,
  Dialog as PaperDialog,
  Portal,
  Text,
  TextInput,
  TouchableRipple,
} from 'react-native-paper'

import { useSettings } from '../hooks/Settings';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 30,
  },
  settingView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  settingName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  settingValue: {
    fontSize: 18,
  },
})

type SettingProps = {
  onPress?: () => void
  name: string
  component: JSX.Element
}

const Setting = (props: SettingProps) => {
  const { onPress, name, component } = props

  const contents = (
    <View style={styles.settingView}>
      <Text style={styles.settingName}>{name}</Text>
      {component}
    </View>
  )

  return (
    <>
      {onPress ? (
        <TouchableRipple borderless rippleColor="#b695c0" onPress={onPress}>
          {contents}
        </TouchableRipple>
      ) : (
        <>{contents}</>
      )}
    </>
  )
}

type DialogProps = {
  visible: boolean
  title: string
  value: string
  onChangeText: (text: string) => void
  onClose: () => void
}

export const Dialog = (props: DialogProps) => {
  const { visible, title, value, onChangeText, onClose } = props

  return (
    <PaperDialog visible={visible}>
      <PaperDialog.Title>{title}</PaperDialog.Title>
      <PaperDialog.Content>
        <TextInput
          autofocus
          value={value}
          onChangeText={onChangeText}
        />
      </PaperDialog.Content>
      <PaperDialog.Actions>
        <Button onPress={onClose}>Done</Button>
      </PaperDialog.Actions>
    </PaperDialog>
  )
}

export const SettingsScreen = () => {
  const { settings, setSettings } = useSettings()
  const [serverUrl, setServerUrl] = useState(settings.serverUrl)
  const [serverPort, setServerPort] = useState(settings.serverPort.toString())
  const [mockResponses, setMockResponses] = useState(settings.mockResponses)

  const [serverUrlDialogVisible, setServerUrlDialogVisible] = useState(false)
  const [serverPortDialogVisible, setServerPortDialogVisible] = useState(false)

  return (
    <Portal.Host>
      <View style={styles.container}>
        <Setting
          name="Server URL"
          onPress={() => setServerUrlDialogVisible(true)}
          component={<Text style={styles.settingValue}>{serverUrl}</Text>}
        />

        <Setting
          name="Server Port"
          onPress={() => setServerPortDialogVisible(true)}
          component={<Text style={styles.settingValue}>{serverPort}</Text>}
        />

        <Setting
          name="Mock Server Responses"
          component={
            <Checkbox
              status={mockResponses ? 'checked' : 'unchecked'}
              onPress={() => setMockResponses(prev => !prev)}
            />
          }
        />
      </View>

      <Portal>
        <Dialog
          visible={serverUrlDialogVisible}
          title="Server URL"
          value={serverUrl}
          onChangeText={setServerUrl}
          onClose={() => setServerUrlDialogVisible(false)}
        />

        <Dialog
          visible={serverPortDialogVisible}
          title="Server port"
          value={serverPort.toString()}
          onChangeText={text => setServerPort(text)}
          onClose={() => setServerPortDialogVisible(false)}
        />
      </Portal>
    </Portal.Host>
  )
}
