/* eslint-disable no-shadow */
import React, { useCallback } from 'react';
// import { useForm } from 'react-hook-form';
import './SignUpForm.scss';

export const SignUpForm: React.FC = () => {
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

          const label = document.getElementById('dataPhone');

          label?.classList.add('signUpForm__textInputLabel--error');
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

        <p className="signUpForm__radioTitle">Select your position</p>

        <div className="signUpForm__radioContainer">
          <input
            type="radio"
            name="role"
            value="Frontend developer"
            className="signUpForm__radioData"
            required
            id="frontend"
          />

          <label htmlFor="frontend" className="signUpForm__radioLable">
            Frontend developer
          </label>
        </div>

        <div className="signUpForm__radioContainer">
          <input
            type="radio"
            name="role"
            value="Backend developer"
            className="signUpForm__radioData"
            required
            id="backend"
          />

          <label htmlFor="backend" className="signUpForm__radioLable">
            Backend developer
          </label>
        </div>

        <div className="signUpForm__radioContainer">
          <input
            type="radio"
            name="role"
            value="Designer"
            className="signUpForm__radioData"
            required
            id="designer"
          />

          <label htmlFor="designer" className="signUpForm__radioLable">
            Designer
          </label>
        </div>

        <div className="signUpForm__radioContainer">
          <input
            type="radio"
            name="role"
            value="QA"
            className="signUpForm__radioData"
            required
            id="QA"
          />

          <label htmlFor="QA" className="signUpForm__radioLable">
          QA
          </label>
        </div>

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
