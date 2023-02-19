/* eslint-disable no-shadow */
import React, { useCallback, useEffect, useState } from 'react';
import { getPositions } from '../../api/requests';
import { PositionResponse } from '../../types/positionTypes';
import './SignUpForm.scss';

export const SignUpForm: React.FC = () => {
  const [positions, setPositions] = useState<PositionResponse>({
    success: true,
    positions: [],
  });

  const loadPositions = useCallback(async() => {
    try {
      const positionsFromServer = await getPositions();

      setPositions(positionsFromServer);
    } catch (err) {
      throw new Error(`${err}`);
    }
  }, []);

  useEffect(() => {
    loadPositions();
  }, []);

  const handleTextInputChange = useCallback((
    event: React.ChangeEvent<HTMLInputElement>,
    inputId: string,
  ) => {
    const label = document.getElementById(inputId);

    if (event.target.value !== '') {
      label?.classList.add('signUpForm__textInputLabel--filled');
    } else {
      label?.classList.remove('signUpForm__textInputLabel--filled');
    }
  }, []);

  return (
    <div className="signUpForm">
      <h2 className="signUpForm__title">
        Working with POST request
      </h2>

      <form
        action="/"
        method="post"
        className="signUpForm__form"
        onSubmit={(event) => {
          event.preventDefault();
        }}
      >
        <label
          id="dataName"
          className="signUpForm__textInputLabel"
          data-placeholder="Your name"
        >
          <input
            autoComplete="off"
            type="text"
            name="name"
            className="signUpForm__textData"
            onChange={(event) => {
              handleTextInputChange(event, 'dataName');
            }}
          />
          <span className="signUpForm__helperText">
            Example
          </span>
        </label>

        <label
          id="dataEmail"
          className="signUpForm__textInputLabel"
          data-placeholder="Email"
        >
          <input
            autoComplete="off"
            type="email"
            name="email"
            className="signUpForm__textData"
            onChange={(event) => {
              handleTextInputChange(event, 'dataEmail');
            }}
          />
          <span className="signUpForm__helperText">
            example@gmail.com
          </span>
        </label>

        <label
          id="dataPhone"
          className="
          signUpForm__textInputLabel"
          data-placeholder="Phone"
        >
          <input
            autoComplete="off"
            type="tel"
            name="phone"
            // pattern="^\+38\s[\(]\d{3}[\)]\s\d{3}[\-]\d{2}[\-]\d{2}"
            className="signUpForm__textData"
            onChange={(event) => {
              handleTextInputChange(event, 'dataPhone');
            }}
          />
          <span className="signUpForm__helperText">
            {'+38 (XXX) XXX - XX - XX'}
          </span>
        </label>

        <fieldset className="signUpForm__radioGroup">
          <legend className="signUpForm__radioTitle">
            Select your position
          </legend>
          {positions.positions.map(position => (
            <div className="signUpForm__radioContainer" key={position.id}>
              <input
                type="radio"
                name="role"
                value={position.id}
                className="signUpForm__radioData"
                required
                id={String(position.id)}
              />

              <label
                htmlFor={String(position.id)}
                className="signUpForm__radioLable"
              >
                {position.name}
              </label>
            </div>
          ))}
        </fieldset>

        <label className="signUpForm__fileInputLabel">
          <div className="fileName">Upload your photo</div>
          <button type="button" className="fileButton">Upload</button>
          <input type="file" name="photo" className="signUpForm__fileInput"/>
        </label>

        <button
          type="submit"
          className="signUpForm__button button button--disabled"
        >
          Sign up
        </button>
      </form>
    </div>
  );
};
