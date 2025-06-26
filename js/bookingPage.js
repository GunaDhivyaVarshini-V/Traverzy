//form validation
document.addEventListener("DOMContentLoaded", () => {
  const bookingForm = document.querySelector("#package-form form");

  const name = document.getElementById("name");
  const email = document.getElementById("email");
  const emailError = document.getElementById("emailError");
  const nameError = document.getElementById("nameError");

  const fromDate = document.getElementById("travel-from");
  const toDate = document.getElementById("travel-to");
  const dateErrorFrom = document.getElementById("dateErrorFrom");
  const dateErrorTo = document.getElementById("dateErrorTo");
  const dateError2 = document.getElementById("dateError2");
  const today = new Date().toISOString().split("T")[0];
  fromDate.min = today;
  toDate.min = today;

  const emailPattern = /^[a-z]+[a-z0-9._%+-]+@[a-z.-]+\.[a-z]{2,}$/;

  email.addEventListener("input", () => {
    if (emailPattern.test(email.value)) {
      emailError.style.display = "none";
    } else {
      emailError.style.display = "block";
    }
  });

  bookingForm.addEventListener("submit", function (e) {
    e.preventDefault();
    let isValid = true;

    if (!name.value.trim()) {
      nameError.innerText = "Full name is required";
      nameError.style.display = "block";
      isValid = false;
    }

    if (!email.value.trim() || !emailPattern.test(email.value)) {
      emailError.style.display = "block";
      isValid = false;
    } else {
      emailError.style.display = "none";
    }

    if (!fromDate.value || !toDate.value) {
      dateErrorFrom.innerText = "Both dates are required";
      dateErrorFrom.style.display = "block";
      dateErrorTo.innerText = "Both dates are required";
      dateErrorTo.style.display = "block";
      isValid = false;
    } else if (new Date(fromDate.value) > new Date(toDate.value)) {
      dateError2.innerText = "From-date cannot be after to-date";
      dateError2.style.display = "block";
      isValid = false;
    } else {
      dateErrorFrom.style.display = "none";
      dateErrorTo.style.display = "none";
    }

    if (isValid) {
      e.preventDefault();
    }
  });
});

//Book Now button
const packageForm = document.getElementById("package-form");
const openForm = document.getElementById("openPackage-form");
const closeBtn = document.querySelector(".closeBtn");

openForm.onclick = () => {
  packageForm.style.display = "flex";
};

closeBtn.onclick = () => {
  packageForm.style.display = "none";
};

window.onclick = (e) => {
  if (e.target === packageForm) {
    packageForm.style.display = "none";
  }
};
