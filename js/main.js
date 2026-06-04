const AUTH_USERS = [
  {
    name: "Ernst",
    password: "Playbot"
  },
  {
    name: "Alfons",
    password: "Playbot"
  }
];
const AUTH_COOKIE_NAME = "playbot_auth";
const AUTH_COOKIE_DAYS = 7;

const loginOverlay = document.getElementById("loginOverlay");
const loginForm = document.getElementById("loginForm");
const loginName = document.getElementById("loginName");
const loginPassword = document.getElementById("loginPassword");
const loginError = document.getElementById("loginError");

const eyes = document.getElementById("eyes");
const pupils = document.querySelectorAll(".pupil");
const imageSections = document.querySelectorAll(".image-section");
const slideshows = document.querySelectorAll(".slideshow");
const siteHeader = document.querySelector("header");
const desktopMediaQuery = window.matchMedia("(min-width: 901px)");

const aboutOpen = document.getElementById("aboutOpen");
const aboutClose = document.getElementById("aboutClose");
const aboutOverlay = document.getElementById("aboutOverlay");
const aboutGradientLayers = document.querySelectorAll(".about-gradient-layer");

let idleTimer;
let lastScrollY = window.pageYOffset;
let lastFocusedElement;
const slideshowTimers = new Map();

function setAuthCookie(value) {
  const expires = new Date();

  expires.setDate(expires.getDate() + AUTH_COOKIE_DAYS);
  document.cookie = `${AUTH_COOKIE_NAME}=${value}; expires=${expires.toUTCString()}; path=/; SameSite=Lax`;
}

function getCookie(name) {
  const cookie = document.cookie
    .split("; ")
    .find((item) => {
      return item.startsWith(`${name}=`);
    });

  return cookie ? cookie.split("=")[1] : "";
}

function setStoredAuth(value) {
  setAuthCookie(value);

  try {
    window.localStorage.setItem(AUTH_COOKIE_NAME, value);
  } catch (error) {
    // Some privacy modes block localStorage; the cookie is the primary store.
  }
}

function hasStoredAuth() {
  if (getCookie(AUTH_COOKIE_NAME) === "1") {
    return true;
  }

  try {
    return window.localStorage.getItem(AUTH_COOKIE_NAME) === "1";
  } catch (error) {
    return false;
  }
}

function unlockSite() {
  document.body.classList.remove("auth-locked");

  if (loginOverlay) {
    loginOverlay.setAttribute("aria-hidden", "true");
  }
}

function showLogin() {
  if (!loginOverlay || !loginName) return;

  document.body.classList.add("auth-locked");
  loginOverlay.setAttribute("aria-hidden", "false");

  window.setTimeout(() => {
    loginName.focus();
  }, 0);
}

function initLogin() {
  if (!loginOverlay || !loginForm) return;

  if (hasStoredAuth()) {
    unlockSite();
    return;
  }

  showLogin();
}

function handleLoginSubmit(event) {
  event.preventDefault();

  const enteredName = loginName.value.trim();
  const enteredPassword = loginPassword.value;
  const isAllowedUser = AUTH_USERS.some((user) => {
    return user.name === enteredName && user.password === enteredPassword;
  });

  if (isAllowedUser) {
    setStoredAuth("1");
    loginError.textContent = "";
    loginForm.reset();
    unlockSite();
    resetIdleTimer();
    return;
  }

  loginError.textContent = "Name or password is incorrect.";
  loginPassword.value = "";
  loginPassword.focus();
}

function openAbout() {
  lastFocusedElement = document.activeElement;
  aboutOverlay.classList.add("visible");
  aboutOverlay.setAttribute("aria-hidden", "false");
  aboutOpen.setAttribute("aria-expanded", "true");
  aboutGradientLayers.forEach((layer) => {
    layer.classList.add("visible");
    layer.style.setProperty("--edge-x", "50%");
    layer.style.setProperty("--edge-y", "50%");
  });
  document.body.classList.add("overlay-open");
  hideEyes();
  aboutClose.focus();
}

function closeAbout() {
  aboutOverlay.classList.remove("visible");
  aboutOverlay.setAttribute("aria-hidden", "true");
  aboutOpen.setAttribute("aria-expanded", "false");
  aboutGradientLayers.forEach((layer) => {
    layer.classList.remove("visible");
  });
  document.body.classList.remove("overlay-open");
  resetIdleTimer();

  if (lastFocusedElement) {
    lastFocusedElement.focus();
  }
}

