// A simple alert for the contact form submission
document.addEventListener("DOMContentLoaded", () => {
  // Note: The new design doesn't have a form, but this script is harmless
  // and can be adapted if you add a form back later.
  const form = document.querySelector(".contact-form");
  if (form) {
      form.addEventListener("submit", (e) => {
        e.preventDefault();
        alert("Thanks for reaching out! I'll get back to you soon.");
      });
  }
});
