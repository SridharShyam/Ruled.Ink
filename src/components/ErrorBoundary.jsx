import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Tab Error Caught:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="py-20 text-center flex flex-col items-center justify-center border border-dashed border-red-soft/30 rounded-lg bg-red-soft/5">
          <span className="text-3xl mb-4">⚠️</span>
          <h2 className="font-display text-xl text-ink mb-2">Something went wrong</h2>
          <p className="text-muted text-sm max-w-xs mx-auto mb-6">
            There was an error loading this section. This might be due to corrupted data or a temporary glitch.
          </p>
          <button 
            onClick={() => {
              localStorage.clear();
              window.location.reload();
            }}
            className="px-6 py-2 bg-red-soft text-surface rounded-md text-sm font-medium hover:bg-red-soft/90 transition-all"
          >
            RESET SYSTEM DATA
          </button>
          <button 
            onClick={() => this.setState({ hasError: false })}
            className="mt-4 text-muted hover:text-text text-xs underline"
          >
            Try again
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
