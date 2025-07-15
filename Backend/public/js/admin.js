function getToken() {
  return localStorage.getItem("token");
}

// Loads all users and renders the admin dashboard
function loadAdminDashboard() {
   const token = getToken();
  console.log("TOKEN:frmadmin", token);
  if (!token) return;
  console.log("Calling /all-users with token:", token);
  fetch("/api/v1/users/all-users", {
    headers: {
      Authorization: "Bearer " + token,
    },
  })
    .then((res) => {
      if (!res.ok) throw new Error("Failed to fetch users");
      return res.json();
    })
    .then((users) => {
      console.log("Fetched users:", users);

      document.getElementById("user-count").textContent = users.length;

      const tbody = document.getElementById("user-list");
      tbody.innerHTML = "";

      users.forEach((user, index) => {
        const row = document.createElement("tr");
        row.innerHTML = `
  <td>${index + 1}</td>
  <td>${user.name}</td>
  <td>${user.email}</td>
  <td>${user.role}</td>
  <td>
    <button class="admin-btn btn-edit" onclick="editUser('${user.email}')">Edit</button>
    <button class="admin-btn btn-delete" onclick="deleteUser('${user.email}')">Delete</button>
  </td>
`;
        tbody.appendChild(row);
      });
    })
    .catch((err) => {
      console.error("Dashboard load error:", err);
      alert("Failed to load user data.");
    });
    
}

// Delete
function deleteUser(userId) {
  if (!confirm("Are you sure you want to delete this user?")) return;
const token = getToken();
  console.log("TOKEN inside deleteUser:", token);
  if (!token) return;
  fetch(`/api/v1/users/user/${userId}`, {
    method: "DELETE",
    headers: {
      Authorization: "Bearer " + token,
    },
  })
    .then((res) => {
      if (!res.ok) throw new Error("Failed to delete user");
      return res.json();
    })
    .then((data) => {
      alert(data.message);
      loadAdminDashboard(); // Refresh dashboard after deletion
    })
    .catch((err) => {
      console.error("Delete error:", err);
      alert("Failed to delete user.");
    });
}

//Edit
function editUser(userId) {
  const token = getToken();
  console.log("TOKEN inside edit", token);
  if (!token) return;
  fetch(`/api/v1/users/user/id/${userId}`, {
    headers: {
      Authorization: "Bearer " + token,
    },
  })
    .then((res) => {
      if (!res.ok) throw new Error("Failed to fetch user");
      return res.json();
    })
    .then((user) => {
      const newName = prompt("Edit name:", user.name);
      const newRole = prompt("Edit role (admin/user):", user.role);

      if (!newName || !newRole) return;

      const role = newRole.toLowerCase();
      if (!["admin", "user"].includes(role)) {
        alert("Invalid role. Must be 'admin' or 'user'.");
        return;
      }

      return fetch(`/api/v1/users/user/${userId}`, {
        method: "PUT",
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: newName, role }),
      });
    })
    .then((res) => {
      if (!res.ok) throw new Error("Failed to update user");
      return res.json();
    })
    .then((data) => {
      alert(data.message);

      return fetch("/api/v1/auth/current-user", {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
    })
    .then((res) => {
      console.log("Session refresh status:", res.status);
      if (!res.ok) throw new Error("Session refresh failed");
      return res.json();
    })
    .then((sessionData) => {
      console.log("Updated session:", sessionData);
      if (sessionData?.user?.role !== "admin") {
        alert("You are no longer an admin. Redirecting...");
        window.location.href = "/";
      } else {
        loadAdminDashboard();
      }
    })
    .catch((err) => {
      console.error("Edit user error:", err);
      alert(err.message || "Failed to update user.");
    });
}

window.addEventListener("DOMContentLoaded", () => {
  console.log("Admin.js DOM loaded. Token:", getToken());
  loadAdminDashboard();
});