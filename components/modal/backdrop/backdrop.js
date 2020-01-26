import React from 'react'
import css from './backdrop.scss'

const backdrop = props => (
  props.show ? <div className={css.backdrop} onClick={props.clicked}></div> : null
)

export default backdrop
