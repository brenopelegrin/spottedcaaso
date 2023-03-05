import { ChakraProvider, Box } from '@chakra-ui/react'
import { Navigate, Route, Routes, BrowserRouter as Router} from 'react-router-dom';

import { useContext } from 'react';

import Navbar from './components/Navbar';
import Feed from './routes/Feed';
import Login from './routes/Login';
import SignUp from './routes/SignUp';

import { AuthProvider, useAuth } from './contexts/AuthContext';
import GetRoutes from './routes';

function App() {
  return (
    <AuthProvider>
      <ChakraProvider>
        <Router>
          <Navbar/>
          <GetRoutes/>
        </Router>
      </ChakraProvider>
    </AuthProvider>
  );
}

export default App
