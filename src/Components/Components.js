import React, {Component} from 'react';
//import db from "../db";

class Components extends Component {
  constructor(props) {
    super(props)
    this.state = {
      components: [
        {
          name: 'Table',
          htmlContent: '',
          jsContent: ''
        }, {
          name: 'Form(Table)',
          htmlContent: '',
          jsContent: ''
        }, {
          name: 'Button(Table)',
          htmlContent: '',
          jsContent: ''
        }
      ]
    }
  }
  componentDidMount() {
    //this.setState({components: this.props.currentComponents})
  }
  render() {
    return (<div>
      <div className="components">
        <ul>
          {
            this.state.components.map((component, i) => {
              return (<li key={i}>
                <button onClick={(e) => this.props.addComponentToTemplate(component.name, e)}>
                  {component.name}</button>
              </li>)
            })
          }
        </ul>
      </div>
    </div>);
  }
}

export default Components;
