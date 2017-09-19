import React, { Component } from 'react';

export default class SortableColumnHeader extends Component {
  constructor(props) {
    super(props);
    this.onSort = this.onSort.bind(this);
  }

  onSort(e) {
    this.props.onSort(this.props.column, e.target.name);
  }

  render() {
    return (
      <th>
        {this.props.column}
        <button name='asc' onClick={this.onSort}>&#x25B2;</button>
        <button name='desc' onClick={this.onSort}>&#x25BC;</button>
      </th>
    )
  }
}
