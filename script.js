const revealElements = document.querySelectorAll(".reveal");
const menuToggle = document.querySelector("[data-menu-toggle]");
const mobileMenu = document.querySelector("[data-mobile-menu]");
const menuCloseTriggers = document.querySelectorAll("[data-menu-close]");
const menuLinks = document.querySelectorAll("[data-menu-link]");

const closeMobileMenu = () => {
  if (!menuToggle || !mobileMenu) {
    return;
  }

  menuToggle.setAttribute("aria-expanded", "false");
  mobileMenu.classList.remove("is-open");
  mobileMenu.hidden = true;
  document.body.style.overflow = "";
};

const openMobileMenu = () => {
  if (!menuToggle || !mobileMenu) {
    return;
  }

  menuToggle.setAttribute("aria-expanded", "true");
  mobileMenu.hidden = false;
  mobileMenu.classList.add("is-open");
  document.body.style.overflow = "hidden";
};

if (menuToggle && mobileMenu) {
  menuToggle.addEventListener("click", () => {
    const isOpen = menuToggle.getAttribute("aria-expanded") === "true";

    if (isOpen) {
      closeMobileMenu();
      return;
    }

    openMobileMenu();
  });

  menuCloseTriggers.forEach((trigger) => {
    trigger.addEventListener("click", closeMobileMenu);
  });

  menuLinks.forEach((link) => {
    link.addEventListener("click", closeMobileMenu);
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 720) {
      closeMobileMenu();
    }
  });
}

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      });
    },
    {
      threshold: 0.18,
    }
  );

  revealElements.forEach((element) => revealObserver.observe(element));
} else {
  revealElements.forEach((element) => element.classList.add("is-visible"));
}

const form = document.querySelector(".info-form");

if (form) {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const button = form.querySelector("button[type='submit']");

    if (button) {
      const originalText = button.textContent;
      button.textContent = "Consulta enviada";
      button.disabled = true;

      window.setTimeout(() => {
        button.textContent = originalText;
        button.disabled = false;
        form.reset();
      }, 1800);
    }
  });
}

const galleryItems = [
  {
    src: "images/90729.jpg",
    alt: "Corte degradado en Aroma Barber",
    tag: "Look editorial",
    title: "Cortes con presencia",
    description: "Acabados definidos, textura limpia y estilo contemporáneo.",
  },
  {
    src: "images/Buzz_Cut_Degradado.webp",
    alt: "Buzz cut con degradado",
    tag: "Precisión",
    title: "Fade con carácter",
    description: "Líneas limpias y transiciones suaves con acabado profesional.",
  },
  {
    src: "images/Low-Fade-Taper_600x600.webp",
    alt: "Low fade taper",
    tag: "Estilo clásico",
    title: "Barbería con detalle",
    description: "Un look equilibrado para quienes buscan elegancia natural.",
  },
  {
    src: "images/6-bolsas-de-organza-blanca-rellenas-de-lavanda-jpg.webp",
    alt: "Bolsas aromáticas de lavanda",
    tag: "Producto natural",
    title: "Aromas que acompañan",
    description: "Lavanda, hierbabuena y mezclas artesanales para tu espacio.",
  },
  {
    src: "images/91GmyhKtroL.jpg",
    alt: "Productos aromáticos naturales",
    tag: "Bienestar botánico",
    title: "Esencia para cada rincón",
    description: "Una selección aromática pensada para frescura, calma y bienestar.",
  },
  {
    src: "images/dca51a068f12bed4b8661301ff937279.jpg",
    alt: "Corte moderno con acabado definido",
    tag: "Nuevo look",
    title: "Estilo con definición",
    description: "Un corte con textura limpia, forma precisa y presencia actual.",
  },
  {
    src: "images/91GQQv3C3aL.jpg",
    alt: "Bolsas aromáticas artesanales sobre una bandeja de mimbre",
    tag: "Aroma natural",
    title: "Bolsitas con encanto",
    description: "Una presentación artesanal pensada para perfumar cajones, armarios y rincones de descanso.",
  },
  {
    src: "images/652d11fd1708e717a45a2c2b1b5445b3.jpg",
    alt: "Corte de barbería con perfil limpio",
    tag: "Perfil limpio",
    title: "Barbería bien ejecutada",
    description: "Líneas marcadas y acabado profesional en un estilo fresco y cuidado.",
  },
];