function trapAboutFocus(event) {
  if (!aboutOverlay.classList.contains("visible") || event.key !== "Tab") return;

  const focusableElements = aboutOverlay.querySelectorAll(
    "button, [href], input, select, textarea, [tabindex]:not([tabindex='-1'])"
  );
  const firstElement = focusableElements[0];
  const lastElement = focusableElements[focusableElements.length - 1];

  if (!firstElement || !lastElement) return;

  if (event.shiftKey && document.activeElement === firstElement) {
    lastElement.focus();
    event.preventDefault();
  } else if (!event.shiftKey && document.activeElement === lastElement) {
    firstElement.focus();
    event.preventDefault();
  }
}

aboutOpen.addEventListener("click", openAbout);
aboutClose.addEventListener("click", closeAbout);

if (loginForm) {
  loginForm.addEventListener("submit", handleLoginSubmit);
}

aboutOverlay.addEventListener("click", (event) => {
  if (event.target === aboutOverlay) {
    closeAbout();
  }
});

function showEyes() {
  if (!aboutOverlay.classList.contains("visible")) {
    eyes.classList.add("visible");
  }
}

function hideEyes() {
  eyes.classList.remove("visible");
}

function resetIdleTimer() {
  clearTimeout(idleTimer);
  idleTimer = setTimeout(showEyes, 5000);
}

function moveEyes(event) {
  const mouseX = event.clientX;
  const mouseY = event.clientY;

  pupils.forEach((pupil) => {
    const eye = pupil.parentElement;
    const rect = eye.getBoundingClientRect();

    const eyeCenterX = rect.left + rect.width / 2;
    const eyeCenterY = rect.top + rect.height / 2;

    const angle = Math.atan2(
      mouseY - eyeCenterY,
      mouseX - eyeCenterX
    );

    const maxDistance = 12;

    const x = Math.cos(angle) * maxDistance;
    const y = Math.sin(angle) * maxDistance;

    pupil.style.transform = `translate(${x}px, ${y}px)`;
  });

  resetIdleTimer();
}

function moveEdgeColor(event) {
  imageSections.forEach((section) => {
    const rect = section.getBoundingClientRect();

    const isInside =
      event.clientX >= rect.left &&
      event.clientX <= rect.right &&
      event.clientY >= rect.top &&
      event.clientY <= rect.bottom;

    if (!isInside) return;

    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const distanceToLeft = x;
    const distanceToRight = rect.width - x;
    const distanceToTop = y;
    const distanceToBottom = rect.height - y;

    const nearest = Math.min(
      distanceToLeft,
      distanceToRight,
      distanceToTop,
      distanceToBottom
    );

    let edgeX = x;
    let edgeY = y;

    if (nearest === distanceToLeft) {
      edgeX = 0;
    } else if (nearest === distanceToRight) {
      edgeX = rect.width;
    } else if (nearest === distanceToTop) {
      edgeY = 0;
    } else {
      edgeY = rect.height;
    }

    section.style.setProperty("--edge-x", `${edgeX}px`);
    section.style.setProperty("--edge-y", `${edgeY}px`);
  });
}

function moveAboutColor(event) {
  if (!aboutOverlay.classList.contains("visible")) return;

  aboutGradientLayers.forEach((layer) => {
    layer.style.setProperty("--edge-x", `${event.clientX}px`);
    layer.style.setProperty("--edge-y", `${event.clientY}px`);
  });
}

function updateHeaderVisibility() {
  const scrollY = window.pageYOffset;
  const scrollDifference = scrollY - lastScrollY;

  if (Math.abs(scrollDifference) < 5) return;

  if (scrollY <= 0 || scrollDifference < 0) {
    siteHeader.classList.remove("header-hidden");
  } else {
    siteHeader.classList.add("header-hidden");
  }

  lastScrollY = scrollY;
}

function resetSlideClasses(slide) {
  slide.classList.remove(
    "active",
    "enter-next",
    "exit-next",
    "enter-prev",
    "exit-prev"
  );
}

