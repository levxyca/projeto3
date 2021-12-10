const btnModalLogin = document.getElementById("login__submit");
const respostaErroLogin = document.querySelector(".modal__login-error");

btnModalLogin.addEventListener("click", () => {
  const user = document.getElementById("user");
  const pass = document.getElementById("pass");

  let login = {
    email: user.value,
    password: pass.value,
  };

  //Validação dos campos de login
  if (login.email == "" || login.password == "") {
    respostaErroLogin.innerHTML = "O campo não pode estar vazio!";
  } else if (login.email.length < 3 || login.password.length < 3) {
    respostaErroLogin.innerHTML = "Você precisa inserir mais de 3 dígitos!";
  } else {
    var ajax = new XMLHttpRequest();

    ajax.open("POST", "https://reqres.in/api/login", true);
    ajax.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    ajax.send(`email=${login.email}&password=${login.password}`);

    ajax.onreadystatechange = function () {
      if (ajax.status == 200) {
        localStorage.setItem("logged", true);
        localStorage.setItem("token", ajax.responseText);

        const title = document.querySelector(".modal__login-title");
        const titleSucesso = document.querySelector(
          ".modal__login-title-sucesso"
        );
        const form = document.querySelector(".modal__login-form");
        const home = document.querySelector(".home");
        const app = document.querySelector(".app");

        respostaErroLogin.classList.toggle("none");
        form.classList.toggle("none");
        title.classList.toggle("none");
        titleSucesso.classList.toggle("none");
        home.classList.toggle("none");
        app.classList.toggle("none");
      } else {
        respostaErroLogin.innerHTML =
          "Desculpe, ocorreu um erro ao tentar realizar o seu login.";
      }
    };
  }
});
