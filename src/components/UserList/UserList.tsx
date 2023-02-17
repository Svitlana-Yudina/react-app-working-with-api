/* eslint-disable no-console */
import React, { useEffect, useState } from 'react';
import { getUsers } from '../../api/requests';
import { UsersInfo } from '../../types/types';
import { UserCard } from '../UserCard';
import './UserList.scss';

const initUser = {
  users: [],
  totalPages: 0,
  totalUsers: 0,
};

export const UserList: React.FC = () => {
  const [usersInfo, setUsersInfo] = useState<UsersInfo>(initUser);
  const [isLoaded, setIsLoaded] = useState(false);
  const [pageCount, setPageCount] = useState(1);

  const loadUsers = async(page: number) => {
    try {
      const usersFromServer = await getUsers(page);

      setUsersInfo({
        users: usersFromServer.users,
        totalPages: usersFromServer['total_pages'],
        totalUsers: usersFromServer['total_users'],
      });
      setIsLoaded(true);
    } catch (err) {
      throw new Error(`${err}`);
    }
  };

  useEffect(() => {
    loadUsers(pageCount);
  }, []);

  useEffect(() => {
    loadUsers(pageCount);
  }, [pageCount]);

  return (
    <div className="userList">
      <h2 className="userList__title">
        Working with GET request
      </h2>
      {isLoaded && (
        <div className="userList__content">
        {usersInfo?.users.map(user => (
          <div className="userList__wraper" key={user.id}>
            <UserCard user={user}/>
          </div>
        ))}
      </div>
      )}
      {pageCount === usersInfo.totalPages || (
        <button
          type="button"
          className="button button--big"
          onClick={() => {
            setPageCount(prevCount => prevCount + 1);
            console.log('click', pageCount);
          }}
        >
          Show more
        </button>
      )}
    </div>
  );
};
