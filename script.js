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
