// Check current user and load admin dashboard if authorized
fetch("/api/v1/auth/current-user", {
  credentials: "include",
})
  .then((res) => (res.ok ? res.json() : Promise.reject()))
  .then((data) => {
    const user = data.user;
    if (!user || user.role !== "admin") {
      alert("Access Denied: Admins only.");
      window.location.href = "/";
    } else {
      loadAdminDashboard();
    }
  })
  .catch(() => {
    alert("Please log in as admin.");
    window.location.href = "/";
  });

// Loads all users and renders the admin dashboard
function loadAdminDashboard() {
  fetch("/api/v1/users/all-users", {
    credentials: "include",
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

  fetch(`/api/v1/users/user/${userId}`, {
    method: "DELETE",
    credentials: "include",
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
  fetch(`/api/v1/users/user/${userId}`, {
    credentials: "include",
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
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: newName, role }),
      });
    })
    .then((res) => {
      if (!res) return;
      if (!res.ok) throw new Error("Failed to update user");
      return res.json();
    })
    .then((data) => {
      if (!data) return;
      alert(data.message);

      return fetch("/api/v1/auth/current-user", {
        credentials: "include",
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
      alert("Failed to update user.");
    });
}
