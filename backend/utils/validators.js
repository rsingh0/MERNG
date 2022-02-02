const validateRegisterInput = (username, password, confirmPassword, email) => {
  const errors = {};
  if (!username || !username.trim()) {
    errors.username = 'Username must not be empty';
  }
  if (!email || !email.trim()) {
    errors.email = 'Email must not be empty';
  } else {
    const regEx =
      /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/;
    if (!email.match(regEx)) {
      errors.email = 'Email must be a valid email address';
    }
  }
  if (!password || !password.trim()) {
    errors.password = 'Password must not empty';
  } else if (password !== confirmPassword) {
    errors.confirmPassword = 'Passwords must match';
  }

  return {
    errors,
    valid: Object.keys(errors).length < 1,
  };
};

const validateLoginInput = (username, password) => {
  const errors = {};
  if (!username || !username.trim()) {
    errors.username = 'Username must not be empty';
  }
  if (!password || !password.trim()) {
    errors.password = 'Password must not be empty';
  }

  return {
    errors,
    valid: Object.keys(errors).length < 1,
  };
};

export { validateRegisterInput, validateLoginInput };
