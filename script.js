'use strict';

const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');
// const nav = document.querySelector('.nav');

///////////////////////////////////////
// Modal window

const openModal = function (e) {
  // e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

// for (let i = 0; i <button btnsOpenModal.length; i++)
//   btnsOpenModal[i].addEventListener('click', openModal);

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/*
const header = document.querySelector('.header');
const meassage = document.createElement('div');
meassage.classList.add('cookies-message');
meassage.innerHTML =
  'We use cookied for improved functionality and analyties. <button class="btn btn--close--cookie">Got It</button>';
header.prepend(meassage);

meassage.style.backgroundColor = '#37383d';
meassage.style.width = '100%';

console.log(getComputedStyle(meassage));

document.documentElement.style.setProperty('--color-primary', 'orangered');

const logo = document.querySelector('.nav__logo');
console.log(logo.alt);
console.log(logo.src);
console.log(logo.className);

logo.alt = 'beautiful minimulist logo';
console.log(logo.alt);

logo.setAttribute('company', 'kelvin');
console.log(logo.alt);
console.log(logo.attributes);

const link = document.querySelector('.nav__link--btn');
console.log(link.href);
// console.log(link.getAttribute('href'));

////// ADDIING CLASSLIST (CLASS) ///////
logo.classList.add('kelvin');
logo.classList.remove('');
logo.classList.toggle();
logo.classList.contains();
*/

///////////////////////////////////////////
/// IMPLEMENTING SMOOTH SCROLLING/////

btnScrollTo.addEventListener('click', function (e) {
  section1.scrollIntoView({
    behavior: 'smooth',
  });
});
// const s1coords = section1.getBoundingClientRect();
// console.log(s1coords);

// console.log(e.target.getBoundingClientRect());

// console.log('current scroll (X/Y)', window.pageXOffset, window.pageYOffset);

// console.log(
//   'height/width viewport',
//   document.documentElement.clientHeight,
//   document.documentElement.clientWidth
// );

//scrolling
// window.scrollTo(
//   s1coords.left + window.pageXOffset,
//   s1coords.top + window.pageYOffset
// );

// window.scrollTo({
//   left: s1coords.left + window.pageXOffset,
//   top: s1coords.top + window.pageYOffset,
//   behavior: 'smooth',
// });

///////////////////////////////
///page navigation

// document.querySelectorAll('.nav__link').forEach(function (el) {
//   el.addEventListener('click', function (e) {
//     e.preventDefault();
//     const id = this.getAttribute('href');
//     console.log(id);
//     document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
//   });
// });

/// 1. Add eventlistener to common parent element
/// 2. Determine what element originated the event

document.querySelector('.nav__links').addEventListener('click', function (e) {
  console.log(e.target);
  e.preventDefault();
  // Matching Strategy
  if (e.target.classList.contains('nav__link')) {
    console.log('LINK');
    const id = e.target.getAttribute('href');
    console.log(id);
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});

// BUILDING A TAB COMPONENT USING DOM JS

tabsContainer.addEventListener('click', function (e) {
  const clicked = e.target.closest('.operations__tab');

  // Guard clause
  if (!clicked) return;

  // Remove active classes
  tabs.forEach(t => t.classList.remove('operations__tab--active'));
  tabsContent.forEach(c => c.classList.remove('operations__content--active'));

  // Activate tab
  clicked.classList.add('operations__tab--active');

  // Activate content area
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active');
});

///// MENU FADE ANIMATION ///////////////
const nav = document.querySelector('.nav');
const handleHover = function (e) {
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');

    siblings.forEach(el => {
      if (el !== link) el.style.opacity = this;
    });
    logo.style.opacity = this;
  }
};

///// PASSING AN ARGUMENT INTO HANDLER
nav.addEventListener('mouseover', handleHover.bind(0.5));
nav.addEventListener('mouseout', handleHover.bind(1));

////// Stickt Navigation ///////

/**
const initialCoords = section1.getBoundingClientRect();
window.addEventListener('scroll', function (e) {
  if (window.scrollY > initialCoords.top) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
});
 */

////////// STICKY NAVIGAION: INTERSECTION OBSERVER API ////////////
/*
const obsCallback = function (entries, observer) {
  entries.forEach(entry => {
    console.log(entry);
  });
};
const obsOptions = {
  root: null,
  threshold: [0, 0.2],
};

const observer = new IntersectionObserver(obsCallback, obsOptions);
observer.observe(section1);
 */

////////// STICKY NAVIGAION: INTERSECTION OBSERVER API ////////////
const header = document.querySelector('.header');
const navHeight = nav.getBoundingClientRect().height;

const stickyNav = function (entries) {
  const [entry] = entries;
  // console.log(entry);

  if (!entry.isIntersecting) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
};

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});

headerObserver.observe(header);

//// Reveal Sections /////////

const allSection = document.querySelectorAll('.section');
const revealSection = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;
  entry.target.classList.remove('section--hidden');

  observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});

allSection.forEach(function (section) {
  sectionObserver.observe(section);
  section.classList.add('section--hidden');
});

///// LAZY LOADING IMAGES ///////
const imgTarget = document.querySelectorAll('img[data-src]');

const loading = function (entries, observe) {
  const [entry] = entries;
  console.log(entry);

  if (!entry.isIntersecting) return;

  //// replace the src with datasrc
  entry.target.src = entry.target.dataset.src;

  entry.target.addEventListener('load', function () {
    entry.target.classList.remove('lazy-img');
  });
  observe.unobserve(entry.target);
};

const imgObserver = new IntersectionObserver(loading, {
  root: null,
  threshold: 0,
  rootMargin: '200px',
});

