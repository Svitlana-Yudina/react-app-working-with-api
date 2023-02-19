import React, { useEffect, useState } from 'react';
import { getUsersByPage } from '../../api/requests';
import { UsersInfo } from '../../types/userTypes';
import { Loader } from '../Loader';
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
      setIsLoaded(false);

      const usersFromServer = await getUsersByPage(page);

      setUsersInfo((prevInfo) => {
        if (prevInfo.users.length !== page * 6) {
          return {
            users: [...prevInfo.users, ...usersFromServer.users],
            totalPages: usersFromServer['total_pages'],
            totalUsers: usersFromServer['total_users'],
          };
        }

        return prevInfo;
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
      <h2 className="userList__title">Working with GET request</h2>

      {usersInfo.users.length > 0 && (
        <div className="userList__content">
          {usersInfo.users.map((user) => (
            <div className="userList__wraper" key={user.id}>
              <UserCard user={user} />
            </div>
          ))}
        </div>
      )}

      {!isLoaded && <Loader />}

      {pageCount === usersInfo.totalPages || (
        <button
          type="button"
          className="button button--big"
          onClick={() => {
            setPageCount((prevCount) => prevCount + 1);
          }}
        >
          Show more
        </button>
      )}
    </div>
  );
};
