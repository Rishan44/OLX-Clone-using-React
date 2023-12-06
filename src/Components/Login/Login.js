import React,{useState} from 'react';
import Logo from '../../olx-logo.png';
import './Login.css';
import {Link,useNavigate} from 'react-router-dom'
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase/config';

function Login() {
  const [email, setEmail ] = useState('')
  const [password, setPassword ] = useState('')
  const [emailError, setEmailError ] = useState('')
  const [passwordError, setPasswordError ] = useState('')

  const navigate = useNavigate('')
  const handleLogin =(e)=>{
    e.preventDefault()
    setEmailError('')
    setPasswordError('')
    let hasErrors;
    if(!email){
      setEmailError('Email is required')
      hasErrors = true;
    }
    if(!password){
      setPasswordError('Password is required')
      hasErrors= true;
    }
    if(!hasErrors){
      signInWithEmailAndPassword(auth,email,password).then(()=>{
        navigate('/')
      }).catch((error)=>{
        console.log(error);
      })
    }
  }

  return (

    <div>
      <div className="loginParentDiv">
        <img width="200px" height="200px" src={Logo}></img>
        <form onSubmit={handleLogin}>
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            type="email"
            value={email}
            onChange={(e)=>{setEmail(e.target.value)
            setEmailError('')}}
            id="fname"
            name="email"
            defaultValue="John"
          />
          <div className="error-message text-danger">{emailError}</div>
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            className="input"
            type="password"
            value={password}
            onChange={(e)=>{setPassword(e.target.value)
            setPasswordError('')}}
            id="lname"
            name="password"
            defaultValue="Doe"
          />
          <div className="error-message text-danger">{passwordError}</div>
          <br />
          <br />
          <button>Login</button>
        </form>
        <Link to={'/signup'}> Signup </Link>
      </div>
    </div>
  );
}

export default Login;
