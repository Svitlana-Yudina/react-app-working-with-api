/* eslint-disable no-console */
import React, { useEffect, useState } from 'react';
import { getUsers } from '../../api/requests';
import { User } from '../../types/types';
import { UserCard } from '../UserCard';
import './UserList.scss';

export const UserList: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // const testArr = [1, 2, 3, 4, 5, 6];

  const loadUsers = async(page: number, count: number) => {
    try {
      const usersFromServer = await getUsers(page, count);

      setUsers(usersFromServer.users);
      console.log(users);
      setIsLoaded(true);
    } catch (err) {
      throw new Error(`${err}`);
    }
  };

  useEffect(() => {
    loadUsers(2, 6);
  }, []);

  console.log(users);
  console.log(isLoaded);

  return (
    <div className="userList">
      <h2 className="userList__title">
        Working with GET request
      </h2>
      {isLoaded && (
        <div className="userList__content">
        {users.map(user => (
          <div className="userList__wraper" key={user.id}>
            <UserCard user={user}/>
          </div>
        ))}
      </div>
      )}
      <button type="button" className="button button--big">
        Show more
      </button>
    </div>
  );
};
