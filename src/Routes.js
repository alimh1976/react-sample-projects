import React from 'react';
import { Route, Switch } from 'react-router-dom';
import BoxContainer  from './BoxContainer';
import AboutReact from './AboutReact';
import NoteContainer from './NoteContainer';
import Product from './Product';
import UserList from './UserList';
import contact from './contact';
import Login from './Login';
import practice061 from './practice061';

const Routes = () => (
  <Switch>
    <Route exact path="/Login" component={Login} />
    <Route exact path="/BoxList" component={BoxContainer} />
    <Route exact path="/About" component={AboutReact} />
    <Route exact path="/MyNotes" component={NoteContainer} />
    <Route exact path="/users" component={UserList} />
    <Route exact path="/contact" component={contact} />
    <Route exact path="/products" component={Product} />
    <Route exact path="/mypractice01" component={practice061} />
    
  </Switch>
);

export default Routes;
