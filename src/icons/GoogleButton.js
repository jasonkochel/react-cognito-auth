import React from 'react';
import { Button } from 'react-bootstrap';
import './../fonts.css';
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
      <Button style={buttonStyle}>Sign In with Google</Button>
    </div>
  );
};

export default GoogleButton;
