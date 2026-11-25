// Z PRIME CONSTRUCK - main.js (vanilla JavaScript, no libraries)
document.addEventListener("DOMContentLoaded", () => {

  // 1. MOBILE NAV: open/close the menu with the hamburger button
  const toggle = document.getElementById("navToggle");
  const menu = document.getElementById("navMenu");
  const closeMenu = () => { menu.classList.remove("open"); toggle.setAttribute("aria-expanded", "false"); };
  toggle.addEventListener("click", () => {
    const open = menu.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(open));
  });
  menu.querySelectorAll("a").forEach(a => a.addEventListener("click", closeMenu)); // close after choosing a link
  document.addEventListener("keydown", e => { if (e.key === "Escape") closeMenu(); });

  // 2. SMOOTH SCROLLING is handled in CSS (scroll-behavior + scroll-padding-top).

  // 3. ACTIVE NAV LINK: highlight the link of the section currently on screen
  const links = [...menu.querySelectorAll("a:not(.btn)")];
  const sections = links.map(l => document.querySelector(l.getAttribute("href")));
  const spy = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        links.forEach(l => l.classList.toggle("active", l.getAttribute("href") === "#" + entry.target.id));
      }
    });
  }, { rootMargin: "-45% 0px -50% 0px" });
  sections.forEach(s => s && spy.observe(s));

  // 4. SCROLL REVEAL: fade in service cards when they enter the screen
  const reveal = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add("visible"); obs.unobserve(entry.target); }
    });
  }, { threshold: 0.15 });
  document.querySelectorAll(".reveal").forEach((el, i) => {
    el.style.transitionDelay = (i % 3) * 80 + "ms"; // small stagger within each row
    reveal.observe(el);
  });

  // 5. MISSING PHOTOS: show a label instead of a broken image icon
  document.querySelectorAll(".photo img").forEach(img => {
    const markMissing = () => img.parentElement.classList.add("is-missing");
    if (img.complete && img.naturalWidth === 0) markMissing();
    img.addEventListener("error", markMissing);
  });

  // 6. BACK-TO-TOP BUTTON
  const toTop = document.getElementById("toTop");
  window.addEventListener("scroll", () => toTop.classList.toggle("show", window.scrollY > 600), { passive: true });
  toTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

  // 7. FOOTER YEAR
  document.getElementById("year").textContent = new Date().getFullYear();

  // 8. QUOTATION FORM: validation only. Nothing is sent or saved yet.
  const form = document.getElementById("quoteForm");
  const status = document.getElementById("formStatus");

  const rules = {
    name:    v => v.trim().length >= 2 || "Enter your full name.",
    phone:   v => /^[0-9+()\-\s]{7,}$/.test(v.trim()) || "Enter a valid phone number (at least 7 digits).",
    email:   v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()) || "Enter a valid email address.",
    service: v => v !== "" || "Choose the service you need.",
    message: v => v.trim().length >= 10 || "Describe your project in at least 10 characters."
  };

  function validateField(input) {
    const result = rules[input.name](input.value);
    const field = input.closest(".field");
    field.classList.toggle("invalid", result !== true);
    field.querySelector(".error").textContent = result === true ? "" : result;
    return result === true;
  }

  form.querySelectorAll("input, select, textarea").forEach(input => {
    input.addEventListener("blur", () => validateField(input));
    input.addEventListener("input", () => { if (input.closest(".field").classList.contains("invalid")) validateField(input); });
  });

  form.addEventListener("submit", e => {
    e.preventDefault();
    const allValid = [...form.querySelectorAll("input, select, textarea")].map(validateField).every(Boolean);
    if (!allValid) {
      status.textContent = "Fix the highlighted fields and try again.";
      status.style.color = "#B3261E";
      return;
    }
    // PLACEHOLDER: this is where real sending goes (see README, "Configure the quotation form").
    const data = Object.fromEntries(new FormData(form));
    console.log("Validated form data (not sent):", data);
    status.textContent = "Your details passed validation, but this form is not connected yet, so nothing was sent. Please contact us using the details above.";
    status.style.color = "#2A2B2D";
  });
});
