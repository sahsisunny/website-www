const isVisited = localStorage.getItem('hasJoinVisited');
console.log(isVisited);
console.log(typeof isVisited);
function redirectUserToPage(page) {
  const finalPage =
    page == 'signup'
      ? 'http://localhost:3443/signup?state=get-started'
      : page == 'join.html'
      ? 'http://localhost:5500/join.html'
      : 'http://localhost:5500/';

  window.location.href = finalPage;
}

function redirectToJoinIfNotVisited() {
  if (isVisited == 'true' || isVisited == null) {
    redirectUserToPage('join.html');
  } else {
    redirectUserToPage('home');
  }
}

function showSignupFormIfIncomplete() {
  fetch('http://localhost:3000/users/self', {
    headers: { 'content-type': 'application/json' },
    credentials: 'include',
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.incompleteUserDetails) {
        redirectUserToPage('signup');
      } else {
        redirectToJoinIfNotVisited();
      }
    })
    .catch((e) => {
      redirectUserToPage('home');
    });
}

showSignupFormIfIncomplete();
