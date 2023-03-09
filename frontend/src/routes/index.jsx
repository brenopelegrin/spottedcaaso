import React from 'react';
import { useAuth } from '../contexts/AuthContext';

import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';

import Feed from './Feed';
import Login from './Login';
import SignUp from './SignUp';
import NotFound from './NotFound';
import EmailSent from './EmailSent';
import EmailVerified from './EmailVerified';
import Logout from './Logout';
import Profile from './Profile';

export default function GetRoutes(){
  const { signed } = useAuth();
  const navigate = useNavigate();

  if (signed){
    return(
        <Routes>
            <Route path='*' element={<NotFound />}/>
            <Route exact path="/" element={<Navigate to="/feed"/>}/>

            <Route exact path="/feed" element={<Feed/>}/>
            <Route exact path="/profile" element={<Profile/>}/>

            <Route exact path='/emailsent' element={<EmailSent/>}/>
            <Route exact path='/emailverified' element={<EmailVerified/>}/>
            <Route path='/login' element={<Navigate to="/"/>}/>
            <Route path='/signup' element={<Navigate to="/"/>}/>
            <Route path="/logout" element={<Logout/>}/>
        </Routes>
    )
  } else {
    return(
        <Routes>
            <Route path='*' element={<NotFound />}/>
            <Route exact path="/" element={<Navigate to="/feed"/>}/>

            <Route exact path='/emailsent' element={<EmailSent/>}/>
            <Route exact path='/emailverified' element={<EmailVerified/>}/>
            <Route exact path="/feed" element={<Login/>}/>
            <Route exact path="/login" element={<Login/>}/>
            <Route exact path="/signup" element={<SignUp/>}/>

            
        </Routes>
    )
  }
};