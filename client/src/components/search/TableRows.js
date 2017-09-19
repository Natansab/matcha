import React, { Component } from 'react';

export default class TableRows extends Component {
  render() {
    const user = this.props.user;
    return (
      <tr key={user._id}>
        <td name="username">{user.username}</td>
        <td name="firstname">{user.firstname}</td>
        <td name="lastname">{user.lastname}</td>
        <td name="gender">{user.gender}</td>
        <td name="orientation">{user.orientation}</td>
        <td name="age">{user.age}</td>
        <td name="interests">{user.interest.join(', ')}</td>
      </tr>
    );
  }
}
