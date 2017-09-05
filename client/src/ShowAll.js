import React, { Component } from 'react';
import Client from './Client';

export default class ShowAll extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hello: 'hello',
    };
  }

  render() {
    console.log(this.state.hello);
    console.log(Client.showAll());

    return (
      <div>
        HELLOOOO
      </div>
    );
  }
}
