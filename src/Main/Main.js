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
            <Components currentTemplate={this.props.currentTemplate}/>
            <div className="current-template">currentTemplate:{this.props.currentTemplate}</div>
            <Content currentComponents={this.props.currentComponents}/>
          </div>)
          : (<div>
            <Components currentTemplate={this.props.currentTemplate}/>
          </div>)
      }
    </div>);
  }
}

export default Main;
