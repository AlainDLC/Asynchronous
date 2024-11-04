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

const wait = seconds => {
  return new Promise(resolve => {
    setTimeout(resolve, seconds * 1000);
  });
};

let currentImg;

createImage('img/img-1.jpg')
  .then(img => {
    currentImg = img;
    return wait(2);
  })
  .then(() => {
    currentImg.style.display = 'none';
    return createImage('img/img-2.jpg');
  })
  .then(img => {
    currentImg = img;
    return wait(2);
  })
  .then(() => {
    currentImg.style.display = 'none';
    return createImage('img/img-3.jpg');
  })

  .catch(err => console.log(err));
