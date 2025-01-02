function showAlert(type, title, message) {
  const alertContainer = document.getElementById("customAlertContainer");

  // Create the alert box
  const alertBox = document.createElement("div");
  alertBox.className = `alert-box alert-${type}`;

  // Add the icon
  const alertIcon = document.createElement("span");
  alertIcon.className = "alert-icon";
  alertIcon.innerHTML =
    type === "success"
      ? `<img src="./img/user-check.svg" alt="user-check">`
      : `<img src="./img/x-octagon.svg" alt="user-check">`;

  // Add the text content
  const alertContent = document.createElement("div");
  alertContent.innerHTML = `<strong>${title}</strong><br>${message}`;

  // Add the close button
  const alertClose = document.createElement("button");
  alertClose.className = "alert-close";
  alertClose.innerHTML = `<img src="./img/x.svg" alt="x">`;
  alertClose.onclick = () => {
    alertContainer.removeChild(alertBox);
  };

  // Append elements to the alert box
  alertBox.appendChild(alertIcon);
  alertBox.appendChild(alertContent);
  alertBox.appendChild(alertClose);

  // Add the alert box to the container
  alertContainer.appendChild(alertBox);

  // Auto-remove the alert after 5 seconds
  setTimeout(() => {
    if (alertContainer.contains(alertBox)) {
      alertContainer.removeChild(alertBox);
    }
  }, 5000);
}

document.addEventListener("DOMContentLoaded", () => {
  const signUpButton = document.getElementById("signUpButton");
  const signInButton = document.getElementById("signInButton");
  const loginToggle = document.getElementById("login");
  const registerToggle = document.getElementById("register");
  const container = document.getElementById("container");

  // Toggle between login and signup
  registerToggle.addEventListener("click", () => {
    container.classList.add("active");
  });
  loginToggle.addEventListener("click", () => {
    container.classList.remove("active");
  });

  // Check if the user has just signed up and redirect them
  if (localStorage.getItem("newUser") === "true") {
    localStorage.removeItem("newUser");
    window.location.href = "./home/home.html";
  }

  // Sign Up Functionality
  signUpButton.addEventListener("click", (event) => {
    event.preventDefault();

    const name = document
      .querySelector(".sign-up input[placeholder='Name']")
      .value.trim();
    const email = document
      .querySelector(".sign-up input[placeholder='Email']")
      .value.trim();
    const password = document
      .querySelector(".sign-up input[placeholder='Password']")
      .value.trim();

    if (!name || !email || !password) {
      showAlert("error", "Error", "All fields are required!");
      return;
    }

    // Retrieve users from localStorage or initialize an empty array
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const existingUser = users.find((user) => user.email === email);

    if (existingUser) {
      showAlert("error", "Error", "An account with this email already exists.");
      return;
    }

    // Add new user to localStorage
    users.push({ name, email, password });
    localStorage.setItem("users", JSON.stringify(users));

    // Mark user as a new user
    localStorage.setItem("newUser", "true");

    // Show success message and redirect
    showAlert("success", "Success", "Account created successfully!");
    setTimeout(() => {
      window.location.href = "./home/home.html";
    }, 1000);
  });

  // Sign In Functionality
  signInButton.addEventListener("click", (event) => {
    event.preventDefault();

    const email = document
      .querySelector(".sign-in input[placeholder='Email']")
      .value.trim();
    const password = document
      .querySelector(".sign-in input[placeholder='Password']")
      .value.trim();

    if (!email || !password) {
      showAlert("error", "Error", "All fields are required!");
      return;
    }

    // Retrieve users from localStorage
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find(
      (user) => user.email === email && user.password === password
    );

    if (!user) {
      showAlert("error", "Error", "Invalid email or password.");
    } else {
      showAlert("success", "Success", `Welcome back, ${user.name}!`);
      setTimeout(() => {
        window.location.href = "./home/home.html";
      }, 1000);
    }
  });

  // Clear form fields on page reload
  const forms = document.querySelectorAll("form");
  forms.forEach((form) => form.reset());
});
