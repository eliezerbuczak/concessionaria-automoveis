'use strict';

const LOGGED_IN_KEY = 'authenticated';

$(function () {

  let isLoggedIn = localStorage.getItem(LOGGED_IN_KEY);
  let header = false
  if (isLoggedIn === "true") {
    header = '/menu-logado.html'
  } else {
    header = '/menu.html'
  }
  $('#header').load(header);
  $('#footer').load('/footer.html');

});

export { LOGGED_IN_KEY };