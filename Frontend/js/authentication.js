function authenticate() {
  function updateNavbarWithUserProfile() {
    const user = JSON.parse(sessionStorage.getItem("loggedInUser"));
    if (user) {
      const profileHTML = `
        <div class="dropdown ms-2" id="profileMenu">
          <button class="btn btn-outline-primary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person-circle" viewBox="0 0 16 16">
              <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0"/>
              <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"/>
          </svg>
          </button>
          <ul class="dropdown-menu dropdown-menu-end">
            <li><a class="dropdown-item" href="#">Dashboard</a></li>
            <li><a class="dropdown-item" href="#" id="logoutBtn">Logout</a></li>
          </ul>
        </div>
      `;
      $("#loginBtn").replaceWith(profileHTML);
    }
  }

  updateNavbarWithUserProfile();

  // SIGNUP
  $(document).on("submit", "#registerForm", function (e) {
    e.preventDefault();
    const name = $("#regName").val().trim();
    const email = $("#regEmail").val().trim();
    const password = $("#regPassword").val().trim();
    const role = $("#regRole").val();

    if (!name || !email || !password || !role) {
      alert("Please fill all fields.");
      return;
    }

    let users = JSON.parse(localStorage.getItem("users")) || {};
    if (users[email]) {
      alert("User already exists. Please login.");
      return;
    }

    users[email] = { name, password, role };
    localStorage.setItem("users", JSON.stringify(users));
    alert("Signup successful!");
    $("#registerModal").modal("hide");
    $("#loginModal").modal("show");
  });

  // LOGIN
  $(document).on("submit", "#loginModal form", function (e) {
    e.preventDefault();
    const email = $("#loginEmail").val().trim();
    const password = $("#loginPassword").val().trim();

    let users = JSON.parse(localStorage.getItem("users")) || {};
    const user = users[email];

    if (!user) {
      alert("No such user. Please sign up.");
      return;
    }
    if (user.password !== password) {
      alert("Incorrect password.");
      return;
    }

    sessionStorage.setItem("loggedInUser", JSON.stringify(user));
    updateNavbarWithUserProfile();
    $("#loginModal").modal("hide");
  });

  // LOGOUT
  $(document).on("click", "#logoutBtn", function () {
    sessionStorage.removeItem("loggedInUser");
    location.reload();
  });
}
