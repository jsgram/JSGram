import React from "react";
import { Input } from "reactstrap";

export const renderField = ({
  input,
  type,
  className,
  placeholder,
  meta
}: any) => (
    <div>
      <Input
        className={className}
        placeholder={placeholder}
        {...input}
        type={type}
      />
      {meta.error && meta.touched && (
        <span className="text-danger">{meta.error}</span>
      )}
    </div>
  );
