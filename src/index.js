import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';
import { fetchBreeds, fetchCatByBreed } from './cat-api.js';

const refs = {
  select: document.querySelector('.breed-select'),
  loader: document.querySelector('.loader'),
  err: document.querySelector('.error'),
  catCard: document.querySelector('.cat-info'),
};

refs.err.style.display = 'none';
refs.select.style.display = 'none';

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
  //   console.log(id);
  fetchCatByBreed(id)
    .then(catInfo => console.log(dacatInfota))
    .catch(err => err);
});

export { refs };
