import User from "../model/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const signup = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  try {
    if (!firstName || !lastName || !email || !password) {
      return res.status(401).json({ Error: "Invalid credentials" });
    }
    const user = await User.findOne({ email: email });

    if (user) {
      return res.status(401).json({ Error: "User already exist " });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      firstName,
      lastName,
      email,
      password: hashPassword,
    });

    await newUser.save();
    return res.status(201).json({ Message: "User created succeded " });
  } catch (error) {
    console.log("Error in singup", error);
    return res.status(500).json({ Error: "Error in singup" });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email: email });

    if (!user) {
      return res.status(403).json({ Error: "User not Found" });
    }
    console.log(user);

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      return res.status(403).json({ Error: "Invalid credentials" });
    }

    // JWT Code

    const Token = jwt.sign({ id: user._id }, process.env.JWT_PASSWORD, {
      expiresIn: "1d",
    });

    const cookieOption = {
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
      httpOnly: true,
      secure: true,
      sameSite: "None",
    };

    res.cookie("jwt", Token, cookieOption);

    return res
      .status(201)
      .json({ Message: "User login in succeeded", user, Token });
  } catch (error) {
    console.log("Error in login", error);
    return res.status(500).json({ Error: "Error in login" });
  }
};

export const logout = (req, res) => {
  try {
    res.clearCookie("jwt");
    
    return res.status(200).json({ Message: "logout succeeded" });
  } catch (error) {
    console.log("Error in logout", error);
    return res.status(500).json({ Error: "Error in logout" });
  }
};
