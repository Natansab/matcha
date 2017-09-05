import React, { Component } from 'react';
import moment from 'moment';
import Client from './Client';

const defaultFilters = {
  minAge: 0,
  maxAge: 99,
};

export default class Search extends Component {
  constructor(props) {
    super(props);
    this.search = this.search.bind(this);
    this.handleChange = this.handleChange.bind(this);

    this.state = {
      hello: 'hello',
      users: [],
      filters: defaultFilters,
    };
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
      <tr key={user._id}>
        <td name="username">{user.username}</td>
        <td name="firstname">{user.firstname}</td>
        <td name="lastname">{user.lastname}</td>
        <td name="gender">{user.gender}</td>
        <td name="orientation">{user.orientation}</td>
        <td name="age">{user.age}</td>
      </tr>
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
        {/* {this.state.users} */}
        <table>
          <thead>
            <tr>
              <th>Username</th>
              <th>Firstname</th>
              <th>Lastname</th>
              <th>Gender</th>
              <th>Orientation</th>
              <th>Age</th>
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
