import React from "react";
// import '../style/Login.css';

export default function TextInputWithValidation(props) {
  const {
    formObject,
    objectKey,
    label,
    placeholder,
    formValidationInfo,
    onChange,
    type,
    className,
    invalidClass,
    validClass,
    additionalClass
  } = props;
  let inputType = type || "text";
  let design = className || "";
  let key = objectKey;
  let valid = validClass || "is-valid";
  let inValid = invalidClass || "is-invalid";
  let addClass = additionalClass || "";

  return (
    <div className={"form-group " + addClass}>
      <label htmlFor={`inputCtrl_${key}`} className="inputLabel">
        {label}
      </label>
      <input
        type={inputType}
        autoComplete="off"
        className={
          !formValidationInfo[key]?.valid
            ? "form-control " + inValid + " " + design
            : "form-control " + valid + " " + +design
        }
        id={`inputCtrl_${key}`}
        name={key}
        placeholder={placeholder}
        value={formObject[key]}
        onChange={onChange}
      ></input>
      <div className="invalid-feedback">{formValidationInfo[key]?.msg}</div>
    </div>
  );
}
