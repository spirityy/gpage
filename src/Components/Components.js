import React, {Component} from 'react';

class Components extends Component {
  constructor(props) {
    super(props)
    this.state = {
      components: [
        {
          name: 'form-table'
        }
      ]
    }
  }
  componentDidMount() {
    console.info(this.props);
    //this.setState({components: this.props.currentComponents})
  }
  render() {
    return (<div>
      <div className="components">
        <ul>
          {
            this.state.components.map((component, i) => {
              return (<li key={i}>
                <button onClick={this.addToContent}>
                  + {component.name}</button>
              </li>)
            })
          }
        </ul>
      </div>
    </div>);
  }
}

export default Components;
