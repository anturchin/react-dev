import { Component, ReactNode } from 'react';
import { ErrorTypeProps } from './types';

import './SearchError.css';

export class SearchError extends Component<ErrorTypeProps> {
  render(): ReactNode {
    const { message } = this.props;
    return <h2 className="search-error">{message}</h2>;
  }
}
