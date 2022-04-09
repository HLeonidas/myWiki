import React from "react";

export default function SelectInputValiation(props) {
  const {
    formObject,
    objectKey,
    label,
    formValidationInfo,
    onChange,
    options,
    invalidClass,
    validClass,
    additionalClass
  } = props;
  let key = objectKey;
  let valid = validClass || "is-valid";
  let inValid = invalidClass || "is-invalid";
  let addClass = additionalClass || "mb0";

  return (
    <div className={"form-group " + addClass}>
      <label htmlFor={`inputCtrl_${key}`}>{label}</label>
      <select
        value={formObject[key]}
        id={`inputCtrl_${key}`}
        name={key}
        className={
          !formValidationInfo[key]?.valid
            ? "form-control " + inValid
            : "form-control " + valid
        }
        onChange={onChange}
      >
        {options.map((o) => {
          return (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          );
        })}
      </select>
      <div className="valid-feedback">{formValidationInfo[key]?.msg}</div>
      <div className="invalid-feedback">{formValidationInfo[key]?.msg}</div>
    </div>
  );
}
