const bootstrapScript = document.createElement("script");
bootstrapScript.src ="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js";
document.body.appendChild(bootstrapScript);

//  Theme Cards Data
const themeData = {
  group: [
    { image: "/images/group1.jpg", title: "Group Trip to Bali" },
    { image: "/images/group2.webp", title: "Group Trip to Manali" },
    { image: "/images/group3.jpg", title: "Group Trip to Leh-Ladakh" },
  ],
  honeymoon: [
    { image: "/images/hero-place1.jpg", title: "Romantic Paris" },
    { image: "/images/hero-place2.jpg", title: "Maldives Escape" },
    { image: "/images/group2.webp", title: "Swiss Honeymoon" },
  ],
  pilgrimage: [
    { image: "/images/group1.jpg", title: "Spiritual Varanasi" },
    { image: "/images/group2.webp", title: "Rameswaram Temple Tour" },
  ],
  ayurveda: [
    { image: "/images/hero-place2.jpg", title: "Kerala Healing Retreat" },
  ],
  luxury: [
    { image: "/images/group3.jpg", title: "Luxury Dubai" },
    { image: "/images/group1.jpg", title: "Swiss Luxury Resorts" },
  ],
  adventure: [
    { image: "/images/group2.webp", title: "Skydiving Dubai" },
    { image: "/images/group3.jpg", title: "Trekking Himalayas" },
  ],
};

// Load Theme Cards
function loadThemeCards(theme) {
  try {
    const container = document.getElementById(`${theme}-cards`);
    if (!container) return;

    container.innerHTML = "";
    themeData[theme].forEach((card) => {
      const div = document.createElement("div");
      div.className = "trending-card";
      div.innerHTML = `
        <img src="${card.image}" alt="${card.title}" loading="lazy"/>
        <div class="trending-card-content">
          <p>${card.title}</p>
        </div>
      `;
      container.appendChild(div);
    });
  } catch (error) {
    console.error("Error Loading Theme cards", error);
  }
}

// Show Selected Theme
function showTheme(theme) {
  try {
    document
      .querySelectorAll(".theme-items span")
      .forEach((span) => span.classList.remove("active"));
    document
      .querySelector(`.theme-items span[onclick*="${theme}"]`)
      ?.classList.add("active");

    const section = document.getElementById("theme-section");
    section.innerHTML = "";

    const target = document.getElementById(`${theme}-content`);
    if (!target) return;

    target.style.display = "block";
    section.appendChild(target);
    loadThemeCards(theme);
  } catch (error) {
    console.error("Error Showing selected Themes", error);
  }
}

