import React from 'react'

import { useEndpoint, createEndpointContext } from './Endpoint'
import type { EndpointData } from './Endpoint'

export type Notification = {
  type: string
  description: string
  dateString: string
}

type WaterJobNotification = {
  config: string
} & Notification

const NotificationsContext = createEndpointContext<Notification>()

const mockNotificationResponse = async () => {
  return [
    {
      type: 'High humidity',
      description: 'Threshold of 80% exceeded',
      dateString: '2021-07-18T13:40:12.999Z',
    },
    {
      type: 'Watering job',
      description: "Watered plant using the 'chili' config",
      dateString: '2021-07-17T10:04:21.999Z',
    }
  ]
}

export const NotificationsProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const response = useEndpoint<Notification>(
    'notifications',
    mockNotificationResponse,
  )

  return (
    <NotificationsContext.Provider value={response}>
      {children}
    </NotificationsContext.Provider>
  )
}

export const useNotifications = () => React.useContext(NotificationsContext)
