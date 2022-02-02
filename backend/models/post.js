import mongoose from 'mongoose';

const postSchema = mongoose.Schema({
  body: {
    type: String,
    trim: true,
  },
  username: {
    type: String,
    trim: true,
  },
  createdAt: {
    type: String,
    trim: true,
  },
  comments: [
    {
      body: String,
      username: String,
      createdAt: String,
    },
  ],
  likes: [
    {
      username: String,
      createdAt: String,
    },
  ],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
  },
});

const Post = mongoose.model('Post', postSchema);
export default Post;
