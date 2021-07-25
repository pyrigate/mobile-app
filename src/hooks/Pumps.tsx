import React from 'react'

import { useEndpoint } from './Endpoint'
import type { EndpointData } from './Endpoint'

export type Pump = {
  name: string
  gpioPin: number
  active: boolean
}

const PumpsContext = React.createContext<EndpointData<Pump>>({
  data: [],
  loading: false,
  errored: null,
})

const mockPumpResponse = async () => {
  return [
    {
      name: 'Pump 1',
      gpioPin: 1,
      active: true,
    },
    {
      name: 'Pump 2',
      gpioPin: 4,
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
