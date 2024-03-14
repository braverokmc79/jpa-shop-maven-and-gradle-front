import { Box } from '@mui/material'
import React from 'react'
import { Route, Routes } from 'react-router-dom'
import App from './App'
import Copyright from './components/Copyright';
import Login from './pages/Login';
import SinUp from './pages/SinUp';
import SocialLogin from './pages/SocialLogin';


const AppRouter = () => {
  return (
    <div>
        
        <Routes>
            <Route path='/' element={<App  />} />
            <Route path='/login' element={<Login  />} />
            <Route path='/signup' element={<SinUp  />} />
            <Route path='/sociallogin' element={<SocialLogin  />} />
        </Routes>
        

        <Box mt={5}>
            <Copyright />
        </Box>
    </div>
  )
}

export default AppRouter