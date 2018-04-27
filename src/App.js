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
      currentComponents: []
    }
    this.changeCurrentTemplate = this.changeCurrentTemplate.bind(this)
    this.addComponentToTemplate = this.addComponentToTemplate.bind(this)
    this.removeComponentFromTemplate = this.removeComponentFromTemplate.bind(this)
  }
  componentDidMount() {}
  changeCurrentTemplate(name) {
    db.components.find({template: name}).sort({create_time: 1}).exec((err, components) => {
      this.setState({currentTemplate: name, currentComponents: components})
    });
  }
  addComponentToTemplate(name, e) {
    if (this.state.currentTemplate !== undefined) {
      db.components.insert({
        name: name,
        template: this.state.currentTemplate,
        create_time: new Date().getTime()
      }, (err, newrec) => {
        db.components.find({template: this.state.currentTemplate}).sort({create_time: 1}).exec((err, components) => {
          this.setState({currentComponents: components})
        })
      })
    }
  }
  removeComponentFromTemplate(name, e) {
    e.stopPropagation();
    db.components.remove({
      name: name,
      template: this.state.currentTemplate
    }, {}, (err, numRemoved) => {
      db.components.find({template: this.state.currentTemplate}).sort({create_time: 1}).exec((err, components) => {
        this.setState({currentComponents: components})
      })
    });
  }
  render() {
    return (<div className="container" id="gpage">
      <Nav/>
      <div className="main-wrapper">
        <Sidebar changeCurrentTemplate={this.changeCurrentTemplate}/>
        <Main currentTemplate={this.state.currentTemplate} currentComponents={this.state.currentComponents} addComponentToTemplate={this.addComponentToTemplate} removeComponentFromTemplate={this.removeComponentFromTemplate}/>
      </div>
    </div>);
  }
}
export default App;
