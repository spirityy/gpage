import React, {Component} from 'react';

class Layout extends Component {
  constructor(props) {
    super(props)
    this.sort = this.sort.bind(this)
  }
  sort() {}
  render() {
    return (<div className="layout">
      <ul>
        {
          this.props.components.map((component, i) => {
            return (<li key={i}>
              <i className="fa fa-times-circle" onClick={(e) => this.props.removeComponentFromTemplate(component.name, e)}></i>
              {component.name}
            </li>);
          })
        }
      </ul>
    </div>);
  }
}

export default Layout;
