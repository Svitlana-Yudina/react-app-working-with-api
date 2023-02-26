/* eslint-disable no-shadow */
import React, { useCallback, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import './TextInput.scss';

type InputCheck = {
  pattern: RegExp,
  minLength: number,
  maxLength: number,
};

type Props = {
  labelId: string,
  check: InputCheck,
  helperText: string,
  placeholder: string,
  name: string,
  submitErr: React.Dispatch<React.SetStateAction<string>>,
};

export const TextInput: React.FC<Props> = ({
  labelId,
  check,
  helperText,
  placeholder,
  name,
  submitErr,
}) => {
  const [isOnChange, setIsOnChange] = useState(false);
  const { register, formState: { errors } } = useFormContext();

  const handleTextInputChange = useCallback(() => {
    const label = document.getElementById(labelId);

    setIsOnChange(true);
    submitErr('');
    label?.classList.remove('textInput__textInputLabel--error');
    label?.classList.add('textInput__textInputLabel--filled');
  }, []);

  const handleTextInputBlur = useCallback(() => {
    const label = document.getElementById(labelId);

    setIsOnChange(false);
    label?.classList.add('textInput__textInputLabel--error');
  }, []);

  return (
    <div className="textInput">
      <label
        id={labelId}
        className="textInput__textInputLabel"
        data-placeholder={placeholder}
      >
        <input
          placeholder={placeholder}
          type="text"
          {...register(name, {
            required: {
              value: true,
              message: 'This field is required!',
            },
            pattern: {
              value: check.pattern,
              message: `Please Enter ${placeholder} in format '${helperText}'`,
            },
            minLength: {
              value: check.minLength,
              message: `${placeholder} should contains min ${check.minLength} characters`,
            },
            maxLength: {
              value: check.maxLength,
              message: `${placeholder} should contains max ${check.maxLength} characters`,
            },
            onChange() {
              handleTextInputChange();
            },
            onBlur() {
              if (errors[name]) {
                handleTextInputBlur();
              }
            },
          })}
          className="textInput__textData"
        />
        {(!errors[name] || isOnChange)
        && (
          <span className="textInput__helperText">
            {helperText}
          </span>
        )}

        <ErrorMessage
          errors={ errors }
          name={name}
          render={({ messages }) => {
            return (
              (messages && !isOnChange)
              && Object.entries(messages).map(([type, message]) => (
                <p key={type} className="textInput__helperText">
                  {message}
                </p>
              ))
            );
          }
          }
        />
      </label>
    </div>
  );
};
