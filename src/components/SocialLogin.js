import React from 'react';
import { FormGroup } from 'react-bootstrap';
import GoogleButton from './../icons/GoogleButton';

const SocialLogin = ({ providers = [], onGoogleSignIn }) => {
  if (!providers || providers.length === 0) return null;

  return (
    <div>
      <FormGroup className="text-center">or</FormGroup>
      {providers.includes('Google') && <GoogleButton onClick={onGoogleSignIn} />}
    </div>
  );
};

export default SocialLogin;
