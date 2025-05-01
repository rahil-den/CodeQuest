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
import SolveProblemPage from './pages/solveproblem.jsx'
import AdminDashboard from './pages/admin/admindashboard.jsx'
import Alluser from './components/adminComponents/alluser.jsx'
import Allproblem from './components/adminComponents/allproblem.jsx'
import Allsubmission from './components/adminComponents/allsubmission.jsx'
// import Addproblem from './components/adminComponents/addproblem.jsx'



import {ToastContainer} from 'react-toastify' 
import 'react-toastify/dist/ReactToastify.css'
import Addproblems from './components/adminComponents/addproblem.jsx'
import Editproblem from './components/adminComponents/editproblem.jsx'

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

      

      <Route path="/problem/:id" element={<SolveProblemPage />} />
      
      <Route path="/admin/dashboard" element={<AdminDashboard />} />
      <Route path ="/admin/dashboard/allusers" element={<Alluser />} />
      <Route path="/admin/dashboard/allproblems" element={<Allproblem/>} />
      <Route path='/admin/dashboard/allsubmission' element={<Allsubmission/>}/>
      <Route path="/admin/dashboard/addproblem" element={<Addproblems/>} />
      <Route path='/admin/dashboard/editproblem/:id' element={<Editproblem/>} />
      
      <Route path="*" element={<h1>Not Found</h1>} />
    </Routes>
      <ToastContainer position="top-right" autoClose={3000} />
    </>
  )
}

export default App
