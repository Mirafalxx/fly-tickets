import React, { InputHTMLAttributes } from "react";
import "./style.scss";

interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  text: string;
  id: string | undefined;
}

const Checkbox: React.FC<CheckboxProps> = ({ text, id, ...rest }) => {
  return (
    <div className="checkbox__wrapper">
      <input type="checkbox" id={id} {...rest} />
      <label htmlFor={id}>{text}</label>
    </div>
  );
};

export default Checkbox;
