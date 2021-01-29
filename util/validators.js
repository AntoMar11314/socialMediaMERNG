module.exports.validateRegisterInput = (
  username,
  email,
  password,
  confirmPassword
) => {
  const errors = {};
  if (username.trim() === "") {
    errors.username = "Username non può essere vuoto";
  }
  if (email.trim() === "") {
    errors.email = "Email non può essere vuoto";
  } else {
    const regEx = /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/;
    if (!email.match(regEx)) {
      errors.email = "Email deve essere un valido indirizzo email";
    }
  }
  if (password === "") {
    errors.password = "Password non può essere vuoto";
  } else if (password !== confirmPassword) {
    errors.confirmPassword = "Le password non coincidono";
  }

  return {
    errors,
    valid: Object.keys(errors).length < 1,
  };
};


module.exports.validateLoginInput = (username, password) => {
    const errors = {};
    if (username.trim() === "") {
        errors.username = "Username non può essere vuoto";
      }
      if (password.trim() === "") {
        errors.password = "Password non può essere vuoto";
      }

      return {
        errors,
        valid: Object.keys(errors).length < 1,
      };
}