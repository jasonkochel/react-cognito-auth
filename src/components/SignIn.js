import clsx from 'clsx';
import React from 'react';
import { useForm } from 'react-hook-form';
import SocialLogin from './SocialLogin';

const SignIn = ({
  socialProviders,
  onSignIn,
  onGoogleSignIn,
  onFacebookSignIn,
  onAmazonSignIn,
  onChangeMode,
}) => {
  const { handleSubmit, register, errors } = useForm({
    defaultValues: { username: '', password: '' },
  });

  const handleSignIn = formData => onSignIn(formData);

  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">Sign In</h5>
        <form>
          <div className="mb-4">
            <label htmlFor="username">Email</label>
            <input
              className={clsx('form-control', !!errors?.username && 'border-red-600')}
              name="username"
              type="text"
              ref={register({
                required: 'Enter your email address',
              })}
            />
            {!!errors?.username && (
              <div className="form-feedback-invalid">{errors?.username?.message}</div>
            )}
          </div>
          <div className="mb-4">
            <label htmlFor="password">Password</label>
            <input
              className={clsx('form-control', !!errors?.password && 'border-red-600')}
              name="password"
              type="password"
              ref={register({
                required: 'Password must be at least 8 characters',
                minLength: {
                  value: 8,
                  message: 'Password must be at least 8 characters',
                },
              })}
            />
            {!!errors?.password && (
              <div className="form-feedback-invalid">{errors?.password?.message}</div>
            )}
          </div>
          <div className="mb-4">
            <button
              type="button"
              className="btn btn-success w-full"
              onClick={handleSubmit(handleSignIn)}
            >
              Sign In
            </button>
          </div>
          <SocialLogin
            providers={socialProviders}
            onGoogleSignIn={onGoogleSignIn}
            onFacebookSignIn={onFacebookSignIn}
            onAmazonSignIn={onAmazonSignIn}
          />
        </form>
        <hr className="m-1" />
        <div className="row">
          <div className="col w-1/2">
            <a onClick={() => onChangeMode('forgot-password')}>Forgot Password?</a>
          </div>
          <div className="col w-1/2 text-right">
            <a onClick={() => onChangeMode('signup')}>Sign Up</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
