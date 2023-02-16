import React from 'react';
import './UserCard.scss';

export const UserCard: React.FC = () => {
  return (
    <div className="userCard">
      <div className="userCard__photo"></div>

      <p data-title="Salvador" className="userCard__text">
        Salvador Stewart Flynn Lorem ipsum dolor sit, amet consectetur
        adipisicing elit. Iste earum veniam reiciendis, maiores unde
        ut atque fuga ipsam beatae cumque.
      </p>

      <div className="userCard__description">
        <p data-title="Salvador2" className="userCard__text">
        Lead Independent Director
        Salvador Stewart Flynn Lorem ipsum dolor sit, amet consectetur
        adipisicing elit. Iste earum veniam reiciendis, maiores unde
        ut atque fuga ipsam beatae cumque.
        </p>
        <p data-title="Salvador3" className="userCard__text">
          Takamuruvhjkl.,mnbvbnm@gmail.com
        </p>
        <p data-title="Salvador4" className="userCard__text">
          {'+38 (098) 278 90 24'}
        </p>
      </div>
    </div>
  );
};
