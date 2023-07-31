import React, { Component } from 'react';
import { nanoid } from 'nanoid';

import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';
import ImageGalleryItem from './ImageGalleryItem';
import Loader from './Loader';
import Button from './Button';
import Modal from './Modal';

class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  render() {
    return <div>{'hi'}</div>;
  }
}

export default App;
