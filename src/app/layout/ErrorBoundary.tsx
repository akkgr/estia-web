import React, { ErrorInfo, ReactNode, Component } from "react";

type ErrorProps = {
  error: Error;
  children: ReactNode;
};
class ErrorBoundary extends React.Component<ErrorProps> {
  state = { error: null };
  static getDerivedStateFromError(error: Error) {
    return { error };
  }
  componentDidCatch() {
    // log the error to the server
  }
  tryAgain = () => this.setState({ error: null });
  render() {
    return this.state.error ? (
      <div>
        There was an error. <button onClick={this.tryAgain}>Try again</button>
        <pre style={{ whiteSpace: "normal" }}>{this.state.error}</pre>
      </div>
    ) : (
      this.props.children
    );
  }
}

export default ErrorBoundary;
