import React, { Component } from 'react';
import Notiflix from 'notiflix';

import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';
import Loader from './Loader';
import Button from './Button';
import { fetchImages } from './Service';

class App extends Component {
  state = {
    searchQuery: '',
    galleryItems: [],
    page: 1,
    loadMore: false,
    status: null,
  };

  async componentDidUpdate(prevProps, prevState) {
    const { page, searchQuery } = this.state;
    const differentSearchQuery = prevState.searchQuery !== searchQuery;
    const differentPage = prevState.page !== page;
    if (differentSearchQuery || differentPage) {
      this.setState({ status: 'pending' });
      try {
        const parseResponse = await fetchImages(page, searchQuery);
        if (parseResponse.data.hits.length === 0) {
          Notiflix.Notify.failure(
            `Sorry, there are no images matching search query ${this.props.searchQuery}`
          );
          return;
        }

        this.setState(prevState => ({
          galleryItems: [...prevState.galleryItems, ...parseResponse.data.hits],
          status: 'resolved',
          loadMore: page < Math.ceil(parseResponse.data.totalHits / 12),
        }));
      } catch (error) {
        Notiflix.Notify.failure(error);
        this.setState({ status: 'rejected' });
      }
    }
  }

  incrementPage = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  handleFormSubmit = searchQuery => {
    this.setState({ searchQuery, page: 1, galleryItems: [] });
  };

  render() {
    const { loadMore, status, galleryItems } = this.state;
    return (
      <div>
        <Searchbar onSubmit={this.handleFormSubmit} />
        {status === 'pending' && <Loader />}
        {galleryItems.length > 0 && (
          <ImageGallery galleryItems={galleryItems} />
        )}
        {loadMore && <Button onClick={this.incrementPage}></Button>}
      </div>
    );
  }
}

export default App;
