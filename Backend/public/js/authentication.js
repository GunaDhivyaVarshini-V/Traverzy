function authenticate() {
  function updateNavbar(user) {
    if (user) {
      const profileHTML = `
        <div class="dropdown ms-2" id="profileMenu">
          <button class="btn btn-outline-primary dropdown-toggle" type="button" data-bs-toggle="dropdown">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person-circle" viewBox="0 0 16 16">
              <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0"/>
              <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"/>
            </svg>
          </button>
          <ul class="dropdown-menu dropdown-menu-end">
            ${user.role === "admin" ? '<li><a class="dropdown-item" href="/pages/admin.html">Admin Panel</a></li>' : ""}
            <li><a class="dropdown-item" href="#" id="logoutBtn">Logout</a></li>
          </ul>
        </div>
      `;
      $("#loginBtn").replaceWith(profileHTML);
    }
  }

  // Get current user
  fetch("http://localhost:3000/api/v1/auth/current-user", {
    credentials: "include"
  })
    .then(res => res.ok ? res.json() : null)
    .then(data => {
      if (data?.user) updateNavbar(data.user);
    });

  // Register
  $(document).on("submit", "#registerForm", function (e) {
    e.preventDefault();
    const name = $("#regName").val().trim();
    const email = $("#regEmail").val().trim();
    const password = $("#regPassword").val().trim();
    const role = $("#regRole").val();

    if (!name || !email || !password || !role) return alert("Please fill all fields");

    fetch("http://localhost:3000/api/v1/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password, role })
    })
      .then(res => res.json())
      .then(data => {
        alert(data.message || "Registration done");
        bootstrap.Modal.getInstance(document.getElementById("registerModal")).hide();
        bootstrap.Modal.getOrCreateInstance(document.getElementById("loginModal")).show();
      })
      .catch(err => alert("Registration failed"));
  });

  //Login
  $(document).on("submit", "#loginModal form", function (e) {
    e.preventDefault();
    const email = $("#loginEmail").val().trim();
    const password = $("#loginPassword").val().trim();

    fetch("http://localhost:3000/api/v1/auth/login", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    })
      .then(res => {
        if (!res.ok) throw new Error("Invalid credentials");
        return res.json();
      })
      .then(data => {
        updateNavbar(data.user);
        bootstrap.Modal.getInstance(document.getElementById("loginModal")).hide();
        document.querySelectorAll(".modal-backdrop").forEach(el => el.remove());
        document.body.classList.remove("modal-open");
        document.body.style = "";
      })
      .catch(err => alert(err.message));
  });

  //Logout
  $(document).on("click", "#logoutBtn", function () {
    fetch("http://localhost:3000/api/v1/auth/logout", {
      credentials: "include"
    }).then(() => location.reload());
  });
}
