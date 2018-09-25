import React, { Component } from 'react';

class Login extends Component {
    constructor(){
        super();
    }
    login(){
        fetch('http://localhost:4373/api/token?username=ali&password=1234')
        .then(response => response.json())
        .then(data => {
          window.alert(data);
          window.localStorage.setItem('token', data);
        });
    }
    render() {
        return (
            <div>
                <button onClick={this.login}>
                    Login 
                    </button>     
            </div>
        );
    }
}
export default Login;