// ---- EDIT THESE ----
const SOCIALS = [
  // { label: "YouTube", url: "https://..." },
  { label: "Instagram", url: "https://www.instagram.com/omio_s_tudio" },
  { label: "Facebook", url: "https://www.facebook.com/share/19sqACyyZp/" },
  { label: "LinkedIn", url: "https://www.linkedin.com/in/rubaiet-ahmed-omio-3a3b49198/" },
  { label: "WhatsApp", url: "https://wa.me/qr/HHIMOSEEY37MD1" },
];

// cat: "long" | "short" | "local" | "pod" | "style". url: YouTube (watch / youtu.be / shorts) or Instagram reel/post link.
const VIDEOS = [
  { cat: "short", title: "Short video 2", label: "Short form", url: "https://drive.google.com/file/d/128M1zVUevE5FePbhJwMR1r2zL9Ql68j1/view" },
  { cat: "long", title: "BSL1", label: "Long form", url: "https://drive.google.com/file/d/1ieX58ZK_xfzDTNh1zGmDmVGdXI91CrJ6/view" },
  { cat: "long", title: "BSL2", label: "Long form", url: "https://drive.google.com/file/d/1g2aCH-8LXz_f0FT2RX-PuiIOwO6OK52Q/view" },
  { cat: "long", title: "BSL3", label: "Long form", url: "https://drive.google.com/file/d/1-CQmgWP6clx96LFVgcMLfPT2fiOnVt6z/view" },
  { cat: "long", title: "BSL4", label: "Long form", url: "https://drive.google.com/file/d/18Yv2dhT-VgQmqccPuQJ0XF23UPCUtr_R/view" },
  { cat: "short", title: "Short video 3", label: "Short form", url: "https://www.instagram.com/reel/DZU0_QQSCB5/" },
  { cat: "local", title: "Local client 1", url: "https://drive.google.com/file/d/1PQ-E5zyFq6XL4ejIWu-hs9fY9v9yPKYw/view" },
  { cat: "local", title: "Local client 2", url: "https://drive.google.com/file/d/1bxjrePVs7vAdruxivac2zPjj86J_YXNV/view" },
  { cat: "local", title: "Local client 3", url: "https://drive.google.com/file/d/1vPMjJGQAPTfIkdBiuB7g9KCJ4fP2Dc_I/view" },
  { cat: "short", title: "Short video 4", label: "Short form", url: "https://drive.google.com/file/d/1uEgPFLfnCKC3Lj1A7P-jEmli17KulNa6/view" },
  { cat: "short", title: "Short video 5", label: "Short form", url: "https://drive.google.com/file/d/1G1KwWTG54Fw7bsggtSLRqiwcTbelniFH/view" },
  { cat: "pod", title: "Podcast 1", url: "https://drive.google.com/file/d/1ELb78PtSoXhrgMWfNAxgf0DStgvJ_gZ-/view" },
  { cat: "pod", title: "Podcast 2", url: "https://drive.google.com/file/d/1KS50lRODr2FIeqOnYalsKgHmEymAdS9Y/view" },
  { cat: "pod", title: "Podcast 3", url: "https://drive.google.com/file/d/1j2JregA1Sdq3gK_RUTHAnJF6U4oqGY1T/view" },
  { cat: "short", title: "Short video 6", label: "Short form", url: "https://drive.google.com/file/d/1J7EXJtsVqhKgpLk55KTlD0Gj1G3t5g9D/view" },
  { cat: "style", title: "Style 1", url: "https://drive.google.com/file/d/1BHuwrTsnhBvPxG1nzpsiLQ5jcmRWOnR-/view" },
  { cat: "style", title: "Style 2", url: "https://drive.google.com/file/d/12U1MSnjbRUNub0GwNkuhsKwEF9Hs7iVf/view" },
  { cat: "style", title: "Style 3", url: "https://drive.google.com/file/d/1HjimS6Iq1vj6VXhx5JlqeKpxXstdAsXr/view" },
  { cat: "style", title: "Style 4", url: "https://drive.google.com/file/d/1k-IdAku5AGbCuv5WKiwW9VItOaeqTL81/view" },
  { cat: "short", title: "Short video 1", label: "Short form", url: "https://drive.google.com/file/d/10GJ-bI2KORyXrJtDOz8JDAEfTALFOcof/view" },
  // { cat: "long", title: "Video title", label: "Client / type", url: "https://www.youtube.com/watch?v=XXXXXXXXXXX" },
];
// --------------------

