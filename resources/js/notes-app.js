'use strict'

const notes = [{
  title: 'My next trip',
  body: 'I would like to go to Spain.'
}, {
  title: 'Habbits to work on',
  body: 'Exercise. Eating a bit better.'
}, {
  title: 'Office modifications',
  body: 'Get a new monitor'
}];

const ps = document.querySelectorAll('p');
// console.log(ps);
// console.log(typeof ps);
// ps.remove();

ps.forEach(p => p.textContent = '******');
// console.log(p.textContent);

const newP = document.createElement('p');
newP.textContent = 'New text element from JS';
document.querySelector('body').appendChild(newP);
// Note that the .forEach is above this.