'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

///////////////////////////////////////
/*https://countries-api-836d.onrender.com/countries/ */

const getCountryData = function (contry) {
  const req = new XMLHttpRequest();
  req.open('GET', `https://restcountries.com/v3.1/name/${contry}`);
  req.send();

  req.addEventListener('load', () => {
    const [data] = JSON.parse(req.responseText);
    const name = data.name.common;
    const flag = data.flags.svg;
    const region = data.region;
    const language = Object.values(data.languages)[0];
    const currency = Object.values(data.currencies)[0].name;
    const html = `
      <article class="country">
        <img class="country__img" src="${flag}" />
        <div class="country__data">
          <h3 class="country__name">${name}</h3>
          <h4 class="country__region">${region}</h4>
          <p class="country__row"><span>👫</span>${(
            +data.population / 1000000
          ).toFixed(1)} people</p>
          <p class="country__row"><span>🗣️</span>${language}</p>
          <p class="country__row"><span>💰</span>${currency}</p>
        </div>
      </article>
      `;

    countriesContainer.insertAdjacentHTML('beforeend', html);
    countriesContainer.style.opacity = 1;
  });
};

getCountryData('norway');
