import React from 'react'
import WhiteLogo from '../../public/images/whitelogo.svg';
import css from './navbar.scss'

const Navbar = () => {
  return (
    <>
      <div className={css.bgFirstLayer}>
        <img className={css.logo} src={WhiteLogo} alt='Logo' />
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 70">
          <path fill="#FFF" fillOpacity="1" d="M0.00,49.98 C162.52,104.90 266.37,-13.53 500.00,49.98 L500.00,150.00 L0.00,150.00 Z"></path>
        </svg>
      </div>
    </>
  )
}

export default Navbar
