// Form hello — replace with Formspree/Netlify later if you want real submissions
document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector(".contact-form");
  if (!form) return;
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    alert("Thanks for reaching out! I'll get back to you soon.");
  });
});
