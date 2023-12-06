import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { FirebaseContext } from './store/Context';
import Context from './store/Context';
import {firestore,auth} from './firebase/config'

ReactDOM.render(   
  <FirebaseContext.Provider value={{auth,firestore}}>
  <Context>
  <App />    
  </Context>    
  </FirebaseContext.Provider>
, document.getElementById('root'));
