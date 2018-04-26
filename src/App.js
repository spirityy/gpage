import React, {Component} from 'react';
import './styles/App.css';

import Nav from './Nav/Nav';
import Sidebar from './Sidebar/Sidebar';
import Main from './Main/Main';

class App extends Component {
  constructor() {
    super()
    this.state = {
      currentTemplate: '',
    }
    this.changeCurrentTemplate = this.changeCurrentTemplate.bind(this)
  }
  componentDidMount() {}
  changeCurrentTemplate(name) {
    this.setState({currentTemplate: name})
  }
  render() {
    return (<div className="container" id="gpage">
      <Nav/>
      <div className="main-wrapper">
        <Sidebar changeCurrentTemplate={this.changeCurrentTemplate}/>
        <Main currentTemplate={this.state.currentTemplate} />
      </div>
    </div>);
  }
}
export default App;
