import React from 'react';
import GoogleButton from './../icons/GoogleButton';

const SocialLogin = ({ providers = [], onGoogleSignIn }) => {
  if (!providers || providers.length === 0) return null;

  return (
    <div>
      <div className="text-center mb-4">or</div>
      {providers.includes('Google') && <GoogleButton onClick={onGoogleSignIn} />}
    </div>
  );
};

export default SocialLogin;
