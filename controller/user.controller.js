import { User } from "../model/user.model.js";

const signInUser = async (req, res) => {
  const { fullName, email, password } = req.body;

  if (!fullName || !email || !password)
    return res.status(400).json("all field is required");

  const user = await User.create({
    fullName,
    email,
    password,
  });
  console.log(user);

  return res.redirect("/login");
};

const loginUser = async (req, res) => {
 try {
     const { email, password } = req.body;
   
     if (!email || !password) return res.status(400).json("all field is required");
   
     const token = await User.matchPasswordAndGenerateToken(email, password);
   
     if (!token) return res.status(401).json("you are not a valid user");
   
    return res.cookie("token",token).redirect('/')
 } catch (error) {
    throw res.status(500).json("you are not the valid user")
 }
};

const logoutUser = (req, res) => {
  res.clearCookie('token').redirect('/')
}

export { signInUser, loginUser, logoutUser };
