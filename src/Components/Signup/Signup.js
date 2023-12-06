import React,{useState} from 'react';
import { useNavigate,Link} from 'react-router-dom';
import Logo from '../../olx-logo.png';
import './Signup.css';
import { auth, firestore } from '../../firebase/config'; 
import { createUserWithEmailAndPassword,updateProfile } from 'firebase/auth'; 
import { collection, addDoc } from 'firebase/firestore'; 

export default function Signup() {
  const [userName,setUsername] = useState('')
  const [email,setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [password, setPassword] =  useState('')
  const [error, setError] = useState('');
  const [userNameError,setUserNameError] = useState('');
  const [emailError,setEmailError] = useState('');
  const [phoneError,setPhoneError] = useState('');
  const [passwordError,setPasswordError] = useState('')

  const navigate = useNavigate()
  const handleSubmit = async (e)=>{
    e.preventDefault();
    
    setUserNameError('')
    setEmailError('')
    setPhoneError('')
    setPasswordError('')
    let hasErrors;
    if(!userName){
      setUserNameError('Username is required')
      hasErrors = true;
    }

    if(!email){
      setEmailError('Email is required')
      hasErrors = true;
    }

    if(!phone){
      setPhoneError('Phone number is required')
      hasErrors = true;
    }

    if(!password){
      setPasswordError('Password is required')
      hasErrors = true;
    }
    if(!hasErrors){

    
    try{
      const result = await createUserWithEmailAndPassword(auth, email, password)
      const userRef = collection(firestore, 'users')
      await updateProfile(result.user, {displayName:userName})
      await addDoc(userRef, {
        id:result.user.uid,
        displayName:userName,
        phoneNumber:phone,
      })
      console.log("User registered successfully");
      navigate('/login')
    } catch(error){
      setError(error.message)
    }
   }

  }


  return (
    <div>
      <div className="signupParentDiv">
        <img width="200px" height="200px" src={Logo}></img>
        <form onSubmit={handleSubmit}>
        <div className='text-danger text-center'>{error}</div>
          <label htmlFor="fname">Username</label>
          <br />
          <input
            className="input"
            type="text"
            value={userName}
            onChange={(e)=>{ setUsername(e.target.value)
            setUserNameError('')}}
            id="fname"
            name="name"
            defaultValue="John"
          />
          <div className="error-message text-danger">{userNameError}</div>

          <br />
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
          <label htmlFor="lname">Phone</label>
          <br />
          <input
            className="input"
            type="number"
            value={phone}
            onChange={(e)=>{setPhone(e.target.value)
            setPhoneError('')}}
            id="lname"
            name="phone"
            defaultValue="Doe"
          />
          <div className="error-message text-danger">{phoneError}</div>

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
          <button>Signup</button>
        </form>
        <Link to='/login'>Login</Link>
      </div>
    </div>
  );
}