imgTarget.forEach(img => imgObserver.observe(img));

///////// SLIDE COMPONENT /////
const slides = document.querySelectorAll('.slide');

const btnLeft = document.querySelector('.slider__btn--left');

const btnRight = document.querySelector('.slider__btn--right');
const dotContainer = document.querySelector('.dots');

let curSlide = 0;
const maxSlide = slides.length;

const createDots = function () {
  slides.forEach(function (_, i) {
    dotContainer.insertAdjacentHTML(
      'beforeend',
      `<button class="dots__dot" data-slide="${i}"></button>`
    );
  });
};

createDots();

// const slider = document.querySelector('.slider');
// slider.style.transform = 'scale(0.4) translateX(-1200px)';
// slider.style.overflow = 'visible';

// slides.forEach((s, i) => (s.style.transform = `translateX(${100 * i}%)`));
// 0%, 100%, 200%, 300%

const goToSlide = function (slide) {
  slides.forEach(
    (s, i) => (s.style.transform = `translateX(${100 * (i - curSlide)}%)`)
  );
};

goToSlide(0);

//// Next Slide

const nextSlide = function () {
  if (curSlide === maxSlide - 1) {
    curSlide = 0;
  } else {
    curSlide++;
  }
  goToSlide(curSlide);
};

const prevSlide = function () {
  if (curSlide === 0) {
    curSlide = maxSlide - 1;
  } else {
    curSlide--;
  }

  goToSlide(curSlide);
};

btnRight.addEventListener('click', nextSlide);
btnLeft.addEventListener('click', prevSlide);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Arrowleft') prevSlide();
  e.key === 'ArrowRight' && nextSlide();
});

dotContainer.addEventListener('click', function (e) {
  if (e.target.classList.contains('dots__dot')) {
    const { slide } = e.target.dataset;
    goToSlide(slide);
  }
});

// curSlide = 1 -100%, 0%, 200%, 300%

/**
////// ADDING EVENT LISTENER //////

///WAY 1////
const h1 = document.querySelector('h1');

const alerth1 = function (e) {
  alert('its nice working on alert');
  // h1.removeEventListener('mouseenter', alerth1);
};
h1.addEventListener('mouseenter', alerth1);

// WAYS 2////
setTimeout(() => h1.removeEventListener('mouseenter', alerth1), 3000);
// h1.onmouseenter = function (e) {
//   alert('addEventListener: Great you are reading the heading :D');
// };

 */

///// EVENT PROPAGATION IN PRACTICE ///////

/// rgb(255,255,255)

// const randomInt = (min, max) => Math.floor(Math.random(max - min + 1) + min);
// const randomColor = () => `rgb(${randomInt(0, 255)},${randomInt(0, 255)})`;

// console.log(randomColor(0, 255));

// const randomInt = (min, max) =>
//   Math.floor(Math.random() * (max - min + 1) + min);
// const randomColor = () =>
//   `rgb(${randomInt(0, 255)}, ${randomInt(0, 255)}, ${randomInt(0, 255)})`;

// console.log(randomColor());

// document.querySelector('.nav__link').addEventListener('click', function (e) {
//   this.style.backgroundColor = randomColor();
//   console.log('LINK', e.target, e.currentTarget);
//   console.log(e.currentTarget === this);
//   // STOP THE PROPAGATION
//   // e.stopPropagation();
// });

// document.querySelector('.nav__links').addEventListener('click', function (e) {
//   this.style.backgroundColor = randomColor();
//   console.log('CONTAINER', e.target, e.currentTarget);
// });

// document.querySelector('.nav').addEventListener('click', function (e) {
//   this.style.backgroundColor = randomColor();
//   console.log('NAV', e.target, e.currentTarget);
// });

/*

//DOM TRAVERSING
// THIS IS A WAY OF SELECTING A DIRECT CHILD ELEMENT OR A DIRECT PARENT ELEMT ON THE DOM TREE E.G

const h1 = document.querySelector('h1');
// CODE DOWNWARD: CHILD ELEMENTS
console.log(h1.querySelectorAll('.highlight'));
console.log(h1.childNodes);
console.log(h1.children);
h1.firstElementChild.style.color = 'white';
h1.lastElementChild.style.color = 'orangered';

// this both we return the div that houses the content
console.log(h1.parentNode);
console.log(h1.parentElement);

// h1.closest('.header').style.background = 'var(--gradient-secondary)';
h1.closest('h1').style.background = 'var(--gradient-secondary)';

//NOTE ON THE CLOSEST METHOD
/**
 In JavaScript DOM (Document Object Model), the `closest()` method is used to find the nearest ancestor element that matches a specified CSS selector. It starts with the element itself and traverses up the DOM tree until it finds a match or reaches the top (the document root). It returns the first ancestor element that matches the selector, or null if no match is found. This method is particularly useful for finding a specific parent element of an element, based on its CSS properties.
 

//GOING SIDEWAYS: SIBLINGS
console.log(h1.previousSibling);
console.log(h1.nextSibling);
console.log(h1.parentElement.children);

[...h1.parentElement.children].forEach(function (el) {
  if (el !== 'h1') el.style.transform = 'Scale(0.5)';
});


*/

document.addEventListener('DOMContentLoaded', function (e) {
  console.log('HTML parsed and DOM tree built', e);
});

window.addEventListener('load', function (e) {
  console.log('page fully loaded', e);
});

// window.addEventListener('beforeunload', function (e) {
//   e.preventDefault();
//   console.log(e);
//   e.returnValue = '';
// });
