import React, { createContext, useState, useEffect, useContext } from 'react';

import { api } from '../services/Api';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [signed, setSigned] = useState(false);

  useEffect(() => {
    const storagedToken = sessionStorage.getItem('@App:token');
    const verifyToken = async (token) => {
        api.defaults.headers.Authorization = `Bearer ${token}`
        var response = {}
        try {
            response = await api.get('/protected/health');
            if(response.data.authenticated){
                setSigned(true);
            } else{
                setSigned(false);
            }
        } catch (err){
            console.log(err);
            return(false);
        }
    }

    if (storagedToken) {
        verifyToken(storagedToken);
    }
  }, []);

  async function Login(userData) {
    var response = {}
    try {
        response = await api.post('/auth/login', userData);
    } catch(err){
        console.log(err);
        if (err.response.status === 400 || err.response.status === 401){
          return({status: 'error', message: "E-mail ou senha incorretos"})
        } else {
          return({status: 'error', message: "Erro no servidor"})
        }
    }
    if (!response.data.hasOwnProperty('token') && !response.data.token){
        return({status: 'error', message: "Erro no servidor"})
    }
    setSigned(true);
    api.defaults.headers.Authorization = `Bearer ${response.data.token}`;

    sessionStorage.setItem('@App:token', response.data.token);
    sessionStorage.setItem('@App:user', response.data.token);
    return({status: 'success', message: "Logado com sucesso!"});
  }

  async function Logout() {
    try {
      await api.post('/auth/logout');
    } catch(err){
      console.log(err);
    }
    setSigned(false);
  }

  return (
    <AuthContext.Provider
      value={{ signed, Login, Logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  return context;
}