import { FormEventHandler, useContext } from 'react'
import AuthContext from '../context/AuthContext'

const Login = () => {
  const { loginUser } = useContext(AuthContext) as unknown as { loginUser: FormEventHandler<HTMLFormElement> }
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
