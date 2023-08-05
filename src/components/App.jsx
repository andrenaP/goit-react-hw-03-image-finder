import React, { Component } from 'react';
import Notiflix from 'notiflix';
import axios from 'axios';

import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';
import Loader from './Loader';
import Button from './Button';

const perPage = 12;
const API_KEY = '37324716-561554bcb566b8f1f5945e5c9';
const BASE_URL = 'https://pixabay.com/api/';

class App extends Component {
  state = {
    searchQuery: '',
    galleryItems: [],
    page: 1,
    loadMore: false,
    status: null,
  };

  fetchImages = async () => {
    const { page, searchQuery } = this.state;

    const result = await axios.get(
      `${BASE_URL}?key=${API_KEY}&q=${searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=${perPage}`
    );

    const parseResponse = await result;
    return parseResponse;
  };
  async componentDidUpdate(prevProps, prevState) {
    const { page, searchQuery } = this.state;
    const differentSearchQuery = prevState.searchQuery !== searchQuery;
    const differentPage = prevState.page !== page;
    if (differentSearchQuery || differentPage) {
      this.setState({ status: 'pending' });
      try {
        const parseResponse = await this.fetchImages();

        this.setState(prevState => ({
          galleryItems: [...prevState.galleryItems, ...parseResponse.data.hits],
          status: 'resolved',
          loadMore: page < Math.ceil(parseResponse.data.totalHits / 12),
        }));
        if (parseResponse.data.hits.length === 0) {
          Notiflix.Notify.failure(
            `Sorry, there are no images matching search query ${this.props.searchQuery}`
          );
        }
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
