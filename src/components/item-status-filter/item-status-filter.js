import React, { Component } from 'react';

import './item-status-filter.css';


export default class ItemStatusFilter extends Component {

  render() {
    const {onToggleSearchBtn, searchBtn} = this.props;
    const classNames = {all: searchBtn.all ? "btn btn-info" : "btn btn-outline-secondary",
    active: searchBtn.active ? "btn btn-info" : "btn btn-outline-secondary",
    done: searchBtn.done ? "btn btn-info" : "btn btn-outline-secondary"}
    return (
      <div className="btn-group">
        <button type="button"
                className={classNames.all}
                onClick={()=>onToggleSearchBtn('all')}>All</button>
        <button type="button"
                className={classNames.active}
                onClick={()=>onToggleSearchBtn('active')}>Active</button>
        <button type="button"
                className={classNames.done}
                onClick={()=>onToggleSearchBtn('done')}>Done</button>
      </div>
    );
  }
}
