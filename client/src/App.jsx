import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Navbar } from './components/Navbar'
import { BrowserRouter, Route, Router, Routes } from 'react-router-dom'
import { Home } from './components/pages/Home'
import { About } from './components/pages/About'
import { Contact } from './components/pages/Contact'
import { Transactions } from './components/pages/Transactions'
import Register from './components/pages/login/Register'
import Login from './components/pages/login/Login'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      {/* <Navbar/> */}
      <Routes>
      <Route path='/' element={<Home/>}></Route>
      <Route path='/about' element={<About/>}></Route>
      <Route path='/contact' element={<Contact/>}></Route>
      <Route path='/transactions' element={<Transactions/>}></Route>
      <Route path='/register' element={<Register/>}></Route>
      <Route path='/login' element={<Login/>}></Route>
     </Routes>
    </>
  )
}

export default App
