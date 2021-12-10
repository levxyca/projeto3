const cookieParser = require("cookie-parser");

let http = require("http"),
  path = require("path"),
  express = require("express"),
  app = express(),
  Posts = require("./models/posts");

app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.get("/", (req, res) => {
  if (req.cookies && req.cookies.login) {
    return res.redirect("/posts");
  }
  return res.render("index");
});

app.post("/login", (req, res, next) => {
  let login = req.body.user;
  let password = req.body.pass;
  console.log(login, password);
  if (login === "leticia" && password === "123") {
    res.cookie("login", "leticia");
    return res.redirect("/posts");
  } else {
    return res.redirect("/#modal__login");
  }
});

app.get("/posts", async (req, res) => {
  if (req.cookies && req.cookies.login) {
    const busca = req.query.busca;
    const posts = await Posts.find(busca);
    return res.render("posts", { posts: posts });
  }
  return res.redirect("/#modal__login");
});

app.post("/posts", async (req, res) => {
  const title = req.body.title;
  const description = req.body.description;
  const link = req.body.link;
  Posts.insert(title, description, link);
  return res.redirect("/posts");
});

const port = 3000;

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}/`);
});
