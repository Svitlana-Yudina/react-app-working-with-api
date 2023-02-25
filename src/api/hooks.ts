import { useEffect, useState } from 'react';
import { UsersInfo } from '../types/userTypes';
import { getUsersByPage } from './requests';

const initUser = {
  users: [],
  totalPages: 0,
  totalUsers: 0,
};

export const useLoadingUsers = () => {
  const [usersInfo, setUsersInfo] = useState<UsersInfo>(initUser);
  const [isLoaded, setIsLoaded] = useState(false);
  const [pageCount, setPageCount] = useState(1);

  useEffect(() => {
    const loadUsers = async(page: number) => {
      setIsLoaded(false);

      try {
        const usersFromServer = await getUsersByPage(page);

        setUsersInfo((prevInfo) => {
          if (prevInfo.users.length < page * 6) {
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
        });
      } catch (err) {
        throw new Error(`${err}`);
      }
      setIsLoaded(true);
    };

    loadUsers(pageCount);
  }, [pageCount]);

  return {
    usersInfo,
    isLoaded,
    pageCount,
    setPageCount,
  };
};
