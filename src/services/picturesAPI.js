import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api/';

const API_KEY = '30530922-b2ca10c8a64b9d14f98bafcf1';

export let amountOfPages = 0;

export async function fetchPictures(searchWord, page) {
  try {
    const response = await axios.get('', {
      params: {
        key: API_KEY,
        q: searchWord,
        per_page: 12,
        page,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
      },
    });
    amountOfPages = Math.ceil(response.data.totalHits / 12);
    return response.data.hits;
  } catch (error) {
    console.error(error);
  }
}
