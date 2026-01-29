import { create } from 'domain';
import * as mongoose from 'mongoose';
import * as bcrypt from 'bcrypt';

export const UserSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['user', 'publisher'], default: 'user' },
  createdAt: { type: Date, default: Date.now },
});

// Hash passwords before saving
UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return;
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Compare passwords
UserSchema.methods.comparePasswords = async function (password: string) {
  return bcrypt.compare(password, this.password);
};
