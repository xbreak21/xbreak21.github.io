"use strict";

(function () {
  const animationList = [
    {
      el: document.querySelector(".project .project-title"),
      animationClass: "fadeoutright",
    },
    {
      el: document.querySelector(".project .project-desc"),
      animationClass: "fadeoutright",
    },
    {
      el: document.querySelector(".project .project-category"),
      animationClass: "fadeoutright",
    },
    {
      el: document.querySelector(".project .project-action"),
      animationClass: "fadeoutright",
    }
  ];

  const projectList = [
    {
      title: "Easy MySQLDump",
      desc:
        "Data Integration utility to perform data retention using cronjob and MySQLDump",
      category: ["Big Data", "Utility"],
      href: "https://github.com/nadhifikbarw/easy-mysqldump",
    },
    {
      title: "Laravel Fortify",
      desc: "Contributor for Laravel authentication system scaffolding",
      category: ["Laravel", "Authentication"],
      href: "https://github.com/laravel/fortify",
    },
    {
      title: "CodeIgniter 3 Model",
      desc: "Past contributor for CodeIgniter 3 ActiveRecord model",
      category: ["CI3", "ORM Model"],
      href: "https://github.com/yidas/codeigniter-model",
    },
  ];

  const sliderState = {
    dataIndex: 0,
    action: false,
  };

  function resetIndex() {
    sliderState.dataIndex = 0;
  }

  function syncData() {
    if (!sliderState.dataIndex < projectList.length) {
      sliderState.dataIndex = sliderState.dataIndex % projectList.length;
    }

    if (sliderState.dataIndex === -1) {
      sliderState.dataIndex = projectList.length - 1;
    }

    const projectData = projectList[sliderState.dataIndex];

    document.querySelector(".project").setAttribute("href", projectData.href);
    document.querySelector(".project .project-title").innerText =
      projectData.title;
    document.querySelector(".project .project-desc").innerText =
      projectData.desc;
    document.querySelector(
      ".project .project-category"
    ).innerText = projectData.category.join(" | ");
  }

  //  Animation related function
  function onAnimationComplete(el, resolve) {
    el.removeEventListener("transitionend", onAnimationComplete);
    resolve();
  }

  function promiseAnimation(animationRequest, animationType) {
    return new Promise((resolve) => {
      animationRequest.el.addEventListener(
        "transitionend",
        () => onAnimationComplete(animationRequest.el, resolve),
        false
      );
      if (animationType === "add") {
        animationRequest.el.classList.add(animationRequest.animationClass);
      } else {
        animationRequest.el.classList.remove(animationRequest.animationClass);
      }
    });
  }

  function fadeoutData() {
    const promiseList = [];
    for (const animationRequest of animationList) {
      promiseList.push(promiseAnimation(animationRequest, "add"));
    }
    return promiseList;
  }

  function fadeindata() {
    const promiseList = [];
    for (const animationRequest of animationList) {
      promiseList.push(promiseAnimation(animationRequest, "remove"));
    }
    return promiseList;
  }

  function nextProject() {
    if (sliderState.action) {
      return;
    }
    sliderState.action = true;
    Promise.all(fadeoutData()).then(() => {
      sliderState.dataIndex += 1;
      syncData(sliderState.dataIndex);
      Promise.all(fadeindata()).then(() => {
        sliderState.action = false;
      });
    });
  }

  function prevProject() {
    if (sliderState.action) {
      return;
    }
    sliderState.action = true;
    Promise.all(fadeoutData()).then(() => {
      sliderState.dataIndex -= 1;
      syncData(sliderState.dataIndex);
      Promise.all(fadeindata()).then(() => {
        sliderState.action = false;
      });
    });
  }

  function initProjectSlider() {
    document
      .querySelector(".project-list-action button:last-child")
      .addEventListener("click", nextProject);

    document
      .querySelector(".project-list-action button:first-child")
      .addEventListener("click", prevProject);
  }

  initProjectSlider();
})();
