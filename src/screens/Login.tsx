import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Button, TextInput, Title } from 'react-native-paper'
import { useAuth } from '../contexts/AuthContext'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 40,
    justifyContent: 'center',
  },
  textInput: {
    margin: 15,
  },
})

/*
 * The login screen
 */
export const LoginScreen = () => {
  const [username, setUsername] = React.useState('')
  const [password, setPassword] = React.useState('')
  const { login } = useAuth()

  return (
    <View style={styles.container}>
      <Title>Pyrigate</Title>

      <View style={styles.textInput}>
        <TextInput
          label="Username"
          value={username}
          onChangeText={setUsername}
        />
      </View>

      <View style={styles.textInput}>
        <TextInput
          label="Password"
          secureTextEntry
          right={<TextInput.Icon name="eye" />}
          value={password}
          onChangeText={setPassword}
        />
      </View>

      <Button
        mode="contained"
        compact
        disabled={!username || !password}
        onPress={() => login()}
      >
        Log in
      </Button>
    </View>
  )
}
