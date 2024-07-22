import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Home } from './Components/Home/Home'
import { Route, Routes } from 'react-router-dom'
import { Add } from './Components/Add/Add'
import {Navbar} from "./Components/Navbar/Navbar"
import { Login } from './Components/Login/Login'
import { Signup } from './Components/Signup/Signup'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Navbar/>
    <Routes>
    <Route path='/' element={<Home/>}/>
   <Route path='/add' element={<Add/>}/>
   <Route path='/login' element={<Login/>}/>
   <Route path='/signup' element={<Signup/>}/>
    </Routes>
    
    </>
  )
}

export default App
