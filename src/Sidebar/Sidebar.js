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
    }
    this.addPage = this.addPage.bind(this)
    this.editPageName = this.editPageName.bind(this)
    this.deletePage = this.deletePage.bind(this)
  }
  editPageName(event) {
    this.setState({addingPage: event.target.value})
  }
  addPage() {
    if (this.checkPage(this.state.addingPage)) {
      this.setState({
        pages: this.state.pages.concat({name: this.state.addingPage})
      })
    }
  }
  deletePage(name) {
    let arr = this.state.pages
    let filtered = arr.filter(function(el) { return el.name !== name })
    this.setState({pages: filtered})
  }
  checkPage(name) {
    if (name === '') {
      alert('not null')
      return false
    }
    let array = this.state.pages
    let ishas = array.some(function(o) {
      return o.name === name
    })
    if (ishas) {
      alert('exist')
      return false
    } else {
      return true
    }
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
