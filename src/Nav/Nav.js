import React, {Component} from 'react';
const {dialog} = require('electron').remote
const fs = require('fs');

class Nav extends Component {
  constructor() {
    super();
    this.state = {
      htmlFileName: 'aaaas.html',
      jsFileName: 'aaaas.js',
      htmlFileContent: 'aaaa',
      jsFileContent: 'function(){}'
    };
    this.export = this.export.bind(this);
  }
  export() {
    dialog.showOpenDialog({
      properties: ['openDirectory'],
      buttonLabel: '导出'
    }, (path) => {
      try {
        fs.writeFileSync(path + '/' + this.state.htmlFileName, this.state.htmlFileContent, 'utf-8');
        fs.writeFileSync(path + '/' + this.state.jsFileName, this.state.jsFileContent, 'utf-8');
      } catch (e) {
        alert('Failed to save the file !');
      }
    })
  }
  render() {
    const actions = [
      {
        className: 'btn btn-menu btn-sm export-btn',
        text: '导出'
      }
    ]
    return (<header className="header">
      <div className="logo">Gpage</div>
      <ul className="menu-action">
        <li>
          {
            actions.map((action, i) => {
              return (<button id="logout" key={i} className={action.className} onClick={this.export}>
                {action.text}
              </button>)
            })
          }
        </li>
      </ul>
    </header>);
  }
}

export default Nav;
