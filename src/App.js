import React,{useContext, useEffect} from 'react';
import './App.css';
import {BrowserRouter as Router ,Route, Routes} from 'react-router-dom'
import Signup from './Pages/Signup'
import Post from './store/PostContext'
import Login from './Pages/Login'
import Create from './Pages/Create'
import { auth} from './firebase/config';
import Home from './Pages/Home';
import { authContext } from './store/Context';
import { onAuthStateChanged } from 'firebase/auth';
import View from './Pages/ViewPost'


function App() { 
  const {user,setUser} = useContext(authContext)
  useEffect(()=>{
    console.log(user);
    onAuthStateChanged(auth,(user)=>{
      setUser(user)
    })
  },[user,setUser])
  return ( 
    <div className='App'>
      <Post>
      <Router>
        <Routes>
        <Route exact path='/' element={ <Home /> } />
        <Route path='/signup' element={ <Signup /> } />
        <Route path='/login' element={ <Login /> } />
        <Route path='/create' element={ <Create/>} />
        <Route path='/view' element={ < View /> } />
        </Routes>
      </Router>
      </Post>
    </div>
  );
}

export default App;
