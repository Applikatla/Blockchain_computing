import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Navbar } from './components/Navbar'
import { BrowserRouter, Route, Router, Routes } from 'react-router-dom'
import { Home } from './components/pages/Home'
import { About } from './components/pages/About'
import { Contact } from './components/pages/Contact'
import { Transactions } from './components/pages/Transactions'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <div className='gradient-bg-welcome'>
     <Navbar/>
     <Routes>
      <Route path='/' element={<Home/>}></Route>
      <Route path='/about' element={<About/>}></Route>
      <Route path='/contact' element={<Contact/>}></Route>
      <Route path='/transactions' element={<Transactions/>}></Route>
     </Routes>
    </div>
    </>
  )
}

export default App
