interface User {
  username?: string;
  email?: string;
  fullName?: string;
  password?: string;
}

const validate = (user: User) => {
  const errors: User = {};
  const validEmail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i
  if (!user.username || user.username.length < 3) {
    errors.username = "Please, enter your username!";
  }
  if (!user.email) {
    errors.email = "Please, enter your email!";
  } else if (!validEmail.test(user.email)) {
    errors.email = "Invalid email address";
  }
  if (!user.fullName || user.fullName.length < 3) {
    errors.fullName = "Please, enter your fullname!";
  }
  if (!user.password || user.password.length < 8) {
    errors.password = "Please, enter your password!"
  }
  return errors;
};

export default validate
