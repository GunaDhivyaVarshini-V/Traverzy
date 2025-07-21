let nameSearch = "";
let emailSearch = "";
let roleSearch = "";
let sortKey = "name";
let sortOrder = "asc";
let allUsers = [];

/**
 * Get JWT token from local storage
 */
function getToken() {
  return localStorage.getItem("token");
}

/**
 * Fetch users from the API based on filters and sorting
 */
function loadAdminDashboard() {
  const token = getToken();
  if (!token) {
    alert("Unauthorized: Login first.");
    return;
  }

  const params = new URLSearchParams();
  if (nameSearch) params.append("name", nameSearch);
  if (emailSearch) params.append("email", emailSearch);
  if (roleSearch) params.append("role", roleSearch);
  params.append("sortBy", sortKey);
  params.append("order", sortOrder);

  fetch(`/api/v1/users/all-users?${params.toString()}`, {
    headers: { Authorization: "Bearer " + token },
  })
    .then((res) => res.json())
    .then((users) => {
      allUsers = users;
      document.getElementById("user-count").textContent = users.length;
      renderUserTable(users);
    })
    .catch((err) => {
      console.error("Dashboard load error:", err);
      alert("Could not load users.");
    });
}

/**
 * Render user table or show 'no users' message
 */
function renderUserTable(users) {
  const tbody = document.getElementById("user-list");
  tbody.innerHTML = "";

  if (users.length === 0) {
    const row = document.createElement("tr");
    row.innerHTML = `<td colspan="5" class="text-center text-danger fw-semibold">No users found.</td>`;
    tbody.appendChild(row);
    return;
  }

  users.forEach((user, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${index + 1}</td>
      <td>${user.name}</td>
      <td>${user.email}</td>
      <td>${user.role}</td>
      <td>
        <button class="admin-btn btn-edit" onclick="editUser('${user.userId}')">Edit</button>
        <button class="admin-btn btn-delete" onclick="deleteUser('${user.userId}')">Delete</button>
      </td>
    `;
    tbody.appendChild(row);
  });
}

/**
 * Edit a user's name and role
 */
function editUser(userId) {
  const token = getToken();
  fetch(`/api/v1/users/user/id/${userId}`, {
    headers: { Authorization: "Bearer " + token },
  })
    .then(res => res.json())
    .then(user => {
      const newName = prompt("Edit name:", user.name);
      const newRole = prompt("Edit role:", user.role);

      if (!["admin", "user", "agent"].includes(newRole?.toLowerCase())) {
        alert("Invalid role. Must be: admin, user, or agent.");
        return;
      }

      return fetch(`/api/v1/users/user/${userId}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: newName, role: newRole.toLowerCase() }),
      });
    })
    .then(res => res.json())
    .then(() => loadAdminDashboard())
    .catch(err => {
      console.error("Edit error:", err);
      alert("Edit failed: " + err.message);
    });
}

/**
 * Delete a user by userId with confirmation
 */
function deleteUser(userId) {
  if (!confirm("Are you sure you want to delete this user permanently?")) return;

  const token = getToken();
  fetch(`/api/v1/users/user/${userId}`, {
    method: "DELETE",
    headers: { Authorization: "Bearer " + token },
  })
    .then(res => res.json())
    .then(() => {
      alert("User deleted.");
      loadAdminDashboard();
    })
    .catch(err => {
      console.error("Delete error:", err);
      alert("Delete failed.");
    });
}

/**
 * Event listeners for filters and sort controls
 */
document.getElementById("nameSearch").addEventListener("input", (e) => {
  nameSearch = e.target.value;
  loadAdminDashboard();
});

document.getElementById("emailSearch").addEventListener("input", (e) => {
  emailSearch = e.target.value;
  loadAdminDashboard();
});

document.getElementById("roleSearch").addEventListener("change", (e) => {
  roleSearch = e.target.value;
  loadAdminDashboard();
});

document.getElementById("sortDropdown").addEventListener("change", (e) => {
  sortKey = e.target.value;
  loadAdminDashboard();
});

/**
 * Toggle ascending/descending sort order
 */
function toggleSortOrder() {
  sortOrder = sortOrder === "asc" ? "desc" : "asc";
  document.getElementById("sortIcon").textContent = sortOrder === "asc" ? "▲" : "▼";
  loadAdminDashboard();
}

// Automatically call dashboard load if needed elsewhere
window.addEventListener("DOMContentLoaded", () => {
  loadAdminDashboard();
});
