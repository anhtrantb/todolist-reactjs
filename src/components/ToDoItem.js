import React, { Component } from 'react'
import './ToDoItem.css'
class ToDoItem extends Component {
  render(){
    return(
      <div className='main'>
        <div className='image' 
          onClick={this.props.onclick}>{this.props.img} </div>
        <div className='content'>{this.props.item.title}</div>
      </div>
    )
  }
}
export default ToDoItem