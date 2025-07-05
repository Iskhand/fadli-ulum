let currentPage = 0;
const pages = document.querySelectorAll(".page");
const cover = document.querySelector(".cover");
const menu = document.querySelector(".menu");
const menuButtons = document.querySelectorAll(".menu button");
const params = new URLSearchParams(window.location.search);
const id = params.get("to");
// const id = "d3cd583e";

fetch(
  "https://script.google.com/macros/s/AKfycbzFdeqdxNZEiBKiVTH4jivhpggNYKMMh1rNT1oDUgriA1CLSm9RR9fjb3jYNWXIx0ap/exec?to=" +
    id
) // Ganti dengan URL Apps Script kamu
  .then((res) => res.json())
  .then((data) => {
    if (data && data.nama) {
      document.getElementById("namaTamu").innerText =
        "Kepada Yth: " + data.nama;
    } else {
      document.getElementById("namaTamu").innerText = "Tamu tidak dikenal.";
    }
  });

function showPage(index) {
  pages.forEach((page, i) => {
    const offset = i - index;
    page.style.zIndex = pages.length - Math.abs(offset);
    page.style.transform = `rotateY(${offset * 180}deg)`;
  });

  if (index >= 0 && menu && cover.classList.contains("open")) {
    menu.style.display = "flex";
    menu.classList.add("fade-in");
  }

  menuButtons.forEach((btn, i) => {
    if (i === index) {
      btn.classList.add("active");
    } else {
      btn.classList.remove("active");
    }
  });
}

function goToPage(index) {
  currentPage = index;
  showPage(currentPage);
}

function openBook() {
  cover.classList.add("open");
  setTimeout(() => {
    showPage(0);
  }, 1000);

  const bgMusic = document.getElementById("bg-music");
  if (bgMusic && bgMusic.paused) {
    bgMusic.play().catch((e) => {
      console.log("Autoplay ditolak:", e);
    });
  }
  generateBubbles();
}

// Sembunyikan menu di awal
if (menu) menu.style.display = "none";

// Inisialisasi posisi awal halaman
showPage(currentPage);

// Swipe gesture support for touch devices
let startX = 0;

window.addEventListener("touchstart", (e) => {
  startX = e.touches[0].clientX;
});

window.addEventListener("touchend", (e) => {
  const endX = e.changedTouches[0].clientX;
  const diffX = endX - startX;

  if (Math.abs(diffX) > 50) {
    if (diffX < 0 && currentPage < pages.length - 1) {
      goToPage(currentPage + 1);
    } else if (diffX > 0 && currentPage > 0) {
      goToPage(currentPage - 1);
    }
  }
});

// Mouse drag gesture support for desktop
let isDragging = false;
let dragStartX = 0;

window.addEventListener("mousedown", (e) => {
  isDragging = true;
  dragStartX = e.clientX;
});

window.addEventListener("mouseup", (e) => {
  if (!isDragging) return;
  isDragging = false;
  const dragEndX = e.clientX;
  const diffX = dragEndX - dragStartX;

  if (Math.abs(diffX) > 50) {
    if (diffX < 0 && currentPage < pages.length - 1) {
      goToPage(currentPage + 1);
    } else if (diffX > 0 && currentPage > 0) {
      goToPage(currentPage - 1);
    }
  }
});
const music = document.getElementById("bg-music");
const toggleBtn = document.getElementById("music-toggle");

if (music && toggleBtn) {
  toggleBtn.addEventListener("click", () => {
    if (music.paused) {
      music.play();
      toggleBtn.innerHTML = '<i class="bi bi-pause-circle"></i>';
      toggleBtn.classList.remove("paused");
    } else {
      music.pause();
      toggleBtn.innerHTML = '<i class="bi bi-play-circle"></i>';
      toggleBtn.classList.add("paused");
    }
  });
}
function generateBubbles() {
  const layer = document.getElementById("bubbleLayer");
  for (let i = 0; i < 50; i++) {
    const bubble = document.createElement("div");
    bubble.classList.add("bubble");
    bubble.style.left = Math.random() * 100 + "vw";
    bubble.style.animationDuration = Math.random() * 5 + 5 + "s";
    bubble.style.width = bubble.style.height = Math.random() * 10 + 10 + "px";
    layer.appendChild(bubble);
  }
}
simplyCountdown(".simply-countdown", {
  year: 2025, // required
  month: 8, // required
  day: 19, // required
  hours: 10, // Default is 0 [0-23] integer
  words: {
    //words displayed into the countdown
    days: { singular: "hari", plural: "hari" },
    hours: { singular: "jam", plural: "jam" },
    minutes: { singular: "menit", plural: "menit" },
    seconds: { singular: "detik", plural: "detik" },
  },
});
function copyRekening() {
  const input = document.getElementById("rekInput");
  input.select();
  input.setSelectionRange(0, 99999);
  document.execCommand("copy");
  const btn = document.getElementById("copyBtn");
  btn.textContent = "Berhasil disalin";
  setTimeout(() => (btn.textContent = "Copy"), 500);
}
