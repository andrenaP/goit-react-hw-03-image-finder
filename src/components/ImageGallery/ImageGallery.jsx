import { Component } from 'react';
import PropTypes from 'prop-types';
import './ImageGallery.css';
import axios from 'axios';
import Notiflix from 'notiflix';
import Button from '../Button';
import ImageGalleryItem from '../ImageGalleryItem';
import Modal from '../Modal';
import Loader from '../Loader';

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
  handleImageClick = largeImageURL => {
    this.setState({
      showModal: true,
      largeImageURL,
    });
  };
  onModalClose = () => {
    this.setState({
      showModal: false,
    });
  };

  handleIncrementPage = () => {
    const { incrementPage } = this.props;
    incrementPage();
  };
  async componentDidUpdate(prevProps, prevState) {
    const { page, searchQuery } = this.props;
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
  resetPage() {
    this.setState({ galleryItems: [], page: 1 });
  }
  render() {
    const { galleryItems, status, loadMore, showModal } = this.state;
    if (status === 'pending') return <Loader />;
    if (status === 'rejected') {
      Notiflix.Notify.failure('Oops, something went wrong! Please, try again!');
      return;
    }
    if (status === 'resolved')
      if (galleryItems.length === 0) {
        Notiflix.Notify.failure(
          `Sorry, there are no images matching search query ${this.props.searchQuery}`
        );
        return;
      }
    console.log(loadMore);
    return (
      <div>
        {status === 'resolved' && (
          <ul className="galleryItems">
            {galleryItems.map(({ id, webformatURL, tags, largeImageURL }) => {
              return (
                <ImageGalleryItem
                  key={id}
                  smallPicture={webformatURL}
                  alt={tags}
                  onClick={this.handleImageClick}
                  largeImage={largeImageURL}
                />
              );
            })}
          </ul>
        )}
        {showModal && (
          <Modal
            largeImage={this.state.largeImageURL}
            onModalClose={this.onModalClose}
          />
        )}
        {loadMore && <Button onClick={this.handleIncrementPage}></Button>}
      </div>
    );
  }
}

export default ImageGallery;

ImageGallery.propTypes = {
  searchQuery: PropTypes.string,
  page: PropTypes.number.isRequired,
  incrementPage: PropTypes.func.isRequired,
};
