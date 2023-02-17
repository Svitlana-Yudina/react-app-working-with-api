/* eslint-disable no-console */
/* eslint-disable no-shadow */
import React, { useMemo } from 'react';
import { User } from '../../types/types';
import './UserCard.scss';

type Props = {
  user: User,
};

export const UserCard: React.FC<Props> = ({ user }) => {
  const {
    name,
    email,
    phone,
    position,
    photo,
  } = user;

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

  return (
    <div className="userCard">
      <img src={photo} alt={`${name} photo`} className="userCard__photo" />

      <p data-title="Salvador" className="userCard__text">
        {name}
      </p>

      <div className="userCard__description">
        <p data-title="Salvador2" className="userCard__text">
          {position}
        </p>
        <p data-title="Salvador3" className="userCard__text">
          {email}
        </p>
        <p data-title="Salvador4" className="userCard__text">
          {phoneToView}
        </p>
      </div>
    </div>
  );
};
