import express from "express";
import { configDotenv } from "dotenv";
import { mongodbConnection } from "./connection.js";
import { userRouter } from "./routes/user.routes.js";
import { checkStatusUser } from "./middelware/auth.middelware.js";
import cookieParser from "cookie-parser";
import blogRouter from "./routes/blog.routes.js";
import path from "path"
import { Blog } from "./model/blog.model.js";

configDotenv();

const app = express();

app.set("view engine", "ejs");
app.use(express.static('views'))
app.use(express.urlencoded({extended:false}))
app.use(cookieParser())
app.use(checkStatusUser("token"))
app.use(express.static(path.resolve('./public')))

app.get("/", async(req, res) => {
  const allBlog = await Blog.find({})
  res.render("home",{
    user:req.user,
    blogs: allBlog
  });
});
app.get("/login", (req, res) => {
  res.render("login");
});
app.get("/signin", (req, res) => {
  res.render("signin");
});

app.use('/user', userRouter)
app.use('/blog', blogRouter)

mongodbConnection().then(() => {
  console.log("mongoDb is connected successfully!!!");
});

app.listen(process.env.PORT, (req, res) => {
  console.log(`server is cerruntely running at port ${process.env.PORT}`);
});
