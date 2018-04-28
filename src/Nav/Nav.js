import React, {Component} from 'react';

class Nav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      htmlFileName: 'gpage.html',
      jsFileName: 'gpage.js',
      htmlFileContent: 'aaaa',
      jsFileContent: 'function(){}'
    };
  }
  render() {
    const actions = [
      {
        className: 'btn btn-menu btn-sm export-btn',
        text: 'Export'
      }
    ]
    return (<header className="header">
      <div className="logo">GPage</div>
      <ul className="menu-action">
        <li>
          {
            actions.map((action, i) => {
              return (<button id="logout" key={i} className={action.className} onClick={this.props.makeResultFile}>
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
