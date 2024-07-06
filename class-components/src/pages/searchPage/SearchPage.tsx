import { Component, ReactNode } from 'react';

import { SearchContainer } from '../../containers/searchContainer';

import './SearchPage.css';
export class SearchPage extends Component {
  render(): ReactNode {
    return (
      <section className="search-page">
        <SearchContainer />
      </section>
    );
  }
}
