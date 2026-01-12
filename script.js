const thumbs = Array.from(document.querySelectorAll(".thumb"));

const lightbox = document.getElementById("lightbox");
const backdrop = document.getElementById("backdrop");
const lightboxImage = document.getElementById("lightboxImage");
const captionText = document.getElementById("captionText");
const counterText = document.getElementById("counterText");

const closeBtn = document.getElementById("closeBtn");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

let currentIndex = 0;

// Build a list of images from thumbnails
const images = thumbs.map((img) => ({
  src: img.getAttribute("src"),
  alt: img.getAttribute("alt") || "Gallery image"
}));

function openLightbox(index) {
  currentIndex = index;
  updateLightbox();
  lightbox.classList.add("show");
  lightbox.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden"; // prevent background scroll
}

function closeLightbox() {
  lightbox.classList.remove("show");
  lightbox.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

function updateLightbox() {
  const item = images[currentIndex];
  lightboxImage.src = item.src;
  lightboxImage.alt = item.alt;
  captionText.textContent = item.alt;
  counterText.textContent = `${currentIndex + 1} / ${images.length}`;
}

function nextImage() {
  currentIndex = (currentIndex + 1) % images.length;
  updateLightbox();
}

function prevImage() {
  currentIndex = (currentIndex - 1 + images.length) % images.length;
  updateLightbox();
}

// Click thumbnail -> open
thumbs.forEach((img, index) => {
  img.addEventListener("click", () => openLightbox(index));
});

// Buttons
closeBtn.addEventListener("click", closeLightbox);
nextBtn.addEventListener("click", nextImage);
prevBtn.addEventListener("click", prevImage);

// Click outside image -> close
backdrop.addEventListener("click", closeLightbox);

// Keyboard controls
document.addEventListener("keydown", (e) => {
  if (!lightbox.classList.contains("show")) return;

  if (e.key === "Escape") closeLightbox();
  if (e.key === "ArrowRight") nextImage();
  if (e.key === "ArrowLeft") prevImage();
});
