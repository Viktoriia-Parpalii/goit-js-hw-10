export { URL, refs };

import axios from 'axios';
import SlimSelect from 'slim-select';
import fetchBreeds from './cat-api.js';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import 'slim-select/dist/slimselect.css';

const URL = 'https://api.thecatapi.com/v1/';
const refs = {
  select: document.querySelector('.breed-select'),
  loader: document.querySelector('.loader'),
  err: document.querySelector('.error'),
};
const API_KEY =
  'live_Utq0hlMivbHo39VL70zl84zHokxz90UZKgltekVoHuKpuxSnkDAmT7xUyS5OqyVj';
axios.defaults.headers.common['x-api-key'] = API_KEY;

// refs.loader.textContent = '';
refs.select.style.display = 'none';
refs.err.style.display = 'none';

// fetchBreeds().then(data => console.log(data));
fetchBreeds()
  .then(data => {
    refs.select.style.display = 'block';
    refs.loader.style.display = 'none';
    createMarkupOptins(data);
    new SlimSelect({
      select: refs.select,
    });
  })
  .catch(err => err);

function createMarkupOptins(arr) {
  return arr.map(({ id, name }) => {
    // console.log({ id, name });
    const option = `<option value=${id}>${name}</option>`;
    refs.select.insertAdjacentHTML('beforeend', option);
  });
}

refs.select.addEventListener('change', e => {
  const id = e.target.value;
  console.log(id);
  fetchCatByBreed(id)
    .then(data => console.log(data))
    .catch(err => err);
});

function fetchCatByBreed(breedId) {
  const IMAGES_URL = `${URL}images/search`;
  const params = new URLSearchParams({
    breed_ids: breedId,
  });
  return axios.get(`${IMAGES_URL}?${params}`).then(res => {
    if (!res.ok) {
      throw new Error(Notify.failure(refs.err.textContent));
    }
    return res.json();
  });
}
