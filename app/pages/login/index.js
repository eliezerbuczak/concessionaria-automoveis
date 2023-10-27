document.addEventListener("DOMContentLoaded", function () {
  const baseURL = 'http://localhost:3000';

  const usernameInput = document.getElementById("username");
  const passwordInput = document.getElementById("password");
  const loginButton = document.getElementById("login-button");

  loginButton.addEventListener("click", function (e) {
    e.preventDefault();
    const username = usernameInput.value;
    const password = passwordInput.value;

    authenticateUser(username, password);
  });

  const authenticateUser = async (username, password) => {
    // Fazer uma solicitação ao servidor para verificar se o usuário existe e a senha está correta na tabela de usuários com JSON Server
    await fetch(`${baseURL}/users`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("A resposta não está OK");
        }
        return response.json();
      })
      .then((data) => {
        data.forEach((user) => {
          if (user.user === username && user.password === password) {
            localStorage.setItem("authenticated", true);
            window.location.href = "/app/pages/automoveis/index.html";
          }
        });
      })
      .catch((error) => {
        console.error("Erro:", error);
      })
  }
}
);
