import React from 'react';
import { useLoadingUsers } from './api/hooks';
import './App.scss';
import { Assignment } from './components/Assignment';
import { Header } from './components/Header';
import { SignUpForm } from './components/SignUpForm';
import { UserList } from './components/UserList';

export const App: React.FC = () => {
  const loadingUsers = useLoadingUsers();
  const { setPageCount } = loadingUsers;

  return (
    <div className="app">
      <div className="app__content">
        <Header />
        <Assignment />
        <UserList toolsToLoad={loadingUsers}/>
        <SignUpForm setPageCount={ setPageCount }/>
      </div>
    </div>
  );
}
