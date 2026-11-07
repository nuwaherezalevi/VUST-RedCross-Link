document.addEventListener("DOMContentLoaded", () => {
  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();
  const toggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".nav");
  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      const open = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", String(open));
      toggle.textContent = open ? "✕" : "☰";
    });
  }
  const form = document.getElementById("contactForm");
  if (form) {
    const params = new URLSearchParams(location.search);
    const subject = params.get("subject");
    if (subject) {
      const select = document.getElementById("topic");
      const match = [...select.options].find(o => o.text.toLowerCase().includes(subject.split(" ")[0].toLowerCase()));
      if (match) select.value = match.value;
    }
    form.addEventListener("submit", event => {
      event.preventDefault();
      if (!form.reportValidity()) return;
      const data = new FormData(form);
      const body = `Name: ${data.get("name")}\nEmail: ${data.get("email")}\nTopic: ${data.get("topic")}\n\n${data.get("message")}`;
      const mailto = `mailto:vust2026urcs@gmail.com?subject=${encodeURIComponent("Website enquiry: " + data.get("topic"))}&body=${encodeURIComponent(body)}`;
      document.getElementById("formNote").textContent = "Your email application should open with the enquiry prepared. Please review and send it there.";
      location.href = mailto;
    });
  }
});