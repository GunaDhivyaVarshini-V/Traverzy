const script = document.createElement("script");
script.src =
  "https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js";
document.body.appendChild(script);
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

//  Show Selected Theme
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
  //  Trending Cards
  const trendingData = [
    {
      image: "/images/cardimage.jpg",
      title: "Lake Como, Italy",
      duration: "5 days 4 nights",
      link: "/Pages/bookingPage.html",
    },
    {
      image: "/images/group1.jpg",
      title: "Bali Group Tour",
      duration: "6 days 5 nights",
      link: "/Pages/bookingPage.html",
    },
    {
      image: "/images/group2.webp",
      title: "Swiss Alps Adventure",
      duration: "7 days 6 nights",
      link: "/Pages/bookingPage.html",
    },
    {
      image: "/images/group3.jpg",
      title: "Maldives Honeymoon",
      duration: "4 days 3 nights",
      link: "/Pages/bookingPage.html",
    },
    {
      image: "/images/hero-place2.jpg",
      title: "Goa Beach Fun",
      duration: "5 days 4 nights",
      link: "/Pages/BookingPage.html",
    },
    {
      image: "/images/hero-place1.jpg",
      title: "Kerala Backwaters",
      duration: "6 days 5 nights",
      link: "/Pages/bookingPage.html",
    },
  ];
  try {
    const trendingContainer = document.getElementById("trending-cards");
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
  } catch (error) {
    console.error("Error Showing Trending Cards");
  }

  //  Packages Filter
  const PackageData = [
    {
      image: "/images/goa.jpg",
      title: "Lake Como, Italy",
      duration: "5 days 4 nights",
      link: "/Pages/destinations.html",
      days: 5,
      month: "JFM",
      budget: 20000,
    },
    {
      image: "/images/group1.jpg",
      title: "Bali Group Tour",
      duration: "6 days 5 nights",
      link: "/Pages/destinations.html",
      days: 6,
      month: "AMJ",
      budget: 25000,
    },
    {
      image: "/images/group2.webp",
      title: "Swiss Alps Adventure",
      duration: "7 days 6 nights",
      link: "/Pages/destinations.html",
      days: 7,
      month: "JAS",
      budget: 48000,
    },
    {
      image: "/images/group3.jpg",
      title: "Maldives Honeymoon",
      duration: "4 days 3 nights",
      link: "/Pages/destinations.html",
      days: 4,
      month: "OND",
      budget: 55000,
    },
    {
      image: "/images/hero-place2.jpg",
      title: "Goa Beach Fun",
      duration: "5 days 4 nights",
      link: "/Pages/destinations.html",
      days: 9,
      month: "JFM",
      budget: 10000,
    },
    {
      image: "/images/hero-place1.jpg",
      title: "Kerala Backwaters",
      duration: "6 days 5 nights",
      link: "/Pages/destinations.html",
      days: 12,
      month: "JFM",
      budget: 30000,
    },
    {
      image: "/images/hero-place1.jpg",
      title: "Short Kerala Getaway",
      duration: "3 days 2 nights",
      link: "/Pages/destinations.html",
      days: 3,
      month: "JFM",
      budget: 9000,
    },
  ];
  const container = document.getElementById("package-cards");
  let selectedDuration = "0";
  let selectedSeason = "JFM";
  let selectedBudget = "all";

  function renderPackages(data) {
    try {
      container.innerHTML = "";
      if (data.length === 0) {
        container.innerHTML =
          "<p style='text-align:center;'>No packages match your filters.</p>";
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
    } catch (error) {
      console.error("Error Rendering Packages in homePage", error);
    }
  }

  function applyFilters() {
    try {
      let filtered = PackageData;

      // Duration Filter
      if (selectedDuration === "13+") {
        filtered = filtered.filter((pkg) => pkg.days >= 13);
      } else if (selectedDuration === "0") {
        renderPackages(PackageData);
      } else {
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
      console.error("Error Filtering PAckages in HomePage", error);
    }
  }

  // Days Event listener
  document.querySelectorAll(".slider-bar .step").forEach((step) => {
    step.addEventListener("click", () => {
      document
        .querySelectorAll(".slider-bar .step")
        .forEach((s) => s.classList.remove("active"));
      step.classList.add("active");
      selectedDuration = step.getAttribute("data-duration");
      applyFilters();
    });
  });
  //Season Event listener
  document.querySelectorAll('input[name="season"]').forEach((radio) => {
    radio.addEventListener("change", () => {
      selectedSeason = radio.value;
      applyFilters();
    });
  });
  //Budget Event listener
  document.getElementById("budget-select").addEventListener("change", (e) => {
    selectedBudget = e.target.value;
    applyFilters();
  });
  // Reset Filter
  document.getElementById("clear-filters").addEventListener("click", () => {
    selectedDuration = "0";
    selectedSeason = "";
    selectedBudget = "all";

    document.querySelectorAll(".slider-bar .step").forEach((s, i) => {
      s.classList.toggle("active", s.getAttribute("data-duration") === "0");
    });
    // document.querySelector('input[value="JFM"]').checked = true;
    document.getElementById("budget-select").value = "all";

    renderPackages(PackageData);
  });

  // Initial Render
  renderPackages(PackageData);
});
