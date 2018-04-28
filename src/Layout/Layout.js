import React, {Component} from 'react';
import {SortableContainer, SortableElement,SortableHandle} from 'react-sortable-hoc';

class Layout extends Component {
  /*
  constructor(props) {
    super(props)
  }
  */
  render() {
    const DragHandle = SortableHandle(({value}) => <div className="item-name">{value.name}</div>)
    const SortableItem = SortableElement(({value}) => {
      return (<li>
        <DragHandle value={value}/>
        <div className="item-action">
          <i className="fa fa-edit"></i>
          <i className="fa fa-trash-o" onClick={(e) => this.props.removeComponentFromTemplate(value._id, e)}></i>
        </div>
      </li>)
    });

    const SortableList = SortableContainer(({items}) => {
      return (<ul>
        {items.map((value, index) => (<SortableItem key={index} index={index} value={value}/>))}
      </ul>);
    });
    return (<div className="layout">
      <SortableList items={this.props.components} onSortEnd={this.props.SortComponentsEnd} useDragHandle={true}/>
    </div>);
  }
}

export default Layout;
