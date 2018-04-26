import React, {Component} from 'react';
import db from "../db";

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
    this.addComponentToTemplate = this.addComponentToTemplate.bind(this)
  }
  componentDidMount() {
    //this.setState({components: this.props.currentComponents})
  }
  addComponentToTemplate(name,e) {
    db.components.insert({
      name: name,
      template:this.props.currentTemplate,
      create_time: new Date().getTime()
    }, (err, newrec) => {
    })
  }
  render() {
    return (<div>
      <div className="components">
        <ul>
          {
            this.state.components.map((component, i) => {
              return (<li key={i}>
                <button onClick={(e) => this.addComponentToTemplate(component.name, e)}>
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
