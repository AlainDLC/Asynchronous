'use strict';

const image = document.querySelector('.images');

const createImage = imgPath => {
  return new Promise((resolve, rejected) => {
    const img = document.createElement('img');
    img.src = imgPath;

    img.addEventListener('load', () => {
      image.append(img);
      resolve(img);
    });
    img.addEventListener('error', () => {
      rejected(new Error(`🧌 ${imgPath}`));
    });
  });
};

const getThreeCountries = async (c1, c2, c3) => {
  try {
    const data = await Promise.all([
      createImage('img/img-1.jpg'),
      createImage('img/img-2.jpg'),
      createImage('img/img-3.jpg'),
    ]);

    console.log(data.map(d => d[0].capital));
  } catch (err) {
    console.error(err.message);
    throw err;
  }
};

const wait = seconds => {
  return new Promise(resolve => {
    setTimeout(resolve, seconds * 1000);
  });
};

let currentImg;

const loadAndPuse = async () => {
  try {
    let img1 = await createImage('img/img-1.jpg');

    await wait(1);
    img1.style.display = 'none';

    let img2 = await createImage('img/img-2.jpg');

    await wait(1);
    img2.style.display = 'none';

    let img3 = await createImage('img/img-3.jpg');
    console.log(img);
    await wait(1);
    img3.style.display = 'none';
  } catch (err) {
    console.log(err);
  }
};
