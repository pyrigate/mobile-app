import React from 'react'

import { useEndpoint, createEndpointContext } from './Endpoint'
import type { EndpointData } from './Endpoint'

export type Subscriber = {
  mail: string
}

const SubscribersContext = createEndpointContext<Subscriber>()

const mockSubscribersResponse = async () => {
  return [
    {
      mail: 'example1@domain.com',
    },
    {
      mail: 'example2@hotmail.com',
    },
  ]
}

export const SubscribersProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const response = useEndpoint<Subscriber>(
    'subscribers',
    mockSubscribersResponse,
  )

  return (
    <SubscribersContext.Provider value={response}>
      {children}
    </SubscribersContext.Provider>
  )
}

export const useSubscribers = () => React.useContext(SubscribersContext)
