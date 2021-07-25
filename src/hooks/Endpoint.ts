import React, { useContext, useEffect, useState } from 'react'

import { useSettings } from './Settings'

export type EndpointData<T> = {
  data: T[]
  loading: boolean
  errored: Error | number | null
}

async function delayedMockResponse<T>(
  mockResponse: () => Promise<T[]>,
  delay?: number,
): Promise<T[]> {
  return new Promise(resolve => {
    setTimeout(() => mockResponse().then(resolve), delay ?? 2000)
  })
}

export const useEndpoint = <T>(
  endpoint: string,
  mockResponse: () => Promise<T[]>,
): EndpointData<T> => {
  const {
    settings: { mockResponses, serverUrl },
  } = useSettings()
  const [loading, setLoading] = useState(false)
  const [errored, setErrored] = useState<Error | number | null>(null)
  const [data, setData] = useState<T[]>([])

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)

      if (mockResponses) {
        setData(await delayedMockResponse<T>(mockResponse))
        setLoading(false)
        return
      }

      try {
        const response = await fetch(`${serverUrl}/${endpoint}`)

        if (response.ok) {
          setData(await response.json())
        } else {
          setErrored(response.status)
        }
      } catch (error) {
        setErrored(error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [serverUrl])

  return {
    data,
    loading,
    errored,
  }
}
