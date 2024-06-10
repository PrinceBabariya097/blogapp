import { Router } from "express";
import { addBlogTodb, showBlog } from "../controller/blog.controller.js";
import { upload } from "../middelware/multer.middelware.js";

const router = Router();

router.get("/add-new", (req, res) => {
  return res.render("addblogs", {
    user: req.user,
  });
});

router.post("/", upload.single("coverimage"), addBlogTodb);

router.get("/:id", showBlog)

export default router;
