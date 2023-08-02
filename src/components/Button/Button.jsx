import { Component } from 'react';
import PropTypes from 'prop-types';
import css from './Button.css';

class Button extends Component {
  render() {
    return (
      <button type="click" onClick={this.props.onClick}>
        Load more
      </button>
    );
  }
}

export default Button;
