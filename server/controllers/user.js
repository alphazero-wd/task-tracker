const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

const signin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (!existingUser)
      return res.status(404).json({ message: "User Doesn't Exist." });

    const isValidPassword = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (!isValidPassword)
      return res.status(400).json({ message: 'Wrong Password' });

    const token = jwt.sign(
      { email: existingUser.email, id: existingUser._id },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: '1h',
      }
    );

    return res.status(200).json({
      profile: {
        email,
        firstName: existingUser.firstName,
        lastName: existingUser.lastName,
        name: existingUser.name,
        id: existingUser._id,
      },
      token,
    });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

const signup = async (req, res) => {
  try {
    const { email, password, firstName, lastName, confirmPassword } = req.body;
    const oldUser = await User.findOne({ email });
    if (oldUser)
      return res.status(400).json({ message: 'User Already Exists.' });
    if (confirmPassword !== password)
      return res.status(400).json({
        message: "Password don't match.",
      });
    const newUser = await User.create({
      email,
      firstName,
      lastName,
      name: `${firstName} ${lastName}`,
      password: await bcrypt.hash(password, 12),
    });

    const token = jwt.sign(
      { email: newUser.email, id: newUser._id },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: '1h',
      }
    );
    return res.status(201).json({
      profile: {
        email,
        id: newUser._id,
        firstName,
        lastName,
        name: newUser.name,
      },
      token,
    });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

module.exports = { signin, signup };
