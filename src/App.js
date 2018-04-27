import React, {Component} from 'react';
import './styles/App.css';
import db from './db'

import Nav from './Nav/Nav';
import Sidebar from './Sidebar/Sidebar';
import Main from './Main/Main';

class App extends Component {
  constructor() {
    super()
    this.state = {
      currentTemplate: '',
      currentComponents:[]
    }
    this.changeCurrentTemplate = this.changeCurrentTemplate.bind(this)
  }
  componentDidMount() {}
  changeCurrentTemplate(name) {
    db.components.find({template: name}).sort({create_time: 1}).exec((err, components) => {
      this.setState({
        currentTemplate: name,
        currentComponents: components
      })
    });
  }
  render() {
    return (<div className="container" id="gpage">
      <Nav/>
      <div className="main-wrapper">
        <Sidebar changeCurrentTemplate={this.changeCurrentTemplate}/>
        <Main currentTemplate={this.state.currentTemplate} currentComponents={this.state.currentComponents} />
      </div>
    </div>);
  }
}
export default App;
