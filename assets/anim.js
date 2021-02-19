"use strict";

function initSidebar() {
  const toggle = document.getElementById("navbar-menu-toggle");
  const menuItems = document.querySelectorAll("#navbar-menu-list li > *");
  menuItems.forEach((el) => {
    el.addEventListener("click", function () {
      toggle.checked = false;
      toggle.dispatchEvent(new Event("change"));
      return;
    });
  });
}

initSidebar();

function animSidebar() {
  const menu = document.getElementById("navbar-menu");
  const toggle = document.getElementById("navbar-menu-toggle");
  toggle.addEventListener("change", function (e) {
    if (this.checked) {
      menu.classList.add("open");
    } else {
      menu.classList.remove("open");
    }
    return;
  });
}

function animSec2() {
  const container = document.querySelector(".second-page .container");
  const observer = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          [
            document.querySelector(".second-page .page-title"),
            document.querySelector(".project-list"),
          ].forEach((el) => el.classList.add("anim-fd-lg", "anim-1s"));
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: [0.25],
    }
  );
  observer.observe(container);
}

function animSec3() {
  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("anim-fd-lg", "anim-1s");
        observer.unobserve(entry.target);
      }
    });
  });
  document.querySelectorAll(".summary-section article").forEach((el) => {
    observer.observe(el);
  });
  observer.observe(document.querySelector(".brief-section"));
  observer.observe(document.querySelector(".summary-section"));
}

function animSec4() {
  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("anim-fd-lg", "anim-1s");
        observer.unobserve(entry.target);
      }
    });
  });
  document.querySelectorAll(".fourth-page .flex-half").forEach((el) => {
    observer.observe(el);
  });
}

animSidebar();
animSec2();
animSec3();
animSec4();