// DOM Content Loaded
document.addEventListener("DOMContentLoaded", () => {
//Navbar Loading
 fetch("http://localhost:3000/api/v1/nav")
  .then((response) => response.json())
  .then((data) => {
    const menu = document.getElementById("menu");
    data.forEach((item) => {
      const li = document.createElement("li");
      const a = document.createElement("a");
      a.textContent = item.name;
      a.href = item.href;
      a.className = "item";
      a.id = item.id;
      li.appendChild(a);
      menu.appendChild(li);
    });
  })
  .catch((err) => {
    console.error("Can't receive nav data:", err);
  });

    const loginForm = document.getElementById("loginForm");
    const registerForm = document.getElementById("registerForm");

    // LOGIN VALIDATION
    loginForm?.addEventListener("submit", function (e) {
      e.preventDefault();
      const email = document.getElementById("loginEmail").value.trim();
      const password = document.getElementById("loginPassword").value.trim();
      const errorDiv = document.getElementById("loginError");

      if (!email || !password) {
        errorDiv.textContent = "Please enter both email and password.";
        return;
      }

      // optionally add email format check
      if (!validateEmail(email)) {
        errorDiv.textContent = "Please enter a valid email.";
        return;
      }

      errorDiv.textContent = ""; // Clear previous errors
      // Proceed with fetch/axios login request here...
      console.log("Login valid!"); // TEMP
    });

    // REGISTER VALIDATION
    registerForm?.addEventListener("submit", function (e) {
      e.preventDefault();

      const name = document.getElementById("regName").value.trim();
      const email = document.getElementById("regEmail").value.trim();
      const password = document.getElementById("regPassword").value.trim();
      const role = document.getElementById("regRole").value;

      const errorDiv = document.getElementById("registerError");
      if (!name || !email || !password || !role) {
        errorDiv.textContent = "All fields are required.";
        return;
      }

      if (!validateEmail(email)) {
        errorDiv.textContent = "Please enter a valid email.";
        return;
      }

      errorDiv.textContent = ""; // Clear previous
      // Proceed with register fetch call...
      console.log("Register valid!"); // TEMP
    });

    // Email format validator
    function validateEmail(email) {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }


  // Trending Cards
  fetch("http://localhost:3000/api/v1/trendingImages")
    .then((res) => res.json())
    .then((trendingData) => {
      const trendingContainer = document.getElementById("trending-cards");
      trendingContainer.innerHTML = "";
      trendingData.forEach((pkg) => {
        const card = document.createElement("div");
        card.className = "trending-card";
        card.innerHTML = `
          <a href="${pkg.link}">
            <img src="${pkg.image}" alt="${pkg.title}" loading="lazy"/>
            <div class="trending-card-content">
              <h4><b>${pkg.title}</b></h4>
              <p>${pkg.duration}</p>
            </div>
          </a>
        `;
        trendingContainer.appendChild(card);
      });
    })
    .catch((error) => {
      console.error("Error Showing Trending Cards", error);
    });

  // Package Filters
  let selectedDuration = "0";
  let selectedSeason = "JFM";
  let selectedBudget = "all";
  let packageData = [];

  function renderPackages(data) {
    const container = document.getElementById("package-cards");
    container.innerHTML = "";
    if (data.length === 0) {
      container.innerHTML = "<p style='text-align:center;'>No packages match your filters.</p>";
      return;
    }
    data.forEach((pkg) => {
      const card = document.createElement("div");
      card.className = "package-card";
      card.innerHTML = `
        <a href="${pkg.link}">
          <img src="${pkg.image}" alt="${pkg.title}" loading="lazy"/>
          <div class="trending-card-content">
            <h4><b>${pkg.title}</b></h4>
            <p>${pkg.duration}</p>
          </div>
        </a>
      `;
      container.appendChild(card);
    });
  }

  function applyFilters() {
    try {
      let filtered = packageData;

      // Duration Filter
      if (selectedDuration === "13+") {
        filtered = filtered.filter((pkg) => pkg.days >= 13);
      } else if (selectedDuration !== "0") {
        const [min, max] = selectedDuration.split("-").map(Number);
        filtered = filtered.filter((pkg) => pkg.days >= min && pkg.days <= max);
      }

      // Season Filter
      filtered = filtered.filter((pkg) => pkg.month === selectedSeason);

      // Budget Filter
      filtered = filtered.filter((pkg) => {
        const b = pkg.budget;
        switch (selectedBudget) {
          case "below-10000":
            return b < 10000;
          case "10000-25000":
            return b >= 10000 && b <= 25000;
          case "25000-50000":
            return b > 25000 && b <= 50000;
          case "above-50000":
            return b > 50000;
          default:
            return true;
        }
      });

      renderPackages(filtered);
    } catch (error) {
      console.error("Error Filtering Packages in HomePage", error);
    }
  }

  // Fetch package data and render
  fetch("http://localhost:3000/api/v1/packageImages")
    .then((res) => res.json())
    .then((data) => {
      packageData = data;
      renderPackages(packageData);
    })
    .catch((error) => {
      console.error("Error Showing Package Cards", error);
    });

  // Event Listeners
  document.querySelectorAll(".slider-bar .step").forEach((step) => {
    step.addEventListener("click", () => {
      document.querySelectorAll(".slider-bar .step").forEach((s) => s.classList.remove("active"));
      step.classList.add("active");
      selectedDuration = step.getAttribute("data-duration");
      applyFilters();
    });
  });

  document.querySelectorAll('input[name="season"]').forEach((radio) => {
    radio.addEventListener("change", () => {
      selectedSeason = radio.value;
      applyFilters();
    });
  });

  document.getElementById("budget-select").addEventListener("change", (e) => {
    selectedBudget = e.target.value;
    applyFilters();
  });

  document.getElementById("clear-filters").addEventListener("click", () => {
    selectedDuration = "0";
    selectedSeason = "JFM";
    selectedBudget = "all";

    document.querySelectorAll(".slider-bar .step").forEach((s) => {
      s.classList.toggle("active", s.getAttribute("data-duration") === "0");
    });

    document.querySelector('input[name="season"][value="JFM"]').checked = true;
    document.getElementById("budget-select").value = "all";

    renderPackages(packageData);
  });
});
// Helper to validate email
function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// Display inline error
function showError(elemId, message) {
  const el = document.getElementById(elemId);
  if (el) el.textContent = message;
}

// Clear errors
function clearError(elemId) {
  const el = document.getElementById(elemId);
  if (el) el.textContent = "";
}

// Attach validation logic
function attachValidation() {
  const loginForm = document.getElementById("loginForm");
  const registerForm = document.getElementById("registerForm");

  loginForm?.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = document.getElementById("loginEmail").value.trim();
    const password = document.getElementById("loginPassword").value.trim();

    if (!email || !password) {
      showError("loginError", "Please enter both email and password.");
      return;
    }
    if (!validateEmail(email)) {
      showError("loginError", "Please enter a valid email.");
      return;
    }
    clearError("loginError");

    // TODO: Replace console.log with your fetch call
    console.log("✅ Login valid:", { email, password });
  });

  registerForm?.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("regName").value.trim();
    const email = document.getElementById("regEmail").value.trim();
    const password = document.getElementById("regPassword").value.trim();
    const role = document.getElementById("regRole").value;

    if (!name || !email || !password || !role) {
      showError("registerError", "All fields are required.");
      return;
    }
    if (!validateEmail(email)) {
      showError("registerError", "Please enter a valid email.");
      return;
    }
    clearError("registerError");

    // TODO: Replace console.log with your fetch call
    console.log("✅ Register valid:", { name, email, password, role });
  });
}

// Initialize after DOM and bootstrap scripts
document.addEventListener("DOMContentLoaded", () => {
  attachValidation();
});
