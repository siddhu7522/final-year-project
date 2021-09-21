import React, { useState } from "react"
import './App.css';
import Sidebar from "./Sidebar"
import Chat from "./Chat";
import Login from "./Login"
import {BrowserRouter as Router,Switch,Route,Link} from "react-router-dom";
import reducer,{initialState} from"./reducer";
import {StateProvider, useStateValue} from "./StateProvider"
function App() {
  const [{user},dispatch]=useStateValue()
  return (
    <div className="app">
     {!user?(
       <Login/>
     ):(
      <div className="app__body">
      <Router>
       
          <Sidebar/>
        <Switch>
          <Route path="/chats/:chatId">
          <Chat/>
          </Route>
        </Switch>
    
       
      </Router>
      </div>
     )}
    
     
   
    </div>
  );
}

export default App;
