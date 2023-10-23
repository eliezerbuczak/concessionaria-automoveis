
const baseURL = 'http://localhost:3000';
document.addEventListener("DOMContentLoaded", function () {
  const usernameInput = document.getElementById("username");
  const passwordInput = document.getElementById("password");
  const loginButton = document.getElementById("login-button");

  loginButton.addEventListener("click", function (e) {
    e.preventDefault();
    const username = usernameInput.value;
    const password = passwordInput.value;

    //make a request to the server to check if the user exists and the password is correct in table user com json server

    fetch(`${baseURL}/users`).then((response) => {
      if (!response.ok) {
        throw new Error("A resposta não está OK");
      }
      return response.json();
    }).then(data => {
      data.forEach(user => {
        if (user.user === username && user.password === password) {
          localStorage.setItem("authenticated", true);
          window.location.href = "/app/pages/automoveis/index.html";
        }
      })
    }).catch((error) => {
      console.error("Erro:", error);
    })
  });


});