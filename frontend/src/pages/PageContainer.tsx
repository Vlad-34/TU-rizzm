import { Route, Routes } from 'react-router-dom'
import styled from 'styled-components'
import Home from './Home'
import Contact from './Contact'
import Destination from './Destination'
import Auth from './AuthPage'
import Booking from './Booking'
import React from 'react'
import Reservations from './Reservations'

interface Pages {
  home: boolean
  destination: boolean
  contact: boolean
  offers: boolean
}

const PageStyle = styled.div`
  top: 60px;
  position: absolute;
`

const PageContainer = ({ setPages, location }: { setPages: React.Dispatch<React.SetStateAction<Pages>>; location: string }) => {
  return (
    <PageStyle>
      <Routes>
        <Route path='/' element={<Home setPages={setPages!} />} />
        <Route path='/destination' element={<Destination location={location} />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/login' element={<Auth haveAccount={true} />} />
        <Route path='/register' element={<Auth haveAccount={false} />} />
        <Route path='/booking' element={<Booking />} />
        <Route path='/reservations' element={<Reservations />} />
      </Routes>
    </PageStyle>
  )
}

export default PageContainer
