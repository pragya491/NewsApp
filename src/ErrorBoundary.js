import React, { Component } from 'react';

class ErrorBoundary extends Component {
    
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        console.error("Error caught by boundary:", error);
        console.error("Error Info:", errorInfo.componentStack);
    }

    render() {
        if (this.state.hasError) {
            return(
                <div className='alert alert-danger m-3'>
                    <h2 className="text-center my-5">Something went wrong.</h2>
                    <button className='btn btn-primary' onClick={() => this.setState({hasError: false})}>
                        Try Again

                    </button>

                </div>


            );
        }
        return this.props.children;
    }
}

export default ErrorBoundary;