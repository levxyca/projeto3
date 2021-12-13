const btnSearch = document.getElementById("app_btn-search");
const btnRegister = document.getElementById("app_btn-register");

let content = document.getElementById("app__pesquisa");
let respostaErroApp = document.getElementById("app__erro");
let resultado = document.getElementById("app__resultado");
let title = document.getElementById("app__title");
let link = document.getElementById("app__link");
let respostaErroAppRegistro = document.getElementById("app__erro-register");

btnSearch.addEventListener("click", () => {
  content = content.value;

  if (content == "") {
    respostaErroApp.innerHTML = "Você precisa inserir pelo menos 1 caractere!";
  }
});

btnRegister.addEventListener("click", () => {
  title = title.value;
  link = link.value;

  if (title == "" || link == "") {
    respostaErroAppRegistro.innerHTML =
      "Você precisa inserir pelo menos 1 caractere em cada campo!";
  }
});
