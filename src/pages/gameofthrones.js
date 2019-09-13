import React, { Component } from 'react';

class gameofthrones extends Component {
  componentDidMount() {
    window.location.href = `https://gameofthronesintrocreator.kassellabs.io/${window.location.hash}`;
  }

  render() {
    return (
      <div />
    );
  }
}

gameofthrones.propTypes = {

};

export default gameofthrones;
