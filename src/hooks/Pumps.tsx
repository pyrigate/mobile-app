import React from 'react'

import { useEndpoint, createEndpointContext } from './Endpoint'
import type { EndpointData } from './Endpoint'

export type Pump = {
  name: string
  gpioPin: number
  active: boolean
}

const PumpsContext = createEndpointContext<Pump>()

const mockPumpResponse = async () => {
  return [
    {
      name: 'Pump 1',
      gpioPin: Math.round(Math.random() * 5),
      active: true,
    },
    {
      name: 'Pump 2',
      gpioPin: Math.round(Math.random() * 5),
      active: false,
    },
  ]
}

export const PumpsProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const response = useEndpoint<Pump>(
    'pumps',
    mockPumpResponse,
  )

  return (
    <PumpsContext.Provider value={response}>
      {children}
    </PumpsContext.Provider>
  )
}

export const usePumps = () => React.useContext(PumpsContext)
