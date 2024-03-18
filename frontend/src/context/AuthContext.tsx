import { createContext, useEffect, useState } from 'react'
import { JwtPayload, jwtDecode } from 'jwt-decode'
import 'core-js/stable/atob'
import { useNavigate } from 'react-router-dom'

const AuthContext = createContext<{
  user: JwtPayload | null
  loginUser: (e: any) => Promise<any>
  logout: () => void
  registerUser: (e: any) => Promise<void>
  authTokens: {
    access: string
    refresh: string
  } | null
} | null>(null)

export default AuthContext

const loginUser = async (e: any) => {
  e.preventDefault()
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
    return data
  } else {
    console.error('error')
    return null
  }
}

const registerUser = async (e: any) => {
  e.preventDefault()
  const response = await fetch('http://127.0.0.1:8000/api/v1/users/register/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ username: e.target.username.value, password: e.target.password.value, email: e.target.email.value })
  })
  const data = await response.json()
  window.location.reload()
  if (response.ok) {
    loginUser(e)
  } else {
    console.error('error')
  }
}

export const AuthProvider = ({ children, e }: { children: React.ReactNode; e: any }) => {
  const [authTokens, setAuthTokens] = useState<{ access: string; refresh: string } | null>(null)
  const [user, setUser] = useState<JwtPayload | null>(null)
  const navigate = useNavigate()

  useEffect(() => {
    let tokens: { access: string; refresh: string } = { access: '', refresh: '' }
    let decodedTokens: JwtPayload | null

    if (localStorage.getItem('tokens')) {
      tokens = JSON.parse(localStorage.getItem('tokens')!)
      decodedTokens = jwtDecode(tokens.access)
      setUser(decodedTokens)
      setAuthTokens(tokens)
    } else if (window.location.pathname === '/destination') {
      navigate('/login')
      window.location.reload()
    }
  }, [e, navigate])

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
    loginUser: loginUser,
    logout: logout,
    registerUser: registerUser,
    authTokens: authTokens
  }

  useEffect(() => {
    if (authTokens) {
      const interval = setInterval(
        () => {
          updateToken()
        },
        1000 * 60 * 5
      )
      return () => clearInterval(interval)
    }
  }, [authTokens])

  return <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>
}