const GROUPS = [
  { id: "long", name: "Long Form", cls: "f-long", vertical: false },
  { id: "short", name: "Short Form", cls: "f-short", vertical: true },
  { id: "local", name: "Local Client", cls: "f-local", vertical: false },
  { id: "pod", name: "Podcast", cls: "f-pod", vertical: false },
  { id: "style", name: "Omio's Style", cls: "f-style", vertical: true },
];

function parseVideo(url) {
  let m = url.match(/(?:youtube\.com\/(?:watch\?v=|shorts\/|embed\/)|youtu\.be\/)([\w-]{11})/);
  if (m) return { kind: "yt", id: m[1] };
  m = url.match(/drive\.google\.com\/file\/d\/([\w-]+)/);
  if (m) return { kind: "drive", id: m[1] };
  m = url.match(/instagram\.com\/(reel|p|tv)\/([\w-]+)/);
  if (m) return { kind: "ig", id: m[2], type: m[1] };
  return null;
}
const embedUrl = (v) =>
  v.kind === "yt"
    ? `https://www.youtube-nocookie.com/embed/${v.id}?autoplay=1&rel=0`
    : v.kind === "drive"
    ? `https://drive.google.com/file/d/${v.id}/preview`
    : `https://www.instagram.com/${v.type}/${v.id}/embed`;

// Instagram embeds get cropped (header/footer hidden) so only the video shows
const iframeHtml = (p, extra = "") =>
  `<iframe class="${p.kind === "ig" ? "ig" : ""}" src="${embedUrl(p)}" ${extra} allow="autoplay; encrypted-media; picture-in-picture" allowfullscreen scrolling="no"></iframe>`;
const setIg = (el, p) => el.classList.toggle("ig-crop", p.kind === "ig");

// each video's frame follows its own ratio (width / height)
const RATIO = {};
const ratioOf = (p) => (p.kind === "ig" ? 9 / 16 : RATIO[p.id] || 16 / 9);
function fitModal(p) {
  const r = ratioOf(p);
  frame.style.aspectRatio = String(r);
  box.style.width = `min(900px, calc(80vh * ${r} + 20px), 100%)`;
}

// social icons (24x24)
const ICONS = {
  Instagram: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></svg>',
  Facebook: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M13.5 21v-8h2.7l.5-3.2h-3.2V7.8c0-.9.3-1.5 1.6-1.5h1.7V3.4c-.3 0-1.3-.1-2.4-.1-2.4 0-4 1.5-4 4.1v2.4H7.7V13h2.7v8h3.1z"/></svg>',
  LinkedIn: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M6.9 9H3.6v11h3.3V9zM5.2 3.5a1.9 1.9 0 1 0 0 3.8 1.9 1.9 0 0 0 0-3.8zM20.4 13.4c0-3-1.6-4.6-3.9-4.6-1.5 0-2.5.8-3 1.6V9h-3.3v11h3.3v-6c0-1.4.7-2.3 1.9-2.3 1.1 0 1.6.8 1.6 2.3v6h3.4v-6.6z"/></svg>',
  WhatsApp: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 21l1.6-4.7A8.5 8.5 0 1 1 8 19.5L3 21z"/><path d="M9 8.5c0 3.5 3 6.5 6.5 6.5l1.2-1.4-2-1-1 .8c-1-.4-2-1.4-2.4-2.4l.8-1-1-2L9 8.5z" fill="currentColor" stroke="none"/></svg>',
};

// socials
const socialHtml = SOCIALS.map((s) => `<a href="${s.url}" target="_blank" rel="noopener">${ICONS[s.label] || ""}<span>${s.label}</span></a>`).join("");
document.querySelectorAll(".socials").forEach((el) => (el.innerHTML = socialHtml));
document.querySelector(".nav .dots").innerHTML = SOCIALS.map(
  (s) => `<a href="${s.url}" target="_blank" rel="noopener" aria-label="${s.label}" title="${s.label}">${ICONS[s.label] || ""}</a>`
).join("");

