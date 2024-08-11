import { Component, ErrorInfo, ReactNode } from 'react';

import { ErrorBoundaryProps, ErrorBoundaryState } from './types';
import { Button } from '../../ui/button';
import { ErrorBoundaryContext } from '../../../core/context/errorBoundaryContext';

import styles from './ErrorBoundary.module.css';

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = {
    message: '',
    hasError: false,
  };

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { message: error.message, hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error('ErrorBoundary caught an error', error, errorInfo);
  }

  handleClick = (): void => {
    this.setState({ hasError: false });
  };

  triggerError = (): void => {
    try {
      this.setState({ hasError: true });
      throw new Error('Test error');
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
        this.setState({ message: error.message });
      }
    }
  };

  render(): ReactNode {
    if (this.state.hasError) {
      return (
        <div className={`${styles['error-boundary']}`}>
          <h2>Something went wrong.</h2>
          <Button onClick={this.handleClick}>Try Again</Button>
        </div>
      );
    }

    return (
      <ErrorBoundaryContext.Provider value={{ triggerError: this.triggerError }}>
        {this.props.children}
      </ErrorBoundaryContext.Provider>
    );
  }
}
