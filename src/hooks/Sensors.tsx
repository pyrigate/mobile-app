import React from 'react'

import { useEndpoint } from './Endpoint'
import type { EndpointData } from './Endpoint'

export type Sensor = {
  name: string
  gpioPin: number
  active: boolean
}

const SensorsContext = React.createContext<EndpointData<Sensor>>({
  data: [],
  loading: false,
  errored: null,
})

const mockSensorResponse = async () => {
  return [
    {
      name: 'Sensor 1',
      gpioPin: 1,
      active: true,
    },
    {
      name: 'Sensor 2',
      gpioPin: 4,
      active: false,
    },
  ]
}

export const SensorsProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const response = useEndpoint<Sensor>(
    'pumps',
    mockSensorResponse,
  )

  return (
    <SensorsContext.Provider value={response}>
      {children}
    </SensorsContext.Provider>
  )
}

export const useSensors = () => React.useContext(SensorsContext)
