import React, { useEffect, useState } from "react";
import SettingInputsField from "./SettingInputsField";

interface Props {
  object: SettingInputsField;
}

export default function InputsField(props: Props): JSX.Element {
  const [values, setValues] = useState(props.object.value);

  function filterInputs(): JSX.Element {
    let result: JSX.Element;
    switch (props.object.type) {
      case 'text':
        result = inputText();
        break;
      case 'number':
        result = inputNumber();
        break;
      default:
        result = inputGeneric();
        break;
    }
    return result;
  }

  function inputText(): JSX.Element {
    return (
      <input
        id={props.object.idInput}
        type="text"
        className={`form-control ${props.object.classInput || ''}`}
        value={values}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          changeValue(event.target.value);
        }}
        disabled={false}
      />
    );
  }

  function changeValue(value: string) {
    setValues(value);
    props.object.value = value;
  }

  function inputNumber(): JSX.Element {
    return (
      <input
        id={props.object.idInput}
        type="number"
        className={`form-control ${props.object.classInput || ''}`}
        min={props.object.min}
        max={props.object.max}
        step={props.object.step}
      />
    );
  }


  function inputGeneric(): JSX.Element {
    return (
      <input
        id={props.object.idInput}
        type={props.object.type}
        className={`${props.object.classInput || ''}`}
        // value={values}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          changeValue(event.target.value);
        }}
        name={props.object.name}
        disabled={false}
        checked={props.object.checked}
      />
    );
  }

  return (
    <div className={props.object.classContainer}>
      <label htmlFor={props.object.idInput} className={props.object.classLabel}>{props.object.label}</label>
      {filterInputs()}
    </div>
  );
}
