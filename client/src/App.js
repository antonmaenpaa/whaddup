// import io from 'socket.io-client';
import { BrowserRouter as Router,  } from 'react-router-dom'
import {  Route, Switch } from "react-router";
import Join from './components/Join'
import Chat from './components/Chat'
import './App.css';
import Consumer from "./components/context/SocketContext";

function App() {

  return (
  <Consumer>
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
  </Consumer>
  );
}

export default App;
