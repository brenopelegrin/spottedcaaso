import React from 'react';
import { useAuth } from '../contexts/AuthContext';

import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';

import Feed from './Feed';
import Login from './Login';
import SignUp from './SignUp';
import NotFound from './NotFound';
import EmailSent from './EmailSent';

export default function GetRoutes(){
  const { signed, Logout } = useAuth();
  const navigate = useNavigate();

  if (signed){
    console.log('you r signed')
    return(
        <Routes>
            <Route path='*' element={<NotFound />}/>
            <Route exact path="/" element={<Navigate to="/feed"/>}/>

            <Route path='/emailsent' element={<EmailSent/>}/>
            <Route exact path="/feed" element={<Feed/>}/>
            <Route path='/login' element={<Navigate to="/"/>}/>
            <Route path='/signup' element={<Navigate to="/"/>}/>
        </Routes>
    )
  } else {
    console.log('you arent signed')
    return(
        <Routes>
            <Route path='*' element={<NotFound />}/>
            <Route exact path="/" element={<Navigate to="/feed"/>}/>

            <Route exact path="/feed" element={<Login/>}/>
            <Route exact path="/login" element={<Login/>}/>
            <Route exact path="/signup" element={<SignUp/>}/>

            
        </Routes>
    )
  }
};