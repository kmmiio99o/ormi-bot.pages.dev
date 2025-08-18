const commandsModal = document.getElementById("commandsModal");
const aboutModal = document.getElementById("aboutModal");
const versionsModal = document.getElementById("versionsModal");
const tosModal = document.getElementById("tosModal");
const viewCommandsBtnsModal = document.querySelectorAll(
  "#viewCommandsBtnModal",
);
const viewAboutBtnModal = document.getElementById("aboutBtnModal");
const viewVersionsBtnModal = document.getElementById("viewVersionsBtnModal");
const tosBtnModal = document.getElementById("tosBtnModal");
const mobileViewCommandsBtnModal = document.getElementById(
  "mobileViewCommandsBtnModal",
);
const mobileAboutBtnModal = document.getElementById("mobileAboutBtnModal");
const mobileViewVersionsBtnModal = document.getElementById(
  "mobileViewVersionsBtnModal",
);
const mobileCommandsBtnHero = document.getElementById("mobileCommandsBtnHero");
const mobileAboutBtnHero = document.getElementById("mobileAboutBtnHero");
const closeButtons = document.querySelectorAll(".close-modal");
const hamburger = document.getElementById("hamburger");
const mobileMenu = document.getElementById("mobileMenu");
const MODAL_ANIMATION_DURATION = 400;

document.addEventListener("click", (e) => {}, true);

function openModal(modalElement) {
  if (modalElement) {
    modalElement.classList.remove("closing");

    modalElement.classList.add("active");
    document.body.style.overflow = "hidden";
  }
}

function closeModal(modalElement) {
  if (modalElement && modalElement.classList.contains("active")) {
    modalElement.classList.add("closing");

    const modalContent = modalElement.querySelector(".modal-content");
    if (modalContent) {
      modalContent.classList.remove("animate__slideInDown");
      if (modalContent.style.animationName === "modalSlideIn") {
        modalContent.style.animation = "none";
      }
      modalContent.style.animation = `modalSlideOut ${MODAL_ANIMATION_DURATION}ms ease-out forwards`;

      setTimeout(() => {
        modalElement.classList.remove("active");
        modalElement.classList.remove("closing");
        document.body.style.overflow = "auto";
        modalContent.style.animation = "";
      }, MODAL_ANIMATION_DURATION);
    } else {
      modalElement.classList.remove("active");
      document.body.style.overflow = "auto";
    }
  }
}

if (hamburger) {
  hamburger.addEventListener("click", () => {
    if (mobileMenu) {
      mobileMenu.classList.toggle("active");
      hamburger.classList.toggle("active");
    }
  });
}

document.addEventListener("click", (event) => {
  if (
    mobileMenu &&
    hamburger &&
    !mobileMenu.contains(event.target) &&
    !hamburger.contains(event.target) &&
    mobileMenu.classList.contains("active")
  ) {
    mobileMenu.classList.remove("active");
    if (hamburger) hamburger.classList.remove("active");
  }
});

if (mobileMenu) {
  mobileMenu.addEventListener("click", (e) => {
    if (e.target.tagName === "A" && e.target.closest(".mobile-menu-links")) {
      mobileMenu.classList.remove("active");
      if (hamburger) hamburger.classList.remove("active");
      const linkId = e.target.id;
      if (linkId && (linkId.includes("Modal") || linkId.includes("BtnHero"))) {
        e.preventDefault();
      }
    }
  });
}

if (viewCommandsBtnsModal) {
  viewCommandsBtnsModal.forEach((btn) => {
    btn.addEventListener("click", function (e) {
      e.preventDefault();
      openModal(commandsModal);
    });
  });
}
if (viewAboutBtnModal) {
  viewAboutBtnModal.addEventListener("click", function (e) {
    e.preventDefault();
    openModal(aboutModal);
  });
}
if (viewVersionsBtnModal) {
  viewVersionsBtnModal.addEventListener("click", function (e) {
    e.preventDefault();
    openModal(versionsModal);
  });
}
if (tosBtnModal) {
  tosBtnModal.addEventListener("click", function (e) {
    e.preventDefault();
    openModal(tosModal);
  });
}

if (mobileViewCommandsBtnModal) {
  mobileViewCommandsBtnModal.addEventListener("click", function (e) {
    e.preventDefault();
    openModal(commandsModal);
  });
}
if (mobileAboutBtnModal) {
  mobileAboutBtnModal.addEventListener("click", function (e) {
    e.preventDefault();
    openModal(aboutModal);
  });
}
if (mobileViewVersionsBtnModal) {
  mobileViewVersionsBtnModal.addEventListener("click", function (e) {
    e.preventDefault();
    openModal(versionsModal);
  });
}

if (mobileCommandsBtnHero) {
  mobileCommandsBtnHero.addEventListener("click", function (e) {
    e.preventDefault();
    openModal(commandsModal);
  });
}
if (mobileAboutBtnHero) {
  mobileAboutBtnHero.addEventListener("click", function (e) {
    e.preventDefault();
    openModal(aboutModal);
  });
}

if (closeButtons && closeButtons.length > 0) {
  closeButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const modal = this.closest(".modal");
      if (modal) {
        closeModal(modal);
      }
    });
  });
} else {
  console.warn("No close buttons found with class '.close-modal'");
}

window.addEventListener("click", function (event) {
  if (
    event.target &&
    event.target.classList.contains("modal") &&
    event.target.classList.contains("active")
  ) {
    closeModal(event.target);
  }
});

const DISCORD_ID = "879393496627306587";
const STATUS_COLORS = {
  online: "#3ba55c",
  idle: "#faa61a",
  dnd: "#ed4245",
  offline: "#747f8d",
};

async function updateDiscordStatus() {
  try {
    const response = await fetch(
      `https://api.lanyard.rest/v1/users/${DISCORD_ID}`,
    );
    const data = await response.json();
    if (data.success) {
      const status = data.data.discord_status;
      const avatarContainer = document.getElementById(
        "developerAvatarContainerModal",
      );
      const statusText = document.getElementById("discordStatusTextModal");
      if (avatarContainer && statusText) {
        avatarContainer.style.background =
          STATUS_COLORS[status] || STATUS_COLORS.offline;
        let statusTextContent = `Status: ${status.charAt(0).toUpperCase() + status.slice(1)}`;
        if (status === "dnd") {
          statusTextContent = "Status: Do Not Disturb";
        }
        statusText.textContent = statusTextContent;
      }
    } else {
      throw new Error("Lanyard API returned an error");
    }
  } catch (error) {
    console.error("Error fetching status:", error);
    const statusText = document.getElementById("discordStatusTextModal");
    if (statusText) {
      statusText.textContent = "Status: Offline";
    }
    const avatarContainer = document.getElementById(
      "developerAvatarContainerModal",
    );
    if (avatarContainer) {
      avatarContainer.style.background = STATUS_COLORS.offline;
    }
  }
}

updateDiscordStatus();
setInterval(updateDiscordStatus, 30000);

const tosButtons = [
  document.getElementById("mobileViewTosBtnModal"),
  document.getElementById("tosBtnModal"),
];

tosButtons.forEach((button) => {
  if (button) {
    button.addEventListener("click", function (e) {
      e.preventDefault();
      e.stopPropagation(); // Stop event propagation
      openModal(tosModal);
    });
  }
});
