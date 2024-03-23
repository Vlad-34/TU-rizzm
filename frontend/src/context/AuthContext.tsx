import { createContext, useCallback, useEffect, useState } from 'react'
import { JwtPayload, jwtDecode } from 'jwt-decode'
import 'core-js/stable/atob'

const AuthContext = createContext<{
  user: JwtPayload | null
  loginUser: (e: Event) => Promise<Response>
  logout: () => void
  registerUser: (e: Event) => Promise<Response>
  authTokens: {
    access: string
    refresh: string
  } | null
} | null>(null)

export default AuthContext

const loginUser = async (e: Event) => {
  e.preventDefault()
  if (e.target instanceof HTMLFormElement) {
    const response = await fetch('http://127.0.0.1:8000/api/v1/auth/token/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username: e.target.username.value, password: e.target.password.value })
    })
    const data = await response.json()
    if (response.ok) {
      localStorage.setItem('tokens', JSON.stringify(data))
      window.location.pathname = '/destination'
      return data
    } else {
      console.error('error')
      return null
    }
  }
}

const registerUser = async (e: Event) => {
  e.preventDefault()
  if (e.target instanceof HTMLFormElement) {
    const response = await fetch('http://127.0.0.1:8000/api/v1/users/register/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username: e.target.username.value, password: e.target.password.value, email: e.target.email.value })
    })
    if (response.ok) {
      window.location.pathname = '/login'
    } else {
      console.error('error')
    }
  }
}

export const AuthProvider = ({ children, e }: { children: React.ReactNode; e: Event }) => {
  const [authTokens, setAuthTokens] = useState<{ access: string; refresh: string } | null>(null)
  const [user, setUser] = useState<JwtPayload | null>(null)

  useEffect(() => {
    let tokens: { access: string; refresh: string } = { access: '', refresh: '' }
    let decodedTokens: JwtPayload | null

    if (localStorage.getItem('tokens')) {
      tokens = JSON.parse(localStorage.getItem('tokens')!)
      decodedTokens = jwtDecode(tokens.access)
      setUser(decodedTokens)
      setAuthTokens(tokens)
    } else if (window.location.pathname === '/destination') {
      window.location.pathname = '/login'
    }
  }, [e])

  const logout = () => {
    setUser(null)
    setAuthTokens(null)
    localStorage.removeItem('tokens')
  }

  const updateToken = async () => {
    const response = await fetch('http://127.0.0.1:8000/api/v1/auth/token/refresh/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ refresh: authTokens?.refresh })
    })
    const data = await response.json()
    let decodedTokens: JwtPayload | null // Declare the variable 'decodedTokens'
    const tokens = data // Declare the variable 'tokens' and assign it the value of 'data'
    if (response.ok) {
      localStorage.setItem('tokens', JSON.stringify(data))
      decodedTokens = jwtDecode(tokens.access)
      setUser(decodedTokens)
      setAuthTokens(tokens)
    } else {
      console.error('error')
      setUser(null)
      setAuthTokens(null)
      localStorage.removeItem('tokens')
    }
  }

  const contextData = {
    user: user,
    loginUser: loginUser as (e: Event) => Promise<Response>,
    logout: logout,
    registerUser: registerUser as unknown as (e: Event) => Promise<Response>,
    authTokens: authTokens
  }

  const updateTokenCallback = useCallback(updateToken, [authTokens, updateToken])

  useEffect(() => {
    if (authTokens) {
      const interval = setInterval(
        () => {
          updateTokenCallback()
        },
        1000 * 60 * 5
      )
      return () => clearInterval(interval)
    }
  }, [updateTokenCallback, authTokens])

  return <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>
}