function showSlide(slideshow, direction) {
  const slides = Array.from(slideshow.querySelectorAll(".slideshow-slide"));

  if (
    slideshow.classList.contains("contact-view") ||
    slides.length < 2 ||
    slideshow.dataset.animating === "true"
  ) {
    return;
  }

  const currentIndex = slides.findIndex((slide) => {
    return slide.classList.contains("active");
  });
  const safeCurrentIndex = currentIndex >= 0 ? currentIndex : 0;
  const nextIndex = direction === "prev"
    ? (safeCurrentIndex - 1 + slides.length) % slides.length
    : (safeCurrentIndex + 1) % slides.length;

  if (safeCurrentIndex === nextIndex) return;

  const currentSlide = slides[safeCurrentIndex];
  const nextSlide = slides[nextIndex];
  const enterClass = direction === "prev" ? "enter-prev" : "enter-next";
  const exitClass = direction === "prev" ? "exit-prev" : "exit-next";

  slideshow.dataset.animating = "true";
  resetSlideClasses(nextSlide);
  nextSlide.classList.add(enterClass);
  currentSlide.classList.add(exitClass);

  window.setTimeout(() => {
    resetSlideClasses(currentSlide);
    resetSlideClasses(nextSlide);
    nextSlide.classList.add("active");
    updateSlideCount(slideshow);
    slideshow.dataset.animating = "false";
  }, 800);
}

function updateSlideCount(slideshow) {
  const slides = Array.from(slideshow.querySelectorAll(".slideshow-slide"));
  const imageBlock = slideshow.closest(".image-block");
  const slideCount = imageBlock ? imageBlock.querySelector(".slide-count") : null;

  if (!slideCount) return;

  const currentIndex = slides.findIndex((slide) => {
    return slide.classList.contains("active");
  });

  slideCount.textContent = `${currentIndex + 1}/${slides.length}`;
}

function goToSlide(slideshow, slideIndex) {
  const slides = Array.from(slideshow.querySelectorAll(".slideshow-slide"));
  const nextSlide = slides[slideIndex];

  if (!nextSlide) return;

  slides.forEach((slide) => {
    resetSlideClasses(slide);
  });

  nextSlide.classList.add("active");
  slideshow.dataset.animating = "false";
  updateSlideCount(slideshow);
}

function startSlideshowTimer(slideshow) {
  window.clearInterval(slideshowTimers.get(slideshow));

  if (slideshow.classList.contains("contact-view")) return;

  const timer = window.setInterval(() => {
    showSlide(slideshow, "next");
  }, 5000);

  slideshowTimers.set(slideshow, timer);
}

function setSlideshowCursor(event) {
  const slideshow = event.currentTarget;

  if (slideshow.classList.contains("contact-view")) {
    slideshow.classList.remove("cursor-prev", "cursor-next");
    return;
  }

  const rect = slideshow.getBoundingClientRect();
  const isPreviousSide = event.clientX - rect.left < rect.width / 2;

  slideshow.classList.toggle("cursor-prev", isPreviousSide);
  slideshow.classList.toggle("cursor-next", !isPreviousSide);
}

function updateViewToggles(slideshow, view) {
  const imageBlock = slideshow.closest(".image-block");
  if (!imageBlock) return;

  const toggles = imageBlock.querySelectorAll(".view-toggle");

  toggles.forEach((toggle) => {
    const isSelected = toggle.dataset.view === view;

    toggle.classList.toggle("selected", isSelected);
    toggle.setAttribute("aria-pressed", String(isSelected));
  });
}

function setSlideshowView(slideshow, view) {
  if (view === "contact" && !desktopMediaQuery.matches) return;

  const isContactView = view === "contact";

  slideshow.classList.toggle("contact-view", isContactView);
  slideshow.classList.remove("cursor-prev", "cursor-next");
  updateViewToggles(slideshow, view);

  if (isContactView) {
    window.clearInterval(slideshowTimers.get(slideshow));
  } else {
    startSlideshowTimer(slideshow);
  }
}

function transitionSlideshowView(slideshow, view) {
  if (slideshow.dataset.view === view || slideshow.dataset.viewTransitioning === "true") {
    return;
  }

  slideshow.dataset.viewTransitioning = "true";
  setSlideshowView(slideshow, view);
  slideshow.dataset.view = view;

  window.setTimeout(() => {
    slideshow.dataset.viewTransitioning = "false";
  }, 280);
}

function buildContactSheet(slideshow) {
  const existingSheet = slideshow.querySelector(".contact-sheet");

  if (existingSheet) return;

  const whiteLayer = document.createElement("div");
  const tint = document.createElement("div");
  const sheet = document.createElement("div");
  const slides = Array.from(slideshow.querySelectorAll(".slideshow-slide"));

  whiteLayer.className = "contact-sheet-white";
  tint.className = "contact-sheet-tint";
  sheet.className = "contact-sheet";

  slides.forEach((slide, index) => {
    const image = slide.querySelector("img");
    const thumbnail = document.createElement("button");
    const thumbnailImage = image.cloneNode();

    thumbnail.className = "contact-sheet-thumb";
    thumbnail.type = "button";
    thumbnail.dataset.slideIndex = index;
    thumbnail.setAttribute("aria-label", `Show slide ${index + 1}`);
    thumbnail.append(thumbnailImage);
    sheet.append(thumbnail);
  });

  slideshow.append(whiteLayer, tint, sheet);
}

