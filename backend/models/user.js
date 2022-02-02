import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
  username: {
    type: String,
    trim: true,
    required: [true, 'UserName is required'],
  },
  password: {
    type: String,
    trim: true,
    required: [true, 'Password is required'],
  },
  email: {
    type: String,
    trim: true,
  },
  createdAt: {
    type: String,
    trim: true,
  },
});

const User = mongoose.model('User', userSchema);
export default User;
