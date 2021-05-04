// import io from 'socket.io-client';
import React, { useState } from 'react';
import { BrowserRouter as Router,  } from 'react-router-dom'
import {  Route, Switch } from "react-router";
import Join from './components/Join'
import Chat from './components/Chat'
import './App.css';




function App() {

  const [userName, setUserName] = useState("");

  const [isLoggedin, setIsLoggedin] = useState(false)



function saveUserName(e){
  setUserName(e.target.value)
}

function enterChatRoom(e) {
  e.preventDefault()
    if(userName === ""){
        return
    }

    setIsLoggedin(true)
}



  return (

    <Router>
      <Switch>
        <Route exact path="/">
          <Join 
            enterChatRoom={enterChatRoom} 
            userName={saveUserName} 
            loggedIn={isLoggedin}/>
        </Route>
        <Route path="/chat">
          <Chat 
            userName={userName} 
            />      
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
