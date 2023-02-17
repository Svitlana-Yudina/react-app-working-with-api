import React from 'react';
import './App.scss';
import { Assignment } from './components/Assignment';
import { Header } from './components/Header';
import { SignUpForm } from './components/SignUpForm';
import { UserList } from './components/UserList';

export const App: React.FC = () => {
  return (
    <div className="app">
      <div className="app__content">
        <Header />
        <Assignment />
        <UserList />
        <SignUpForm />
      </div>
    </div>
  );
}