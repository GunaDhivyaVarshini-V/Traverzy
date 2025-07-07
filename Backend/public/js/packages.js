const packages = [
  {
    name: "Paris",
    image: "/Backend/public/images/group1.jpg",
    description:
      "Experience the romance, culture, and cuisine of the City of Lights.",
    category: "cultural",
    duration: "4-7",
    type: "couple",
    price: "high",
  },
  {
    name: "Maldives",
    image: "/Backend/public/images/group1.jpg",
    description: "Crystal-clear waters, white sands, and luxury at its finest.",
    category: "beach",
    duration: "4-7",
    type: "family",
    price: "high",
  },
  {
    name: "Bali",
    image: "/Backend/public/images/group1.jpg",
    description: "A tropical paradise of beaches, temples, and lush greenery.",
    category: "hill",
    duration: "8+",
    type: "group",
    price: "mid",
  },
  {
    name: "Switzerland",
    image: "/Backend/public/images/group1.jpg",
    description:
      "Snow-capped mountains, scenic train rides, and chocolate heaven.",
    category: "beach",
    duration: "4-7",
    type: "family",
    price: "high",
  },
  {
    name: "Dubai",
    image: "/Backend/public/images/group1.jpg",
    description: "Experience luxury, deserts, and the futuristic skyline.",
    category: "beach",
    duration: "4-7",
    type: "family",
    price: "high",
  },
];

const container = document.getElementById("packagesContainer");
//Package Rendering
function renderPackages(filterPackages) {
  try {
    container.innerHTML = "";

    filterPackages.forEach((pkg) => {
      const card = document.createElement("div");
      card.className = "package-card";
      card.setAttribute("data-category", pkg.category);
      card.setAttribute("data-duration", pkg.duration);
      card.setAttribute("data-type", pkg.type);
      card.setAttribute("data-price", pkg.price);
      card.innerHTML = `
    <img src="${pkg.image}" alt="${pkg.name}">
    <div class="card-content">
      <div class="card-title">${pkg.name}</div>
      <div class="card-desc">${pkg.description}</div>
    </div>
  `;

      container.appendChild(card);
    });
  } catch (error) {
    console.error("Error Rendering Packages in PAckages page", error);
  }
}
renderPackages(packages);
const filterInputs = document.querySelectorAll(
  ".filter-option, [name=duration], .price, [value=family], [value=solo], [value=group]"
);
//Filtering
function getSelectedFilters() {
  const selected = {
    category: [],
    duration: "",
    type: [],
    price: "",
  };

  // Category (checkboxes)
  document.querySelectorAll(".filter-option:checked").forEach((el) => {
    selected.category.push(el.value);
  });

  // Duration (radio)
  const duration = document.querySelector("input[name='duration']:checked");
  if (duration) selected.duration = duration.value;

  // Travel Type (checkboxes)
  document
    .querySelectorAll(
      "input[value='family']:checked, input[value='solo']:checked, input[value='group']:checked"
    )
    .forEach((el) => {
      selected.type.push(el.value);
    });

  // Price (radio)
  const price = document.querySelector("input[name='price']:checked");
  if (price) selected.price = price.value;

  return selected;
}

function filterPackages() {
  try {
    const filters = getSelectedFilters();

    const filtered = packages.filter((pkg) => {
      const categoryMatch = filters.category.length
        ? filters.category.includes(pkg.category)
        : true;
      const durationMatch = filters.duration
        ? pkg.duration === filters.duration
        : true;
      const typeMatch = filters.type.length
        ? filters.type.includes(pkg.type)
        : true;
      const priceMatch = filters.price ? pkg.price === filters.price : true;

      return categoryMatch && durationMatch && typeMatch && priceMatch;
    });

    renderPackages(filtered);
  } catch (error) {
    console.error("Error Filtering Packages in Packages Page", error);
  }
}

filterInputs.forEach((input) => {
  input.addEventListener("change", filterPackages);
});
