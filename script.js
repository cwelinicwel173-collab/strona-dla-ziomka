const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();

// Drawer
const overlay = document.getElementById("overlay");
const drawer = document.getElementById("drawer");
const openBtn = document.getElementById("open");
const closeBtn = document.getElementById("close");

function openDrawer(){
  drawer?.classList.add("open");
  overlay?.classList.add("show");
  overlay?.setAttribute("aria-hidden","false");
}
function closeDrawer(){
  drawer?.classList.remove("open");
  overlay?.classList.remove("show");
  overlay?.setAttribute("aria-hidden","true");
}

openBtn?.addEventListener("click", openDrawer);
closeBtn?.addEventListener("click", closeDrawer);
overlay?.addEventListener("click", closeDrawer);
document.addEventListener("keydown", (e)=>{ if(e.key === "Escape") closeDrawer(); });
drawer?.querySelectorAll("a").forEach(a => a.addEventListener("click", closeDrawer));

// Lightbox
const lightbox = document.getElementById("lightbox");
const lbImg = document.getElementById("lightboxImg");
const lbTitle = document.getElementById("lightboxTitle");
const lbClose = document.getElementById("lightboxClose");

function openLightbox(src, title, alt){
  if(!lightbox || !lbImg) return;
  lbImg.src = src;
  lbImg.alt = alt || "Zdjęcie";
  if(lbTitle) lbTitle.textContent = title || "Podgląd";
  lightbox.classList.add("show");
  lightbox.setAttribute("aria-hidden","false");
}
function closeLightbox(){
  if(!lightbox) return;
  lightbox.classList.remove("show");
  lightbox.setAttribute("aria-hidden","true");
  if(lbImg) lbImg.src = "";
}

lbClose?.addEventListener("click", closeLightbox);
lightbox?.addEventListener("click", (e)=>{ if(e.target === lightbox) closeLightbox(); });
document.addEventListener("keydown", (e)=>{ if(e.key === "Escape") closeLightbox(); });

// Bind lightbox buttons (home before/after)
document.querySelectorAll(".js-lightbox").forEach(btn => {
  btn.addEventListener("click", () => {
    const src = btn.getAttribute("data-src");
    const title = btn.getAttribute("data-title");
    const img = btn.querySelector("img");
    if(src) openLightbox(src, title, img?.alt || "");
  });
});

// Gallery generator
const grid = document.getElementById("galleryGrid");
const tabs = document.querySelectorAll(".tab");

function getCategory(n){
  return n <= 24 ? "realizacje" : "wtrakcie";
}

function tileClass(i){
  const mod = i % 12;
  if (mod === 1) return "gitem gcol-6 grow-3";
  if (mod === 2) return "gitem gcol-3 grow-2";
  if (mod === 3) return "gitem gcol-3";
  if (mod === 4) return "gitem gcol-4 grow-2";
  if (mod === 5) return "gitem gcol-4";
  if (mod === 6) return "gitem gcol-4 grow-2";
  if (mod === 7) return "gitem gcol-3";
  if (mod === 8) return "gitem gcol-3 grow-2";
  if (mod === 9) return "gitem gcol-6 grow-3";
  if (mod === 10) return "gitem gcol-4 grow-2";
  if (mod === 11) return "gitem gcol-4";
  return "gitem gcol-4 grow-2";
}

function buildGallery(){
  if(!grid) return;
  const frag = document.createDocumentFragment();

  for(let n=1; n<=62; n++){
    const cat = getCategory(n);
    const src = `/img/${n}.jpeg`;

    const fig = document.createElement("figure");
    fig.className = tileClass(n);
    fig.setAttribute("data-cat", cat);
    fig.setAttribute("data-title", `${cat === "realizacje" ? "Realizacja" : "W trakcie"} ${n}`);

    const img = document.createElement("img");
    img.src = src;
    img.alt = `${cat === "realizacje" ? "Realizacja" : "W trakcie"} ${n}`;
    img.loading = "lazy";

    const cap = document.createElement("figcaption");
    cap.className = "gcap";

    const tag = document.createElement("span");
    tag.textContent = (cat === "realizacje") ? "Realizacja" : "W trakcie";

    const plus = document.createElement("i");
    plus.textContent = "+";

    cap.appendChild(tag);
    cap.appendChild(plus);

    fig.appendChild(img);
    fig.appendChild(cap);

    fig.addEventListener("click", () => openLightbox(src, fig.getAttribute("data-title"), img.alt));

    frag.appendChild(fig);
  }

  grid.appendChild(frag);
}

function applyFilter(cat){
  if(!grid) return;
  grid.querySelectorAll(".gitem").forEach(item => {
    const itemCat = item.getAttribute("data-cat");
    const ok = (cat === "wszystkie") ? true : (itemCat === cat);
    item.style.display = ok ? "" : "none";
  });
}

buildGallery();
applyFilter("realizacje");

tabs.forEach(t => {
  t.addEventListener("click", () => {
    tabs.forEach(x => x.classList.remove("active"));
    t.classList.add("active");
    applyFilter(t.getAttribute("data-filter"));
  });
});
