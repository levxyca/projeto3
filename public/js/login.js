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
  }
});
