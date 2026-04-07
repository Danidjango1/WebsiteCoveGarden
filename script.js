document.addEventListener("DOMContentLoaded", () => {
  const navbar = document.getElementById("navbar");
  const navToggle = document.querySelector(".nav-toggle");
  const mobileMenu = document.getElementById("mobileMenu");
  const navLinks = document.querySelectorAll(".nav-links a, .mobile-menu a");
  const desktopLinks = document.querySelectorAll(".nav-links a");

  const updateNav = () => {
    if (window.scrollY > 20) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  };

  updateNav();
  window.addEventListener("scroll", updateNav, { passive: true });

  if (navToggle && mobileMenu) {
    navToggle.addEventListener("click", () => {
      const open = mobileMenu.classList.toggle("open");
      navToggle.classList.toggle("active", open);
      navToggle.setAttribute("aria-expanded", String(open));
    });
  }

  navLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      const href = link.getAttribute("href");
      if (!href || !href.startsWith("#")) return;

      const target = document.querySelector(href);
      if (!target) return;

      event.preventDefault();
      const navOffset = navbar ? navbar.offsetHeight : 0;
      const y = target.getBoundingClientRect().top + window.scrollY - navOffset;
      window.scrollTo({ top: y, behavior: "smooth" });

      if (mobileMenu && navToggle) {
        mobileMenu.classList.remove("open");
        navToggle.classList.remove("active");
        navToggle.setAttribute("aria-expanded", "false");
      }
    });
  });

  const sections = document.querySelectorAll("section[id], header[id]");
  const activateLink = () => {
    const scrollPosition = window.scrollY + (navbar ? navbar.offsetHeight : 0) + 20;
    let activeId = "";

    sections.forEach((section) => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      if (scrollPosition >= top && scrollPosition < top + height) {
        activeId = section.id;
      }
    });

    desktopLinks.forEach((link) => {
      const href = link.getAttribute("href");
      link.classList.toggle("active", href === `#${activeId}`);
    });
  };

  activateLink();
  window.addEventListener("scroll", activateLink, { passive: true });

  const revealElements = document.querySelectorAll(".reveal");
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
  );

  revealElements.forEach((element) => revealObserver.observe(element));

  const counters = document.querySelectorAll(".counter");
  const animateCounter = (counter) => {
    const target = Number(counter.dataset.target || 0);
    const duration = 1200;
    const start = performance.now();

    const step = (time) => {
      const progress = Math.min((time - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      counter.textContent = `${Math.round(target * eased)}%`;
      if (progress < 1) requestAnimationFrame(step);
    };

    requestAnimationFrame(step);
  };

  const counterObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.45 }
  );

  counters.forEach((counter) => counterObserver.observe(counter));

  const tabButtons = document.querySelectorAll(".tab-btn");
  const phoneScreens = document.querySelectorAll(".phone-screen");

  tabButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const targetId = button.dataset.screen;
      tabButtons.forEach((btn) => btn.classList.remove("active"));
      button.classList.add("active");

      phoneScreens.forEach((screen) => {
        screen.classList.toggle("active", screen.id === targetId);
      });
    });
  });

  const contactForm = document.getElementById("contactForm");
  const formMessage = document.getElementById("formMessage");
  const interestField = document.getElementById("interest");
  const subjectField = document.getElementById("subject");
  const providerSubjectField = document.getElementById("providerSubject");
  const subjectPreview = document.getElementById("subjectPreview");
  const messageField = document.getElementById("message");
  const segmentCtas = document.querySelectorAll(".segment-cta");
  const quickSelectButtons = document.querySelectorAll(".quick-select");

  const getSubjectByInterest = (interest) => {
    if (interest === "Premium Beratung") {
      return "Premium Lead | Beratung App + Branding + Vermarktung";
    }
    if (interest === "Starter-Paket") {
      return "Starter Lead | App + Automatisierung fuer kleine Betreiber";
    }
    return "Allgemeine Anfrage | Ferienwohnungs-Service";
  };

  const applyInterest = (interest) => {
    if (interestField && interest) {
      interestField.value = interest;
    }

    const subject = getSubjectByInterest(interest);
    if (subjectField) {
      subjectField.value = subject;
    }
    if (providerSubjectField) {
      providerSubjectField.value = subject;
    }
    if (subjectPreview) {
      subjectPreview.textContent = `Betreff: ${subject}`;
    }

    quickSelectButtons.forEach((button) => {
      button.classList.toggle("active", button.dataset.interest === interest);
    });

    if (!messageField) return;
    if (interest === "Premium Beratung") {
      messageField.placeholder = "Erzaehlen Sie uns kurz von Ihrer Premium-Unterkunft, Wunschgaesten und Ihren Vermarktungszielen...";
    } else if (interest === "Starter-Paket") {
      messageField.placeholder = "Erzaehlen Sie uns kurz, wie viele Wohnungen Sie haben und welche Ablaeufe wir vereinfachen sollen...";
    } else {
      messageField.placeholder = "App, Website, Logo, Vermarktung, Kommunikation, Housekeeping...";
    }
  };

  segmentCtas.forEach((cta) => {
    cta.addEventListener("click", () => {
      applyInterest(cta.dataset.interest || "");
    });
  });

  quickSelectButtons.forEach((button) => {
    button.addEventListener("click", () => {
      applyInterest(button.dataset.interest || "");
    });
  });

  if (interestField) {
    interestField.addEventListener("change", () => {
      applyInterest(interestField.value);
    });
  }

  if (contactForm && formMessage) {
    contactForm.addEventListener("submit", async (event) => {
      event.preventDefault();

      const submitButton = contactForm.querySelector('button[type="submit"]');
      const endpoint = contactForm.dataset.endpoint || contactForm.getAttribute("action") || "";
      const selectedInterest = interestField ? interestField.value : "";

      if (!endpoint || endpoint.includes("your_form_id")) {
        formMessage.textContent = "Versand ist vorbereitet. Bitte in index.html die Formspree-ID eintragen (your_form_id), dann gehen Anfragen live raus.";
        return;
      }

      if (submitButton) {
        submitButton.disabled = true;
        submitButton.textContent = "Wird gesendet...";
      }

      try {
        const response = await fetch(endpoint, {
          method: "POST",
          body: new FormData(contactForm),
          headers: {
            Accept: "application/json"
          }
        });

        if (!response.ok) {
          throw new Error("Submit failed");
        }

        if (selectedInterest === "Premium Beratung") {
          formMessage.textContent = "Danke fuer Ihre Premium-Anfrage. Wir melden uns mit einem Concierge-orientierten Vorschlag fuer Branding, App und Vermarktung.";
        } else if (selectedInterest === "Starter-Paket") {
          formMessage.textContent = "Danke fuer Ihre Starter-Anfrage. Wir melden uns mit einem schlanken Plan, der schnell entlastet und budgetfreundlich startet.";
        } else {
          formMessage.textContent = "Danke. Ihre Anfrage wurde gesendet. Wir melden uns zeitnah per E-Mail.";
        }

        contactForm.reset();

        quickSelectButtons.forEach((button) => {
          button.classList.remove("active");
        });

        applyInterest("");
      } catch (error) {
        formMessage.textContent = "Der Versand hat gerade nicht geklappt. Bitte erneut versuchen oder direkt an info@terzle.com schreiben.";
      } finally {
        if (submitButton) {
          submitButton.disabled = false;
          submitButton.textContent = "Unverbindlich anfragen";
        }
      }
    });
  }

  applyInterest(interestField ? interestField.value : "");
});
