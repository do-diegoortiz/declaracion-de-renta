import React from 'react'
import css from './footer.scss'

const Footer = () => {
  return (
    <footer className={css.container}>
      <p className={css.description}>
        Si te pareció de alguna forma útil, compártelo, y si te pareció espectacular compranos un café.
      </p>
      <p className={css.description}>
        Este es un proyecto “open source”, si quieres usarlo, mejorarlo o aportar de alguna forma, aquí te dejamos el link del repositorio en GitHub.
        <br />
        <a href='https://github.com/do-diegoortiz/declaracion-de-renta' target='_blank'>
          https://github.com/do-diegoortiz/declaracion-de-renta
        </a>
      </p>
      
    </footer>
  )
}

export default Footer
