const cookieParser = require("cookie-parser");
const async = require("hbs/lib/async");

let http = require("http"),
  path = require("path"),
  session = require("express-session"),
  express = require("express"),
  app = express(),
  Posts = require("./models/posts"),
  Users = require("./models/users");

app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(
  session({
    secret: "leticia123",
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false },
  })
);

app.get("/", (req, res) => {
  if (req.cookies && req.cookies.login) {
    return res.redirect("/posts");
  }
  return res.render("index");
});

app.post("/login", async (req, res, next) => {
  let login = req.body.user;
  let password = req.body.pass;

  let users = await Users.find(login, password);
  console.log(users);

  if (users === null) {
    return res.redirect("/#modal__login");
  } else if (users.user && users.pass) {
    res.cookie("login", login);
    req.session.login = login;
    return res.redirect("/posts");
  } else {
    return res.redirect("/#modal__login");
  }
});

app.post("/register", async (req, res, next) => {
  let login = req.body.user;
  let password = req.body.pass;
  const user = await Users.findOne(login);
  if (user === null) {
    if (login.length > 3 || password.length > 3) {
      Users.insert(login, password);
      return res.redirect("/#modal__login");
    } else {
      return res.redirect("/#modal__register");
    }
  } else {
    return res.redirect("/#modal__register");
  }
});

app.get("/posts", async (req, res) => {
  if (req.cookies && req.cookies.login) {
    if (req.session.views) {
      req.session.views++;
    } else {
      req.session.views = 1;
    }
    res.cookie("views", req.session.views);
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
  if (req.session.posts) {
    req.session.posts++;
  } else {
    req.session.posts = 1;
  }
  res.cookie("posts", req.session.posts);
  return res.redirect("/posts");
});

const port = 3000;

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}/`);
});
