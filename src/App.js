import React, {Component} from 'react';
import './styles/App.css';
import db from './db'

import Nav from './Nav/Nav';
import Sidebar from './Sidebar/Sidebar';
import Main from './Main/Main';

import {arrayMove} from 'react-sortable-hoc';
import Handlebars from 'handlebars';

const fs = require('fs');
const electron = require('electron');
const {dialog} = require('electron').remote

const app = electron.remote.app;
const userData = app.getAppPath('userData');

class App extends Component {
  constructor() {
    super()
    this.state = {
      currentTemplate: '',
      currentComponents: [],
      htmlContent: '',
      jsContent: ''
    }
    this.changeCurrentTemplate = this.changeCurrentTemplate.bind(this)
    this.addComponentToTemplate = this.addComponentToTemplate.bind(this)
    this.removeComponentFromTemplate = this.removeComponentFromTemplate.bind(this)
    this.SortComponentsEnd = this.SortComponentsEnd.bind(this)
    this.reBuildIndex = this.reBuildIndex.bind(this)
    this.exportFile = this.exportFile.bind(this)
  }
  componentDidMount() {}
  changeCurrentTemplate(name) {
    db.components.find({template: name}).sort({index: 1}).exec((err, components) => {
      this.setState({currentTemplate: name, currentComponents: components})
    });
  }
  addComponentToTemplate(name, e) {
    if (this.state.currentTemplate !== undefined) {
      db.components.find({template: this.state.currentTemplate}).sort({index: 1}).exec((err, before_components) => {
        db.components.insert({
          name: name,
          template: this.state.currentTemplate,
          create_time: new Date().getTime(),
          index: before_components.length + 1
        }, (err, newrec) => {
          db.components.find({template: this.state.currentTemplate}).sort({index: 1}).exec((err, after_components) => {
            this.setState({currentComponents: after_components})
          })
        })
      })
    }
  }
  removeComponentFromTemplate(_id, e) {
    e.stopPropagation();
    db.components.remove({
      _id: _id,
      template: this.state.currentTemplate
    }, {}, (err, numRemoved) => {
      db.components.find({template: this.state.currentTemplate}).sort({index: 1}).exec((err, components) => {
        this.reBuildIndex(components)
      })
    });
  }
  SortComponentsEnd(index) {
    this.reBuildIndex(arrayMove(this.state.currentComponents, index.oldIndex, index.newIndex));
  }
  reBuildIndex(components_arr) {
    let newIndex = 1;
    for (var item of components_arr) {
      db.components.update({
        _id: item._id
      }, {
        $set: {
          index: newIndex++
        }
      })
    }
    db.components.find({template: this.state.currentTemplate}).sort({index: 1}).exec((err, components) => {
      this.setState({currentComponents: components});
    })
  }
  exportFile() {
    if (this.state.currentTemplate !== undefined && this.state.currentTemplate !== '') {
      if (this.state.currentComponents.length === 0) {
        dialog.showErrorBox('提示', '请添加至少一个组件');
      } else {

        for (let i of this.state.currentComponents) {
          fs.readFile(userData + '/data/snippets/' + i.name + '.html', (err, buf) => {
            let htmlString = Handlebars.compile(buf.toString())(JSON.parse(fs.readFileSync(userData + '/data/json/' + i.name + '.json', 'utf8')))
            this.setState({
              htmlContent: this.state.htmlContent + htmlString
            })
            console.info(this.state)
          });
          fs.readFile(userData + '/data/snippets/' + i.name + '.js', (err, buf) => {
            let jsString = Handlebars.compile(buf.toString())(JSON.parse(fs.readFileSync(userData + '/data/json/' + i.name + '.json', 'utf8')))
            this.setState({
              jsContent: this.state.jsContent + jsString
            })
            console.info(this.state)
          });
        }
      }
      /*
      dialog.showOpenDialog({
        properties: ['openDirectory'],
        buttonLabel: '导出'
      }, (path) => {
        if (typeof path !== 'undefined') {
          try {
            fs.writeFileSync(path + '/' + this.state.htmlFileName, this.state.htmlFileContent, 'utf-8');
            fs.writeFileSync(path + '/' + this.state.jsFileName, this.state.jsFileContent, 'utf-8');
          } catch (e) {
            alert('Failed to save the file !');
          }
        }
      })
      */
    } else {
      dialog.showErrorBox('提示', '请选择模板');
    }
  }
  render() {
    return (<div className="container" id="gpage">
      <Nav exportFile={this.exportFile}/>
      <div className="main-wrapper">
        <Sidebar changeCurrentTemplate={this.changeCurrentTemplate}/>
        <Main currentTemplate={this.state.currentTemplate} currentComponents={this.state.currentComponents} addComponentToTemplate={this.addComponentToTemplate} removeComponentFromTemplate={this.removeComponentFromTemplate} SortComponentsEnd={this.SortComponentsEnd}/>
      </div>
    </div>);
  }
}
export default App;