function handleSlideshowKeydown(slideshow, event) {
  if (event.key === "Escape" && slideshow.classList.contains("contact-view")) {
    transitionSlideshowView(slideshow, "slideshow");
    event.preventDefault();
    return;
  }

  if (slideshow.classList.contains("contact-view")) return;

  if (event.key === "ArrowLeft") {
    showSlide(slideshow, "prev");
    startSlideshowTimer(slideshow);
    event.preventDefault();
  }

  if (event.key === "ArrowRight") {
    showSlide(slideshow, "next");
    startSlideshowTimer(slideshow);
    event.preventDefault();
  }
}

function centerSlideshowInWindow(slideshow) {
  window.requestAnimationFrame(() => {
    slideshow.scrollIntoView({
      behavior: "smooth",
      block: "center"
    });
  });
}

function wrapFluidLinkText(link) {
  const text = link.textContent;
  const fragment = document.createDocumentFragment();

  link.textContent = "";
  link.classList.add("fluid-link");

  Array.from(text).forEach((character) => {
    const span = document.createElement("span");

    if (character === " ") {
      span.className = "fluid-link-space";
      span.innerHTML = "&nbsp;";
    } else {
      span.className = "fluid-link-letter";
      span.textContent = character;
    }

    fragment.append(span);
  });

  link.append(fragment);
}

function updateFluidLink(link, event) {
  const letters = Array.from(link.querySelectorAll(".fluid-link-letter"));

  letters.forEach((letter) => {
    const rect = letter.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const distance = Math.abs(event.clientX - centerX);
    const influence = Math.max(0, 1 - distance / 56);
    const lift = Math.pow(influence, 1.8) * -10;
    const red = Math.round(influence * 255);
    const blue = Math.round(influence * 164);

    letter.style.transform = `translateY(${lift}px)`;
    letter.style.color = `rgb(${red}, 0, ${blue})`;
  });
}

function resetFluidLink(link) {
  const letters = link.querySelectorAll(".fluid-link-letter");

  letters.forEach((letter) => {
    letter.style.transform = "translateY(0)";
    letter.style.color = "";
  });
}

function animateFluidLogo(link) {
  if (link.matches(":hover")) return;

  const letters = Array.from(link.querySelectorAll(".fluid-link-letter"));

  letters.forEach((letter, index) => {
    window.setTimeout(() => {
      letter.classList.remove("logo-pulse");
      void letter.offsetWidth;
      letter.classList.add("logo-pulse");
      letter.style.color = "rgb(255, 0, 164)";

      window.setTimeout(() => {
        letter.style.color = "rgb(77, 0, 49)";
      }, 240);

      window.setTimeout(() => {
        letter.style.color = "";
      }, 520);
    }, index * 70);
  });

  const lastLetterDelay = letters.length * 70 + 560;

  window.setTimeout(() => {
    letters.forEach((letter) => {
      letter.classList.remove("logo-pulse");
      letter.style.color = "";
    });
  }, lastLetterDelay);
}

function triggerFluidLogoSoon(link) {
  window.setTimeout(() => {
    animateFluidLogo(link);
  }, 800);
}

function scheduleFluidLogo(link) {
  const delay = 5000 + Math.random() * 5000;

  window.setTimeout(() => {
    animateFluidLogo(link);
    scheduleFluidLogo(link);
  }, delay);
}

function initFluidLinks() {
  const links = document.querySelectorAll("header a, header button, footer a, .about-close, .about-email");
  const logo = document.querySelector(".site-logo");

  links.forEach((link) => {
    wrapFluidLinkText(link);

    link.addEventListener("mousemove", (event) => {
      updateFluidLink(link, event);
    });

    link.addEventListener("mouseleave", () => {
      resetFluidLink(link);
    });
  });

  if (logo) {
    triggerFluidLogoSoon(logo);
    scheduleFluidLogo(logo);
  }
}

function startSlideshowDrag(slideshow, event) {
  if (event.pointerType !== "touch" || slideshow.classList.contains("contact-view")) return;

  slideshow.dataset.dragStartX = event.clientX;
  slideshow.dataset.dragStartY = event.clientY;
  slideshow.dataset.dragMoved = "false";
  slideshow.setPointerCapture(event.pointerId);
}

