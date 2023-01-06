'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

//Scroll Learn more button to Section 1
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

btnScrollTo.addEventListener('click', function(e){
  section1.scrollIntoView({behavior:'smooth'});
});


/* 
Tabbed Component
Select the active tab and content by simply removing and adding classes
*/
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContents = document.querySelectorAll('.operations__content');

//Use event delegation to listen only on the parent of all three buttons
tabsContainer.addEventListener('click', function(e){
  //.closest in case we select the <span> child of the button
  const clicked = e.target.closest('.operations__tab');

  //Guard clause (if we click inside the container but not any button)
  if(!clicked) return;

  //Active tabs
    //1. Deactivate all tabs and contents
  tabs.forEach(t => t.classList.remove('operations__tab--active'));
  tabsContents.forEach(c => c.classList.remove('operations__content--active'));


    //2. Activate the clicked tab and content using the data id
  clicked.classList.add('operations__tab--active');

  document.querySelector(`.operations__content--${clicked.dataset.tab}`).classList.add('operations__content--active');


});

/*
  Nav bar Fade animation
  When we over the mouse over one of the links from the navigation bar, that link will keep the opacity and the rest will fade(decrease opacity)
*/

const nav = document.querySelector('.nav');


const handleOver = function(e){
  if(e.target.classList.contains('nav__link')){
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');

    siblings.forEach(el => {
      if(el !== link)
        el.style.opacity = this;
    })
    logo.style.opacity = this;
  }
};

//Using .bind() to pass additional arguments, because the listener handler function can only have one (Event).
nav.addEventListener('mouseover', handleOver.bind(0.5));
nav.addEventListener('mouseout', handleOver.bind(1));

/*
  Set the nav bar sticky when we scroll down and the section1 is visible in the viewport  
*/

const header = document.querySelector('.header');
const navHeight = nav.getBoundingClientRect().height;

const stickyNav = function(entries){
  const [entry] = entries; //same as entries[0]
  if(!entry.isIntersecting)
    nav.classList.add('sticky');
  else
    nav.classList.remove('sticky');
}

const obsOptions = {
	root: null, //To listen when the target interacts with the VIEWPORT
	threshold: 0,
  rootMargin: `-${navHeight}px`,
}

const headerObserver = new IntersectionObserver(stickyNav, obsOptions);
headerObserver.observe(header);

/*
  Review Elements/sections as we scroll close to them
*/
const allSections = document.querySelectorAll('.section');

const revealSection = function(entries, observer){
  const entry = entries[0];
  if(!entry.isIntersecting) return;

  entry.target.classList.remove('section--hidden');
  observer.unobserve(entry.target);
}

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});

allSections.forEach(section => {
  sectionObserver.observe(section);
  section.classList.add('section--hidden'); //Will hide them at the start
});

/*
  Lazy loading images to increase performance
  Load a low res image first and load the high res until we scroll there
  The current image, src, will be replaced with the one referred from data-src 
*/
//images that contain a property data-src
const imgTargets = document.querySelectorAll('img[data-src]'); 

const loadImg = function(entries, observer){
  const [entry] = entries;
  if(!entry.isIntersecting) return;

  //Replace src with data-src
  entry.target.src = entry.target.dataset.src;

  //Remove the blur filter, but only until the new one is downloaded (load event)
  entry.target.addEventListener('load', function(){
    entry.target.classList.remove('lazy-img');
  });
  observer.unobserve(entry.target);
};

const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
  rootMargin: '200px', //To start downloading them before the image reaches the viewport
});

imgTargets.forEach(img => imgObserver.observe(img));