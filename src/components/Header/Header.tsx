import React from 'react';
import './Header.scss';

export const Header: React.FC = () => {
  return (
    <div className="header">
      <div className="header__content">
        <div className="header__image"></div>
        <div className="header__auth">
          <a href="#userList" className="button header__button">
            Users
          </a>
          <a href="#signUpForm" className="button">
            Sign up
          </a>
        </div>
      </div>
    </div>
  );
};
