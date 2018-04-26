import React, {Component} from 'react';

//import brace from 'brace';
import AceEditor from 'react-ace';

import 'brace/mode/json';
import 'brace/theme/github';

class Editor extends Component {
  constructor(props) {
    super(props)
    this.state = {
      value: ''
    }
    this.setValue = this.setValue.bind(this)
  }
  componentDidMount() {
    this.setValue({a: '11'})
  }
  setValue(json) {
    this.setState({
      value: JSON.stringify(json, null, "\t")
    })
  }
  Change(newValue) {
    console.log('change', newValue);
  }
  render() {
    return (<div className="editor">
      <AceEditor mode="json" theme="github" onChange={this.Change} width="100%" height="100%" name="editor" value={this.state.value} editorProps={{
          $blockScrolling: true
        }} setOptions={{
          showLineNumbers: true,
          tabSize: 2
        }}/>
    </div>);
  }
}

export default Editor;
