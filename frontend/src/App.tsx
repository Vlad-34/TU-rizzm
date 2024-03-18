import { useEffect, useState } from 'react'
import { createGlobalStyle } from 'styled-components'
import NavBar from './components/Navbar'
import PageContainer from './pages/PageContainer'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { useGeolocated } from 'react-geolocated'

interface Pages {
  home: boolean
  destination: boolean
  contact: boolean
  offers: boolean
}

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    background: #F8F8FF;
    font-family: 'Staatliches', sans-serif;
    color: #1E1E1E;
  }
  /* Make scrollbar invisible */
  &::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
`

function App() {
  const [pages, setPages] = useState<Pages>({
    home: window.location.pathname === '/',
    destination: window.location.pathname === '/destination',
    contact: window.location.pathname === '/contact',
    offers: window.location.pathname === '/destination'
  })
  const { coords, isGeolocationAvailable, isGeolocationEnabled } = useGeolocated({
    positionOptions: {
      enableHighAccuracy: false
    },
    userDecisionTimeout: 5000
  })

  useEffect(() => {
    localStorage.setItem('isGeolocationAvailable', isGeolocationAvailable.toString())
    localStorage.setItem('isGeolocationEnabled', isGeolocationEnabled.toString())
    localStorage.setItem('latitude', coords?.latitude.toString() || '0')
    localStorage.setItem('longitude', coords?.longitude.toString() || '0')
    localStorage.setItem('altitude', coords?.altitude?.toString() || '0')
  }, [coords, isGeolocationAvailable, isGeolocationEnabled])

  const [location, setLocation] = useState('')

  return (
    <>
      <link href='https://fonts.googleapis.com/css?family=Staatliches' rel='stylesheet'></link>
      <GlobalStyle />
      <BrowserRouter>
        <AuthProvider e={null}>
          <NavBar pages={pages} setPages={setPages} setLocation={setLocation} />
          <PageContainer setPages={setPages} location={location} />
        </AuthProvider>
      </BrowserRouter>
    </>
  )
}

export default App