function moveSlideshowDrag(slideshow, event) {
  if (!slideshow.dataset.dragStartX || slideshow.classList.contains("contact-view")) return;

  const dragX = event.clientX - Number(slideshow.dataset.dragStartX);
  const dragY = event.clientY - Number(slideshow.dataset.dragStartY);

  if (Math.abs(dragX) > 12 && Math.abs(dragX) > Math.abs(dragY)) {
    slideshow.dataset.dragMoved = "true";
  }
}

function endSlideshowDrag(slideshow, event) {
  if (!slideshow.dataset.dragStartX) return;

  const dragX = event.clientX - Number(slideshow.dataset.dragStartX);
  const dragY = event.clientY - Number(slideshow.dataset.dragStartY);
  const isHorizontalSwipe = Math.abs(dragX) > 48 && Math.abs(dragX) > Math.abs(dragY);

  if (isHorizontalSwipe && !slideshow.classList.contains("contact-view")) {
    showSlide(slideshow, dragX < 0 ? "next" : "prev");
    startSlideshowTimer(slideshow);
    slideshow.dataset.suppressClick = "true";

    window.setTimeout(() => {
      slideshow.dataset.suppressClick = "false";
    }, 0);
  }

  delete slideshow.dataset.dragStartX;
  delete slideshow.dataset.dragStartY;
  delete slideshow.dataset.dragMoved;
}

slideshows.forEach((slideshow) => {
  slideshow.dataset.view = "slideshow";
  buildContactSheet(slideshow);
  updateSlideCount(slideshow);
  updateViewToggles(slideshow, "slideshow");
  startSlideshowTimer(slideshow);

  slideshow.addEventListener("mousemove", setSlideshowCursor);

  slideshow.addEventListener("mouseleave", () => {
    slideshow.classList.remove("cursor-prev", "cursor-next");
  });

  slideshow.addEventListener("keydown", (event) => {
    handleSlideshowKeydown(slideshow, event);
  });

  slideshow.addEventListener("pointerdown", (event) => {
    startSlideshowDrag(slideshow, event);
  });

  slideshow.addEventListener("pointermove", (event) => {
    moveSlideshowDrag(slideshow, event);
  });

  slideshow.addEventListener("pointerup", (event) => {
    endSlideshowDrag(slideshow, event);
  });

  slideshow.addEventListener("pointercancel", (event) => {
    endSlideshowDrag(slideshow, event);
  });

  slideshow.addEventListener("click", (event) => {
    if (slideshow.dataset.suppressClick === "true") {
      event.preventDefault();
      slideshow.dataset.suppressClick = "false";
      return;
    }

    if (slideshow.classList.contains("contact-view")) {
      const clickedThumbnail = event.target.closest(".contact-sheet-thumb");

      if (!clickedThumbnail) {
        transitionSlideshowView(slideshow, "slideshow");
        return;
      }

      const slideIndex = Number(clickedThumbnail.dataset.slideIndex);

      goToSlide(slideshow, slideIndex);
      transitionSlideshowView(slideshow, "slideshow");
      return;
    }

    const rect = slideshow.getBoundingClientRect();
    const direction = event.clientX - rect.left < rect.width / 2
      ? "prev"
      : "next";

    showSlide(slideshow, direction);
    startSlideshowTimer(slideshow);
    centerSlideshowInWindow(slideshow);
  });

  const imageBlock = slideshow.closest(".image-block");
  const toggles = imageBlock ? imageBlock.querySelectorAll(".view-toggle") : [];

  toggles.forEach((toggle) => {
    toggle.addEventListener("click", () => {
      if (toggle.dataset.view === "contact" && !desktopMediaQuery.matches) return;

      transitionSlideshowView(slideshow, toggle.dataset.view);
      centerSlideshowInWindow(slideshow);
    });
  });
});

desktopMediaQuery.addEventListener("change", () => {
  if (desktopMediaQuery.matches) return;

  slideshows.forEach((slideshow) => {
    if (slideshow.classList.contains("contact-view")) {
      setSlideshowView(slideshow, "slideshow");
      slideshow.dataset.view = "slideshow";
    }
  });
});

initFluidLinks();

window.addEventListener("mousemove", (event) => {
  moveEyes(event);
  moveEdgeColor(event);
  moveAboutColor(event);
});

window.addEventListener("click", () => {
  hideEyes();
  resetIdleTimer();
});

window.addEventListener("scroll", () => {
  updateHeaderVisibility();
  hideEyes();
  resetIdleTimer();
});

window.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeAbout();
  }

  trapAboutFocus(event);
  hideEyes();
  resetIdleTimer();
});

initLogin();
resetIdleTimer();
