$(document).ready(function () {
    let isLoggedIn = false

    let header = isLoggedIn ? '/menu-logado.html' : '/menu.html';
    $('#header').load(header);
    $('#footer').load('/footer.html');
});