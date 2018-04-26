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
            <div className="current-template">currentTemplate:<strong>{this.props.currentTemplate}</strong></div>
            <Content currentTemplate={this.props.currentTemplate}/>
          </div>)
          : (<div>
            <Components/>
          </div>)
      }
    </div>);
  }
}

export default Main;
