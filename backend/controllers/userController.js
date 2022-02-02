import bcrypt from 'bcryptjs';
import User from '../models/user.js';
import jwt from 'jsonwebtoken';
import { UserInputError } from 'apollo-server';
import {
  validateRegisterInput,
  validateLoginInput,
} from '../utils/validators.js';

// @desc registers new user
// @access Public
const registerUser = async (username, password, confirmPassword, email) => {
  try {
    // Validate User Input
    const { valid, errors } = validateRegisterInput(
      username,
      password,
      confirmPassword,
      email
    );

    if (!valid) {
      throw new UserInputError('Errors', { errors });
    }

    // Verify if user exists already
    const user = await User.findOne({ username });
    if (user) {
      const errorPayload = {
        errors: {
          username: 'This username is taken',
        },
      };

      throw new UserInputError('Username is taken', errorPayload);
    }

    console.log(`Registering new user ${username}...`.blue);

    // Encrypt new user password
    const salt = await bcrypt.genSalt(10);
    password = await bcrypt.hash(password, salt);

    // Create/Register new User
    const newUser = new User({
      email,
      username,
      password,
      createdAt: new Date().toISOString(),
    });

    const res = await newUser.save();

    const token = generateToken(res);

    console.log(`New User ${username} registered successfully`.blue);
    return {
      ...res._doc,
      id: res._id,
      token,
    };
  } catch (error) {
    console.log(
      `Error registering for user ${username} ${JSON.stringify(error)}`.red
    );

    if (error instanceof UserInputError) {
      throw error;
    }
    throw new Error(error);
  }
};

// @desc login user
// @access Public
const loginUser = async (username, password) => {
  try {
    // Validate User
    const { valid, errors } = validateLoginInput(username, password);
    if (!valid) {
      throw new UserInputError('Errors', { errors });
    }

    // Verify if user not found
    const user = await User.findOne({ username });
    if (!user) {
      errors.general = 'User not found';
      throw new UserInputError('User not found', { errors });
    }

    // Verify if passwords are matching
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      errors.general = 'Wrong Credentials';
      throw new UserInputError('Wrong Credentials', { errors });
    }

    const token = generateToken(user);
    console.log(`User ${username} loggedIn successfully`.blue);
    
    return {
      ...user._doc,
      id: user._id,
      token,
    };
  } catch (error) {
    console.log(
      `Error while login for user ${username} ${JSON.stringify(error)}`.red
    );

    if (error instanceof UserInputError) {
      throw error;
    }
    throw new Error(error);
  }
};

const generateToken = (user) => {
  // Sign and return JWT token
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      username: user.username,
    },
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  );
};

export { registerUser, loginUser };
