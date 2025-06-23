//navbar loading
fetch("navbar.html")
  .then((resobj) => resobj.text())
  .then((data) => {
    document.getElementById("nav-bar").innerHTML = data;
  });

//Theme-card-loading
const themeData = {
  group: [
    { image: "/images/group1.jpg", title: "Group Trip to Bali" },
    { image: "/images/group2.webp", title: "Group Trip to Manali" },
    { image: "/images/group3.jpg", title: "Group Trip to Leh-Ladakh" },
    { image: "/images/group1.jpg", title: "Group Trip to Bali" },
    { image: "/images/group2.webp", title: "Manali Trip" },
    { image: "/images/group3.jpg", title: "Leh-Ladakh" },
  ],
  honeymoon: [
    { image: "/images/hero-place1.jpg", title: "Romantic Paris" },
    { image: "/images/hero-place2.jpg", title: "Maldives Escape" },
    { image: "/images/group2.webp", title: "Swiss Honeymoon" },
    { image: "/images/group1.jpg", title: "Group Trip to Bali" },
    { image: "/images/group2.webp", title: "Manali Trip" },
    { image: "/images/group3.jpg", title: "Leh-Ladakh" },
  ],
  pilgrimage: [
    { image: "/images/group1.jpg", title: "Spiritual Varanasi" },
    { image: "/images/group2.webp", title: "Rameswaram Temple Tour" },
    { image: "/images/group2.webp", title: "Group Trip to Manali" },
    { image: "/images/group3.jpg", title: "Group Trip to Leh-Ladakh" },
    { image: "/images/group1.jpg", title: "Group Trip to Bali" },
    { image: "/images/group2.webp", title: "Manali Trip" },
    { image: "/images/group3.jpg", title: "Leh-Ladakh" },
  ],
  ayurveda: [
    { image: "/images/hero-place2.jpg", title: "Kerala Healing Retreat" },
    { image: "/images/group2.webp", title: "Group Trip to Manali" },
    { image: "/images/group3.jpg", title: "Group Trip to Leh-Ladakh" },
    { image: "/images/group1.jpg", title: "Group Trip to Bali" },
    { image: "/images/group2.webp", title: "Manali Trip" },
    { image: "/images/group3.jpg", title: "Leh-Ladakh" },
  ],
  luxury: [
    { image: "/images/group3.jpg", title: "Luxury Dubai" },
    { image: "/images/group1.jpg", title: "Swiss Luxury Resorts" },
    { image: "/images/group2.webp", title: "Group Trip to Manali" },
    { image: "/images/group3.jpg", title: "Group Trip to Leh-Ladakh" },
    { image: "/images/group1.jpg", title: "Group Trip to Bali" },
    { image: "/images/group2.webp", title: "Manali Trip" },
  ],
  adventure: [
    { image: "/images/group2.webp", title: "Skydiving Dubai" },
    { image: "/images/group3.jpg", title: "Trekking Himalayas" },
    { image: "/images/group2.webp", title: "Group Trip to Manali" },
    { image: "/images/group3.jpg", title: "Group Trip to Leh-Ladakh" },
    { image: "/images/group1.jpg", title: "Group Trip to Bali" },
    { image: "/images/group2.webp", title: "Manali Trip" },
  ],
};

function loadThemeCards(theme) {
  const container = document.getElementById(`${theme}-cards`);
  container.innerHTML = "";
  themeData[theme].forEach((card) => {
    const element = document.createElement("div");
    element.className = "trending-card";
    element.innerHTML = `
        <img src="${card.image}" alt="${card.title}" />
        <div class="trending-card-content">
          <p>${card.title}</p>
        </div>
      `;
    container.appendChild(element);
  });
}

function showTheme(theme) {
  document
    .querySelectorAll(".theme-items span")
    .forEach((span) => span.classList.remove("active"));
  document
    .querySelector(`.theme-items span[onclick*="${theme}"]`)
    ?.classList.add("active");

  const section = document.getElementById("theme-section");
  section.innerHTML = "";

  const target = document.getElementById(`${theme}-content`);
  if (!target) {
    console.warn("No content found for:", theme);
    return;
  }
  target.style.display = "block";
  section.appendChild(target);

  if (themeData[theme]) {
    loadThemeCards(theme);
  }
}

