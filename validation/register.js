const isEmpty = require("./is-empty");
const validator = require("validator");

module.exports = function validateRegisterinput(data) {
  let errors = {};
  data.name = !isEmpty(data.name) ? data.name : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  data.alamat = !isEmpty(data.alamat) ? data.alamat : "";

  if (
    !validator.isLength(data.name, {
      min: 2,
      max: 30
    })
  ) {
    errors.name = "Name must be between 2 or 30 characters";
  }

  if (validator.isEmpty(data.name)) {
    errors.name = "Kontol ini kosong!!";
  }

  if (validator.isEmpty(data.email)) {
    errors.email = "Email field is required";
  }

  if (!validator.isEmail(data.email)) {
    errors.email = "Email is invalid";
  }

  if (
    !validator.isLength(data.email, {
      min: 2,
      max: 30
    })
  ) {
    errors.email = "Email must be between 2 or 30 characters";
  }

  if (validator.isEmpty(data.password)) {
    errors.password = "Password field is required";
  }

  if (
    !validator.isLength(data.password, {
      min: 2,
      max: 30
    })
  ) {
    errors.password = "Email must be between 2 or 30 characters";
  }

  if (validator.isEmpty(data.alamat)) {
    errors.alamat = "Alamat tidak boleh kosong ngntooy!1";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
