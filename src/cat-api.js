import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { URL, refs } from './index.js';
// import axios from 'axios';
// axios.defaults.headers.common['x-api-key'] = API_KEY;

export default function fetchBreeds() {
  const BREEDS_URL = `${URL}breeds`;
  return fetch(BREEDS_URL).then(res => {
    if (!res.ok) {
      throw new Error(Notify.failure(refs.err.textContent));
    }

    return res.json();
  });
}
