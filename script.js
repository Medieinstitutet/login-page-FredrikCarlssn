// Ingångsparametrar
const header = document.getElementById("header");
const headerText = document.getElementById("headerText");
const statusBtn = document.getElementById("statusBtn");
const dropdown = document.getElementById("dropdown");
const loginBtn = document.getElementById("loginBtn");
const contentSection = document.getElementById("contentSection");
const dropdownContent = document.getElementById("dropdownContent");
const hello = document.getElementById("hello");
const userText = document.getElementById("userText");
const createUserBtn = document.getElementById("createUserBtn");

// Kolla LS
if (localStorage.getItem("userArray") === null) {
  let userArray = [
    {
      User: "FredrikCarlssn",
      Password: "fredde",
      Age: "22",
      Email: "fredrik.carlsson@test.se",
    },
    {
      User: "janne",
      Password: "test",
      Age: "??",
      Email: "janne.kemi@test.se",
    },
    {
      User: "FredrikaCarlsdotter",
      Password: "freddi",
      Age: "48",
      Email: "fredrika.carlsdotter@test.se",
    },
    {
      User: "robot",
      Password: "hacker",
      Age: "1",
      Email: "robot@test.se",
    },
  ];
  localStorage.setItem("userArray", JSON.stringify(userArray));
  localStorage.setItem("loggedInUser", false);
}

// Om inloggad = ändra innehåll från default
let userLoggedIn = () => {
  if (localStorage.getItem("loggedInUser") !== "false") {
    let loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    statusBtn.innerHTML =
      '<img src="./img/locked.png" height="20" width="16"> Log Out';
    dropdownContent.innerHTML =
      "<style>.dropdown:hover .dropdown-content{display: none;}</style>";
    hello.innerText = "Hello " + loggedInUser.User + "!";
    userText.innerHTML =
      "Thank you for sharing details, now i have sold your info. Prepare for the storm. The following is shared with 1000 chinese companies :)<br><br>Name: " +
      loggedInUser.User +
      "<br>Password: " +
      loggedInUser.Password +
      "<br>Age: " +
      loggedInUser.Age +
      "<br>Email: " +
      loggedInUser.Email;
  }
};
userLoggedIn();

// Logga in
loginBtn.addEventListener("click", () => {
  let userArray = JSON.parse(localStorage.getItem("userArray"));
  const usernameInput = document.getElementById("usernameInput").value;
  const passwordInput = document.getElementById("passwordInput").value;
  for (let i = 0; i < userArray.length; i++) {
    loginBtn.after.innerHTML = "";
    if (
      usernameInput === userArray[i].User &&
      passwordInput === userArray[i].Password
    ) {
      // hämta
      let loggedInUser = localStorage.getItem("loggedInUser");
      // ändra
      loggedInUser = userArray[i];
      // spara
      localStorage.setItem("loggedInUser", JSON.stringify(loggedInUser));
      userLoggedIn();
      return;
    }
  }
  if (document.getElementById("fault1") === null) {
    loginBtn.insertAdjacentHTML(
      "beforebegin",
      '<p id="fault1" class="redText">No User Found</p>'
    );
  }
});

// Logga Ut
statusBtn.addEventListener("click", () => {
  if (localStorage.getItem("loggedInUser")) {
    // Hämta
    let User = localStorage.getItem("loggedInUser");
    // Ändra
    User = false;
    // Spara
    localStorage.setItem("loggedInUser", User);
    window.location.reload();
  }
});

// Skapa ny användare
let addUserBtn = "hej";
createUserBtn.addEventListener("click", () => {
  hello.innerText = "Creating account!";
  userText.innerHTML =
    'Please insert the correct info down below:<br><h3>Username</h3><br><input class="account" id="newUser"><br><h3>Password</h3><br><input class="account" id="newPassword"></input><br><h3>Age</h3><br><input class="account" id="newAge"></input><br><h3>Email</h3><br><input class="account" id="newEmail"></input><br><button id="addUserBtn" class="btn">Add new user</button>';

  const addUserBtn = document.getElementById("addUserBtn");
  addUserBtn.addEventListener("click", () => {
    let newUser = document.getElementById("newUser").value;
    let newPassword = document.getElementById("newPassword").value;
    let newAge = document.getElementById("newAge").value;
    let newEmail = document.getElementById("newEmail").value;

    if (
      newUser !== "" &&
      newPassword !== "" &&
      newAge !== "" &&
      newEmail !== ""
    ) {
      let newArrayItem = {
        User: newUser,
        Password: newPassword,
        Age: newAge,
        Email: newEmail,
      };
      // Hämta
      let userArray = JSON.parse(localStorage.getItem("userArray"));
      // Ändra
      userArray.push(newArrayItem);
      // Spara
      localStorage.setItem("userArray", JSON.stringify(userArray));
      console.log(JSON.parse(localStorage.getItem("userArray")));
      // New User added
      clearValue = () => {
        let newUser = document.getElementById("newUser");
        let newPassword = document.getElementById("newPassword");
        let newAge = document.getElementById("newAge");
        let newEmail = document.getElementById("newEmail");
        newUser.value = "";
        newPassword.value = "";
        newAge.value = "";
        newEmail.value = "";
      };
      clearValue();
    } else if (document.getElementById("fault") === null) {
      addUserBtn.insertAdjacentHTML(
        "afterend",
        '<p id="fault" class="redText">Please fill the form correctly</p>'
      );
    }
  });
});

// Vem är inloggad ?
console.log(localStorage.getItem("loggedInUser"));
