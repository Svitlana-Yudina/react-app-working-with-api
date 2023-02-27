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
  const [pageCount, setPageCount] = useState({ count: 1 });

  useEffect(() => {
    const loadUsers = async(page: { count: number }) => {
      setIsLoaded(false);

      try {
        const usersFromServer = await getUsersByPage(page.count);

        // we should update ALL users (not only add new)
        // to avoid duplication of old users,
        // if new ones have allready registered in another browser
        setUsersInfo({
          users: usersFromServer.users,
          totalPages: usersFromServer['total_pages'],
          totalUsers: usersFromServer['total_users'],
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
