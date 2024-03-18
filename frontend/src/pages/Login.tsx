import { useContext } from 'react'
import AuthContext from '../context/AuthContext'

const Login = () => {
  let { loginUser } = useContext(AuthContext)
  return (
    <form onSubmit={loginUser}>
      <label>
        Username:
        <input type='text' name='username' />
      </label>
      <label>
        Password:
        <input type='password' name='password' />
      </label>
      <button type='submit'>Login</button>
    </form>
  )
}

export default Login
