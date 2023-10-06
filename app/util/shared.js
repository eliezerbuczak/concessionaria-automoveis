'use strict';

const USERNAME_KEY = 'ecar';
const LOGGED_IN_KEY = 'eh_logado';

$(function () {
  let isLoggedIn = localStorage.getItem(LOGGED_IN_KEY);

  let header = isLoggedIn ? '/menu-logado.html' : '/menu.html';
  $('#header').load(header);
  $('#footer').load('/footer.html');
});

export { USERNAME_KEY, LOGGED_IN_KEY };