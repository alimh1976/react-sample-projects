import React, { Component } from 'react';
import { ReactDOM } from 'react-dom';

class UserList extends Component {
    constructor(){
        super()
        this.state={userList:[], isLoading:false};
        this.loadUsers = this.loadUsers.bind(this);
        this.generateRow = this.generateRow.bind(this);
        this.saveUser = this.saveUser.bind(this);
    }

    loadUsers(){
        this.setState({ isLoading:true });

        fetch('http://localhost:4373/api/user')
        .then(response => response.json())
        .then(data => this.setState({ userList:data, isLoading:false }));
    }

    saveUser(){
        let user = {};
        user.firstName = this.refs.firstName.value;
        user.lastName = this.refs.lastName.value;
        user.email = this.refs.email.value;

        window.console.log(user);

        fetch('http://localhost:4373/api/user', {
            mode: 'no-cors', // I just add that,
            method: 'get',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json; charset=utf-8'
              },
            body: JSON.stringify(user)
        }).then(function(response) {
            window.console.log(response);
          }).then(function(data) {
            window.console.log(data);
          });
    }

    generateRow(user, i){
        return(
            <tr>
            <td>{i + 1}</td>
            <td>{user.firstName}</td>
            <td>{user.lastName}</td>
            <td>{user.email}</td>                          
        </tr>
        );
    }

    render() {
        return (
            <div className="row">
              <div className="col-md-6">
              <h2>User List</h2>
                <button className="btn btn-primary" disabled={this.state.isLoading} onClick={this.loadUsers}>show users</button>
                <div className="text-center" className={this.state.isLoading ? "" : "hidden"}>
                    <i className="fa fa-spin fa-spinner fa-2x"></i>
                    wait loading data
                </div>
                <hr />
                <table className="table table-striped table-bordered">
                    <thead>
                        <tr>
                            <th>id</th>
                            <th>first name</th>
                            <th>last name</th>
                            <th>email</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.userList.map(this.generateRow)}
                    </tbody>
                </table>
              </div>
              <div className="col-md-6">
              <h2>Add New User</h2>
               <div>
                   firstName : <input ref="firstName" className="form-control" />
               </div>
               <div>
                   lastName : <input ref="lastName" className="form-control" />
               </div>
               <div>
                   email : <input ref="email" className="form-control" />
               </div>
               <div>
                   <button className="btn btn-success btn-sm" onClick={this.saveUser}>
                   <i className="fa fa-save fa-fw"></i>
                   Save
                   </button>
               </div>
              </div>
               
            </div>
        );
    }
}

export default UserList;