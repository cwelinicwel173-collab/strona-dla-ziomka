document.getElementById("year").textContent = new Date().getFullYear();

const overlay = document.getElementById("overlay");
const drawer = document.getElementById("drawer");
const openBtn = document.getElementById("open");
const closeBtn = document.getElementById("close");

function openDrawer(){
  drawer.classList.add("open");
  overlay.classList.add("show");
  overlay.setAttribute("aria-hidden","false");
}
function closeDrawer(){
  drawer.classList.remove("open");
  overlay.classList.remove("show");
  overlay.setAttribute("aria-hidden","true");
}

openBtn?.addEventListener("click", openDrawer);
closeBtn?.addEventListener("click", closeDrawer);
overlay?.addEventListener("click", closeDrawer);
document.addEventListener("keydown", (e)=>{ if(e.key === "Escape") closeDrawer(); });

drawer?.querySelectorAll("a").forEach(a => a.addEventListener("click", closeDrawer));

/* Gallery filter + lightbox (only if gallery exists on the page) */
const grid = document.getElementById("galleryGrid");
const tabs = document.querySelectorAll(".tab");
const lightbox = document.getElementById("lightbox");
const lbImg = document.getElementById("lightboxImg");
const lbTitle = document.getElementById("lightboxTitle");
const lbClose = document.getElementById("lightboxClose");

function applyFilter(cat){
  if(!grid) return;
  grid.querySelectorAll(".gitem").forEach(item => {
    const ok = item.getAttribute("data-cat") === cat;
    item.style.display = ok ? "" : "none";
  });
}

tabs.forEach(t => {
  t.addEventListener("click", () => {
    tabs.forEach(x => x.classList.remove("active"));
    t.classList.add("active");
    applyFilter(t.getAttribute("data-filter"));
  });
});

// Default filter
applyFilter("realizacje");

// Lightbox open
if(grid && lightbox && lbImg){
  grid.addEventListener("click", (e) => {
    const item = e.target.closest(".gitem");
    if(!item) return;

    const img = item.querySelector("img");
    const title = item.getAttribute("data-title") || "Podgląd";
    lbImg.src = img.src;
    lbImg.alt = img.alt || "Zdjęcie";
    lbTitle.textContent = title;

    lightbox.classList.add("show");
    lightbox.setAttribute("aria-hidden","false");
  });
}

// Lightbox close
function closeLightbox(){
  if(!lightbox) return;
  lightbox.classList.remove("show");
  lightbox.setAttribute("aria-hidden","true");
  if(lbImg) lbImg.src = "";
}

lbClose?.addEventListener("click", closeLightbox);
lightbox?.addEventListener("click", (e)=>{ if(e.target === lightbox) closeLightbox(); });
document.addEventListener("keydown", (e)=>{ if(e.key === "Escape") closeLightbox(); });
