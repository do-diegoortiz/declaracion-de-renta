import React from 'react'
import WhiteLogo from '../../../public/images/whitelogo.svg';
import css from './mobileHeader.scss'

const MobileHeader = () => {
  return (
    <>
      <div className={css.bgFirstLayer}>
        <img className={css.logo} src={WhiteLogo} alt='Logo' />
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 30 500 80">
          <path fill="#FFF" fillOpacity="1" d="M0.00,49.98 C148.42,98.97 346.49,9.17 521.44,40.75 L500.00,150.00 L0.00,150.00 Z"></path>
        </svg>
      </div>
    </>
  )
}

export default MobileHeader
