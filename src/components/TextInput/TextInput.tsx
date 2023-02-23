/* eslint-disable no-console */
/* eslint-disable no-shadow */
import React, { useCallback, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import './TextInput.scss';

type Props = {
  inputId: string,
  pattern: RegExp,
  helperText: string,
  placeholder: string,
  name: string,
};

export const TextInput: React.FC<Props> = ({
  inputId,
  pattern,
  helperText,
  placeholder,
  name,
}) => {
  const [isOnChange, setIsOnChange] = useState(false);
  const { register, formState: { errors } } = useFormContext();

  const handleTextInputChange = useCallback(() => {
    const label = document.getElementById(inputId);

    setIsOnChange(true);
    label?.classList.remove('textInput__textInputLabel--error');
    label?.classList.add('textInput__textInputLabel--filled');
  }, []);

  const handleTextInputBlur = useCallback(() => {
    const label = document.getElementById(inputId);

    setIsOnChange(false);
    label?.classList.add('textInput__textInputLabel--error');
  }, []);

  return (
    <div className="textInput">
      <label
        id={inputId}
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
              value: pattern,
              message: `Please Enter ${placeholder} in format '${helperText}'`,
            },
            onChange() {
              handleTextInputChange();
            },
            onBlur() {
              console.log(errors);
              console.log(errors[name]);

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
            console.log('m&O', messages && !isOnChange);
            console.log('o', !isOnChange);
            console.log('m', messages);
            console.log('err', errors);

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
