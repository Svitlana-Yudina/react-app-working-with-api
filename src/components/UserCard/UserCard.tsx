import React from 'react';
import './UserCard.scss';

export const UserCard: React.FC = () => {
  return (
    <div className="userCard">
      <div className="userCard__photo"></div>

      <p title="Salvador Stewart Flynn Thomas qwert" className="userCard__text">
        Salvador Stewart Flynn Lorem ipsum dolor sit, amet consectetur
        adipisicing elit. Iste earum veniam reiciendis, maiores unde
        ut atque fuga ipsam beatae cumque.
      </p>

      <div className="userCard__description">
        <p title="Salvador Stewart Flynn Thomas" className="userCard__text">
        Lead Independent Director
        Salvador Stewart Flynn Lorem ipsum dolor sit, amet consectetur
        adipisicing elit. Iste earum veniam reiciendis, maiores unde
        ut atque fuga ipsam beatae cumque.
        </p>
        <p title="Salvador Stewart Flynn Thoma" className="userCard__text">
          Takamuruvhjkl.,mnbvbnm@gmail.com
        </p>
        <p title="Salvador Stewart Flynn Thomas" className="userCard__text">
          {'+38 (098) 278 90 24'}
        </p>
      </div>
    </div>
  );
};
