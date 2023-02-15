import React from 'react';
import './Header.scss';

export const Header: React.FC = () => {
  return (
    <div className="header">
      <div className="header__content">
        <div className="header__image"></div>
        <div className="header__auth">
          <button type="button" className="button header__button">
            Users
          </button>
          <button type="button" className="button">
            Sign up
          </button>
        </div>
      </div>
    </div>
  );
};
