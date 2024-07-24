const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require("uuid");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  uuid: {
    type: String,
    default: uuidv4(),
  },
  password: {
    type: String,
    required: true,
  },
  passwordResetCode: {
    type: String,
    default: uuidv4(),
  },
  isVerified: {
    type: Boolean,
    default: false,
  },

});

userSchema.pre("save", async function (next) {
  const user = this;
  try {
    const hash = await bcrypt.hash(user.password, 10);
    user.password = hash;
    if (user.isModified("password")) {
      user.passwordResetCode = uuidv4();
    }
    next();
  } catch (error) {
    next(error);
  }
});

const User = mongoose.models.User || mongoose.model("User", userSchema);

module.exports = User;
