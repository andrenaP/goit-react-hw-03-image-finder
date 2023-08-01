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
    searchQuery: '',
    page: 1,
  };

  incrementPage = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  handleFormSubmit = searchQuery => {
    this.setState({ searchQuery, page: 1 });
  };

  render() {
    return (
      <div>
        <Searchbar onSubmit={this.handleFormSubmit} />
        <ImageGallery />
      </div>
    );
  }
}

export default App;
