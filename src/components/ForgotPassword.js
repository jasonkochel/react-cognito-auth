import clsx from 'clsx';
import React from 'react';
import { useForm } from 'react-hook-form';

const ForgotPassword = ({ onForgotPassword, onChangeMode }) => {
  const { handleSubmit, register, errors } = useForm({
    defaultValues: { username: '' },
  });

  const handleForgotPassword = formData => onForgotPassword(formData);

  return (
    <div className="card">
      <div className="card-body">
        <h5 className="mb-3">Reset Password</h5>
        <p className="mb-4 pb-3">A security code will be sent to your email address.</p>
        <form>
          <div className="mb-4">
            <label htmlFor="username">Email</label>
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Email address"
              className={clsx('form-control', !!errors?.username && 'border-red-600')}
              ref={register({
                required: 'Enter your email address',
              })}
            />
            {!!errors?.username && (
              <div className="form-feedback-invalid">{errors?.username?.message}</div>
            )}
          </div>
          <div className="mb-4">
            <button
              type="button"
              className="btn btn-success w-full"
              onClick={handleSubmit(handleForgotPassword)}
            >
              Get Security Code
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

export default ForgotPassword;
