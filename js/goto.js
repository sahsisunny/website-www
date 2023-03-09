import { SIGNUP, JOIN, HOME } from './constants.js';

const hasJoinVisited = localStorage.getItem('hasJoinVisited');
function redirectUserToPage(page) {
  const finalPage =
    page == SIGNUP
      ? 'http://localhost:3443/signup?state=get-started'
      : page == JOIN
      ? 'http://localhost:5500/join.html'
      : 'http://localhost:5500/';

  window.location.href = finalPage;
}

function redirectionHandler(data) {
  if (data.incompleteUserDetails) {
    redirectUserToPage(SIGNUP);
  } else if (hasJoinVisited == 'true' || hasJoinVisited == null) {
    redirectUserToPage(JOIN);
  } else {
    redirectUserToPage(HOME);
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
      redirectUserToPage(HOME);
    });
}

showSignupFormIfIncomplete();
