console.log('Client side javascript file is loaded');

// Client Side Javascript on Browser fetch function
// Console prints into browser console

const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-one');
const messageTwo = document.getElementById('message-two');

weatherForm.addEventListener('submit', e => {
  e.preventDefault();

  let location = search.value;
  messageOne.textContent = 'Loading...';
  messageTwo.textContent = '';

  fetch(`http://localhost:3000/weather?address=${location}`).then(response => {
    response.json().then(data => {
      if (data.error) {
        messageOne.textContent = data.error;
        messageOne.classList.add('error');
      } else {
        messageOne.classList.remove('error');
        messageOne.textContent = data.location;
        messageTwo.textContent = data.forecast;
      }
    });
  })
});