$(document).ready(function () {
    let isLoggedIn = true

    let header = isLoggedIn ? '/menu-logado.html' : '/menu.html';
    $('#header').load(header);
    $('#footer').load('/footer.html');
});