import React from 'react';
import GoogleIcon from './GoogleIcon';

const GoogleButton = ({ onClick }) => {
  const buttonStyle = {
    marginTop: '3px',
    marginLeft: '-5px',
    height: '41px',
    borderRadius: '0',
    width: 'calc(100% - 43px)',
    fontFamily: 'Roboto',
  };

  return (
    <div onClick={onClick}>
      <div style={{ float: 'left' }}>
        <GoogleIcon />
      </div>
      <button type="button" className="btn btn-primary" style={buttonStyle}>
        Sign In with Google
      </button>
    </div>
  );
};

export default GoogleButton;
