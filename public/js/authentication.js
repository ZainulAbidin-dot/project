import { getDataFromDb, postDataToDb, throwError } from "./dataFunctions.js";
import {
  clearFields,
  validateEmail,
  validateName,
  validatePhoneNumber,
} from "./formValidations.js";

/* Form slide animations */
const signInBtn = document.getElementById("signIn");
const signUpBtn = document.getElementById("signUp");
const container = document.getElementById("container");
signUpBtn.addEventListener("click", function () {
  container.classList.add("right-panel-active");
});
signInBtn.addEventListener("click", function () {
  container.classList.remove("right-panel-active");
});

/* Handle Authentications */
let users;
const getUsers = async () => {
  users = await getDataFromDb("http://localhost:3000/users");
};
getUsers();

const signInForm = document.getElementById("sign-in-form");
const signUpForm = document.getElementById("sign-up-form");

const authenticateUser = (email, password) => {
  console.log(users);
  console.log(email, password);
  return users.find(
    (user) =>
      user.email.toLowerCase() === email.toLowerCase() &&
      user.password === password
  );
};

const handleSignIn = async (e) => {
  const email = signInForm.querySelector('input[type="email"]');
  const password = signInForm.querySelector('input[type="password"]');
  e.preventDefault();
  const authenticatedUser = authenticateUser(email.value, password.value);
  if (!authenticatedUser) {
    // return throwError(
    //   "Invalid email password combination. please try again",
    //   signInForm
    // );
    alert("Invalid email password combination. please try again");
    return;
  }
  console.log(authenticatedUser);
  // TODO: Go to home page with current user logged in
  if (authenticatedUser.role.toLowerCase() === "admin") {
    // TODO: Take him to dashboard
    window.location.href = "http://localhost:3000/admin.html";
  }
};

const validateForm = (nameField, emailField, passwordField, phoneField) => {
  if (!validateName(nameField.value)) {
    alert("Please enter a valid name");
    return false;
  }
  if (!validateEmail(emailField.value)) {
    alert("Please enter a valid email");
    return false;
  }
  if (passwordField.value.length < 8) {
    alert("passsword must be 8 characters long");
    return false;
  }
  if (!validatePhoneNumber(phoneField.value)) {
    alert("Please enter a valid phone number");
    return false;
  }
  return true;
};

const handleSignUp = async (e) => {
  e.preventDefault();
  const nameField = signUpForm.querySelector('input[type="text"]');
  const emailField = signUpForm.querySelector('input[type="email"]');
  const passwordField = signUpForm.querySelector('input[type="password"]');
  const phoneField = signUpForm.querySelector('input[type="tel"]');
  if (
    users.find(
      (user) => user.email.toLowerCase() === emailField.value.toLowerCase()
    )
  ) {
    return alert("account already exist with this email....");
  }
  if (!validateForm(nameField, emailField, passwordField, phoneField)) return;
  await postDataToDb(
    {
      name: nameField.value,
      email: emailField.value,
      password: passwordField.value,
      phone: phoneField.value,
    },
    "users"
  );
  alert("user successfully created");
  clearFields(nameField, emailField, passwordField, phoneField);
  getUsers();
};

signInForm.addEventListener("submit", handleSignIn);
signUpForm.addEventListener("submit", handleSignUp);
