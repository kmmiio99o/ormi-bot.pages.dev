document.addEventListener("DOMContentLoaded", () => {
  // --- Mobile Menu Toggle ---
  const toggleButtons = document.querySelectorAll(".mobile-menu-toggle");
  const sidebar = document.querySelector(".sidebar");

  if (sidebar && toggleButtons.length > 0) {
    function toggleSidebar() {
      sidebar.classList.toggle("active");
    }

    toggleButtons.forEach((button) => {
      button.addEventListener("click", (e) => {
        e.stopPropagation();
        toggleSidebar();
      });
    });

    document.addEventListener("click", (e) => {
      if (window.innerWidth <= 768 && sidebar.classList.contains("active")) {
        const isClickInsideSidebar = sidebar.contains(e.target);
        const isClickOnToggleBtn = Array.from(toggleButtons).some(
          (btn) => btn === e.target || btn.contains(e.target),
        );
        if (!isClickInsideSidebar && !isClickOnToggleBtn) {
          sidebar.classList.remove("active");
        }
      }
    });

    sidebar.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        if (window.innerWidth <= 768 && sidebar.classList.contains("active")) {
          sidebar.classList.remove("active");
        }
      });
    });
  }

  // --- Back to Top Button ---
  function setupBackToTopButton() {
    if (!document.querySelector(".back-to-top")) {
      const backToTopButton = document.createElement("div");
      backToTopButton.className = "back-to-top";
      backToTopButton.innerHTML = "↑";
      backToTopButton.setAttribute("aria-label", "Back to top");
      document.body.appendChild(backToTopButton);

      window.addEventListener("scroll", () => {
        backToTopButton.classList.toggle("show", window.scrollY > 300);
      });

      backToTopButton.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      });
    }
  }
  setupBackToTopButton();

  // --- Sidebar Link Handling & Visual Feedback with JS Animation ---
  document.querySelectorAll(".subcategory-link").forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href");

      // --- Visual Feedback with JS Animation ---
      document.querySelectorAll(".subcategory-link").forEach((l) => {
        l.classList.remove("active");
        // Reset potential inline styles from previous animations
        l.style.transform = "";
        l.style.boxShadow = "";
        // Assuming base background is handled by CSS, or you could reset it too:
        // l.style.backgroundColor = '';
      });

      this.classList.add("active");

      // --- Simple JS Pulse Animation ---
      const originalTransform = this.style.transform || "scale(1)";
      const steps = 10;
      const duration = 200; // ms
      const stepDuration = duration / steps;
      let step = 0;

      const animate = () => {
        if (step <= steps) {
          const progress = step / steps;
          // Ease-out effect for scale
          const ease = 1 - Math.pow(1 - progress, 2);
          const scaleValue = 1 + 0.03 * ease; // Scale up to 1.03
          // Glow effect
          const glowIntensity = ease * 8; // Max blur radius
          const glowOpacity = 0.5 * ease; // Max opacity

          this.style.transform = `scale(${scaleValue})`;
          this.style.boxShadow = `0 0 ${glowIntensity}px rgba(114, 137, 218, ${glowOpacity})`;

          step++;
          setTimeout(animate, stepDuration);
        } else {
          // Cleanup inline styles after animation
          this.style.transform = "";
          this.style.boxShadow = "";
        }
      };
      animate();
      // --- End JS Animation ---

      // Keep parent category open
      const parentCategory = this.closest(".category");
      if (parentCategory) {
        parentCategory.classList.add("active");
      }

      // Close mobile menu
      if (
        window.innerWidth <= 768 &&
        sidebar &&
        sidebar.classList.contains("active")
      ) {
        sidebar.classList.remove("active");
      }

      // Scroll to target
      const targetSection = document.querySelector(targetId);
      if (targetSection) {
        document
          .querySelectorAll(".section")
          .forEach((section) => section.classList.remove("active"));
        targetSection.classList.add("active");

        const offset = 80;
        window.scrollTo({
          top: targetSection.offsetTop - offset,
          behavior: "smooth",
        });
      }
    });
  });

  // --- Categories Accordion ---
  document.querySelectorAll(".category > .category-title").forEach((title) => {
    title.addEventListener("click", function () {
      const parentCategory = this.parentElement;
      const chevron = this.querySelector(".fa-chevron-down");
      parentCategory.classList.toggle("active");

      if (chevron) {
        chevron.style.transform = parentCategory.classList.contains("active")
          ? "rotate(180deg)"
          : "rotate(0deg)";
      }
    });
  });

  // --- Invite Button Spinner ---
  const inviteButton = document.getElementById("inviteButton");
  if (inviteButton) {
    inviteButton.addEventListener("click", function () {
      // Store original if you plan to restore it later, otherwise just change it.
      this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Redirecting...';
    });
  }
});
