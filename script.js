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