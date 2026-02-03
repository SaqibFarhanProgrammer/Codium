// src/models/user.models.js
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true, trim: true, minlength: 3 },
  email: { type: String, required: true, unique: true, lowercase: true, match: /.+\@.+\..+/ },
  password: { type: String, required: true, minlength: 6 },
  image: { type: String, default: null },
  isVerified: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  ForgetPasswordToken: { type: String, default: null },
  ForgetPasswordTokenExpiry: { type: Date, default: null },
  verifyToken: { type: String, default: null },
  verifyTokenExpiry: { type: Date, default: null },
});

export const User = mongoose.models.User || mongoose.model('User', userSchema);
