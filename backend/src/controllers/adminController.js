const User = require('../models/User');

const sanitizeUser = (user) => ({
  id: user._id,
  username: user.username,
  email: user.email,
  createdAt: user.createdAt,
  updatedAt: user.updatedAt
});

exports.listAdmins = async (req, res) => {
  try {
    const users = await User.find().sort({ createdAt: 1 });
    res.json(users.map(sanitizeUser));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createAdmin = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ error: 'Username, email, and password are required.' });
    }

    const user = new User({ username, email, password });
    await user.save();

    res.status(201).json({
      message: 'Admin created successfully',
      admin: sanitizeUser(user)
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ error: 'Username or email already exists.' });
    }
    res.status(500).json({ error: error.message });
  }
};

exports.updateAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    const { username, email, password } = req.body;

    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ error: 'Admin not found.' });
    }

    if (username) user.username = username;
    if (email) user.email = email;
    if (password) user.password = password;

    await user.save();

    res.json({
      message: 'Admin updated successfully',
      admin: sanitizeUser(user)
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ error: 'Username or email already exists.' });
    }
    res.status(500).json({ error: error.message });
  }
};

exports.deleteAdmin = async (req, res) => {
  try {
    const { id } = req.params;

    if (req.userId === id) {
      return res.status(400).json({ error: 'You cannot delete your own account.' });
    }

    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ error: 'Admin not found.' });
    }

    await user.deleteOne();

    res.json({ message: 'Admin deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
