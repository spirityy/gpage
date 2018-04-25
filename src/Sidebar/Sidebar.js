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
    this.addTemplate = this.addTemplate.bind(this);
    this.editTemplateName = this.editTemplateName.bind(this);
    this.deleteTemplate = this.deleteTemplate.bind(this);
  }
  componentDidMount() {
    db.templates.find({}).sort({create_time: 1}).exec((err, templates) => {
      console.info(templates)
      this.setState({templates: templates})
    });

    /*
    axios.get("http://www.reddit.com/r/reactjs.json").then(res => {
      console.info(res);
    });
    */
  }
  editTemplateName(event) {
    this.setState({addingTemplate: event.target.value});
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
  deleteTemplate(name) {
    db.templates.remove({
      name: name
    }, {}, (err, numRemoved) => {
      db.templates.find({}).sort({create_time: 1}).exec((err, templates) => {
        this.setState({templates: templates});
      });
    });
  }
  checkTemplate(name) {
    if (name === "") {
      dialog.showErrorBox('错误', '不为空')
      return false;
    }
    let array = this.state.templates;
    let ishas = array.some(function(o) {
      return o.name === name;
    });
    if (ishas) {
      dialog.showErrorBox('错误', '已存在')
      return false;
    } else {
      return true;
    }
  }
  render() {
    return (<div className="sidebar">
      <div>
        <input type="text" onChange={this.editTemplateName}/>
        <button type="button" onClick={this.addTemplate}>
          +
        </button>
      </div>
      <ul>
        {
          this.state.templates.map((template, i) => {
            return (<li key={i}>
              <a href="javascript:;" onClick={() => this.props.changeCurrentTemplate(template.name)}>
                {template.name}
                <span onClick={() => this.deleteTemplate(template.name)}>
                  X
                </span>
              </a>
            </li>);
          })
        }
      </ul>
    </div>);
  }
}

export default Sidebar;
