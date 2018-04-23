import React, {Component} from 'react';
import './styles/App.css';

import Nav from './Nav/Nav';
import Sidebar from './Sidebar/Sidebar';
import Main from './Main/Main';

import db from "./db";

class App extends Component {
  constructor() {
    super()
    this.state = {
      currentTemplate: '3213213',
      currentComponents: []
    }
  }
  componentDidMount() {}
  changeCurrentTemplate(e) {
    console.info(e.target);
    //e.preventDefault()
    //this.setState({currentTemplate: template})
  }
  render() {
    return (<div className="container" id="gpage">
      <Nav/>
      <div className="content">
        {this.state.currentTemplate}
        <Sidebar changeCurrentTemplate={this.changeCurrentTemplate}/>
        <Main currentTemplate={this.state.currentTemplate} currentComponents={this.state.currentComponents}/>
      </div>
    </div>);
  }
}
export default App;
