//form validation
document.addEventListener("DOMContentLoaded", () => {
  const bookingForm = document.getElementById("bookingForm");

  const name = document.getElementById("name");
  const email = document.getElementById("email");
  const emailError = document.getElementById("emailError");

  const fromDate = document.getElementById("travel-from");
  const toDate = document.getElementById("travel-to");
  const dateError = document.getElementById("dateError");
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
    let errorMsg = "";

    if (!name.value.trim()) {
      errorMsg += "Full Name is required.\n";
    }

    if (!email.value.trim() || !emailPattern.test(email.value)) {
      emailError.style.display = "block";
      e.preventDefault();
      return;
    } else {
      emailError.style.display = "none";
    }

    if (!fromDate.value || !toDate.value) {
      dateError.style.display = "block";
      e.preventDefault();
      return;
    } else if (new Date(fromDate.value) > new Date(toDate.value)) {
      dateError.style.display = "none";
    }

    if (errorMsg) {
      e.preventDefault();
    }
  });
});
