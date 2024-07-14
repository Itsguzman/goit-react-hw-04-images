import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '43667418-76f5d1604c2f0cbb542a40cc7';
// let PER_PAGE = 40;

export const fetchSearch = async (pageQuery, pageCount) => {
  try {
    // PER_PAGE = pageCount === 1 ? 40 : 12;
    // https://pixabay.com/api/?q=cat&page=1&key=your_key&image_type=photo&orientation=horizontal&per_page=12
    const response = await axios.get(BASE_URL, {
      params: {
        key: API_KEY,
        q: pageQuery,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        per_page: 12,
        page: pageCount,
      },
    });
    const searchResult = response.data;
    return searchResult;
  } catch (error) {
    console.error('Error fetching breeds:', error);
    return [];
  }
};
