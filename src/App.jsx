import { ChakraProvider, Box } from '@chakra-ui/react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Navbar from './components/Navbar';
import Feed from './routes/Feed';
import Login from './routes/Login';
import SignUp from './routes/SignUp';

function App() {
  return (
    <ChakraProvider>
      <Router>
        <Navbar/>
        <Routes>
          <Route exact path='/' element={<Feed />}/>
          <Route path='/feed' element={<Feed />}/>
          <Route exact path='/login' element={<Login />}/>
          <Route exact path='/signup' element={<SignUp />}/>
        </Routes>
      </Router>
    </ChakraProvider>
  );
}

export default App
