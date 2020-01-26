import React from 'react';
import PropTypes from 'prop-types';
import css from './buttons.scss';

export const BlueButton = ({ label, type = 'button', onClick, width, minHeight, fontSize }) => {
  BlueButton.propTypes = {
    label: PropTypes.string.isRequired,
    type: PropTypes.string,
    onClick: PropTypes.func,
    width: PropTypes.string,
    minHeight: PropTypes.string,
    fontSize: PropTypes.string
  };
  return (
    <button className={`${css.defaultButton} ${css.blueButton}`} type={type} onClick={onClick} style={{width: `${width}`, minHeight:`${minHeight}`, fontSize: `${fontSize}`}}>
      {label}
    </button>
  );
};

export const GreenButton = ({ label, type = 'button', onClick, width, minHeight, fontSize }) => {
  GreenButton.propTypes = {
    label: PropTypes.string.isRequired,
    type: PropTypes.string,
    onClick: PropTypes.func,
    width: PropTypes.string,
    minHeight: PropTypes.string,
    fontSize: PropTypes.string
  };
  return (
    <button className={`${css.defaultButton} ${css.greenButton}`} type={type} onClick={onClick} style={{width: `${width}`, minHeight:`${minHeight}`, fontSize: `${fontSize}`}}>
      {label}
    </button>
  );
};

export const BlueLink = ({ label, type = 'button', onClick, fontSize }) => {
  BlueButton.propTypes = {
    label: PropTypes.string.isRequired,
    type: PropTypes.string,
    onClick: PropTypes.func,
    fontSize: PropTypes.string
  };
  return (
    <button className={css.blueLink} type={type} onClick={onClick} style={{fontSize: `${fontSize}`}}>
      {label}
    </button>
  );
};

export const RedButton = ({ label, type = 'button', onClick }) => {
  RedButton.propTypes = {
    label: PropTypes.string.isRequired,
    type: PropTypes.string,
    onClick: PropTypes.func,
  };
  return (
    <button className={`${css.defaultButton} ${css.redButton}`} type={type} onClick={onClick}>
      {label}
    </button>
  );
};

export const GrayButton = ({ label, type = 'button', onClick }) => {
  GrayButton.propTypes = {
    label: PropTypes.string.isRequired,
    type: PropTypes.string,
    onClick: PropTypes.func,
  };
  return (
    <button className={`${css.defaultButton} ${css.grayButton}`} type={type} onClick={onClick}>
      {label}
    </button>
  );
};

export const DisabledButton = ({ type = 'button', label }) => {
  DisabledButton.propTypes = {
    label: PropTypes.string.isRequired,
    type: PropTypes.string,
  };
  return (
    <button className={css.disabledButton} type={type} disabled>
      {label}
    </button>
  );
};
