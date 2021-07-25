import React, { useContext, useState } from 'react'

type AuthContextType = {
  isLoggedIn: boolean
  login: () => void
}

const AuthContext = React.createContext<AuthContextType>({
  isLoggedIn: false,
  login: () => {},
})

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const contextValue: AuthContextType = {
    isLoggedIn,
    login: () => setIsLoggedIn(true),
  }

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
