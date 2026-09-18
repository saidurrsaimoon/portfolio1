// ===============================
// SAIMOON PORTFOLIO - SCRIPT.JS
// ===============================

document.addEventListener("DOMContentLoaded", () => {

  // -------------------------------
  // Current Year
  // -------------------------------
  const year = document.getElementById("year");

  if (year) {
    year.textContent = new Date().getFullYear();
  }


  // -------------------------------
  // DARK / LIGHT MODE
  // -------------------------------
  const themeToggle = document.getElementById("themeToggle");
  const themeIcon = document.getElementById("themeIcon");

  const savedTheme = localStorage.getItem("saimoon-theme");

  if (savedTheme === "light") {
    document.body.classList.add("light");

    if (themeIcon) {
      themeIcon.textContent = "☾";
    }
  } else {
    if (themeIcon) {
      themeIcon.textContent = "☀";
    }
  }

  if (themeToggle) {
    themeToggle.addEventListener("click", () => {

      document.body.classList.toggle("light");

      const isLight =
        document.body.classList.contains("light");

      localStorage.setItem(
        "saimoon-theme",
        isLight ? "light" : "dark"
      );

      if (themeIcon) {
        themeIcon.textContent =
          isLight ? "☾" : "☀";
      }
    });
  }


  // -------------------------------
  // MOBILE MENU
  // -------------------------------
  const menuToggle = document.getElementById("menuToggle");
  const mobileMenu = document.getElementById("mobileMenu");

  if (menuToggle && mobileMenu) {

    menuToggle.addEventListener("click", (event) => {

      event.stopPropagation();

      mobileMenu.classList.toggle("show");

      const opened =
        mobileMenu.classList.contains("show");

      menuToggle.setAttribute(
        "aria-expanded",
        opened ? "true" : "false"
      );
    });


    // Close menu after clicking a link
    const mobileLinks =
      mobileMenu.querySelectorAll("a");

    mobileLinks.forEach((link) => {

      link.addEventListener("click", () => {

        mobileMenu.classList.remove("show");

        menuToggle.setAttribute(
          "aria-expanded",
          "false"
        );
      });

    });


    // Close menu when clicking outside
    document.addEventListener("click", (event) => {

      if (
        !mobileMenu.contains(event.target) &&
        !menuToggle.contains(event.target)
      ) {

        mobileMenu.classList.remove("show");

        menuToggle.setAttribute(
          "aria-expanded",
          "false"
        );
      }

    });
  }


  // -------------------------------
  // TYPEWRITER EFFECT
  // -------------------------------
  const typingText =
    document.getElementById("typingText");

  if (typingText) {

    const words = [
      "Soil Science Student",
      "Digital Learner",
      "Web Enthusiast",
      "Creative Thinker",
      "Problem Solver"
    ];

    let wordIndex = 0;
    let characterIndex = 0;
    let deleting = false;

    function typeWriter() {

      const currentWord =
        words[wordIndex];

      if (!deleting) {

        characterIndex++;

        typingText.textContent =
          currentWord.substring(
            0,
            characterIndex
          );

      } else {

        characterIndex--;

        typingText.textContent =
          currentWord.substring(
            0,
            characterIndex
          );
      }


      // Finished typing
      if (
        !deleting &&
        characterIndex === currentWord.length
      ) {

        deleting = true;

        setTimeout(typeWriter, 1400);

        return;
      }


      // Finished deleting
      if (
        deleting &&
        characterIndex === 0
      ) {

        deleting = false;

        wordIndex++;

        if (wordIndex >= words.length) {
          wordIndex = 0;
        }

        setTimeout(typeWriter, 400);

        return;
      }


      setTimeout(
        typeWriter,
        deleting ? 45 : 75
      );
    }


    setTimeout(typeWriter, 800);
  }


  // -------------------------------
  // SCROLL REVEAL ANIMATION
  // -------------------------------
  const revealElements =
    document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window) {

    const revealObserver =
      new IntersectionObserver(
        (entries, observer) => {

          entries.forEach((entry) => {

            if (entry.isIntersecting) {

              entry.target.classList.add(
                "revealed"
              );

              observer.unobserve(
                entry.target
              );
            }

          });

        },
        {
          threshold: 0.12
        }
      );


    revealElements.forEach((element) => {

      revealObserver.observe(element);

    });

  } else {

    // Older browser fallback
    revealElements.forEach((element) => {

      element.classList.add("revealed");

    });
  }


  // -------------------------------
  // ACTIVE NAVIGATION
  // -------------------------------
  const sections =
    document.querySelectorAll(
      "main section[id]"
    );

  const navLinks =
    document.querySelectorAll(
      ".nav-link"
    );


  if (
    sections.length &&
    navLinks.length &&
    "IntersectionObserver" in window
  ) {

    const sectionObserver =
      new IntersectionObserver(
        (entries) => {

          entries.forEach((entry) => {

            if (!entry.isIntersecting) {
              return;
            }

            navLinks.forEach((link) => {

              link.classList.remove(
                "active"
              );

            });


            const activeLink =
              document.querySelector(
                `.nav-link[href="#${entry.target.id}"]`
              );


            if (activeLink) {

              activeLink.classList.add(
                "active"
              );

            }

          });

        },
        {
          rootMargin:
            "-30% 0px -60% 0px"
        }
      );


    sections.forEach((section) => {

      sectionObserver.observe(section);

    });

  }


  // -------------------------------
  // SMOOTH SCROLL
  // -------------------------------
  const anchorLinks =
    document.querySelectorAll(
      'a[href^="#"]'
    );


  anchorLinks.forEach((link) => {

    link.addEventListener(
      "click",
      (event) => {

        const targetId =
          link.getAttribute("href");


        if (
          !targetId ||
          targetId === "#"
        ) {
          return;
        }


        const target =
          document.querySelector(
            targetId
          );


        if (!target) {
          return;
        }


        event.preventDefault();


        const header =
          document.querySelector(
            ".site-header"
          );


        const headerHeight =
          header
            ? header.offsetHeight + 20
            : 90;


        const targetPosition =
          target.getBoundingClientRect()
            .top +
          window.scrollY -
          headerHeight;


        window.scrollTo({
          top: targetPosition,
          behavior: "smooth"
        });


        // Update URL without jumping
        if (
          history.pushState
        ) {

          history.pushState(
            null,
            "",
            targetId
          );

        }

      }
    );

  });


  // -------------------------------
  // BUTTON CLICK ANIMATION
  // -------------------------------
  const buttons =
    document.querySelectorAll(
      ".btn, .contact-link, .hobby-card, .tag-cloud span"
    );


  buttons.forEach((button) => {

    button.addEventListener(
      "mousedown",
      () => {

        button.style.transform =
          "scale(0.97)";

      }
    );


    button.addEventListener(
      "mouseup",
      () => {

        button.style.transform = "";

      }
    );


    button.addEventListener(
      "mouseleave",
      () => {

        button.style.transform = "";

      }
    );

  });


  // -------------------------------
  // BACK TO TOP
  // -------------------------------
  const backTop =
    document.querySelector(
      ".back-top"
    );


  if (backTop) {

    backTop.addEventListener(
      "click",
      (event) => {

        event.preventDefault();

        window.scrollTo({
          top: 0,
          behavior: "smooth"
        });

      }
    );

  }


  // -------------------------------
  // ESC KEY CLOSE MOBILE MENU
  // -------------------------------
  document.addEventListener(
    "keydown",
    (event) => {

      if (event.key === "Escape") {

        if (mobileMenu) {

          mobileMenu.classList.remove(
            "show"
          );

        }

        if (menuToggle) {

          menuToggle.setAttribute(
            "aria-expanded",
            "false"
          );

        }

      }

    }
  );


  // -------------------------------
  // PAGE LOADED
  // -------------------------------
  document.body.classList.add(
    "page-loaded"
  );

});
