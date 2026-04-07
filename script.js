document.addEventListener("DOMContentLoaded", () => {
  const navbar = document.getElementById("navbar");
  const navToggle = document.querySelector(".nav-toggle");
  const mobileMenu = document.getElementById("mobileMenu");
  const navLinks = document.querySelectorAll(".nav-links a, .mobile-menu a");
  const desktopLinks = document.querySelectorAll(".nav-links a");
  const abTextTargets = document.querySelectorAll("[data-ab-key]");

  const ctaVariants = {
    A: {
      "hero-primary": "Get Your Offer in 24h",
      "hero-secondary": "See App Flow",
      "nav-primary": "Book Strategy Call",
      "menu-primary": "Book Strategy Call",
      "sticky-primary": "Free Strategy Call"
    },
    B: {
      "hero-primary": "Book Strategy Call",
      "hero-secondary": "View App Examples",
      "nav-primary": "Get Free Growth Plan",
      "menu-primary": "Get Free Growth Plan",
      "sticky-primary": "Get Free Growth Plan"
    }
  };

  const normalizeVariant = (rawValue) => {
    const value = String(rawValue || "").trim().toUpperCase();
    return value === "A" || value === "B" ? value : "";
  };

  const getActiveVariant = () => {
    const forcedVariant = normalizeVariant(new URLSearchParams(window.location.search).get("ab"));
    if (forcedVariant) {
      try {
        localStorage.setItem("tz_ab_variant", forcedVariant);
      } catch (error) {
        // Ignore storage issues and continue with forced variant.
      }
      return forcedVariant;
    }

    try {
      const storedVariant = normalizeVariant(localStorage.getItem("tz_ab_variant"));
      if (storedVariant) {
        return storedVariant;
      }
    } catch (error) {
      // Ignore storage issues and fall back to randomized assignment.
    }

    const assignedVariant = Math.random() < 0.5 ? "A" : "B";
    try {
      localStorage.setItem("tz_ab_variant", assignedVariant);
    } catch (error) {
      // Ignore storage issues in private or restricted contexts.
    }
    return assignedVariant;
  };

  const applyCtaVariant = (variant) => {
    const dictionary = ctaVariants[variant] || ctaVariants.A;
    abTextTargets.forEach((element) => {
      const key = element.dataset.abKey;
      if (!key || !dictionary[key]) return;
      element.textContent = dictionary[key];
    });

    const variantField = document.getElementById("abVariant");
    if (variantField) {
      variantField.value = variant;
    }
  };

  applyCtaVariant(getActiveVariant());

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
    if (interest === "Premium Consulting") {
      return "Premium Lead | App + Branding + Marketing";
    }
    if (interest === "Starter Package") {
      return "Starter Lead | App + Automation for Small Operators";
    }
    return "General Inquiry | Holiday Rental Services";
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
      subjectPreview.textContent = `Subject: ${subject}`;
    }

    quickSelectButtons.forEach((button) => {
      button.classList.toggle("active", button.dataset.interest === interest);
    });

    if (!messageField) return;
    if (interest === "Premium Consulting") {
      messageField.placeholder = "Tell us about your premium property, guest profile and growth goals...";
    } else if (interest === "Starter Package") {
      messageField.placeholder = "Tell us how many units you manage and which workflows should be simplified first...";
    } else {
      messageField.placeholder = "App, website, logo, marketing, guest communication, housekeeping...";
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
        formMessage.textContent = "Submission is configured. Add your real Formspree ID in index.html (your_form_id) to go live.";
        return;
      }

      if (submitButton) {
        submitButton.disabled = true;
        submitButton.textContent = "Sending...";
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

        if (selectedInterest === "Premium Consulting") {
          formMessage.textContent = "Thanks for your premium inquiry. We will send a concierge-style proposal for branding, app setup and marketing.";
        } else if (selectedInterest === "Starter Package") {
          formMessage.textContent = "Thanks for your starter inquiry. We will send a lean plan focused on speed, simplicity and cost efficiency.";
        } else {
          formMessage.textContent = "Thanks. Your inquiry has been sent. We will get back to you by email shortly.";
        }

        contactForm.reset();

        quickSelectButtons.forEach((button) => {
          button.classList.remove("active");
        });

        applyInterest("");
      } catch (error) {
        formMessage.textContent = "Submission failed right now. Please try again or email us directly at info@terzle.com.";
      } finally {
        if (submitButton) {
          submitButton.disabled = false;
          submitButton.textContent = "Send Inquiry";
        }
      }
    });
  }

  applyInterest(interestField ? interestField.value : "");
});
