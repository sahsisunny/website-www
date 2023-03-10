import { SIGNUP_URL, HOME_URL } from './constants.js';

const hasJoinVisited = localStorage.getItem('hasJoinVisited');

function redirectUserToPage(page) {
  window.location.href = page;
}

function redirectionHandler(data) {
  if (data.incompleteUserDetails) {
    redirectUserToPage(SIGNUP_URL);
  } else if (hasJoinVisited == 'true' || hasJoinVisited == null) {
    redirectUserToPage(`${HOME_URL}/join.html`);
  } else {
    redirectUserToPage(HOME_URL);
  }
}

function showSignupFormIfIncomplete() {
  fetch('http://localhost:3000/users/self', {
    headers: { 'content-type': 'application/json' },
    credentials: 'include',
  })
    .then((res) => res.json())
    .then((data) => {
      redirectionHandler(data);
    })
    .catch((e) => {
      redirectUserToPage(HOME_URL);
    });
}

showSignupFormIfIncomplete();
