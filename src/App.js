import React, { Component } from "react";
import "./styles/App.css";


import Sidebar from "./Sidebar/Sidebar";
import Main from "./Main/Main";

class App extends Component {
  render() {
    return (
      <div className="container" id="gpage">
        <header className="header">Gpage</header>
        <Sidebar />
        <Main />
      </div>
    );
  }
}
export default App;
