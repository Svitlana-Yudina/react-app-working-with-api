/* eslint-disable @typescript-eslint/no-empty-function */
import React, { useState } from 'react';
import { UsersInfo } from '../../types/userTypes';

interface ContextValues {
  usersInfo: UsersInfo;
  setUsersInfo: React.Dispatch<React.SetStateAction<UsersInfo>>;
  pageCount: number;
  setPageCount: React.Dispatch<React.SetStateAction<number>>;
  isLoaded: boolean;
  setIsLoaded: React.Dispatch<React.SetStateAction<boolean>>;
}

const initUser = {
  users: [],
  totalPages: 0,
  totalUsers: 0,
};

export const UserContext = React.createContext<ContextValues>({
  usersInfo: initUser,
  setUsersInfo: () => {},
  pageCount: 1,
  setPageCount: () => {},
  isLoaded: false,
  setIsLoaded: () => {},
});

type Props = {
  children: React.ReactNode;
};

export const UserProvider: React.FC<Props> = ({ children }) => {
  const [usersInfo, setUsersInfo] = useState<UsersInfo>(initUser);
  const [pageCount, setPageCount] = useState(1);
  const [isLoaded, setIsLoaded] = useState(false);

  const contextValue = {
    usersInfo,
    setUsersInfo,
    pageCount,
    setPageCount,
    isLoaded,
    setIsLoaded,
  };

  return (
    <UserContext.Provider value={contextValue}>
      {children}
    </UserContext.Provider>
  );
};
