import React from "react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error("Render error:", error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="four-oh-four">
          <div className="resume-header">
            <h1 className="four-oh-four__title">Something went wrong.</h1>
          </div>
          <div className="four-oh-four__home-link">
            <h2>
              <a href="/">Home</a>
            </h2>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
