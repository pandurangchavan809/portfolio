(function () {
  var root = document.documentElement;
  var header = document.getElementById("site-header");
  var menuToggle = document.getElementById("menu-toggle");
  var mobileMenu = document.getElementById("mobile-menu");

  var themeToggle = document.getElementById("theme-toggle");
  var sunIcon = document.getElementById("sun-icon");
  var moonIcon = document.getElementById("moon-icon");
  var THEME_KEY = "portfolio-theme";

  var modalOverlay = document.getElementById("modal-overlay");
  var modalBody = document.getElementById("modal-body");
  var modalClose = document.getElementById("modal-close");

  function syncThemeIcons() {
    if (!themeToggle || !sunIcon || !moonIcon) {
      return;
    }
    var dark = root.classList.contains("dark");
    sunIcon.classList.toggle("hidden", dark);
    moonIcon.classList.toggle("hidden", !dark);
    themeToggle.setAttribute("aria-label", dark ? "Switch to day mode" : "Switch to night mode");
  }

  function setTheme() {
    root.classList.add("dark");
    try {
      localStorage.setItem(THEME_KEY, "dark");
    } catch (error) {
      // Ignore storage restrictions.
    }
    syncThemeIcons();
  }

  function initTheme() {
    setTheme();
  }

  function toggleTheme() {
    setTheme();
  }

  function bindHeaderEffect() {
    if (!header) {
      return;
    }
    var onScroll = function () {
      var active = window.scrollY > 18;
      header.classList.toggle("header-scrolled", active);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  function bindMobileMenu() {
    if (!menuToggle || !mobileMenu) {
      return;
    }
    menuToggle.addEventListener("click", function () {
      var open = mobileMenu.classList.contains("hidden");
      mobileMenu.classList.toggle("hidden", !open);
      menuToggle.setAttribute("aria-expanded", String(open));
    });

    mobileMenu.querySelectorAll(".mobile-link").forEach(function (node) {
      node.addEventListener("click", function () {
        mobileMenu.classList.add("hidden");
        menuToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  function bindSectionAnchors() {
    var sectionLinks = document.querySelectorAll('a[href^="#"]:not([href="#"])');
    if (!sectionLinks.length) {
      return;
    }

    sectionLinks.forEach(function (link) {
      link.addEventListener("click", function (event) {
        var targetId = link.getAttribute("href");
        if (!targetId || targetId.charAt(0) !== "#") {
          return;
        }

        var target = document.querySelector(targetId);
        if (!target) {
          return;
        }

        event.preventDefault();
        var headerHeight = header ? header.getBoundingClientRect().height : 0;
        var extraGap = 18;
        var top = target.getBoundingClientRect().top + window.scrollY - headerHeight - extraGap;
        window.scrollTo({ top: Math.max(top, 0), behavior: "smooth" });
      });
    });
  }

  function bindTypingText() {
    var node = document.getElementById("typing-text");
    if (!node) {
      return;
    }

    var roles = [
      "Machine Learning Engineer Intern",
      "AI and Data Science Student",
      "Flask and Streamlit Builder",
      "Applied AI Problem Solver"
    ];

    var roleIndex = 0;
    var charIndex = 0;
    var deleting = false;

    function tick() {
      var fullText = roles[roleIndex];
      if (!deleting) {
        charIndex += 1;
      } else {
        charIndex -= 1;
      }

      node.textContent = fullText.slice(0, charIndex);

      var speed = deleting ? 35 : 70;
      if (!deleting && charIndex === fullText.length) {
        speed = 1000;
        deleting = true;
      }

      if (deleting && charIndex === 0) {
        deleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        speed = 300;
      }

      window.setTimeout(tick, speed);
    }

    tick();
  }

  function bindReveal() {
    var items = document.querySelectorAll("[data-reveal]");
    if (!items.length) {
      return;
    }

    var observer = new IntersectionObserver(
      function (entries, obs) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.14 }
    );

    items.forEach(function (item) {
      observer.observe(item);
    });
  }

  function parseData(id) {
    var scriptTag = document.getElementById(id + "-data");
    if (!scriptTag) {
      return null;
    }

    try {
      return JSON.parse(scriptTag.textContent);
    } catch (err) {
      return null;
    }
  }

  function openModal(html) {
    if (!modalOverlay || !modalBody) {
      return;
    }
    modalBody.innerHTML = html;
    modalOverlay.classList.remove("hidden");
    modalOverlay.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }

  function closeModal() {
    if (!modalOverlay || !modalBody) {
      return;
    }
    modalOverlay.classList.add("hidden");
    modalOverlay.setAttribute("aria-hidden", "true");
    modalBody.innerHTML = "";
    document.body.style.overflow = "";
  }

  function bindProjectModals() {
    document.querySelectorAll("[data-project]").forEach(function (card) {
      card.addEventListener("click", function (event) {
        if (event.target.closest("a")) {
          return;
        }
        var key = card.getAttribute("data-project");
        var data = parseData(key);
        if (!data) {
          return;
        }

        var html = [
          '<h3 id="modal-title" class="text-2xl font-bold text-slate-900 dark:text-white">' + data.title + "</h3>",
          '<div class="mt-4 space-y-4 text-sm leading-relaxed text-slate-700 dark:text-slate-300">',
          '<div><p class="font-semibold text-slate-900 dark:text-white">Problem</p><p class="mt-1">' + data.problem + "</p></div>",
          '<div><p class="font-semibold text-slate-900 dark:text-white">Approach</p><p class="mt-1">' + data.approach + "</p></div>",
          '<div><p class="font-semibold text-slate-900 dark:text-white">Outcome</p><p class="mt-1">' + data.outcome + "</p></div>",
          '<div><p class="font-semibold text-slate-900 dark:text-white">Learned</p><p class="mt-1">' + data.learned + "</p></div>",
          "</div>"
        ].join("");

        openModal(html);
      });
    });
  }

  function bindCertTabs() {
    var tabs = Array.prototype.slice.call(document.querySelectorAll(".cert-tab"));
    var cards = Array.prototype.slice.call(document.querySelectorAll(".cert-card"));

    if (!tabs.length || !cards.length) {
      return;
    }

    tabs.forEach(function (tab) {
      tab.addEventListener("click", function () {
        var filter = tab.getAttribute("data-filter");
        tabs.forEach(function (t) {
          t.classList.remove("active");
        });
        tab.classList.add("active");

        cards.forEach(function (card) {
          var category = card.getAttribute("data-category");
          var visible = filter === "all" || category === filter;
          card.classList.toggle("hidden", !visible);
          card.classList.remove("filter-show");

          if (visible) {
            window.requestAnimationFrame(function () {
              card.classList.add("filter-show");
              window.setTimeout(function () {
                card.classList.remove("filter-show");
              }, 360);
            });
          }
        });
      });
    });
  }

  function bindCustomCursor() {
    var dot = document.getElementById("cursor-dot");
    var outline = document.getElementById("cursor-outline");
    var isDesktopPointer = window.matchMedia && window.matchMedia("(hover: hover) and (pointer: fine)").matches;

    if (!dot || !outline || !isDesktopPointer) {
      return;
    }

    var x = window.innerWidth / 2;
    var y = window.innerHeight / 2;
    var outlineX = x;
    var outlineY = y;

    window.addEventListener("mousemove", function (event) {
      x = event.clientX;
      y = event.clientY;
      dot.style.left = x + "px";
      dot.style.top = y + "px";
    }, { passive: true });

    function animateOutline() {
      outlineX += (x - outlineX) * 0.16;
      outlineY += (y - outlineY) * 0.16;
      outline.style.left = outlineX + "px";
      outline.style.top = outlineY + "px";
      window.requestAnimationFrame(animateOutline);
    }

    animateOutline();

    var hoverables = document.querySelectorAll("a, button, input, textarea, .cert-card, .stack-card");
    hoverables.forEach(function (el) {
      el.addEventListener("mouseenter", function () {
        document.body.classList.add("hovering");
      });
      el.addEventListener("mouseleave", function () {
        document.body.classList.remove("hovering");
      });
    });
  }

  function bindCertModals() {
    document.querySelectorAll(".cert-card").forEach(function (card) {
      card.addEventListener("click", function () {
        var key = card.getAttribute("data-cert");
        var data = parseData(key);
        if (!data) {
          return;
        }

        var imageBlock = data.image
          ? '<img src="' + data.image + '" alt="' + data.title + ' certificate" class="cert-modal-image mt-4 w-full rounded-lg border border-slate-200 object-contain dark:border-slate-700" />'
          : '<p class="mt-4 text-xs text-slate-500 dark:text-slate-400">Certificate image will be added soon.</p>';
        var linkBlock = data.link && data.link !== "#"
          ? '<a href="' + data.link + '" target="_blank" rel="noreferrer" class="modal-link mt-4 inline-flex rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition dark:border-slate-700 dark:text-slate-200">Open Credential</a>'
          : '<p class="mt-4 text-xs text-slate-500 dark:text-slate-400">Verification link will be added soon (Credly/public certificate URL).</p>';

        var html = [
          '<h3 id="modal-title" class="text-2xl font-bold text-slate-900 dark:text-white">' + data.title + "</h3>",
          '<p class="mt-2 text-sm text-slate-600 dark:text-slate-300">' + data.issuer + " | " + data.date + "</p>",
          imageBlock,
          linkBlock
        ].join("");

        openModal(html);
      });
    });
  }

  function bindModalClose() {
    if (!modalOverlay || !modalClose) {
      return;
    }

    modalClose.addEventListener("click", closeModal);

    modalOverlay.addEventListener("click", function (event) {
      if (event.target === modalOverlay) {
        closeModal();
      }
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && !modalOverlay.classList.contains("hidden")) {
        closeModal();
      }
    });
  }

  function bindContactForm() {
    var form = document.getElementById("contact-form");
    var status = document.getElementById("form-status");
    if (!form || !status) {
      return;
    }

    var submitButton = form.querySelector('button[type="submit"]');
    var endpoint = form.getAttribute("data-endpoint") || "/api/send-email";

    form.addEventListener("submit", async function (event) {
      event.preventDefault();

      var name = form.name.value.trim();
      var email = form.email.value.trim();
      var subject = form.subject.value.trim();
      var message = form.message.value.trim();
      var originalButtonLabel = submitButton ? submitButton.textContent : "";

      if (!name || !email || !subject || !message) {
        status.textContent = "Please complete all fields before sending.";
        return;
      }

      if (submitButton) {
        submitButton.disabled = true;
        submitButton.textContent = "Sending...";
      }
      status.textContent = "Sending your message...";

      try {
        var response = await fetch(endpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: name,
            email: email,
            subject: subject,
            message: message
          })
        });

        var payload = {};
        try {
          payload = await response.json();
        } catch (err) {
          payload = {};
        }

        if (!response.ok) {
          throw new Error(payload.error || "Unable to send your message right now.");
        }

        status.textContent = payload.message || "Message sent successfully.";
        form.reset();
      } catch (error) {
        status.textContent = (error.message || "Failed to send message right now.") + " You can also email directly at pandurangchavan809@gmail.com.";
      } finally {
        if (submitButton) {
          submitButton.disabled = false;
          submitButton.textContent = originalButtonLabel || "Send";
        }
      }
    });
  }

  function setYear() {
    var yearNode = document.getElementById("year");
    if (yearNode) {
      yearNode.textContent = String(new Date().getFullYear());
    }
  }

  initTheme();
  bindHeaderEffect();
  bindMobileMenu();
  bindSectionAnchors();
  bindTypingText();
  bindReveal();
  bindProjectModals();
  bindCertTabs();
  bindCertModals();
  bindModalClose();
  bindContactForm();
  bindCustomCursor();
  setYear();

  if (themeToggle) {
    themeToggle.addEventListener("click", toggleTheme);
  }
})();
