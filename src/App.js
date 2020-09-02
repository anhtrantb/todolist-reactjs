import React, { Component } from 'react'
import './App.css'
import check from './img/check.svg'
import notcheck from './img/notcheck.svg'
import menu from './img/menu.svg'
import ToDoItem from './components/ToDoItem.js'
const classNames = require('classnames');
class App extends Component{
  constructor(){
    super();
    this.completeState=false;
    this.notCompleteState=false;
    this.state={
      todoitem:[],
      inputValue:'',
      completeState:false,
      notCompleteState:false
    };
    this.defaultState={};
  }
  clickAll(){ // chọn hoặc hủy tất cả lựa chọn
    let d=0;
    let temp= Object.assign({},this.state);
    if(this.state.todoitem.length===0) return;
    //dem
      temp.todoitem.forEach((item)=>{
        if(item.isdone===true)
        d=d+1;
      })
      let newarr= temp.todoitem.map(item=>{
        if(d===temp.todoitem.length)
        item.isdone=!item.isdone;
        else 
        item.isdone=true;
        return item;
      })
      temp.todoitem=newarr;
      this.setState(temp);
  }
  getValue(event){//nhận giá trị của thẻ input
    let value =event.target.value;
    if(value.trim()===''||!value)return;//chuỗi toàn dấu cách hoặc không có
    if (event.key === 'Enter') {
      this.setState({
        todoitem: [...this.state.todoitem,
                  {title:value,isdone:false}],
        inputValue:''
      })
    }
  }
  complete(){ //việc đã hoàn thành
    var temp= Object.assign({},this.state);
    temp.completeState=true;
    if(temp.notCompleteState===false)  this.backup();
    temp.notCompleteState=false;

    let completeArr= this.defaultState.todoitem.filter(item=>{
      return item.isdone===true;
    });
    temp.todoitem=completeArr;
    this.setState(temp);
  }
  notcomplete(){//việc chưa hoàn thành
    var temp= Object.assign({},this.state);
    temp.notCompleteState=true;
    if(temp.completeState===false)  this.backup();
    temp.completeState=true;
    let notCompleteArr= this.defaultState.todoitem.filter(item=>{
      return item.isdone===false;
    });
    temp.todoitem=notCompleteArr;
    this.setState(temp);
  }
  backup(){
    this.defaultState= Object.assign({},this.state);
  }
  displayAll(){//hiển thị tất  cả 
    this.setState(this.defaultState);
  }
  deleteChecked(){//xóa mục đã chọn
    var temp= Object.assign({},this.state);
    let notCompleteArr= temp.todoitem.filter(item=>{
      return item.isdone===false;
    });
    temp.todoitem=notCompleteArr;
    this.defaultState=temp;
    this.setState(temp);
  }

  render(){
    var arrItem=this.state.todoitem;
    return (
    <div className='App'>
      <div>
        <input type='text' 
            placeholder='thêm việc cần làm...'
            className='inputText' 
            value ={this.state.inputValue}
            onChange={(event)=>{
              this.setState({
                inputValue:event.target.value
              })
            }}
            onKeyUp={this.getValue.bind(this)}>
        </input>
      </div>
      {
        (this.state.todoitem.length!==0)?//kiểm tra xem có gì để hiển thị không
        this.state.todoitem.map((item,index)=>{
          const ITEM= item;
          const INDEX = index;
          return (
          <div className = {classNames({'active':ITEM.isdone})}>
            {//hiển thị ra màn hình 
             
            <ToDoItem 
            item={item}
            key={index} 
            img = {
              ITEM.isdone===true? (<img src={check} alt='check'/>)
                      :(<img src={notcheck} alt='not check'/>) 
            }
            // check việc cần làm 
            onclick={()=>{
              const beginItem=arrItem.slice(0,INDEX);
              const newStateItem=ITEM;
              newStateItem.isdone=!newStateItem.isdone;
              const endItem=arrItem.slice(INDEX+1);
              this.setState({
                todoitem:[
                  ...beginItem,
                  newStateItem,
                  ...endItem
                ]
              }) 
            }} 
            />}
          </div>
          )
        }):(<p>không có gì để hiển thị</p>)
      }
      <div className='menu'>
        <img src={menu} alt='menu' className='menuIcon' />
        <ul className='listInMenu'>
          <li onClick={this.clickAll.bind(this)}>chọn/hủy tất cả</li>
          <li onClick={this.complete.bind(this)}>đã hoàn thành</li>
          <li onClick={this.notcomplete.bind(this)}>chưa hoàn thành</li>
          <li onClick={this.displayAll.bind(this)}>hiển thị tất cả</li>
          <li onClick={this.deleteChecked.bind(this)}>xóa mục đã chọn</li>
        </ul>
      </div>
    </div>
    ) 
  }
}
export default App;