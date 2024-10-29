import React from 'react'
import {NavLink} from 'react-router-dom'
import './Navbar.css'

export const Navbar = () => {
  return (
    <nav className='gradient-bg-services'>
      <span className='text-white'>Logo</span>
        <ul className='text-white flex gap-5 justify-center'>
            <li><NavLink to={'/'}>Home</NavLink></li>
            <li><NavLink to={'/about'}>About</NavLink></li>
            <li><NavLink to={'/contact'}>Contact</NavLink></li>
            <li><NavLink to={'/transactions'}>Transactions</NavLink></li>
        </ul>
    </nav>
  )
}
