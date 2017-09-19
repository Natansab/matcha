import React, { Component } from 'react';
import moment from 'moment';
import Client from '../../Client';
import TableRows from './TableRows';
import SortableColumnHeader from './SortableColumnHeader';

const defaultFilters = {
  minAge: 0,
  maxAge: 99,
};

export default class Search extends Component {
  constructor(props) {
    super(props);
    this.search = this.search.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSort = this.handleSort.bind(this);
    this.state = {
      hello: 'hello',
      users: [],
      filters: defaultFilters,
      sort: {},
    };
  }

  handleSort(column, dir) {
    this.setState((prevState) => {
      const sort = prevState.sort;
      sort[column.toLowerCase()] = dir;
      return ({ sort });
    });
  }

  search() {
    Client.search(users => {
      users.data.forEach((user) => {
        user.age = parseInt(moment(user.dob).fromNow().split(' ')[0], 10);
        delete user.dob;
      });
      this.setState({ users: users.data });
    });
  }

  handleChange(e) {
    const filters = this.state.filters;
    e.target.value = e.target.value === '' ? defaultFilters[e.target.name] : e.target.value;
    filters[e.target.name] = parseInt(e.target.value, 10);
    this.setState({ filters });
  }

  render() {
    const usersFiltered = [];
    this.state.users.forEach(user => {
      if (this.state.filters.minAge < user.age) usersFiltered.push(user);
    });

    const userRows = usersFiltered.map(user => (
      <TableRows user={user}/>
    ));
    return (
      <div>
        <button onClick={this.search}>Search</button>
        <br/>
        Select Age Range:
        <form onChange={this.handleChange}>
          <input type='number' name='minAge' value={this.state.filters.minAge} />
          <input type='number' name='maxAge' value={this.state.filters.maxAge} />
        </form>
        <table>
          <thead>
            <tr>
              <th>Username</th>
              <th>Firstname</th>
              <th>Lastname</th>
              <th>Gender</th>
              <th>Orientation</th>
              <SortableColumnHeader
                column='Age'
                onSort={this.handleSort}
                currentSort={this.state.sort}
              />
              <th>Interests</th>
            </tr>
          </thead>
          <tbody>
            {userRows}
          </tbody>
        </table>
      </div>
    );
  }
}
