import React from 'react';
import './App.css';
import {
  ChakraProvider,
  Box,
  Text,
  Link,
  VStack,
  Code,
  Grid,
  theme,
  Stack,
} from '@chakra-ui/react';
import { ColorModeSwitcher } from './ColorModeSwitcher';
import { Logo } from './Logo';
import Sidebar from './component/sidebar/SideBar';
import { Navbar } from './component/navbar/Navbar';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';

function App() {
  const logged = true;
  return (
    <ChakraProvider theme={theme}>
      <Stack position="relative" justifyContent={'right'}>
      </Stack>
      <BrowserRouter>
        {logged ? (
          <>
            <Navbar />
            <div className="screens-container">
                <Routes>
                  <Route path="/login" element={<Login />} />
                  <Route path="/Dashboard" element={<>
                    <Sidebar />
              <div className="screens-section-container">
                  {/* <Route path="/customers" element={<Customers />} />
                  <Route path="/products" element={<Products />} />
                  <Route path="/transactions" element={<Transactions />} />
                  <Route path="/users" element={<Users />} /> */}
     
              </div>
                  
                  </>} />

             
              </Routes>
            </div>
          </>
        ) : (
          <Routes>
            {/* <Route path="/" element={<Login />} /> */}
          </Routes>
        )}
      </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;
