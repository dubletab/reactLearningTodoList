import React, { Component } from 'react';

import AppHeader from '../app-header';
import SearchPanel from '../search-panel';
import TodoList from '../todo-list';
import ItemStatusFilter from '../item-status-filter';
import ItemAddForm from '../item-add-form';

import './app.css';

export default class App extends Component {

  maxId = 100;

  state = {
    todoData: [
      this.createTodoItem('Learn ReactJS'),
      this.createTodoItem('Make app'),
      this.createTodoItem('Have a nice day'),
      this.createTodoItem('Do my work')
    ],
    searchWord: '',
    searchBtn: {all: true, active: false, done: false}
  };

  createTodoItem(label) {
    return {
      label,
      important: false,
      done: false,
      id: this.maxId++
    }
  }

  deleteItem = (id) => {
    this.setState(({ todoData }) => {
      const idx = todoData.findIndex((el) => el.id === id);

      const newArray = [
        ...todoData.slice(0, idx),
        ...todoData.slice(idx + 1)
      ];

      return {
        todoData: newArray
      };
    });
  };

  addItem = (text) => {
    const newItem = this.createTodoItem(text);

    this.setState(({ todoData }) => {
      const newArr = [
        ...todoData,
        newItem
      ];

      return {
        todoData: newArr
      };
    });

  };

  toggleProperty(arr, id, propName) {
    const idx = arr.findIndex((el) => el.id === id);

    const oldItem = arr[idx];
    const newItem = {...oldItem,
      [propName]: !oldItem[propName]};

    return [
      ...arr.slice(0, idx),
      newItem,
      ...arr.slice(idx + 1)
    ];
  }

  filterItems = (todoArray) => {
    const {searchWord, searchBtn} = this.state;
    if(searchWord === '' & searchBtn.all) return todoArray;
    if(!searchBtn.all){
      const isDoneBtn = searchBtn.done;
      return todoArray.filter((el) => {
        if(el.label.toUpperCase().indexOf(searchWord) >= 0 & el.done == isDoneBtn) return true
        else return false
    })
    } else {
      return todoArray.filter((el) => {
        if(el.label.toUpperCase().indexOf(searchWord) >= 0) return true
        else return false
    })
    } 
  }

  onToggleDone = (id) => {
    this.setState(({ todoData }) => {
      return {
        todoData: this.toggleProperty(todoData, id, 'done')
      };
    });
  };

  onToggleImportant = (id) => {
    this.setState(({ todoData }) => {
      return {
        todoData: this.toggleProperty(todoData, id, 'important')
      };
    });
  };

  onSearchItems = (e) => {
    this.setState({searchWord: e.target.value.toUpperCase()});
    console.log(e.target.value.toUpperCase());
  }

  onToggleSearchBtn = (btn) => {
    const newSearchBtn = {all: false, active: false, done: false, [btn]: true};
    this.setState({searchBtn: newSearchBtn});
  }

  render() {

    const { todoData, searchBtn } = this.state;
    const doneCount = todoData
                      .filter((el) => el.done).length;
    const todoCount = todoData.length - doneCount;

    return (
      <div className="todo-app">
        <AppHeader toDo={todoCount} done={doneCount} />
        <div className="top-panel d-flex">
          <SearchPanel onSearchItems={this.onSearchItems}/>
          <ItemStatusFilter onToggleSearchBtn={this.onToggleSearchBtn}
            searchBtn={searchBtn}
          />
        </div>

        <TodoList
          todos={this.filterItems(todoData)}
          onDeleted={ this.deleteItem }
          onToggleImportant={this.onToggleImportant}
          onToggleDone={this.onToggleDone}
        />

        <ItemAddForm onItemAdded={this.addItem}/>
      </div>
    );
  }
};
