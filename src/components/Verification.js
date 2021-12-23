import { Cache } from 'aws-amplify';
import clsx from 'clsx';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';

const Verification = ({ onVerify }) => {
  const { handleSubmit, register, errors, setValue } = useForm({
    defaultValues: { username: '', code: '' },
  });

  useEffect(() => {
    const user = Cache.getItem('pendingVerificationUser');
    if (user) {
      setValue('username', user.username);
    }
  }, [setValue]);

  const handleVerify = formData => onVerify(formData);

  return (
    <div className="card">
      <div className="card-body">
        <h5 className="mb-3">Verify Your Account</h5>
        <form>
          <div className="mb-4">
            <label htmlFor="username">Email</label>
            <input
              type="text"
              id="username"
              name="username"
              className="form-control"
              ref={register}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="code">Enter the code we emailed to you</label>
            <input
              type="number"
              id="code"
              name="code"
              className={clsx('form-control', !!errors?.code && 'border-red-600')}
              ref={register({
                required: 'Required',
                pattern: { value: /^\d{6}$/, message: 'Enter 6 digits with no other characters' },
              })}
            />
            {!!errors?.code && <div className="form-feedback-invalid">{errors?.code?.message}</div>}
          </div>
          <div className="mb-4">
            <button
              type="button"
              className="btn btn-success w-full"
              onClick={handleSubmit(handleVerify)}
            >
              Confirm
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Verification;
