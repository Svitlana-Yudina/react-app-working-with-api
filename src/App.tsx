import React from 'react';
import './App.scss';
import { Assignment } from './components/Assignment';
import { Header } from './components/Header';
import { UserCard } from './components/UserCard';

export const App: React.FC = () => {
  return (
    <div className="app">
      <div className="app__content">
        <Header />
        <Assignment />
        <UserCard />
      </div>
    </div>
  );
}
