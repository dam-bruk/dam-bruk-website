document.addEventListener("DOMContentLoaded", function () {
  const contactForm = document.getElementById("contactForm");
  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();
    alert("Wiadomość została wysłana!");
    contactForm.reset();
  });
});
