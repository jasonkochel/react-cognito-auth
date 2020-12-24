import clsx from 'clsx';
import React from 'react';

const FormField = ({ name, type, label, placeholder, validation, register, errors }) => (
  <div className="mb-4">
    <label htmlFor={name}>{label}</label>
    <input
      type={type || 'text'}
      id={name}
      name={name}
      className={clsx('form-control', !!errors?.[name] && 'border-red-600')}
      placeholder={placeholder}
      ref={validation ? register(validation) : register}
    />
    {!!errors?.[name] && <div className="form-feedback-invalid">{errors?.[name]?.message}</div>}
  </div>
);

export default FormField;
