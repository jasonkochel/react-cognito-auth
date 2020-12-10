import clsx from 'clsx';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

const ResetPassword = ({ onResetPassword, onChangeMode }) => {
  const [details, setDetails] = useState();

  const { handleSubmit, register, errors } = useForm({
    defaultValues: { username: '', password: '' },
  });

  useEffect(() => {
    const details = Cache.getItem('CodeDeliveryDetails');
    if (details) {
      setDetails(details);
    } else {
      onChangeMode('forgot-password');
    }
  }, []);

  const handleResetPassword = formData =>
    onResetPassword({ ...formData, username: details.username });

  if (details) {
    return (
      <div className="card">
        <div className="card-body">
          <h5 className="mb-3">Reset Password</h5>
          <p className="mb-4 pb-3">
            We have sent a verification code to <strong>{details.Destination}</strong>
          </p>
          <form>
            <div className="mb-4">
              <input
                type="text"
                id="code"
                name="code"
                className={clsx('form-control', !!errors?.code && 'border-red-600')}
                placeholder="Enter the code we emailed to you"
                ref={register({
                  required: 'Required',
                })}
              />
              {!!errors?.code && (
                <div className="form-feedback-invalid">{errors?.code?.message}</div>
              )}
            </div>
            <div className="mb-4">
              <label htmlForm="newPassword">New Password</label>
              <input
                type="password"
                id="newPassword"
                name="newPassword"
                className={clsx('form-control', !!errors?.newPassword && 'border-red-600')}
                ref={register({
                  required: 'Password must be at least 8 characters',
                  minLength: {
                    value: 8,
                    message: 'Password must be at least 8 characters',
                  },
                })}
              />
              {!!errors?.newPassword && (
                <div className="form-feedback-invalid">{errors?.newPassword?.message}</div>
              )}
            </div>
            <div className="mb-4">
              <button
                type="button"
                className="btn btn-success w-full"
                onClick={handleSubmit(handleResetPassword)}
              >
                Set Password
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
  }
  return null;
};

export default ResetPassword;
