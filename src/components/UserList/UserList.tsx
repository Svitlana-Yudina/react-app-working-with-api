/* eslint-disable no-console */
import React, { useContext, useEffect } from 'react';
import { getUsersByPage } from '../../api/requests';
// import { UsersInfo } from '../../types/userTypes';
import { Loader } from '../Loader';
import { UserCard } from '../UserCard';
import { UserContext } from '../UserContext';
import './UserList.scss';

// const initUser = {
//   users: [],
//   totalPages: 0,
//   totalUsers: 0,
// };

export const UserList: React.FC = () => {
  const {
    usersInfo,
    setUsersInfo,
    pageCount,
    setPageCount,
    isLoaded,
    setIsLoaded,
  } = useContext(UserContext);
  // const [usersInfo, setUsersInfo] = useState<UsersInfo>(initUser);
  // const [isLoaded, setIsLoaded] = useState(false);
  // const [pageCount, setPageCount] = useState(1);

  const loadUsers = async(page: number) => {
    try {
      // loader starts rotating, when the download started
      setIsLoaded(false);

      // waiting for download to finish
      const usersFromServer = await getUsersByPage(page);

      setUsersInfo((prevInfo) => {
        if (prevInfo.users.length !== page * 6) {
          return {
            users: [...prevInfo.users, ...usersFromServer.users],
            totalPages: usersFromServer['total_pages'],
            totalUsers: usersFromServer['total_users'],
          };
        }

        return {
          users: usersFromServer.users,
          totalPages: usersFromServer['total_pages'],
          totalUsers: usersFromServer['total_users'],
        };

        // return prevInfo;
      });
      console.log('inside loadUsers');

      setIsLoaded(true);
    } catch (err) {
      throw new Error(`${err}`);
    }
  };

  // useEffect(() => {
  //   console.log('first useEffect');
  //   loadUsers(pageCount);
  // }, []);

  useEffect(() => {
    console.log('second useEffect');
    loadUsers(pageCount);
  }, [pageCount]);

  console.log('RENDER');

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
