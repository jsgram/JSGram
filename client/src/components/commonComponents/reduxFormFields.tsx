import React from "react";

export const renderField = ({ input, label, type }: any) => (
  <div>
    <label>{label}</label>

    <input {...input} type={type} />
  </div>
);
