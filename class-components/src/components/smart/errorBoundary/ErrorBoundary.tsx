import { Component, ErrorInfo } from "react";
import { ErrorBoundaryProps, ErrorBoundaryState } from "./types";

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = {
    message: "",
    hasError: false,
  };

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { message: error.message, hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("ErrorBoundary caught an error", error, errorInfo);
  }

  handleError = () => {
    throw new Error("Test error");
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-boundary">
          <h1>Something went wrong.</h1>
          <button onClick={() => this.setState({ hasError: false })}>
            Try Again
          </button>
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

export default ErrorBoundary;
