import React, { Component } from 'react';

import Components from '../Components/Components'
import Content from '../Content/Content'

class Main extends Component {
  render() {
    return (
      <div>
        <div className="main">
          <Components></Components>
          <Content></Content>
        </div>
      </div>
    );
  }
}

export default Main;
