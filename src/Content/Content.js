import React, {Component} from 'react';

import Editor from '../Editor/Editor';
import Layout from '../Layout/Layout';

class Content extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }
  componentDidMount() {
  }
  render() {
    return (<div className="content">
      <Layout components={this.props.currentComponents} removeComponentFromTemplate={this.props.removeComponentFromTemplate}/>
      <Editor/>
    </div>);
  }
}

export default Content;