//trending-card-loading
document.addEventListener("DOMContentLoaded", () => {
  const trendingData = [
    {
      image: "/images/cardimage.jpg",
      title: "Lake Como, Italy",
      duration: "5 days 4 nights",
      link: "/Pages/destinations.html",
    },
    {
      image: "/images/group1.jpg",
      title: "Bali Group Tour",
      duration: "6 days 5 nights",
      link: "/Pages/destinations.html",
    },
    {
      image: "/images/group2.webp",
      title: "Swiss Alps Adventure",
      duration: "7 days 6 nights",
      link: "/Pages/destinations.html",
    },
    {
      image: "/images/group3.jpg",
      title: "Maldives Honeymoon",
      duration: "4 days 3 nights",
      link: "/Pages/destinations.html",
    },
    {
      image: "/images/hero-place2.jpg",
      title: "Goa Beach Fun",
      duration: "5 days 4 nights",
      link: "/Pages/destinations.html",
    },
    {
      image: "/images/hero-place1.jpg",
      title: "Kerala Backwaters",
      duration: "6 days 5 nights",
      link: "/Pages/destinations.html",
    },
  ];

  const container = document.getElementById("trending-cards");
  trendingData.forEach((pkg) => {
    const card = document.createElement("div");
    card.classList.add("trending-card");
    card.innerHTML = `
      <a href="${pkg.link}">
        <img src="${pkg.image}" alt="${pkg.title}" />
        <div class="trending-card-content">
          <h4><b>${pkg.title}</b></h4>
          <p>${pkg.duration}</p>
        </div>
      </a>
    `;
    container.appendChild(card);
  });
});

//HomePage Filter
document.addEventListener("DOMContentLoaded", () => {
  const PackageData = [
    {
      image: "/images/goa.jpg",
      title: "Lake Como, Italy",
      duration: "5 days 4 nights",
      link: "/Pages/destinations.html",
      days: 5,
      month: "JFM",
    },
    {
      image: "/images/group1.jpg",
      title: "Bali Group Tour",
      duration: "6 days 5 nights",
      link: "/Pages/destinations.html",
      days: 6,
      month: "AMJ",
    },
    {
      image: "/images/group2.webp",
      title: "Swiss Alps Adventure",
      duration: "7 days 6 nights",
      link: "/Pages/destinations.html",
      days: 7,
      month: "JAS",
    },
    {
      image: "/images/group3.jpg",
      title: "Maldives Honeymoon",
      duration: "4 days 3 nights",
      link: "/Pages/destinations.html",
      days: 4,
      month: "OND",
    },
    {
      image: "/images/hero-place2.jpg",
      title: "Goa Beach Fun",
      duration: "5 days 4 nights",
      link: "/Pages/destinations.html",
      days: 9,
      month: "JFM",
    },
    {
      image: "/images/hero-place1.jpg",
      title: "Kerala Backwaters",
      duration: "6 days 5 nights",
      link: "/Pages/destinations.html",
      days: 12,
      month: "JFM",
    },
    {
      image: "/images/hero-place1.jpg",
      title: "Kerala Backwaters",
      duration: "6 days 5 nights",
      link: "/Pages/destinations.html",
      days: 3,
      month: "JFM",
    },
  ];

  const container = document.getElementById("package-cards");

  function renderPackages(data) {
    container.innerHTML = ""; // Clearing existing val
    data.forEach((pkg) => {
      const card = document.createElement("div");
      card.classList.add("package-card");
      card.innerHTML = `
        <a href="${pkg.link}">
          <img src="${pkg.image}" alt="${pkg.title}" />
          <div class="trending-card-content">
            <h4><b>${pkg.title}</b></h4>
            <p>${pkg.duration}</p>
          </div>
        </a>
      `;
      container.appendChild(card);
    });
  }

  renderPackages(PackageData); // Loading all initially

  document.querySelectorAll(".slider-bar .step").forEach((step) => {
    step.addEventListener("click", () => {
      // Setting span as active
      document
        .querySelectorAll(".slider-bar .step")
        .forEach((s) => s.classList.remove("active"));
      step.classList.add("active");

      const range = step.getAttribute("data-duration");
      let filtered = [];

      if (range === "13+") {
        filtered = PackageData.filter((pkg) => pkg.days >= 13);
      } else {
        const [min, max] = range.split("-").map(Number);
        filtered = PackageData.filter(
          (pkg) => pkg.days >= min && pkg.days <= max
        );
      }

      renderPackages(filtered);
    });
  });
});
