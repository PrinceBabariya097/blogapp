import { Blog } from "../model/blog.model.js"

const addBlogTodb = async (req, res) => {
    const {title, content} = req.body

    const blog = await Blog.create({
        title,
        content,
        createdBy:req.user._id,
        coverImageUrl: `/blog/${req.file.filename}`
    })

    return res.redirect(`/blog/${blog._id}`);
}

const showBlog = async (req, res) => {
    try {
        const blogID = req.params.id
        console.log(typeof(blogID));
        const blog = await Blog.findById(blogID)
        console.log(blog);
        console.log(blogID);
    
       return res.render('blog',{
            user: req.user._id,
            blog,
        })
    } catch (error) {
        console.error(error);
    }
}

export {
    addBlogTodb,
    showBlog
}