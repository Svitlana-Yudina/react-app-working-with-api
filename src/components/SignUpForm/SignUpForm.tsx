/* eslint-disable no-console */
/* eslint-disable no-useless-escape */
/* eslint-disable max-len */
/* eslint-disable no-shadow */
import React, { useCallback, useEffect, useState } from 'react';
import classNames from 'classnames';
import { useForm, FormProvider, SubmitHandler } from 'react-hook-form';
import { addUser, getPositions, getToken } from '../../api/requests';
import { PositionResponse } from '../../types/positionTypes';
import { TextInput } from '../TextInput';
import './SignUpForm.scss';
import { Inputs } from '../../types/otherTypes';
import { FileInput } from '../FileInput';

type Props = {
  setPageCount: React.Dispatch<React.SetStateAction<{count: number}>>;
};

export const SignUpForm: React.FC<Props> = React.memo(function SignUpForm(
  { setPageCount }: Props,
) {
  const namePattern = new RegExp(/[-0-9A-Za-zа-яА-я]{2,60}/);
  const emailPattern = new RegExp(/^[a-z0-9_'+*/^&=?~{}\-](\.?[a-z0-9_'+*/^&=?~{}\-])*\@((\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}(\:\d{1,3})?)|(((([a-z0-9][a-z0-9\-]+[a-z0-9])|([a-z0-9]{1,2}))[\.]{1})+([a-z]{2,6})))$/);
  const phonePattern = new RegExp(/^\+38[\(]\d{3}[\)]\d{3}[\-]\d{2}[\-]\d{2}$/);

  const nameCheck = {
    pattern: namePattern,
    minLength: 2,
    maxLength: 60,
  };
  const emailCheck = {
    pattern: emailPattern,
    minLength: 2,
    maxLength: 100,
  };
  const phoneCheck = {
    pattern: phonePattern,
    minLength: 17,
    maxLength: 17,
  };

  const methods = useForm<Inputs>({
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      'position_id': 0,
      photo: undefined,
    },
    mode: 'all',
    criteriaMode: 'all',
  });

  const { isValid } = methods.formState;
  const [positions, setPositions] = useState<PositionResponse>({
    success: true,
    positions: [],
  });
  const [token, setToken] = useState('');
  const [submitError, setSubmitError] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const formatPhoneToSubmit = (phoneNumber: string) => {
    const regToReplace = new RegExp(/[\)\(-]/, 'g');

    const formatingNumber = phoneNumber.replaceAll(regToReplace, '');

    return formatingNumber;
  };

  const onSubmit: SubmitHandler<Inputs> = async(data: Inputs) => {
    const formData: BodyInit = new FormData();
    const phoneToSubmit = formatPhoneToSubmit(data.phone);

    formData.append('position_id', String(data.position_id));
    formData.append('name', data.name);
    formData.append('email', data.email);
    formData.append('phone', phoneToSubmit);
    formData.append('photo', data.photo[0]);

    try {
      const response = await addUser(token, formData);

      if (response.success) {
        setPageCount({ count: 1 });
        setSubmitError('');
        setIsSuccess(true);
      } else {
        console.log(response);
        setSubmitError(response.message);
        setIsSuccess(false);
      }
    } catch (err) {
      setSubmitError(`ERROR! ${err}`);
    }
  };

  const loadPositions = useCallback(async() => {
    try {
      const positionsFromServer = await getPositions();

      setPositions(positionsFromServer);
    } catch (err) {
      throw new Error(`${err}`);
    }
  }, []);

  const loadToken = useCallback(async() => {
    try {
      const tokenFromServer = await getToken();

      setToken(tokenFromServer.token);
    } catch (err) {
      throw new Error(`${err}`);
    }
  }, []);

  useEffect(() => {
    loadPositions();
    loadToken();
  }, []);

  return (
    <div className="signUpForm" id="signUpForm">
      <h2 className="signUpForm__title">
        Working with POST request
      </h2>

      {isSuccess && !submitError
        ? (
          <div className="signUpForm__success success">
            <h2 className="success__title">
              User successfully registered
            </h2>
            <div className="success__image"></div>
          </div>
        )
        : (

          <FormProvider {...methods}>
            <form
              action="/"
              method="post"
              className="signUpForm__form"
              onSubmit={methods.handleSubmit(onSubmit)}
            >
              <TextInput
                labelId="nameData"
                check={nameCheck}
                helperText="example"
                placeholder="Your Name"
                name="name"
                submitErr={setSubmitError}
              />

              <TextInput
                labelId="emailData"
                check={emailCheck}
                helperText="example@gmail.com"
                placeholder="Email"
                name="email"
                submitErr={setSubmitError}
              />

              <TextInput
                labelId="phoneData"
                check={phoneCheck}
                helperText="+38 (XXX) XXX - XX - XX"
                placeholder="Phone"
                name="phone"
                submitErr={setSubmitError}
              />

              <fieldset className="signUpForm__radioGroup">
                <legend className="signUpForm__radioTitle">
                  Select your position
                </legend>
                {positions.positions.map(position => (
                  <div className="signUpForm__radioContainer" key={position.id}>
                    <input
                      type="radio"
                      {...methods.register('position_id', { required: true })}
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

              <FileInput />

              <button
                type="submit"
                className={classNames(
                  'signUpForm__button button',
                  { 'button--disabled': !isValid },
                )}
                disabled={!isValid}
              >
                Sign up
              </button>
              {submitError
                && (
                  <p className="signUpForm__errorText">
                    {submitError}
                  </p>
                )}
            </form>
          </FormProvider>
        )}
    </div>
  );
});
