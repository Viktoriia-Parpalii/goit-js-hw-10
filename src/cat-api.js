import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { refs } from './index.js';
import axios from 'axios';

const URL = 'https://api.thecatapi.com/v1/';
const API_KEY =
  'live_Utq0hlMivbHo39VL70zl84zHokxz90UZKgltekVoHuKpuxSnkDAmT7xUyS5OqyVj';
axios.defaults.headers.common['x-api-key'] = API_KEY;

function fetchBreeds() {
  const BREEDS_URL = `${URL}breeds`;
  return axios.get(BREEDS_URL).then(res => {
    if (res.status !== 200) {
      throw new Error(Notify.failure(refs.err.textContent));
    }

    return res.data;
  });
}
function fetchCatByBreed(breedId) {
  const IMAGES_URL = `${URL}images/search`;
  const params = new URLSearchParams({
    breed_ids: breedId,
  });
  return axios.get(`${IMAGES_URL}?${params}`).then(res => {
    if (res.status !== 200) {
      throw new Error(Notify.failure(refs.err.textContent));
    }
    return res.data[0];
  });
}
export { fetchBreeds, fetchCatByBreed };
