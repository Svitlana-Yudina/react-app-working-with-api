/* eslint-disable no-shadow */
import React, { useState } from 'react';
import { useFormContext } from 'react-hook-form';

export const FileInput: React.FC = () => {
  const { register, formState: { errors } } = useFormContext();
  const [file, setFile] = useState<File | null>(null);

  function readImage(currentfile: File): Promise<HTMLImageElement> {
    return new Promise((resolve, reject) => {
      const image = new Image();

      image.src = URL.createObjectURL(currentfile);
      image.onload = () => resolve(image);
      image.onerror = err => reject(err);
    });
  }

  return (
    <label
      className="signUpForm__fileInputLabel"
    >
      <input
        type="file"
        accept=".jpg, .jpeg"
        {...register('photo', {
          required: true,
          onChange: (event) => {
            if (event.target.files) {
              setFile(event.target.files[0]);
            }
          },
          validate: {
            size: (value: FileList) => {
              if (value[0]) {
                return value[0].size < 5 * (1024 ** 2);
              }

              return false;
            },
            imgType: (value: FileList) => {
              if (value[0]) {
                return value[0].type === 'image/jpeg'
                || value[0].type === 'image/jpg';
              }

              return false;
            },
            imgWidthAndHeight: async(value: FileList) => {
              if (value[0]) {
                const newImg = await readImage(value[0]);

                return newImg.width >= 70 && newImg.height >= 70;
              }

              return false;
            },
          },
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
      {!errors['photo']
      && (
        <p className="signUpForm__helperText">
          format: .jpeg/.jpg  |  max size: 5MB  |  min: 70px X 70px
        </p>
      )}

      {errors['photo']?.type === 'imgType'
      && (
        <p className="signUpForm__errorText">
          Use only .jpeg/.jpg
        </p>
      )}

      {errors['photo']?.type === 'size'
      && (
        <p className="signUpForm__errorText">
          max size shouldn&apos;t be more 5MB
        </p>
      )}

      {errors['photo']?.type === 'imgWidthAndHeight'
      && (
        <p className="signUpForm__errorText">
          min size shouldn&apos;t be less 70px X 70px
        </p>
      )}

    </label>
  );
};
