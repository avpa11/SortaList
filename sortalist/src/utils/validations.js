export const validatePassword = (password) => {
  const hasNumberRegex = /\d/;
  const hasSpecialCharactersRegex = /[ `!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~]/;
  let errorMessage = "";
  if (password.length < 8) {
    errorMessage = "Password requires minimum of 8 characters.";
  } else if (password === password.toLowerCase()) {
    errorMessage = "Password must contain at least one capital letter.";
  } else if (password === password.toUpperCase()) {
    errorMessage = "Password must contain at least one small letter.";
  } else if (!hasNumberRegex.test(password)) {
    errorMessage = "Password must contain at least one number.";
  } else if (!hasSpecialCharactersRegex.test(password)) {
    errorMessage = "Password must contain at least one special character.";
  }
  return errorMessage;
};

const tester =
  /^[-!#$%&'*+/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;

export const isEmailValid = (email) => {
  if (!email) return false;

  if (email.length > 254) return false;

  var valid = tester.test(email);
  if (!valid) return false;

  // Further checking of some things regex can't handle
  var parts = email.split("@");
  if (parts[0].length > 64) return false;

  var domainParts = parts[1].split(".");
  if (domainParts.some((part) => part.length > 63)) return false;

  return true;
};