const gallerySlots = document.querySelectorAll("[data-gallery-slot]");
const lightbox = document.querySelector("[data-lightbox]");
const lightboxImage = document.querySelector("[data-lightbox-image]");
const lightboxTag = document.querySelector("[data-lightbox-tag]");
const lightboxTitle = document.querySelector("[data-lightbox-title]");
const lightboxDescription = document.querySelector("[data-lightbox-description]");
const lightboxCloseTriggers = document.querySelectorAll("[data-lightbox-close]");

const syncGallerySlot = (slot, item) => {
  const image = slot.querySelector(".gallery-media");
  const tag = slot.querySelector("[data-gallery-tag]");
  const title = slot.querySelector("[data-gallery-title]");
  const description = slot.querySelector("[data-gallery-description]");

  if (!image || !tag || !title || !description) {
    return;
  }

  image.src = item.src;
  image.alt = item.alt;
  tag.textContent = item.tag;
  title.textContent = item.title;
  description.textContent = item.description;
  slot.dataset.imageSrc = item.src;
  slot.dataset.imageAlt = item.alt;
  slot.dataset.tag = item.tag;
  slot.dataset.title = item.title;
  slot.dataset.description = item.description;
};

const openLightbox = (slot) => {
  if (
    !lightbox ||
    !lightboxImage ||
    !lightboxTag ||
    !lightboxTitle ||
    !lightboxDescription
  ) {
    return;
  }

  lightboxImage.src = slot.dataset.imageSrc || "";
  lightboxImage.alt = slot.dataset.imageAlt || "";
  lightboxTag.textContent = slot.dataset.tag || "";
  lightboxTitle.textContent = slot.dataset.title || "";
  lightboxDescription.textContent = slot.dataset.description || "";
  lightbox.hidden = false;
  document.body.style.overflow = "hidden";
};

const closeLightbox = () => {
  if (!lightbox) {
    return;
  }

  lightbox.hidden = true;
  document.body.style.overflow = "";
};

gallerySlots.forEach((slot, index) => {
  const item = galleryItems[index % galleryItems.length];
  syncGallerySlot(slot, item);
});

document.addEventListener("click", (event) => {
  const slot = event.target.closest("[data-gallery-slot]");

  if (slot) {
    openLightbox(slot);
  }
});

document.addEventListener("keydown", (event) => {
  const slot = document.activeElement?.closest?.("[data-gallery-slot]");

  if (event.key === "Escape") {
    closeMobileMenu();
    closeLightbox();
    return;
  }

  if (!slot || (event.key !== "Enter" && event.key !== " ")) {
    return;
  }

  event.preventDefault();
  openLightbox(slot);
});

lightboxCloseTriggers.forEach((trigger) => {
  trigger.addEventListener("click", closeLightbox);
});

if (gallerySlots.length > 0 && galleryItems.length > gallerySlots.length) {
  let offset = 0;
  const reduceMotion =
    "matchMedia" in window &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const renderGallery = () => {
    gallerySlots.forEach((slot, index) => {
      const item = galleryItems[(offset + index) % galleryItems.length];
      slot.classList.add("is-swapping");

      window.setTimeout(() => {
        syncGallerySlot(slot, item);
        slot.classList.remove("is-swapping");
      }, 180);
    });
  };

  if (!reduceMotion) {
    window.setInterval(() => {
      offset = (offset + 1) % galleryItems.length;
      renderGallery();
    }, 3000);
  }
}
