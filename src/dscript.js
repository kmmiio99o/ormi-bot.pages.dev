// Prioritize Mobile Menu Functionality
document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM fully loaded. Initializing scripts...");

  // --- 1. MOBILE MENU TOGGLE ---
  // Select ALL elements with the class 'mobile-menu-toggle'
  const toggleButtons = document.querySelectorAll(".mobile-menu-toggle");
  const sidebar = document.querySelector(".sidebar");

  // Ensure both the sidebar and toggle buttons exist
  if (sidebar && toggleButtons.length > 0) {
    console.log("Found sidebar and toggle buttons.");

    // Function to open the sidebar
    function openSidebar() {
      sidebar.classList.add("active");
      console.log("Sidebar opened.");
    }

    // Function to close the sidebar
    function closeSidebar() {
      sidebar.classList.remove("active");
      console.log("Sidebar closed.");
    }

    // Add click event listener to EACH toggle button
    toggleButtons.forEach((button) => {
      button.addEventListener("click", (e) => {
        e.stopPropagation(); // Prevent the document click listener from immediately closing it
        console.log("Toggle button clicked.");
        // Toggle the 'active' class on the sidebar
        if (sidebar.classList.contains("active")) {
          closeSidebar();
        } else {
          openSidebar();
        }
      });
    });

    // --- Click Outside to Close (Improved) ---
    document.addEventListener("click", (e) => {
      // Check if we are on mobile view (adjust 768px if your breakpoint is different)
      if (window.innerWidth <= 768) {
        // Determine if the click was inside the sidebar or on a toggle button
        const isClickInsideSidebar = sidebar.contains(e.target);
        // Check if the click was on *any* toggle button
        const isClickOnToggleBtn = Array.from(toggleButtons).some(
          (btn) => btn === e.target || btn.contains(e.target),
        );

        // If the click was outside the sidebar AND not on a toggle button, close the sidebar
        if (
          !isClickInsideSidebar &&
          !isClickOnToggleBtn &&
          sidebar.classList.contains("active")
        ) {
          console.log(
            "Click outside sidebar detected on mobile. Closing sidebar.",
          );
          closeSidebar();
        }
      }
    });

    // --- Optional: Close sidebar when a link inside it is clicked (common on mobile) ---
    const sidebarLinks = sidebar.querySelectorAll("a"); // Select all links within the sidebar
    sidebarLinks.forEach((link) => {
      link.addEventListener("click", () => {
        if (window.innerWidth <= 768 && sidebar.classList.contains("active")) {
          console.log("Sidebar link clicked on mobile. Closing sidebar.");
          closeSidebar();
        }
      });
    });
  } else {
    console.warn(
      "Warning: Sidebar or mobile toggle button(s) not found in the DOM.",
    );
  }

  // --- 2. BACK TO TOP BUTTON ---
  function setupBackToTopButton() {
    // Check if button already exists to avoid duplicates
    if (!document.querySelector(".back-to-top")) {
      const backToTopButton = document.createElement("div");
      backToTopButton.className = "back-to-top";
      backToTopButton.innerHTML = "↑";
      backToTopButton.setAttribute("aria-label", "Back to top"); // Accessibility
      document.body.appendChild(backToTopButton);
      console.log("Back to top button created.");

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
        console.log("Back to top button clicked.");
      });
    }
  }
  setupBackToTopButton(); // Initialize the back to top button

  // --- 3. GENERAL SMOOTH SCROLLING FOR SIDEBAR LINKS ---
  document.querySelectorAll(".subcategory-link").forEach((link) => {
    link.addEventListener("click", function (e) {
      // Prevent default link jump
      e.preventDefault();
      const targetId = this.getAttribute("href");
      console.log(`Sidebar link clicked, target: ${targetId}`);

      // Find the target section
      const targetSection = document.querySelector(targetId);

      if (targetSection) {
        // Close mobile menu after clicking a link
        if (
          window.innerWidth <= 768 &&
          sidebar &&
          sidebar.classList.contains("active")
        ) {
          closeSidebar(); // Use the function defined above
        }

        // Remove 'active' class from all sections and add it to the target
        document.querySelectorAll(".section").forEach((section) => {
          section.classList.remove("active");
        });
        targetSection.classList.add("active");

        // Calculate scroll position with an offset (adjust offset as needed)
        const offset = 80; // Pixels to offset from the top
        const targetPosition = targetSection.offsetTop - offset;

        // Smooth scroll to the target position
        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        });
        console.log(`Scrolled to section: ${targetId}`);
      } else {
        console.warn(`Target section with ID '${targetId}' not found.`);
      }
    });
  });

  // --- 4. CATEGORIES ACCORDION (Simplified Click-to-Toggle) ---
  // This targets the main sidebar categories
  document.querySelectorAll(".category > .category-title").forEach((title) => {
    title.addEventListener("click", function () {
      console.log("Category title clicked.");
      const parentCategory = this.parentElement; // Get the .category div
      const chevron = this.querySelector(".fa-chevron-down");

      // Toggle the 'active' class on the parent .category
      parentCategory.classList.toggle("active");

      // Optional: Rotate chevron based on state
      if (chevron) {
        if (parentCategory.classList.contains("active")) {
          chevron.style.transform = "rotate(180deg)";
        } else {
          chevron.style.transform = "rotate(0deg)";
        }
      }
      console.log(
        `Category active state: ${parentCategory.classList.contains("active")}`,
      );
    });
  });

  // --- 5. INVITE BUTTON SPINNER (if applicable) ---
  const inviteButton = document.getElementById("inviteButton");
  if (inviteButton) {
    inviteButton.addEventListener("click", function () {
      const originalHTML = this.innerHTML;
      this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Redirecting...';
      console.log("Invite button clicked, showing spinner.");
      // Simulate delay or put actual redirect logic here
      // setTimeout(() => {
      //     // this.innerHTML = '<i class="fas fa-check"></i> Success!';
      //     // Actual redirect: window.location.href = 'YOUR_BOT_INVITE_URL';
      // }, 1500);
    });
  }

  console.log("All DOMContentLoaded scripts initialized.");
});

console.log("src/dscript.js file loaded.");
