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
  refs.loader.style.display = 'block';

  fetchCatByBreed(id)
    .then(catInfo => {
      refs.loader.style.display = 'none';
      //   console.log(catInfo);
      createMarkupCards(catInfo);
    })
    .catch(err => err);
});

function createMarkupCards(data) {
  return ({ breeds: { name, description, temperament }, url }) => {
    console.log(url, name, description, temperament);
    const card = ` 
      <img src="${url}" alt="${name}" width="500" height="500">
      <p class="name">${name}</p>
      <p class="description">${description}</p>
      <p class="temperament">Temperament: ${temperament}</p>`;

    refs.catCard.innerHTML = card;
  };
}

export { refs };
