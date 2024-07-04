import { Component, ReactNode } from "react";

import { SearchPage } from "../pages/searchPage";

import "./App.css";

export class App extends Component {
  render(): ReactNode {
    return (
      <main>
        <h1>hello from react</h1>
        <SearchPage />
      </main>
    );
  }
}
