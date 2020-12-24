import React from 'react';
import { useForm } from 'react-hook-form';
import FormField from './FormField';

const SignUp = ({ onSignUp, onChangeMode, fields }) => {
  const { handleSubmit, register, errors } = useForm({
    defaultValues: { email: '', name: '', password: '' },
  });

  const handleSignUp = formData => onSignUp(formData);

  return (
    <div className="card">
      <div className="card-body">
        <h5 className="mb-3">Sign Up</h5>
        <form>
          <FormField
            name="email"
            label="Email Address"
            placeholder="This will be your username"
            validation={{
              required: 'Enter your email address',
            }}
            register={register}
            errors={errors}
          />

          {fields.map((f, i) => {
            const validation = {
              required: f.required ? 'Required' : false,
            };

            return (
              <FormField
                key={i}
                name={f.name}
                label={f.label}
                placeholder={f.placeholder}
                validation={validation}
                register={register}
                errors={errors}
              />
            );
          })}

          <FormField
            name="password"
            type="password"
            label="Password"
            placeholder="Create a password at least 8 characters long"
            validation={{
              required: 'Password must be at least 8 characters',
              minLength: {
                value: 8,
                message: 'Password must be at least 8 characters',
              },
            }}
            register={register}
            errors={errors}
          />

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
