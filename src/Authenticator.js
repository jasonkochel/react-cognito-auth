import { Auth, Cache, Hub } from 'aws-amplify';
import React, { useEffect, useState } from 'react';
import ForgotPassword from './components/ForgotPassword';
import ResetPassword from './components/ResetPassword';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import Verification from './components/Verification';
import './styles.css';

const defaultSignupFields = [
  {
    name: 'name',
    label: 'Name',
    placeholder: 'Enter your full name',
    required: true,
  },
];

const serializePhone = p =>
  !!p
    ? Array.from(p).reduce(
        (acc, c) =>
          ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'].includes(c) ? acc + c : acc,
        '+1'
      )
    : '';

const Authenticator = ({ onSignIn, signupFields = defaultSignupFields, socialProviders }) => {
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

  const handleSignUp = formData => {
    let attributes = {};

    if (signupFields) {
      signupFields.forEach(f => {
        if (f.name === 'phone_number') {
          attributes[f.name] = serializePhone(formData[f.name]);
        } else {
          attributes[f.name] = formData[f.name];
        }
      });
    }

    Auth.signUp({
      username: formData.email,
      password: formData.password,
      attributes,
    })
      .then(() => {
        redirectToVerification(formData.email);
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
    <div className="container mx-auto px-4 xl:max-w-screen-lg">
      {errorMessage && (
        <div className="row mt-12">
          <div className="container mx-auto lg:w-1/2 md:w-2/3 sm:w-full">
            <div className="alert-danger">{errorMessage}</div>
          </div>
        </div>
      )}

      <div className="row mt-12">
        <div className="container mx-auto lg:w-1/2 md:w-2/3 sm:w-full">
          {mode == 'signup' ? (
            <SignUp onSignUp={handleSignUp} onChangeMode={setMode} fields={signupFields} />
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
        </div>
      </div>
    </div>
  );
};

export default Authenticator;
