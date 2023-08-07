import axios from 'axios';

const perPage = 12;
const API_KEY = '37324716-561554bcb566b8f1f5945e5c9';
const BASE_URL = 'https://pixabay.com/api/';

export async function fetchImages(page, searchQuery) {
  // const { page, searchQuery } = this.state;

  const result = await axios.get(
    `${BASE_URL}?key=${API_KEY}&q=${searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=${perPage}`
  );

  const parseResponse = await result;
  return parseResponse;
}
