import styled, { css } from 'styled-components'
import { TextField } from '@mui/material'
import { Link } from 'react-router-dom'
import { useContext } from 'react'
import AuthContext from '../context/AuthContext'
import { JwtPayload } from 'jwt-decode'

interface Pages {
  home: boolean
  destination: boolean
  contact: boolean
  offers: boolean
}

const NavBarContainer = styled.nav`
  background: #50c878;
  width: 100vw;
  height: 60px;
  top: 0;
  display: flex;
  position: fixed;
  z-index: 100;
`

const LinkStyle = {
  textDecoration: 'none',
  color: '#1e1e1e'
}

const Logo = styled.img`
  padding: 10px;
  width: 160px;
  height: 40px;
  &:hover {
    background: #98ff98;
    opacity: 0.8;
    cursor: pointer;
  }
`

const Profile = styled.img<{ user: JwtPayload }>`
  width: 30px;
  height: 30px;
  right: 0px;
  position: absolute;
  margin-top: 10px;
  margin-right: 10px;
  background: ${(props) => (props.user ? '#98FF98' : 'transparent')}; // Fix the reference to user
  border-radius: 50%;
  padding: 5px;
`

const ButtonStyle = css`
  width: auto;
  height: 45px;
  text-align: center;
  padding-right: 10px;
  padding-left: 10px;
  padding-top: 15px;
  position: absolute;
  font-size: 24px;
  &:hover {
    background: #98ff98;
    opacity: 0.8;
    cursor: pointer;
  }
`

const Contact = styled.div<{ id: string }>`
  ${ButtonStyle}
  right: 60px;
  background: ${(props) => (props.id === 'true' ? '#98FF98' : '#50c878')};
`

const Destination = styled.div`
  ${ButtonStyle}
  right: ${(props) => (props.className === 'true' ? '500px' : '410px')};
  background: ${(props) => (props.id === 'true' ? '#98FF98' : '#50c878')};
`

const Home = styled.div`
  ${ButtonStyle}
  right: ${(props) => (props.className === 'true' ? '630px' : '540px')};
  background: ${(props) => (props.id === 'true' ? '#98FF98' : '#50c878')};
`

const Offers = styled.div`
  ${ButtonStyle}
  background: #50c878;
  right: 410px;
  width: auto;
  visibility: ${(props) => (props.id === 'true' ? 'visible' : 'hidden')};
  &: hover {
    background: ${(props) => (props.id === 'true' ? '#98FF98' : '#50c878')};
  }
`

function handleScroll(id: string) {
  const elem = document.getElementById(id)
  if (elem) {
    const rect = elem.getBoundingClientRect()
    window.scrollTo({
      top: rect.top + window.scrollY - 200,
      behavior: 'smooth'
    })
  }
}

const NavBar = ({
  pages,
  setPages,
  setLocation
}: {
  pages: Pages
  setPages: React.Dispatch<React.SetStateAction<Pages>>
  setLocation: React.Dispatch<React.SetStateAction<string>>
}) => {
  const { user, logout } = useContext(AuthContext) || {}

  function handlePagesWithParams(page: string) {
    let newPages: Pages = {
      home: page === '/home',
      destination: page === '/destination',
      contact: page === '/contact',
      offers: page === '/destination'
    }
    newPages = {
      ...newPages,
      [page]: true
    }
    setPages(newPages)
  }

  return (
    <NavBarContainer>
      <link href='https://fonts.googleapis.com/css2?family=Staatliches&display=swap' rel='stylesheet'></link>
      <Link style={LinkStyle} to='/'>
        <Logo src='src/assets/tu-rizzm-logo.png' onClick={() => handlePagesWithParams('/home')} />
      </Link>
      <Link style={LinkStyle} to='/login'>
        <Profile
          user={user ?? {}}
          src='src/assets/user.png'
          onClick={() => {
            user && logout && logout()
            handlePagesWithParams('/login')
          }}
        />
      </Link>
      <Link style={LinkStyle} to='/contact'>
        <Contact id={`${pages.contact}`} onClick={() => handlePagesWithParams('/contact')}>
          CONTACT
        </Contact>
      </Link>
      <TextField
        onChange={(e) => setLocation(e.target.value as string)}
        id='outlined-basic'
        placeholder='Search destination...'
        variant='outlined'
        size='small'
        color='success'
        style={{
          width: '240px',
          position: 'absolute',
          top: '10px',
          right: '160px',
          fontFamily: 'Staatliches, sans-serif'
        }}
      />
      <Offers
        onClick={() => {
          handleScroll('offers')
        }}
        id={`${pages.offers}`}
        className='offers'
      >
        OFFERS
      </Offers>
      <Link style={LinkStyle} to='/destination'>
        <Destination
          id={`${pages.destination}`}
          className={`${pages.destination}`}
          onClick={() => {
            handlePagesWithParams('/destination')
            handleScroll('destination')
          }}
        >
          DESTINATION
        </Destination>
      </Link>
      <Link style={LinkStyle} to='/'>
        <Home className={pages.destination.toString()} id={`${pages.home}`} onClick={() => handlePagesWithParams('home')}>
          HOME
        </Home>
      </Link>
    </NavBarContainer>
  )
}

export default NavBar
