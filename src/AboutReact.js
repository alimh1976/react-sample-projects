import React, { Component } from 'react';

class AboutReact extends Component {
    render() {
        return (
            <div>
                <h1>
                About React JS
                </h1>
                <p>
                A Simple Component. React components implement a render() method that takes input data and returns what to display. This example uses an XML-like syntax called JSX. Input data that is passed into the component can be accessed by render() via this.props .
                </p>
            </div>
        );
    }
}

export default AboutReact;