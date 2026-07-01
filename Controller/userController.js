const usermodel = require("../Model/user");
const cartmodel = require("../Model/addcart");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { ReturnDocument } = require("mongodb");
const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const hidepass = await bcrypt.hash(password, 10);
    const newUser = new usermodel({ name, email, password: hidepass });
    await newUser.save();
    res.status(201).json({ message: "User added successfully", user: newUser });
  } catch (error) {
    console.log(error.message);
    res
      .status(500)
      .json({ message: "something went wrong", error: error.message });
  }
};
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await usermodel.findOne({ email });
    const comparepassword = await bcrypt.compare(password, user.password);
    const token = jwt.sign(
      { userid: user._id, email: user.email },
      "Our_secrate_Key",
      { expiresIn: "1d" },
    );
    if (!user || !comparepassword) {
      return res.status(401).json({ message: "email or password wrong" });
    }
    res
      .status(201)
      .json({ message: "User login successfully", user: user, token: token });
  } catch (error) {
    console.log(error.message);
    res
      .status(500)
      .json({ message: "something went wrong", error: error.message });
  }
};
const addcart = async (req, res) => {
  try {
    const { id, name, price, rating, desc, review, image, category, qty } =
      req.body;
    let item = await cartmodel.findOne({ id });
    if (item) {
      item.qty += 1;
      await item.save();

      return res.status(200).json({
        message: "Quantity Updated",
        cart: item,
      });
    } else {
      const newCart = new cartmodel({
        id,
        name,
        price,
        rating,
        desc,
        review,
        image,
        category,
        qty,
      });
      await newCart.save();
      return res.status(201).json({ cart: newCart });
    }

    res.status(201).json({ message: "Item Added to cart" });
  } catch (error) {
    console.log(error.message);
    res
      .status(500)
      .json({ message: "something went wrong", error: error.message });
  }
};
const getcart = async (req, res) => {
  try {
    const cartitem = await cartmodel.find();
    res
      .status(201)
      .json({ message: "find items successfully", cart: cartitem });
  } catch (error) {
    console.log(error.message);
    res
      .status(500)
      .json({ message: "something went wrong", error: error.message });
  }
};
const deletecart = async (req, res) => {
  try {
    const { id } = req.params;
    const deleteitem = await cartmodel.findOneAndDelete({
      id: Number(req.params.id),
    });
    const cart = await cartmodel.find();
    res.status(200).json({
      message: "Item Deleted",
      cart,
    });
  } catch (error) {
    console.log(error.message);
    res
      .status(500)
      .json({ message: "something went wrong", error: error.message });
  }
};

module.exports = { signup, login, addcart, getcart, deletecart };
