import React from 'react';
// import { useForm } from 'react-hook-form';
import './SignUpForm.scss';

export const SignUpForm: React.FC = () => {
  // const { register } = useForm();

  return (
    <div className="signUpForm">
      <h2 className="signUpForm__title">
        Working with POST request
      </h2>

      <form action="/" method="post" className="signUpForm__form">
        <input
          type="text"
          name="name"
          placeholder="Your name"
          required
          className="signUpForm__textData"
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          required
          className="signUpForm__textData"
        />

        <input
          type="tel"
          name="phone"
          pattern="^\+38\s[\(]\d{3}[\)]\s\d{3}[\-]\d{2}[\-]\d{2}"
          placeholder="Phone"
          required
          className="signUpForm__textData"
          id="phone"
        />
        <label htmlFor="phone" className="signUpForm__textInputLabel">
          {'+38 (XXX) XXX - XX - XX'}
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

        <input type="file" name="photo" className="signUpForm__fileInput"/>

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
