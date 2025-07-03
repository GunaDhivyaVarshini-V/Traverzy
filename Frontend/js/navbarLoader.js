document.addEventListener("DOMContentLoaded", () => {
  fetch("http://localhost:5000/navbar-data")
    .then((res) => res.json())
    .then((data) => {
      const menuContainer = document.getElementById("navMenu");
      menuContainer.innerHTML = "";
      data.forEach((item) => {
        const li = document.createElement("li");
        li.classList.add("item");
        li.innerHTML = `<a href="/pages/${item.name.toLowerCase()}.html">${
          item.name
        }</a>`;
        menuContainer.appendChild(li);
      });
    })
    .catch((err) => {
      console.error("Error loading navbar:", err);
    });
});
