import React, {Component} from 'react';

class Sidebar extends Component {
  constructor() {
    super()
    this.state = {
      addingPage: '',
      pages: [
        {
          name: 'aaaa'
        }
      ]
    };
    this.addPage = this.addPage.bind(this);
    this.editPageName = this.editPageName.bind(this);
    this.deletePage = this.deletePage.bind(this);
  }
  editPageName(event) {
    this.setState({addingPage: event.target.value});
  }
  addPage() {
    this.setState({
      pages: this.state.pages.concat({name: this.state.addingPage})
    })
  }
  deletePage(name) {
    var array = this.state.pages
    var index = array.indexOf(name)
    array.splice(index, 1)
    this.setState({pages: array})
  }
  render() {
    return (<div className="sidebar">
      <div>
        <input type="text" onChange={this.editPageName}></input>
        <button type="button" onClick={this.addPage}>+</button>
      </div>
      <ul>
        {
          this.state.pages.map((page, i) => {
            return (<li key={i}>
              <a href="javascript:void(0);">{page.name}
                <span onClick={() => this.deletePage(page.name)}>X</span>
              </a>
            </li>)
          })
        }
      </ul>
    </div>);
  }
}

export default Sidebar;
