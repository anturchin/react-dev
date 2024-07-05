import { Component, ErrorInfo, ReactNode } from "react";

import { ErrorBoundaryProps, ErrorBoundaryState } from "./types";
import { Button } from "../../ui/button";

import "./ErrorBoundary.css";
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

  handleError = (): void => {
    try {
      this.setState({ hasError: true });
      throw new Error("Test error");
    } catch (error) {
      if (error instanceof Error) {
        this.setState((state) => ({
          ...state,
          message: error.message,
        }));
        console.error(error.message);
      }
    }
  };

  handleClick = (): void => {
    this.setState({ hasError: false });
  };

  render(): ReactNode {
    if (this.state.hasError) {
      return (
        <div className="error-boundary">
          <h2>Something went wrong.</h2>
          <Button onClick={this.handleClick}>Try Again</Button>
        </div>
      );
    }

    return (
      <>
        <div className="trigger-error">
          <Button errorBoundary={true} onClick={this.handleError}>
            Trigger Error
          </Button>
        </div>
        {this.props.children}
      </>
    );
  }
}
