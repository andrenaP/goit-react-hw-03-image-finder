import { Component } from 'react';
import PropTypes from 'prop-types';
import css from './ImageGallery.css';
import axios from 'axios';
import Button from '../Button';

const perPage = 12;
const API_KEY = '37324716-561554bcb566b8f1f5945e5c9';
const BASE_URL = 'https://pixabay.com/api/';

class ImageGallery extends Component {
  state = {
    galleryItems: [],
    status: null,
    page: 1,
    loadMore: false,
    showModal: false,
  };
  handleIncrementPage = () => {
    const { incrementPage } = this.props;
    incrementPage();
  };
  async componentDidUpdate(prevProps, prevState) {
    console.log('componentDidUpdate');
    const { page, searchQuery } = this.props;
    console.log(page);
    if (prevProps.searchQuery !== searchQuery) {
      this.resetPage();
    }

    if (prevProps.searchQuery !== searchQuery || prevProps.page !== page) {
      this.setState({ status: 'pending' });

      try {
        const result = await axios.get(
          `${BASE_URL}?key=${API_KEY}&q=${searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=${perPage}`
        );

        const parseResponse = await result;
        console.log(parseResponse);
        this.setState(prevState => ({
          galleryItems: [...prevState.galleryItems, ...parseResponse.data.hits],
          status: 'resolved',
          loadMore: page < Math.ceil(parseResponse.totalHits / 12),
        }));
      } catch (error) {
        console.log(error);
        this.setState({ status: 'rejected' });
      }
    }
  }
  resetPage() {
    this.setState({ galleryItems: [], page: 1 });
  }
  render() {
    const { galleryItems, status, loadMore, showModal } = this.state;
    // console.log(this.state);
    return (
      <ul className="gallery">
        {status};
        {galleryItems.map(({ id, webformatURL, tags, largeImageURL }) => {
          return <div key={id}>{largeImageURL}</div>;
        })}
        <Button onClick={this.handleIncrementPage}></Button>
      </ul>
    );
  }
}

export default ImageGallery;
