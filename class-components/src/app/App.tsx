import { Component, ReactNode } from 'react';

import { SearchPage } from '../pages/searchPage';

import './App.css';

export class App extends Component {
  render(): ReactNode {
    return (
      <>
        <h1 className="title">The Rick and Morty API</h1>
        <main className="main">
          <SearchPage />
        </main>
      </>
    );
  }
}
