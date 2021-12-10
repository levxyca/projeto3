let http = require("http"),
  path = require("path"),
  express = require("express"),
  app = express(),
  Posts = require("./models/posts");

app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: false }));

app.get("/posts", async (req, res) => {
  const busca = req.query.busca;
  const posts = await Posts.find(busca);
  res.render("posts", { posts: posts });
});

app.post("/posts", async (req, res) => {
  const title = req.body.title;
  const description = req.body.description;
  const link = req.body.link;
  Posts.insert(title, description, link);
  res.redirect("/posts");
});

const port = 3000;

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}/`);
});
