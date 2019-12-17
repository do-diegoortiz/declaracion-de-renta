import React from 'react';
import css from './footer.scss';

const Footer = () => {
  return (
    <footer className={css.finalMessages}>
      <span>
        Avisos Parroquiales:
      </span>
      <ul>
        <li>
          <strong>¿Qué le mejorarías, agregarías...?</strong> <a target='_blank' rel='noreferrer' href='https://forms.gle/qY56BbJXzuK23kPR7'>Encuesta corta</a> de 4 preguntas para seguir mejorando y tener algo mucho más útil en 2020 😉
        </li>
        <li>
          Si no conocen fundaciones a dónde <b>donar</b>, conozco algunas chéveres: <a target='_blank' rel='noreferrer' href='http://biblioseo.org/'>Biblioseo</a>, <a target='_blank' rel='noreferrer' href='https://www.techo.org/colombia/'>Techo</a> y <a target='_blank' rel='noreferrer' href='http://angelesdemedellin.blogspot.com/'>AngelesDeMedellin</a>. Desde enero estará constituida <a target='_blank' rel='noreferrer' href='https://medium.com/codeyourfutureco/introducing-code-your-future-colombia-5f7d3d442eda'> CodeYourFuture Colombia</a> 💪
        </li>
        <li> En caso de lanzar nuevas funcionalidades ¿Quieres ser notificado?
          <form action="https://mailthis.to/diegoortizpaez@gmail.com" 
            method="POST"> 
            <label>Nombre:
              <input type="text" name="name" placeholder="ej. Pedro Perez" className={css.nameInput} />
            </label>
            <label>Correo: 
              <input type="email" name="_replyto" placeholder="ej. pedro@gmail.com" className={css.emailInput} />
            </label>
            <input type="submit" value="Enviar" className={css.emailButton}/> 
          </form>
        </li>
      </ul>
    </footer>
  )
}

export default Footer;
