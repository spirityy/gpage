import React, {Component} from 'react';

import Components from '../Components/Components'
import Content from '../Content/Content'

class Main extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  render() {
    return (<div className="main">
      {
        this.props.currentTemplate
          ? (<div>
            <Components currentTemplate={this.props.currentTemplate} addComponentToTemplate={this.props.addComponentToTemplate}/>
            <div className="current-template">currentTemplate:<strong>{this.props.currentTemplate}</strong></div>
            <Content currentTemplate={this.props.currentTemplate} currentComponents={this.props.currentComponents}/>
          </div>)
          : (<div>
            <Components addComponentToTemplate={this.props.addComponentToTemplate}/>
          </div>)
      }
    </div>);
  }
}

export default Main;
