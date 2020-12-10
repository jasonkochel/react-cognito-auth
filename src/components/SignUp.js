import clsx from 'clsx';
import React from 'react';
import { useForm } from 'react-hook-form';

const SignUp = ({ onSignUp, onChangeMode }) => {
  const { handleSubmit, register, errors } = useForm({
    defaultValues: { email: '', name: '', password: '' },
  });

  const handleSignUp = formData => onSignUp(formData);

  return (
    <div className="card">
      <div className="card-body">
        <h5 className="mb-3">Sign Up</h5>
        <form>
          <div className="mb-4">
            <label htmlFor="email">Email Address</label>
            <input
              type="text"
              id="email"
              name="email"
              className={clsx('form-control', !!errors?.email && 'border-red-600')}
              placeholder="This will be your username"
              ref={register({
                required: 'Enter your email address',
              })}
            />
            {!!errors?.email && (
              <div className="form-feedback-invalid">{errors?.email?.message}</div>
            )}
          </div>
          <div className="mb-4">
            <label htmlForm="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              className={clsx('form-control', !!errors?.name && 'border-red-600')}
              placeholder="Enter your full name"
              ref={register({
                required: 'Required',
              })}
            />
            {!!errors?.name && <div className="form-feedback-invalid">{errors?.name?.message}</div>}
          </div>
          <div className="mb-4">
            <label htmlForm="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              className={clsx('form-control', !!errors?.password && 'border-red-600')}
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
              onClick={handleSubmit(handleSignUp)}
            >
              Sign Up
            </button>
          </div>
        </form>
        <hr className="m-1" />
        <div className="row">
          <div className="col w-1/2">
            <a onClick={() => onChangeMode('signin')}>Back to Sign In</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
