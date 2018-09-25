import React from 'react';
import { Route, Switch } from 'react-router-dom';
import BoxContainer  from './BoxContainer';
import AboutReact from './AboutReact';
import NoteContainer from './NoteContainer';
import UserList from './UserList';
import practice061 from './practice061';

const Routes = () => (
  <Switch>
    <Route exact path="/Login" component={Login} />
    <Route exact path="/BoxList" component={BoxContainer} />
    <Route exact path="/About" component={AboutReact} />
    <Route exact path="/MyNotes" component={NoteContainer} />
    <Route exact path="/users" component={UserList} />
    <Route exact path="/contact" component={contact} />
    <Route exact path="/mypractice01" component={practice061} />
    
  </Switch>
);

export default Routes;
