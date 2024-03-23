import { FormEventHandler, useContext, useState } from 'react'
import AuthContext from '../context/AuthContext'
import { TextField } from '@mui/material'

type TextAlign = 'left' | 'right' | 'center' | 'justify' | 'initial' | 'inherit'

const AuthStyle = {
  display: 'flex',
  width: '30vw',
  height: '70vh',
  marginTop: '12vh',
  marginLeft: '35vw',
  left: '0',
  justifyContent: 'center',
  alignItems: 'center',
  Position: 'absolute',
  background: '#50c878',
  borderRadius: '20px',
  boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
  color: '#1E1E1E'
}

const FormStyle = {
  display: 'block',
  textAlign: 'left' as TextAlign | undefined
}

const LabelStyle = {
  display: 'flex',
  alignItems: 'center'
}

const baseStyle = {
  border: 'none',
  fontFamily: 'Staatliches, sans-serif',
  width: '100%',
  height: '50px',
  backgroundColor: '#98FF98',
  fontSize: '20px',
  textShadow: 'none',
  boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
  marginBottom: '10px'
}

const hoverStyle = {
  opacity: 0.8,
  cursor: 'pointer'
}

const Auth = ({ haveAccount }: { haveAccount?: boolean }) => {
  const authContext = useContext(AuthContext)
  const loginUser = authContext?.loginUser as unknown as FormEventHandler<HTMLFormElement> | undefined
  const registerUser = authContext?.registerUser as unknown as FormEventHandler<HTMLFormElement> | undefined
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div style={AuthStyle}>
      <form style={FormStyle} onSubmit={haveAccount ? loginUser : registerUser}>
        {!haveAccount && (
          <>
            <label style={LabelStyle}>
              Email:
              <TextField
                name='email'
                id='outlined-basic'
                placeholder='email'
                variant='outlined'
                size='small'
                color='success'
                style={{
                  width: '210px',
                  fontFamily: 'Staatliches, sans-serif',
                  marginLeft: '36.5px'
                }}
              />
            </label>
            <br />
          </>
        )}
        <label style={LabelStyle}>
          Username:
          <TextField
            name='username'
            id='outlined-basic'
            placeholder='username'
            variant='outlined'
            size='small'
            color='success'
            style={{
              width: '210px',
              fontFamily: 'Staatliches, sans-serif',
              marginLeft: '10px'
            }}
          />
        </label>
        <br />
        <label style={LabelStyle}>
          Password:
          <TextField
            type='password'
            name='password'
            id='outlined-basic'
            placeholder='password'
            variant='outlined'
            size='small'
            color='success'
            style={{
              width: '210px',
              fontFamily: 'Staatliches, sans-serif',
              marginLeft: '10px'
            }}
          />
        </label>
        <br />
        {haveAccount ? (
          <>
            <button
              type='submit'
              style={isHovered ? { ...baseStyle, ...hoverStyle } : baseStyle}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              Login
            </button>
            Don't have an account? <a href='/register'>Register</a>
          </>
        ) : (
          <>
            <label style={LabelStyle}>
              Confirm <br /> Password:
              <TextField
                type='password'
                name='confirm_password'
                id='outlined-basic'
                placeholder='confirm password'
                variant='outlined'
                size='small'
                color='success'
                style={{
                  width: '210px',
                  fontFamily: 'Staatliches, sans-serif',
                  marginLeft: '10px'
                }}
              />
            </label>
            <br />
            <button
              type='submit'
              style={isHovered ? { ...baseStyle, ...hoverStyle } : baseStyle}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              Register
            </button>
            Already have an account? <a href='/login'>Login</a>
          </>
        )}
      </form>
    </div>
  )
}

export default Auth
