fetch("/api/v1/auth/current-user", {
  credentials: "include",
})
  .then((res) => (res.ok ? res.json() : Promise.reject()))
  .then((data) => {
    const user = data.user;
    if (!user || user.role !== "admin") {
      alert("Access Denied: Admins only.");
      window.location.href = "/pages/home.html";
    } else {
      loadAdminDashboard();
    }
  })
  .catch(() => {
    alert("Please log in as admin.");
    window.location.href = "/pages/home.html";
  });

function loadAdminDashboard() {
  fetch("/api/v1/auth/all-users", {
    credentials: "include",
  })
    .then((res) => res.json())
    .then((users) => {
      document.getElementById("user-count").textContent = users.length;

      const tbody = document.getElementById("user-list");
      tbody.innerHTML = "";
      users.forEach((user, index) => {
        tbody.innerHTML += `
          <tr>
            <td>${index + 1}</td>
            <td>${user.name}</td>
            <td>${user.email}</td>
            <td>${user.role}</td>
            <td>
              <button class="admin-btn btn-edit" onclick="editUser('${user.email}')">Edit</button>
              <button class="admin-btn btn-delete" onclick="deleteUser('${user.email}')">Delete</button>
            </td>
          </tr>
        `;
      });
    })
    .catch(() => {
      alert("Failed to load user data.");
    });
}

function deleteUser(email) {
  if (!confirm("Are you sure you want to delete this user?")) return;
  fetch(`/api/v1/auth/user/${email}`, {
    method: "DELETE",
    credentials: "include",
  })
    .then((res) => res.json())
    .then((data) => {
      alert(data.message);
      loadAdminDashboard();
    })
    .catch(() => alert("Failed to delete user"));//redirect to home
}

function editUser(email) {
  fetch(`/api/v1/auth/user/${email}`, {
    credentials: "include",
  })
    .then((res) => res.json())
    .then((user) => {
      const newName = prompt("Edit name:", user.name);
      const newRole = prompt("Edit role (admin/user):", user.role);

      if (!newName || !newRole) return;

      const role = newRole.toLowerCase();
      if (!["admin", "user"].includes(role)) {
        alert("Invalid role. Must be 'admin' or 'user'.");
        return;
      }

      fetch(`/api/v1/auth/user/${email}`, {
        method: "PUT",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: newName, role }),
      })
        .then((res) => res.json())
        .then((data) => {
          alert(data.message);
          loadAdminDashboard();
        });
    })
    .catch(() => alert("Failed to fetch user details"));
}
