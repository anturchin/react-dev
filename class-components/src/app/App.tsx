import { Component, ReactNode } from 'react';

import { SearchPage } from '../pages/searchPage';

import './App.css';

export class App extends Component {
  render(): ReactNode {
    return (
      <>
        <SearchPage />
      </>
    );
  }
}
