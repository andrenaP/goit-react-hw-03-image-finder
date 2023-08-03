import { Component } from 'react';
import './Loader.css';
import { Audio } from 'react-loader-spinner';

class Loader extends Component {
  render() {
    return (
      <Audio
        height="100vh"
        width="100vw"
        radius="9"
        color="green"
        ariaLabel="three-dots-loading"
        wrapperStyle={{}}
        wrapperClass="Audio-class"
      />
    );
  }
}

export default Loader;
