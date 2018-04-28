import React, {Component} from 'react';
import './styles/App.css';
import db from './db'

import Nav from './Nav/Nav';
import Sidebar from './Sidebar/Sidebar';
import Main from './Main/Main';

import {arrayMove} from 'react-sortable-hoc';
import Handlebars from 'handlebars/dist/handlebars.min.js';

const fs = require('fs');
const electron = require('electron');
const {dialog} = require('electron').remote

const app = electron.remote.app;
const userData = app.getAppPath('userData');

const async = require("async");

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
    this.makeResultFile = this.makeResultFile.bind(this)
    this.dialogExport = this.dialogExport.bind(this)
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
  makeResultFile() {
    if (this.state.currentTemplate !== undefined && this.state.currentTemplate !== '') {
      if (this.state.currentComponents.length === 0) {
        dialog.showErrorBox('提示', '请添加至少一个组件');
      } else {
        let htmlString = ''
        let jsString = ''
        async.each(this.state.currentComponents, (i, callback) => {
          async.parallel([
            function(cb) {
              fs.readFile(userData + '/data/components/' + i.name + '.html', 'utf8', (err, buf) => {
                htmlString += Handlebars.compile(buf.toString())(JSON.parse(fs.readFileSync(userData + '/data/json/' + i.name + '.json', 'utf8')))
                cb();
              })
            },
            function(cb) {
              fs.readFile(userData + '/data/components/' + i.name + '.js', 'utf8', (err, buf) => {
                jsString += Handlebars.compile(buf.toString())(JSON.parse(fs.readFileSync(userData + '/data/json/' + i.name + '.json', 'utf8')))
                cb();
              });
            }
          ], (err) => {
            callback();
          })
        }, (err) => {
          async.parallel([
            (ccb) => {
              fs.readFile(userData + '/data/base/base.html', 'utf8', (err, buf) => {
                this.setState({
                  htmlContent: Handlebars.compile(buf.toString())({htmlContent: htmlString})
                })
                ccb()
              })
            },
            (ccb) => {
              fs.readFile(userData + '/data/base/base.js', 'utf8', (err, buf) => {
                console.info(Handlebars.compile(buf.toString())({jsContent: jsString}))
                this.setState({
                  jsContent: Handlebars.compile(buf.toString())({jsContent: jsString})
                })
                ccb();
              })
            }
          ], () => {
            this.dialogExport();
          })
        });
      }
    } else {
      dialog.showErrorBox('提示', '请选择模板');
    }
  }
  dialogExport() {
    dialog.showOpenDialog({
      properties: ['openDirectory'],
      buttonLabel: '导出'
    }, (path) => {
      if (typeof path !== 'undefined') {
        try {
          fs.writeFileSync(path + '/' + this.state.currentTemplate + '.html', this.state.htmlContent, 'utf-8');
          fs.writeFileSync(path + '/' + this.state.currentTemplate + '.js', this.state.jsContent, 'utf-8');
        } catch (e) {
          dialog.showErrorBox('错误', '导出失败，请重试');
        }
      }
    })
  }
  render() {
    return (<div className="container" id="gpage">
      <Nav makeResultFile={this.makeResultFile}/>
      <div className="main-wrapper">
        <Sidebar changeCurrentTemplate={this.changeCurrentTemplate}/>
        <Main currentTemplate={this.state.currentTemplate} currentComponents={this.state.currentComponents} addComponentToTemplate={this.addComponentToTemplate} removeComponentFromTemplate={this.removeComponentFromTemplate} SortComponentsEnd={this.SortComponentsEnd}/>
      </div>
    </div>);
  }
}
export default App;
