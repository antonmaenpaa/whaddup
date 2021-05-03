// import io from 'socket.io-client';
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom'
import { Route, Switch } from "react-router";
import Join from './components/Join'
import Chat from './components/Chat'
import './App.css';



function App() {

  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Join />
        </Route>
        <Route path="/chat">
          <Chat />      
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
