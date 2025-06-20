const packages = [
  {
    name: "Paris",
    image: "/images/group1.jpg",
    description:
      "Experience the romance, culture, and cuisine of the City of Lights.",
  },
  {
    name: "Maldives",
    image: "/images/group1.jpg",
    description: "Crystal-clear waters, white sands, and luxury at its finest.",
  },
  {
    name: "Bali",
    image: "/images/group1.jpg",
    description: "A tropical paradise of beaches, temples, and lush greenery.",
  },
  {
    name: "Switzerland",
    image: "/images/group1.jpg",
    description:
      "Snow-capped mountains, scenic train rides, and chocolate heaven.",
  },
  {
    name: "Dubai",
    image: "/images/group1.jpg",
    description: "Experience luxury, deserts, and the futuristic skyline.",
  },
];

const container = document.getElementById("packagesContainer");

packages.forEach((pkg) => {
  const card = document.createElement("div");
  card.className = "package-card";

  card.innerHTML = `
    <img src="${pkg.image}" alt="${pkg.name}">
    <div class="card-content">
      <div class="card-title">${pkg.name}</div>
      <div class="card-desc">${pkg.description}</div>
    </div>
  `;

  container.appendChild(card);
});
