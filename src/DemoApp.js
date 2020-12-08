import Amplify, { Auth } from 'aws-amplify';
import React, { useCallback, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import Authenticator from './Authenticator';

const config = {
  aws_project_region: 'us-east-1',
  aws_cognito_region: 'us-east-1',
  aws_user_pools_id: process.env.REACT_APP_COGNITO_USER_POOL_ID,
  aws_user_pools_web_client_id: process.env.REACT_APP_COGNITO_WEB_CLIENT_ID,
  oauth: {
    domain: process.env.REACT_APP_COGNITO_OAUTH_DOMAIN,
    scope: ['phone', 'email', 'openid', 'profile', 'aws.cognito.signin.user.admin'],
    redirectSignIn: process.env.REACT_APP_CLIENT_URL,
    redirectSignOut: process.env.REACT_APP_CLIENT_URL,
    responseType: 'code',
  },
  federationTarget: 'COGNITO_USER_POOLS',
};

Amplify.configure(config);

const socialProviders = ['Google'];

function App() {
  const [authState, setAuthState] = useState();

  const handleSignIn = useCallback(cognitoUser => {
    const idToken = cognitoUser?.signInUserSession?.idToken;

    if (!idToken) return;

    const user = {
      jwt: idToken.jwtToken,
      sub: idToken.payload.sub,
      name: idToken.payload.name,
      email: idToken.payload.email,
    };

    setAuthState({ authenticated: true, user });
  }, []);

  useEffect(() => {
    Auth.currentAuthenticatedUser()
      .then(user => handleSignIn(user))
      .catch(() => setAuthState({ authenticated: false }));
  }, [handleSignIn]);

  const handleSignOut = () => {
    Auth.signOut().then(() => setAuthState({ authenticated: false }));
  };

  if (!authState) return null;

  return (
    <div>
      {authState.authenticated ? (
        <div>
          Signed In:
          <pre>{JSON.stringify(authState, null, '  ')}</pre>
          <button onClick={handleSignOut}>Sign Out</button>
        </div>
      ) : (
        <Authenticator onSignIn={handleSignIn} socialProviders={socialProviders} />
      )}
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));
