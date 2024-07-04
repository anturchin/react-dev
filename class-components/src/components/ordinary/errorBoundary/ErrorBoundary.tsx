import { Component, ErrorInfo, ReactNode } from "react";

import { ErrorBoundaryProps, ErrorBoundaryState } from "./types";

export class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  state: ErrorBoundaryState = {
    message: "",
    hasError: false,
  };

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { message: error.message, hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error("ErrorBoundary caught an error", error, errorInfo);
  }

  handleError = (): never => {
    throw new Error("Test error");
  };

  handleClick = (): void => {
    this.setState({ hasError: false });
  };

  render(): ReactNode {
    if (this.state.hasError) {
      return (
        <div className="error-boundary">
          <h1>Something went wrong.</h1>
          <button onClick={this.handleClick}>Try Again</button>
        </div>
      );
    }

    return (
      <div>
        {this.props.children}
        <button onClick={this.handleError}>Trigger Error</button>
      </div>
    );
  }
}
