'use strict';

const APIKEY = '115412755108921161771x46303';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');
const renderError = function (msg) {
  countriesContainer.insertAdjacentText('beforeend', msg);
  countriesContainer.style.opacity = 1;
};

const renderCountry = function (data, className = '') {
  const name = data.name.common;
  const flag = data.flags.svg;
  const region = data.region;
  const language = Object.values(data.languages)[0];
  const currency = Object.values(data.currencies)[0].name;
  const html = `
  <article class="country ${className}">
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
};

///////////////////////////////////////

/*


const getCountryData = country => {
  fetch(`https://restcountries.com/v3.1/name/${country}`)
    .then(response => {
      if (!response.ok) {
        throw new Error(`Country not found 🌎 ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      renderCountry(data[0]);
      const neighbour = data[0].borders[0];

      if (!neighbour) return; // Exit if there are no neighbours

      return fetch(`https://restcountries.com/v3.1/alpha/${neighbour}`);
    })
    .then(response => {
      if (!response.ok) {
        throw new Error(`Neighbour not found 🥷 ${response.status}`);
      }
      return response.json();
    })
    .then(data => renderCountry(data[0], 'neighbour'))
    .catch(err => {
      renderError(` ${err} 🧌 Try Again!!!`);
    })
    .finally(() => {
      countriesContainer.style.opacity = 1;
    });
};

btn.addEventListener('click', () => {
  getCountryData('italy');
});
*/

/*
const getJSON = function (url, errorMsg = 'somthing went wrong') {
  return fetch(url).then(response => {
    if (!response.ok) {
      throw new Error(`${errorMsg} 🌎 ${response.status}`);
    }
    return response.json();
  });
};

const getCountryData = country => {
  getJSON(`https://restcountries.com/v3.1/name/${country}`, 'Country not found')
    .then(data => {
      renderCountry(data[0]);
      if (!('borders' in data[0])) throw new Error('No neighbour found');
      const neighbour = data[0].borders[0];

      return getJSON(`https://restcountries.com/v3.1/alpha/${neighbour}`);
    })

    .then(data => renderCountry(data[0], 'neighbour '))
    .catch(err => {
      renderError(` ${err} 🧌 Try Again!!!`);
    })
    .finally(() => {
      countriesContainer.style.opacity = 1;
    });
};

btn.addEventListener('click', () => {
  getCountryData('australia');
});
*/

// Promise

/*
const lotteryPromise = new Promise((resolve, reject) => {
  console.log('Lottory draw is happening 🌎');
  setTimeout(() => {
    if (Math.random() >= 0.5) {
      resolve('You win 😎');
    } else {
      reject(new Error('You Lose your money 😂'));
    }
  }, 2000);
});

lotteryPromise.then(res => console.log(res)).catch(err => console.error(err));

// Prosisiifying set Tiomout
const wait = seconds => {
  return new Promise(resolve => {
    setTimeout(resolve, seconds * 1000);
  });
};

wait(1)
  .then(() => {
    console.log('2 sec');
  })
  .then(() => {
    console.log('3 sec');
  })
  .then(() => {
    console.log('4 sec');
  })
  .then(() => {
    console.log('5 sec');
  });
*/

// Promise

const getPosition = () => {
  return new Promise((resolve, rejected) => {
    /* navigator.geolocation.getCurrentPosition(
      position => resolve(position),
      err => rejected(err)
    );*/

    navigator.geolocation.getCurrentPosition(resolve, rejected);
  });
};

const whereAmI = () => {
  getPosition()
    .then(pos => {
      console.log(pos);
      const { latitude: lat, longitude: lng } = pos.coords;

      return fetch(
        `https://geocode.xyz/${lat},${lng}?geoit=json&auth=${APIKEY}`
      );
    })
    .then(response => {
      if (!response.ok) {
        throw new Error(`Country not found 🌎 ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      return fetch(`https://restcountries.com/v3.1/name/${data.country}`);
    })
    .then(response => {
      if (!response.ok) {
        throw new Error(`Country not found 🌎 ${response.status}`);
      }
      return response.json();
    })
    .then(data => renderCountry(data[0]))

    .catch(err => console.log(console.error(`${err.message}`)))

    .finally(() => {
      countriesContainer.style.opacity = 1;
    });
};

btn.addEventListener('click', whereAmI);
