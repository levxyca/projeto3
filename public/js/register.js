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
    var ajax = new XMLHttpRequest();

    ajax.open("POST", "https://reqres.in/api/register", true);
    ajax.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    ajax.send(`email=${register.email}&password=${register.password}`);

    ajax.onreadystatechange = function () {
      if (ajax.status == 200) {
        const title = document.querySelector(".modal__register-title");
        const titleSucesso = document.querySelector(
          ".modal__register-title-sucesso"
        );
        const form = document.querySelector(".modal__register-form");

        respostaErroRegister.classList.toggle("none");
        form.classList.toggle("none");
        title.classList.toggle("none");
        titleSucesso.classList.toggle("none");
      } else {
        respostaErroRegister.innerHTML =
          "Por favor, preencha os campos corretamente!";
      }
    };
  }
});
