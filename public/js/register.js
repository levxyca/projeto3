const btnModalRegister = document.getElementById("register__submit");
const respostaErroRegister = document.querySelector(".modal__register-error");

btnModalRegister.addEventListener("click", () => {
  const user = document.getElementById("userRegister");
  const pass = document.getElementById("passRegister");

  let register = {
    email: user.value,
    password: pass.value,
  };

  //Validação dos campos de registro
  if (register.email == "" || register.password == "") {
    respostaErroRegister.innerHTML = "O campo não pode estar vazio!";
  } else if (register.email.length < 3 || register.password.length < 3) {
    respostaErroRegister.innerHTML = "Você precisa inserir mais de 3 dígitos!";
  } else {
  }
});
