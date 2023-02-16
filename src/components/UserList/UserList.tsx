import React from 'react';
import { UserCard } from '../UserCard';
import './UserList.scss';

export const UserList: React.FC = () => {
  const testArr = [1, 2, 3, 4, 5, 6];

  return (
    <div className="userList">
      <h2 className="userList__title">
        Working with GET request
      </h2>
      <div className="userList__content">
        {testArr.map(arr => (
          <div className="userList__wraper" key={arr}>
            <UserCard />
          </div>
        ))}
      </div>
      <button type="button" className="button button--big">
        Show more
      </button>
    </div>
  );
};
