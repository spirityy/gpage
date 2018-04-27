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
              {component.name}
            </li>);
          })
        }
      </ul>
    </div>);
  }
}

export default Layout;
