import React, { Component } from "react";
import "./styles/App.css";

import Nav from "./Nav/Nav";
import Sidebar from "./Sidebar/Sidebar";
import Main from "./Main/Main";

class App extends Component {
  render() {
    return (
      <div className="container" id="gpage">
        <Nav />
        <Sidebar />
        <Main />
      </div>
    );
  }
}
export default App;
