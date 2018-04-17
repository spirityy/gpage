import React, {Component} from 'react';

class Components extends Component {
  constructor() {
    super()
    this.state = {
      components: [
        {
          name: 'form-table'
        }
      ]
    }
  }
  addToContent() {
    console.info(123)
  }
  render() {
    return (<div>
      <div className="components">
        <ul>
          {
            this.state.components.map((component, i) => {
              return (<li key={i}>
                <button onClick={this.addToContent}>+ {component.name}</button>
              </li>)
            })
          }
        </ul>
      </div>
    </div>);
  }
}

export default Components;
