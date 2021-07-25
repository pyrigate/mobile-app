import React, { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';

export type Settings = {
  serverUrl: string
  serverPort: number
  mockResponses: boolean
}

const SettingsContext = React.createContext({})

export const useSettings = () => {
  const [loading, setLoading] = useState(false)
  const [errored, setErrored] = useState<Error | number | null>(null)
  const [settings, setSettings] = useState<Settings>({
    serverUrl: '127.0.0.1',
    serverPort: 8000,
    mockResponses: true,
  })

  useEffect(() => {
    const loadSettings = async () => {
      setLoading(true)

      try {
        const data = await AsyncStorage.getItem('@PYRIGATE_SETTINGS')

        if (data) {
          setSettings(JSON.parse(data))
        }
      } catch (error) {
        setErrored(error)
      } finally {
        setLoading(false)
      }
    }

    loadSettings()
  }, [])

  return {
    settings,
    setSettings,
    loading,
    errored,
  }
}

export const SettingsProvider = ({
  children,
}: {
  children: JSX.Element[]
}) => {
  const contextValue = useSettings()

  return (
    <SettingsContext.Provider value={contextValue}>
      {children}
    </SettingsContext.Provider>
  )
}
