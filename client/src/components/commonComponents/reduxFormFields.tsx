import React from "react";
import { Input } from "reactstrap";

export const renderField = ({ input, type, className, placeholder }: any) => (
  <div>
    <Input
      className={className}
      placeholder={placeholder}
      {...input}
      type={type}
    />
  </div>
);
