import React, {Component} from 'react';
import db from "../db";

import Editor from '../Editor/Editor';
import Layout from '../Layout/Layout';

class Content extends Component {
  constructor(props) {
    super(props)
    this.state = {
      components: []
    }
  }
  componentDidMount() {
    db.components.find({template:this.props.currentTemplate}).sort({create_time: 1}).exec((err, components) => {
      console.info(components);
    });
  }
  render() {
    return (<div className="content">
      <Layout/>
      <Editor/>
    </div>);
  }
}

export default Content;
