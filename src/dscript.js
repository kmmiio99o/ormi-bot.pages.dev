document.addEventListener("DOMContentLoaded", function () {
  // --- Mobile Menu Toggle ---
  const toggleBtns = document.querySelectorAll(".mobile-menu-toggle"); // Select both (left and right)
  const sidebar = document.querySelector(".sidebar");

  if (toggleBtns.length > 0 && sidebar) {
    // Function to open the sidebar
    function openSidebar() {
      sidebar.classList.add("active");
    }

    // Function to close the sidebar
    function closeSidebar() {
      sidebar.classList.remove("active");
    }

    // Function to toggle the sidebar
    function toggleSidebar() {
      sidebar.classList.toggle("active");
    }

    // Add click event listeners to all mobile menu toggle buttons
    toggleBtns.forEach((button) => {
      button.addEventListener("click", function (e) {
        e.stopPropagation(); // Prevent the document click listener from immediately closing it
        toggleSidebar();
      });
    });

    // Click outside to close (only on mobile)
    document.addEventListener("click", function (e) {
      // Check if we are on mobile view width (adjust 768px if your breakpoint is different)
      if (window.innerWidth <= 768) {
        // Check if the click target is NOT inside the sidebar AND NOT the toggle button itself
        // We need to check against all toggle buttons now
        const isClickInsideSidebar = sidebar.contains(e.target);
        const isClickOnToggleBtn = Array.from(toggleBtns).some(
          (btn) => btn === e.target || btn.contains(e.target),
        );

        if (!isClickInsideSidebar && !isClickOnToggleBtn) {
          closeSidebar();
        }
      }
    });

    // Optional: Close sidebar if a subcategory link is clicked (common on mobile)
    document.querySelectorAll(".subcategory-link").forEach((link) => {
      link.addEventListener("click", () => {
        if (window.innerWidth <= 768) {
          closeSidebar();
        }
      });
    });
  } else {
    console.warn("Mobile menu toggle button or sidebar not found.");
  }

  // --- Back to Top Button ---
  function setupBackToTopButton() {
    const backToTopButton = document.createElement("div");
    backToTopButton.className = "back-to-top";
    backToTopButton.innerHTML = "↑";
    // Ensure it's added only once and placed correctly
    if (!document.querySelector(".back-to-top")) {
      document.body.appendChild(backToTopButton);
    }

    window.addEventListener("scroll", () => {
      if (window.scrollY > 300) {
        backToTopButton.classList.add("show");
      } else {
        backToTopButton.classList.remove("show");
      }
    });

    backToTopButton.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });
  }
  setupBackToTopButton(); // Call the function directly

  // --- Sidebar Category Accordion (Simplified) ---
  const categories = document.querySelectorAll(".category");
  categories.forEach((category) => {
    const title = category.querySelector(".category-title");
    const subcat = category.querySelector(".subcategories");
    const chevron = title.querySelector(".fa-chevron-down");

    // Ensure subcats are hidden initially if not active
    if (!category.classList.contains("active") && subcat) {
      subcat.style.display = "none";
      // subcat.style.maxHeight = "0px"; // If using maxHeight for animation elsewhere
    }

    title.addEventListener("click", function () {
      const isActive = category.classList.contains("active");

      // Close other open categories in the sidebar (optional, for single open)
      // categories.forEach((c) => {
      //     if (c !== category && c.classList.contains("active")) {
      //         c.classList.remove("active");
      //         const cSub = c.querySelector(".subcategories");
      //         if (cSub) cSub.style.display = "none"; // Or animate close
      //         const cChev = c.querySelector(".fa-chevron-down");
      //         if (cChev) cChev.style.transform = "rotate(0deg)";
      //     }
      // });

      // Toggle current category
      category.classList.toggle("active");

      if (isActive) {
        // Close logic (simple hide, add animation if needed)
        if (subcat) {
          subcat.style.display = "none";
          // Add closing animation here if desired
        }
        if (chevron) {
          chevron.style.transform = "rotate(0deg)";
        }
      } else {
        // Open logic (simple show, add animation if needed)
        if (subcat) {
          subcat.style.display = "block";
          // Add opening animation here if desired
        }
        if (chevron) {
          chevron.style.transform = "rotate(180deg)";
        }
      }
    });
  });

  // --- Smooth Scroll to Sections/Commands ---
  document.querySelectorAll(".subcategory-link").forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href");

      // Basic smooth scroll to the section
      const targetSection = document.querySelector(targetId);
      if (targetSection) {
        // Close mobile menu if link clicked
        if (
          window.innerWidth <= 768 &&
          sidebar &&
          sidebar.classList.contains("active")
        ) {
          sidebar.classList.remove("active");
        }

        // Highlight active link (optional)
        document
          .querySelectorAll(".subcategory-link")
          .forEach((l) => l.classList.remove("active"));
        this.classList.add("active");

        // Scroll to the target section with offset
        const offset = 80; // Adjust based on your header height
        const targetPosition = targetSection.offsetTop - offset;

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        });

        // --- Specific Command Highlighting (if needed) ---
        // If your href points to a specific command *within* a section (e.g., #command-kick)
        // and you want to highlight that specific .command div:
        // if (targetId.startsWith('#command-')) {
        //     // Remove highlight from others
        //     document.querySelectorAll('.command.highlight').forEach(el => el.classList.remove('highlight'));
        //     // Add highlight to target
        //     targetSection.classList.add('highlight'); // Ensure .command.highlight CSS exists
        //     // Remove highlight after a delay
        //     setTimeout(() => {
        //         targetSection.classList.remove('highlight');
        //     }, 2000);
        // }
      }
    });
  });

  // --- Floating Ball / Scroll Indicator (if applicable) ---
  // Ensure this part only runs if the floating ball exists and doesn't conflict
  const floatingBall = document.querySelector(".floating-ball");
  if (floatingBall) {
    // Add click handler for floating ball if it should also toggle the menu
    floatingBall.addEventListener("click", (e) => {
      e.stopPropagation();
      if (sidebar) {
        sidebar.classList.toggle("active");
      }
    });

    // Optional scroll indicator logic
    let lastScroll = 0;
    window.addEventListener("scroll", () => {
      const currentScroll = window.pageYOffset;
      if (currentScroll > lastScroll) {
        document.body.classList.add("scrolling-down");
        document.body.classList.remove("scrolling-up");
      } else {
        document.body.classList.add("scrolling-up");
        document.body.classList.remove("scrolling-down");
      }
      if (currentScroll <= 10) {
        document.body.classList.remove("scrolling-down", "scrolling-up");
      }
      lastScroll = currentScroll;
    });

    // Optional highlight on section change (Intersection Observer)
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            floatingBall.classList.add("highlight-command");
            setTimeout(() => {
              floatingBall.classList.remove("highlight-command");
            }, 2000);
          }
        });
      },
      { threshold: 0.5 },
    );
    document.querySelectorAll(".section").forEach((section) => {
      observer.observe(section);
    });
  }

  // --- Utility: Adjust Sidebar Items (if needed) ---
  function adjustSidebarItems() {
    const sidebarLinks = document.querySelectorAll(".subcategory-link");
    sidebarLinks.forEach((link) => {
      // Simple truncation logic or leave as is if CSS handles it
      // This part seemed complex, simplified or removed if not critical
      // Example: Add title if text overflows (requires CSS for text-overflow)
      if (link.scrollWidth > link.clientWidth) {
        link.setAttribute("title", link.textContent);
      }
    });
  }
  adjustSidebarItems();
  window.addEventListener("resize", adjustSidebarItems);

  // --- Invite Button Spinner (if applicable) ---
  document
    .getElementById("inviteButton")
    ?.addEventListener("click", function () {
      const originalHTML = this.innerHTML;
      this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Redirecting...';
      // Simulate delay or put actual redirect logic here
      setTimeout(() => {
        this.innerHTML = originalHTML; // Or '<i class="fas fa-check"></i> Success!';
        // Actual redirect would go here, e.g., window.location.href = '...';
      }, 1500);
    });
});

// Ensure window resize handling for elements like sidebar subcategories if needed
window.addEventListener("resize", () => {
  // Re-calculate maxHeight for open subcategories if using animation
  document
    .querySelectorAll(".category.active .subcategories")
    .forEach((subcat) => {
      // Only if you are using maxHeight for animation
      // subcat.style.maxHeight = subcat.scrollHeight + "px";
    });

  // Re-run item adjustment
  // adjustSidebarItems(); // Called in main listener above
});
