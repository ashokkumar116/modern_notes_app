import { useContext, useState } from 'react';
import './App.css';
import {BrowserRouter , Routes , Route, Navigate} from 'react-router-dom';
import Home from './Components/Home';
import Login from './Components/Login';
import Register from './Components/Register';
import Profile from './Components/Profile';
import { AuthContext } from './utils/Authcontext';
import ProtectedRoutes from './utils/ProtectedRoutes';
import Navbar from './Components/Navbar';
import ForgotPass from './Components/ForgotPass';
import Otp from './Components/Otp';
import PassReset from './Components/PassReset';
import { OtpContextProvider } from './utils/OtpContext';

function App() {
  const {user,loading} = useContext(AuthContext);

  if(loading){
    return <div>Loading...</div>
  }

  return (
    <>
    <OtpContextProvider>
      
    <BrowserRouter>
      <Navbar/>
        <Routes>
          <Route path='/' element={user?<Navigate to={'/home'}/>:<Navigate to={'/login'}/>} />
          <Route path='/login' element={user?<Navigate to={'/home'}/>:<Login/>} />
          <Route path='/register' element={user?<Navigate to={'/home'}/>:<Register/>}  />
          <Route path='/home' element={<ProtectedRoutes><Home/></ProtectedRoutes>} />
          <Route path='/profile' element={<ProtectedRoutes><Profile/></ProtectedRoutes>} />
          <Route path='/forgotpass' element={user?<Navigate to={'/home'}/>:<ForgotPass/>} />
          <Route path='/otp' element={user?<Navigate to={'/home'}/>:<Otp/>}/>
          <Route path='/passreset' element={user?<Navigate to={'/home'}/>:<passReset/>}/>
        </Routes>
      </BrowserRouter>
    </OtpContextProvider>
    </>
  )
}

export default App
