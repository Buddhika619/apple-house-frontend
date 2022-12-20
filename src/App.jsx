import { CssBaseline } from '@mui/material'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/NavBar'
import { Container } from '@mui/system'
import Login from './screens/Login'
import Register from './screens/Register'
import Home from './screens/Home'
import PrivateRoute from './components/PrivateRoute'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import AdminScreen from './screens/AdminScreen'
import UserProfileScreen from './screens/UserProfileScreen'
import PostScreen from './screens/PostScreen'

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Container>
          {/* normalize css */}
          <CssBaseline />
          <Routes>
            <Route path='/' element={<Login />} />
            <Route path='/register' element={<Register />} />

            {/* Setting up a private routes , which can only be accessed by authenticated users*/}
            <Route path='/home' element={<PrivateRoute />}>
              <Route path='/home' element={<Home />} />
            </Route>

            <Route path='/home/search/:keyword' element={<PrivateRoute />}>
              <Route path='/home/search/:keyword' element={<Home />} />
            </Route>

            <Route path='/admin' element={<PrivateRoute />}>
              <Route path='/admin' element={<AdminScreen />} />
            </Route>

            <Route path='/post' element={<PrivateRoute />}>
              <Route path='/post/:id' element={<PostScreen />} />
            </Route>
            <Route path='/profile' element={<PrivateRoute />}>
              <Route path='/profile' element={<UserProfileScreen />} />
            </Route>
          </Routes>
        </Container>
        <ToastContainer />
      </BrowserRouter>
    </>
  )
}

export default App
