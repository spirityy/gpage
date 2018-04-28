import React, {Component} from "react";
//import axios from "axios";
import db from "../db";
const {dialog} = require('electron').remote

class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      addingTemplate: "",
      templates: []
    };
    this.addTemplate = this.addTemplate.bind(this)
    this.editTemplateName = this.editTemplateName.bind(this)
    this.deleteTemplate = this.deleteTemplate.bind(this)
    this.handleKeyPress = this.handleKeyPress.bind(this)
  }
  componentDidMount() {
    db.templates.find({}).sort({create_time: 1}).exec((err, templates) => {
      this.setState({templates: templates})
    });
  }
  editTemplateName(event) {
    this.setState({addingTemplate: event.target.value});
  }
  handleKeyPress(e) {
    if (e.key === 'Enter') {
      this.addTemplate()
    }
  }
  addTemplate() {
    if (this.checkTemplate(this.state.addingTemplate)) {
      //insert to db
      db.templates.insert({
        name: this.state.addingTemplate,
        create_time: new Date().getTime()
      }, (err, newrec) => {
        db.templates.find({}).sort({create_time: 1}).exec((err, templates) => {
          this.setState({templates: templates});
        });
      })
    }
  }
  deleteTemplate(name, e) {
    e.stopPropagation();
    db.templates.remove({
      name: name
    }, {}, (err, numRemoved) => {
      db.components.remove({
        template: name
      }, { multi: true }, (err, numRemoved) => {
        db.templates.find({}).sort({create_time: 1}).exec((err, templates) => {
          this.setState({templates: templates});
        });
      });
    });
  }
  checkTemplate(name) {
    if (name === "") {
      dialog.showErrorBox('提示', '请填写模板名称')
      return false;
    }
    let array = this.state.templates;
    let ishas = array.some(function(o) {
      return o.name === name;
    });
    if (ishas) {
      dialog.showErrorBox('提示', '不能重复添加相同模板')
      return false;
    } else {
      return true;
    }
  }
  render() {
    return (<div className="sidebar">
      <div className="side-title">
        <i className="fa fa-file-text-o"></i>
        &nbsp;Template
      </div>
      <div className="add-template">
        <input type="text" onChange={this.editTemplateName} onKeyPress={this.handleKeyPress}/>
        <i className="fa fa-plus-circle" onClick={this.addTemplate}></i>
      </div>
      <ul>
        {
          this.state.templates.map((template, i) => {
            return (<li key={i} onClick={() => this.props.changeCurrentTemplate(template.name)}>
              {template.name}
              <i className="fa fa fa-trash-o del-icon" onClick={(e) => this.deleteTemplate(template.name, e)}></i>
            </li>);
          })
        }
      </ul>
    </div>);
  }
}

export default Sidebar;
