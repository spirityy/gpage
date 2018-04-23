import React, {Component} from 'react';

import Components from '../Components/Components'
import Content from '../Content/Content'

class Main extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (<div>
      <div className="main">
        <Components currentTemplate={this.props.currentTemplate}></Components>
        <Content currentComponents={this.props.currentComponents}></Content>
      </div>
    </div>);
  }
}

export default Main;
