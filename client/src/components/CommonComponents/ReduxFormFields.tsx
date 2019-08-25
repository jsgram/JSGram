import React from 'react';
import { Input } from 'reactstrap';

export const renderField = ({
  input,
  type,
  className,
  placeholder,
  meta,
}: any): JSX.Element => (
    <div>
      <Input
        className={className}
        placeholder={placeholder}
        {...input}
        type={type}
      />
      {meta.error && meta.touched && (
        <span className='text-danger'>{meta.error}</span>
      )}
    </div>
  );

export const passwordFieldProfile = ({
    input,
    type,
    className,
    placeholder,
    meta,
}: any): JSX.Element => (
    <div className={className + ' p-0'}>
        <Input
            className='form-control-lg'
            placeholder={placeholder}
            {...input}
            type={type}
        />
        {meta.error && meta.touched && (
            <span className='text-danger'>{meta.error}</span>
        )}
    </div>
);
