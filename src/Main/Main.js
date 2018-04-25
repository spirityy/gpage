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
            <div>currentTemplate:{this.props.currentTemplate}</div>
            <Components currentTemplate={this.props.currentTemplate}/>
            <Content currentComponents={this.props.currentComponents}/>
          </div>)
          : ('')
      }
    </div>);
  }
}

export default Main;
