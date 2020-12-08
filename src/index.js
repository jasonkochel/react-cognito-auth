import { Auth, Cache, Hub } from 'aws-amplify';
import React, { useEffect, useState } from 'react';
import { Alert, Col, Container, Row } from 'react-bootstrap';
import ForgotPassword from './components/ForgotPassword';
import ResetPassword from './components/ResetPassword';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import Verification from './components/Verification';

const AuthenticatorCol = ({ children }) => (
  <Col
    xl={{ span: 6, offset: 3 }}
    lg={{ span: 6, offset: 3 }}
    md={{ span: 8, offset: 2 }}
    sm={{ span: 10, offset: 1 }}
    xs={12}
  >
    {children}
  </Col>
);

const Authenticator = ({ authenticated, onSignIn, socialProviders }) => {
  const [errorMessage, setErrorMessage] = useState();
  const [mode, setMode] = useState('signin');

  useEffect(() => {
    setErrorMessage(null);
  }, [mode]);

  useEffect(() => {
    Hub.listen('auth', ({ payload: { event, data } }) => {
      if (event === 'cognitoHostedUI') {
        onSignIn(data);
      }
    });
  }, [onSignIn]);

  const redirectToVerification = username => {
    const in10Min = Date.now() + 5 * 60 * 1000;
    Cache.setItem('pendingVerificationUser', { username }, { expires: in10Min });
    setMode('verification');
  };

  const handleSignIn = ({ username, password }) => {
    Auth.signIn(username, password)
      .then(user => {
        onSignIn(user);
      })
      .catch(error => {
        if (error.code === 'UserNotConfirmedException') {
          redirectToVerification(username);
        } else {
          setErrorMessage(error.message);
        }
      });
  };

  const handleGoogleSignin = () => Auth.federatedSignIn({ provider: 'Google' });

  const handleSignUp = ({ email, name, password }) => {
    Auth.signUp({
      username: email,
      password,
      attributes: { email, name },
    })
      .then(() => {
        redirectToVerification(email);
      })
      .catch(error => setErrorMessage(error.message));
  };

  const handleVerify = ({ username, code }) => {
    Auth.confirmSignUp(username, code, {})
      .then(() => {
        setMode('signin');
      })
      .catch(error => setErrorMessage(error.message));
  };

  const handleForgotPassword = ({ username }) => {
    Auth.forgotPassword(username)
      .then(({ CodeDeliveryDetails }) => {
        const in10Min = Date.now() + 5 * 60 * 1000;
        Cache.setItem(
          'CodeDeliveryDetails',
          { ...CodeDeliveryDetails, username },
          { expires: in10Min }
        );
        setMode('reset-password');
      })
      .catch(error => setErrorMessage(error.message));
  };

  const handleResetPassword = ({ username, code, newPassword }) => {
    Auth.forgotPasswordSubmit(username, code, newPassword)
      .then(() => {
        Cache.removeItem('CodeDeliveryDetails');
        setMode('signin');
      })
      .catch(error => setErrorMessage(error.message));
  };

  return (
    <Container>
      {errorMessage && (
        <Row style={{ marginTop: '3em' }}>
          <AuthenticatorCol>
            <Alert variant="danger">{errorMessage}</Alert>
          </AuthenticatorCol>
        </Row>
      )}

      <Row style={{ marginTop: '3em' }}>
        <AuthenticatorCol>
          {mode == 'signup' ? (
            <SignUp onSignUp={handleSignUp} onChangeMode={setMode} />
          ) : mode == 'verification' ? (
            <Verification onVerify={handleVerify} onChangeMode={setMode} />
          ) : mode == 'forgot-password' ? (
            <ForgotPassword onForgotPassword={handleForgotPassword} onChangeMode={setMode} />
          ) : mode == 'reset-password' ? (
            <ResetPassword onResetPassword={handleResetPassword} onChangeMode={setMode} />
          ) : (
            <SignIn
              onSignIn={handleSignIn}
              socialProviders={socialProviders}
              onGoogleSignIn={handleGoogleSignin}
              onChangeMode={setMode}
            />
          )}
        </AuthenticatorCol>
      </Row>
    </Container>
  );
};

export default Authenticator;
