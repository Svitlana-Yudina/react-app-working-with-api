import React from 'react';
import { UsersInfo } from '../../types/userTypes';
import { Loader } from '../Loader';
import { UserCard } from '../UserCard';
import './UserList.scss';

type Props = {
  toolsToLoad: {
    usersInfo: UsersInfo;
    isLoaded: boolean;
    pageCount: {count: number};
    setPageCount: React.Dispatch<React.SetStateAction<{count: number}>>;
  }
};

export const UserList: React.FC<Props> = ({ toolsToLoad }) => {
  const {
    usersInfo,
    isLoaded,
    pageCount,
    setPageCount,
  } = toolsToLoad;

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

      {pageCount.count === usersInfo.totalPages || (
        <button
          type="button"
          className="button button--big"
          onClick={() => {
            setPageCount((prevCount) => ({ count: prevCount.count + 1 }));
          }}
        >
          Show more
        </button>
      )}
    </div>
  );
};
