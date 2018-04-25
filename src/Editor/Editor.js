import React, {Component} from 'react';

import brace from 'brace';
import AceEditor from 'react-ace';

import 'brace/mode/json';
import 'brace/theme/textmate';

class Editor extends Component {
  Change(newValue) {
    console.log('change', newValue);
  }
  render() {
    return (<div className="editor">
      <AceEditor mode="json" theme="textmate" onChange={this.Change} width="100%" height="100%" name="editor" />
    </div>);
  }
}

export default Editor;
