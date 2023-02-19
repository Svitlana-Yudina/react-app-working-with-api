/* eslint-disable no-console */
/* eslint-disable no-shadow */
import React, { useCallback, useMemo } from 'react';
import { User } from '../../types/userTypes';
import './UserCard.scss';

type Props = {
  user: User;
};

export const UserCard: React.FC<Props> = ({ user }) => {
  const { id, name, email, phone, position, photo } = user;

  const phoneToView = useMemo(() => {
    let newPhone = '';

    for (let i = 0; i < phone.length; i++) {
      switch (i) {
        case 3:
          newPhone += ' (' + phone[i];
          break;
        case 6:
          newPhone += ') ' + phone[i];
          break;
        case 9:
        case 11:
          newPhone += ' ' + phone[i];
          break;
        default:
          newPhone += phone[i];
      }
    }

    return newPhone;
  }, []);

  const handleMouseOver = useCallback((elementId: string) => {
    const el = document.getElementById(elementId);

    if (el) {
      if (el.children[0].clientWidth < el?.children[0].scrollWidth) {
        el.classList.add('userCard__toolTip');
      }

      const availableWidth = document.body.clientWidth - el.offsetLeft - 16;
      const tipWidth = el.children[0].scrollWidth + 32;

      if (availableWidth <= tipWidth) {
        el.classList.add('userCard__toolTip--right');
      }
    }
  }, []);

  const handleMouseOut = useCallback((elementId: string) => {
    const el = document.getElementById(elementId);

    if (el) {
      el.classList.remove('userCard__toolTip');
    }
  }, []);

  return (
    <div className="userCard">
      <img src={photo} alt={`${name} photo`} className="userCard__photo" />

      <span
        id={`${id}/${name}`}
        data-title={name}
        onMouseOver={() => {
          handleMouseOver(`${id}/${name}`);
        }}
        onMouseOut={() => {
          handleMouseOut(`${id}/${name}`);
        }}
      >
        <p className="userCard__text">{name}</p>
      </span>

      <div className="userCard__description">
        <span
          id={`${id}/${position}`}
          data-title={position}
          onMouseOver={() => {
            handleMouseOver(`${id}/${position}`);
          }}
          onMouseOut={() => {
            handleMouseOut(`${id}/${position}`);
          }}
        >
          <p className="userCard__text">{position}</p>
        </span>

        <span
          id={`${id}/${email}`}
          data-title={email}
          onMouseOver={() => {
            handleMouseOver(`${id}/${email}`);
          }}
          onMouseOut={() => {
            handleMouseOut(`${id}/${email}`);
          }}
        >
          <a href={`mailto: ${email}`} className="textLink userCard__text">
            {email}
          </a>
        </span>

        <span
          id={`${id}/${phone}`}
          data-title={phoneToView}
          onMouseOver={() => {
            handleMouseOver(`${id}/${phone}`);
          }}
          onMouseOut={() => {
            handleMouseOut(`${id}/${phone}`);
          }}
        >
          <a href={`tel: ${phone}`} className="textLink userCard__text">
            {phoneToView}
          </a>
        </span>
      </div>
    </div>
  );
};
