import { Route, Routes } from 'react-router-dom'
import styled from 'styled-components'
import Home from './Home'
import Contact from './Contact'
import Destination from './Destination'
import Auth from './AuthPage'

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
      </Routes>
    </PageStyle>
  )
}

export default PageContainer
