import React from 'react'

import { useEndpoint, createEndpointContext } from './Endpoint'
import type { EndpointData } from './Endpoint'

export type Sensor = {
  name: string
  gpioPin: number
  active: boolean
}

const SensorsContext = createEndpointContext<Sensor>()

const mockSensorResponse = async () => {
  return [
    {
      name: 'Sensor 1',
      gpioPin: Math.round(Math.random() * 5),
      active: true,
    },
    {
      name: 'Sensor 2',
      gpioPin: Math.round(Math.random() * 5),
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
