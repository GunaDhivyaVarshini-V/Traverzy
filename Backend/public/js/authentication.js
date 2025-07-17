const script = document.createElement("script");
script.src = "https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js";
document.head.appendChild(script);
function getToken() {
  return localStorage.getItem("token");
}

function setToken(token) {
  localStorage.setItem("token", token);
}

function removeToken() {
  localStorage.removeItem("token");
}

function updateNavbar(user) {
  const loginBtn = document.getElementById("loginBtn");
  if (!loginBtn) return;

  const profileHTML = `
    <div class="dropdown ms-2" id="profileMenu">
      <button class="btn btn-outline-primary dropdown-toggle" type="button" data-bs-toggle="dropdown">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person-circle" viewBox="0 0 16 16">
          <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0"/>
          <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"/>
        </svg>
      </button>
      <ul class="dropdown-menu dropdown-menu-end">
        ${user.role === "admin" ? '<li><a class="dropdown-item" href="/api/v1/users/dashboard">Admin Panel</a></li>' : ""}
        <li><a class="dropdown-item" href="#" id="logoutBtn">Logout</a></li>
      </ul>
    </div>
  `;

  $("#loginBtn").replaceWith(profileHTML);
}


function authenticate() {
  const token = getToken();
  if (!token) return;

  fetch("/api/v1/auth/current-user", {
    headers: {
      Authorization: "Bearer " + token,
    },
  })
    .then((res) => {
      if (!res.ok) throw new Error("Failed to fetch user");
      return res.json();
    })
    .then((data) => {
      if (data?.user) updateNavbar(data.user);
    })
    .catch((err) => {
      console.error("Auth error:", err);
      removeToken(); 
    });
}

function Login(e) {
  e.preventDefault();

  const email = $("#loginEmail").val().trim();
  const password = $("#loginPassword").val().trim();

  fetch("/api/v1/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  })
    .then((res) => {
      if (!res.ok) throw new Error("Invalid credentials");
      return res.json();
    })
    .then((data) => {
      if (!data.token) throw new Error("Token missing in response");

      setToken(data.token);

      bootstrap.Modal.getInstance(document.getElementById("loginModal")).hide();
      document.querySelectorAll(".modal-backdrop").forEach((el) => el.remove());
      document.body.classList.remove("modal-open");
      document.body.style = "";

      setTimeout(() => window.location.reload(), 300);
    })
    .catch((err) => {
      console.error("Login error:", err);
      alert(err.message);
    });
}

function Register(e) {
  e.preventDefault();

  const name = $("#regName").val().trim();
  const email = $("#regEmail").val().trim();
  const password = $("#regPassword").val().trim();
  const role = $("#regRole").val();

  if (!name || !email || !password || !role) {
    return alert("Please fill all fields");
  }

  fetch("/api/v1/auth/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, password, role }),
  })
    .then((res) => res.json())
    .then((data) => {
      alert(data.message || "Registration successful");

      bootstrap.Modal.getInstance(document.getElementById("registerModal")).hide();
      bootstrap.Modal.getOrCreateInstance(document.getElementById("loginModal")).show();
    })
    .catch((err) => {
      console.error("Registration failed:", err);
      alert("Registration failed");
    });
}

function Logout(e) {
  e.preventDefault();

  const token = getToken();
  if (!token) return;

  fetch("/api/v1/auth/logout", {
    headers: {
      Authorization: "Bearer " + token,
    },
  })
    .then((res) => res.json())
    .then(() => {
      removeToken();
      alert("Logged out successfully");
      window.location.href = "/";
    })
    .catch((err) => {
      console.error("Logout failed:", err);
      alert("Logout failed");
    });
}

window.addEventListener("DOMContentLoaded", () => {
  authenticate();

  $(document).on("submit", "#loginForm", Login);
  $(document).on("submit", "#registerForm", Register);
  $(document).on("click", "#logoutBtn", Logout);
});
