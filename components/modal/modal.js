import React, {Component} from 'react'

import css from './modal.scss'
import Backdrop from './backdrop/backdrop'

class Modal extends Component {
  render () {
    return(
      <>
        <Backdrop show={this.props.show} clicked={this.props.modalClosed}/>
        <div
          className={css.modal}
          style={{
            transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
            opacity: this.props.show ? '1' : '0',
            maxWidth: this.props.maxWidth ? this.props.maxWidth + '%' : '',
            left: this.props.maxWidth ? `calc(55% - ${this.props.maxWidth/2}%)` : ''
          }}>
          {this.props.children}
        </div>
      </>
    )
  }
}

export default Modal
