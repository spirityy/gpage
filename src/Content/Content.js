import React, {Component} from 'react';

import Editor from '../Editor/Editor';
import Layout from '../Layout/Layout';

class Content extends Component {
  render() {
    return (
      <div className="content">
        <Layout />
        <Editor />
      </div>
    );
  }
}

export default Content;