// work groups
const mount = document.getElementById("groups");
GROUPS.forEach((g) => {
  const list = VIDEOS.filter((v) => v.cat === g.id);
  const cards = list.length
    ? list.map((v, i) => {
        const p = parseVideo(v.url);
        const thumb = p && p.kind === "yt"
          ? `<img loading="lazy" src="https://img.youtube.com/vi/${p.id}/hqdefault.jpg" alt="">`
          : p && p.kind === "drive"
          ? `<img loading="lazy" src="thumb-${p.id}.jpg" alt="">`
          : `<span class="hand reel-label">reel</span><img class="cover" loading="lazy" src="thumb-${p.id}.png" alt="" onerror="this.remove()">`;
        return `<button class="card" data-cat="${g.id}" data-i="${i}" aria-label="${v.title}">
          <div class="thumb" ${p && p.kind === "ig" ? 'style="aspect-ratio: 9 / 16"' : ""}>${thumb}<div class="play">▶</div></div></button>`;
      }).join("")
    : [1, 2, 3].map(() => `<div class="card placeholder"><div class="thumb">video coming soon</div></div>`).join("");
  mount.insertAdjacentHTML(
    "beforeend",
    `<div class="group" id="g-${g.id}"><div class="group-title ${g.cls}">${g.name}</div>
     <div class="grid ${g.vertical ? "vertical" : ""}">${cards}</div></div>`
  );
});

// read each Drive thumbnail's real ratio and shape its card to match
VIDEOS.forEach((v, n) => {
  const p = parseVideo(v.url);
  if (!p || p.kind !== "drive") return;
  const im = new Image();
  im.onload = () => {
    RATIO[p.id] = im.naturalWidth / im.naturalHeight;
    document.querySelectorAll(`.card img[src$="thumb-${p.id}.jpg"]`).forEach((el) => {
      el.parentElement.style.aspectRatio = String(RATIO[p.id]);
    });
  };
  im.src = `thumb-${p.id}.jpg`;
});

// modal
const modal = document.getElementById("modal");
const box = modal.querySelector(".modal-box");
const frame = modal.querySelector(".frame");
function closeModal() { modal.classList.remove("open"); frame.innerHTML = ""; }
mount.addEventListener("click", (e) => {
  const c = e.target.closest(".card[data-cat]");
  if (!c) return;
  const g = GROUPS.find((x) => x.id === c.dataset.cat);
  const v = VIDEOS.filter((x) => x.cat === g.id)[c.dataset.i];
  const p = v && parseVideo(v.url);
  if (!p) return;
  setIg(frame, p);
  fitModal(p);
  frame.innerHTML = iframeHtml(p);
  modal.classList.add("open");
});
modal.addEventListener("click", (e) => { if (e.target === modal || e.target.classList.contains("close")) closeModal(); });
document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeModal(); });

// featured main reel: opens from the name (tap/hover/Enter) and loads inline when About scrolls into view
const FEATURED = "https://www.instagram.com/reel/DejvlE3Ss0t/";
const feat = parseVideo(FEATURED);
function openFeatured() {
  setIg(frame, feat);
  fitModal(feat);
  frame.innerHTML = iframeHtml(feat);
  modal.classList.add("open");
}
const nameBtn = document.getElementById("nameBtn");
nameBtn.addEventListener("click", openFeatured);
nameBtn.addEventListener("keydown", (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); openFeatured(); } });
let nameHoverTimer;
nameBtn.addEventListener("mouseenter", () => { nameHoverTimer = setTimeout(openFeatured, 700); });
nameBtn.addEventListener("mouseleave", () => clearTimeout(nameHoverTimer));

const reelFrame = document.getElementById("reelFrame");
function loadReel() { setIg(reelFrame, feat); reelFrame.innerHTML = iframeHtml(feat, 'loading="lazy"'); }
document.getElementById("reelPlay").addEventListener("click", loadReel);
new IntersectionObserver((en, ob) => { if (en[0].isIntersecting) { loadReel(); ob.disconnect(); } }, { threshold: 0.4 })
  .observe(document.getElementById("about"));

// photo fallback
const img = document.getElementById("photo");
function photoFallback() {
  const d = document.createElement("div");
  d.className = "photo";
  d.textContent = "your photo here";
  img.replaceWith(d);
}
img.addEventListener("error", photoFallback);
if (img.complete && img.naturalWidth === 0) photoFallback();

// nav highlight
const links = [...document.querySelectorAll(".nav > a[href^='#']")];
const io = new IntersectionObserver((entries) => {
  entries.forEach((en) => {
    if (en.isIntersecting) links.forEach((l) => l.classList.toggle("active", l.getAttribute("href") === "#" + en.target.id));
  });
}, { threshold: 0.2 });
["home", "about", "work"].forEach((id) => io.observe(document.getElementById(id)));
