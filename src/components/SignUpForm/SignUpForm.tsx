/* eslint-disable no-useless-escape */
/* eslint-disable max-len */
/* eslint-disable no-console */
/* eslint-disable no-shadow */
import React, { useCallback, useEffect, useState } from 'react';
import classNames from 'classnames';
import { useForm, FormProvider, SubmitHandler } from 'react-hook-form';
import { getPositions, getToken } from '../../api/requests';
import { PositionResponse } from '../../types/positionTypes';
import { TextInput } from '../TextInput';
import './SignUpForm.scss';

type Inputs = {
  name: string,
  email: string
  phone: string
  role: number,
  photo: FileList,
};

export const SignUpForm: React.FC = () => {
  const namePattern = new RegExp(/^([A-Za-z]{1}[-0-9A-Za-z]{3,})/);
  const emailPattern = new RegExp(/^([A-Za-z]{1}[0-9A-Za-z]{3,})@([a-z\i]{3,}\.[a-z\i]{2,}$)/);
  const phonePattern = new RegExp(/^\+38[\(]\d{3}[\)]\d{3}[\-]\d{2}[\-]\d{2}$/);

  const methods = useForm<Inputs>({
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      role: 0,
      photo: undefined,
    },
    mode: 'all',
    criteriaMode: 'all',
  });
  const onSubmit: SubmitHandler<Inputs> = (data: Inputs) => console.log(data);
  const { isValid } = methods.formState;
  const { formState: { errors } } = methods;

  const [positions, setPositions] = useState<PositionResponse>({
    success: true,
    positions: [],
  });
  const [token, setToken] = useState('');
  const [file, setFile] = useState<File | null>(null);

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

  function readImage(currentfile: File): Promise<HTMLImageElement> {
    return new Promise((resolve, reject) => {
      const image = new Image();

      image.src = URL.createObjectURL(currentfile);
      image.onload = () => resolve(image);
      image.onerror = err => reject(err);
    });
  }

  useEffect(() => {
    loadPositions();
    loadToken();
  }, []);

  return (
    <div className="signUpForm">
      <h2 className="signUpForm__title">
        Working with POST request
      </h2>

      <FormProvider {...methods}>
        <form
          action="/"
          method="post"
          className="signUpForm__form"
          onSubmit={methods.handleSubmit(onSubmit)}
        >
          <TextInput
            inputId="nameData"
            pattern={namePattern}
            helperText="example / min 4 characters"
            placeholder="Your Name"
            name="name"
          />

          <TextInput
            inputId="emailData"
            pattern={emailPattern}
            helperText="example@gmail.com"
            placeholder="Email"
            name="email"
          />

          <TextInput
            inputId="phoneData"
            pattern={phonePattern}
            helperText="+38 (XXX) XXX - XX - XX"
            placeholder="Phone"
            name="phone"
          />

          <fieldset className="signUpForm__radioGroup">
            <legend className="signUpForm__radioTitle">
              Select your position
            </legend>
            {positions.positions.map(position => (
              <div className="signUpForm__radioContainer" key={position.id}>
                <input
                  type="radio"
                  {...methods.register('role', { required: true })}
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
            <input
              type="file"
              accept=".jpg, .jpeg"
              {...methods.register('photo', {
                required: true,
                onChange: (event) => {
                  if (event.target.files) {
                    console.log(event.target.files);
                    console.log(event.target.files[0]);
                    setFile(event.target.files[0]);
                  }
                },
                // validate: {
                //   size: (value) => {
                //     console.log('errors', errors);
                //     console.log('isValid', isValid);
                //     console.log('value', value);
                //     console.log('value.size', value[0].size);
                //     console.log('value.size < 5 * (1024 ** 2)', value[0].size < 5 * (1024 ** 2));

                //     return value[0].size < 5 * (1024 ** 2);
                //   },
                //   imgType: (value) => {
                //     return value.type === 'image/jpeg' || value.type === 'image/jpg';
                //   },
                //   imgWidthAndHeight: async(value) => {
                //     if (value) {
                //       const newImg = await readImage(value);

                //       return newImg.width > 70 && newImg.height > 70;
                //     } else {
                //       return false;
                //     }
                //   },
                // },
              })}
              className="signUpForm__fileInput"
            />
            {!file?.name
              ? (
                <p className="fileName">
                  Upload your photo
                </p>
              )
              : (
                <p className="fileName fileName__filled">
                  {`${file?.name}`}
                </p>
              )
            }

            <div className="fileButton">Upload</div>
          </label>

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
        </form>
      </FormProvider>
    </div>
  );
};
