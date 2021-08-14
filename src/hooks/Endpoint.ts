import React, { useContext, useEffect, useRef, useState } from 'react'

import { useSettings } from './Settings'

export type EndpointData<T> = {
  data: T[]
  loading: boolean
  errored: Error | number | null
  fetch: () => Promise<void>
}

// Convenient name for the type returned by endpoint hooks
export type HookType<T> = EndpointData<T>

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

  const mounted = useRef(true)

  const fetchData = async () => {
    setLoading(true)

    if (mockResponses) {
      if (mounted.current) {
        setData(await delayedMockResponse<T>(mockResponse))
        setLoading(false)
      }

      return
    }

    try {
      const response = await fetch(`${serverUrl}/${endpoint}`)

      if (response.ok) {
        if (mounted.current) {
          setData(await response.json())
        }
      } else {
        if (mounted.current) {
          setErrored(response.status)
        }
      }
    } catch (error) {
      setErrored(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()

    return () => { mounted.current = false }
  }, [mockResponses, serverUrl])

  return {
    data,
    loading,
    errored,
    fetch: fetchData,
  }
}
