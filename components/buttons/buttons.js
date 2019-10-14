import React from 'react';
import PropTypes from 'prop-types';
import css from './buttons.scss';

export const BlueButton = ({ label, type = 'button', onClick }) => {
  BlueButton.propTypes = {
    label: PropTypes.string.isRequired,
    type: PropTypes.string,
    onClick: PropTypes.func,
  };
  return (
    <button className={css.blueButton} type={type} onClick={onClick}>
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
