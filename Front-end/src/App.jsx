import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Header from './components/header.jsx'
import './App.css'
import Index from './pages/index.jsx'
import PracticeTable from './pages/Practice.jsx'
import SignUp from './pages/Auth/signup.jsx'
import Login from './pages/Auth/login.jsx'
import LogOut from './pages/Auth/logout.jsx'
import { Routes, Route } from 'react-router-dom'
import ProtectedRoute from './pages/ProtectedRoute.jsx'
import Dashboard from './pages/dashboard/dashboard.jsx'
import EditUser from './pages/Auth/editUser.jsx'
// import { Login } from '@mui/icons-material'
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
       {/* <Header /> */}
    <Routes>

      <Route path="/" element={<Index />} />
      <Route path="/user/dashboard" element={<Dashboard  />}></Route>
      <Route path="/edit/user" element={<EditUser  />}></Route>
      <Route path="/Practice" element={<PracticeTable />}></Route>
      <Route path="/signup" element={<SignUp />} />
      <Route path="/login" element={< Login/>} />
      <Route path='/logout' element={<LogOut/>} />
      <Route path="*" element={<h1>Not Found</h1>} />
    </Routes>
      
      
    </>
  )
}

export default App
