/* ============================================================
   LOGIKA WEBSITE — kamu biasanya TIDAK perlu edit file ini.
   Semua teks & tanggal ada di js/config.js
   ============================================================ */

(function () {
  "use strict";

  const data = window.giftData;
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Reset scroll position to top on page load
  if ('scrollRestoration' in window.history) {
    window.history.scrollRestoration = 'manual';
  }
  window.scrollTo(0, 0);

  /* ----------------------------------------------------------
     Placeholder image fallback
     Kalau foto asli (mis. images/hero.jpg) belum ada, tampilkan
     placeholder cantik bergambar label nama file yang harus diganti.
     ---------------------------------------------------------- */
  function placeholderDataUri(label) {
    const bg = "#F2D9DC";
    const fg = "#7A6A65";
    const svg = `
      <svg xmlns="http://www.w3.org/2000/svg" width="800" height="800">
        <rect width="100%" height="100%" fill="${bg}"/>
        <text x="50%" y="46%" font-family="Georgia, serif" font-size="30" fill="${fg}" text-anchor="middle">♡</text>
        <text x="50%" y="56%" font-family="Arial, sans-serif" font-size="20" fill="${fg}" text-anchor="middle">Ganti dengan ${label}</text>
      </svg>`;
    return "data:image/svg+xml;utf8," + encodeURIComponent(svg);
  }

  window.handleImageError = function (imgEl, filename) {
    if (imgEl.dataset.fallbackApplied) return;
    imgEl.dataset.fallbackApplied = "true";
    imgEl.src = placeholderDataUri(filename);
  };

  /* ----------------------------------------------------------
     Populate static text from config
     ---------------------------------------------------------- */
  function fillText(id, value) {
    const el = document.getElementById(id);
    if (el) el.textContent = value;
  }

  fillText("openingLine", data.opening.line);
  fillText("openLabel", data.opening.cta);

  fillText("heroDate", data.anniversaryLabel);
  fillText("heroTitle", data.hero.title + " ❤️");
  fillText("heroSubtitle", data.hero.subtitle);
  const heroCta = document.getElementById("heroCta");
  if (heroCta) heroCta.textContent = data.hero.cta + " ↓";

  document.getElementById("heroImage").src = data.heroImage;

  fillText("letterTitle", data.letter.title);
  fillText("letterBody", data.letter.body);
  fillText("letterSignature", "— " + data.letter.signature);

  fillText("playerTitle", data.song.title);
  fillText("playerArtist", data.song.artist);
  document.getElementById("songAudio").src = data.song.audio;

  fillText("surprisePrompt", data.surprise.prompt);
  document.getElementById("surpriseButton").textContent = data.surprise.buttonLabel;

  document.getElementById("finalImage").src = data.final.image;
  fillText("finalLine1", data.final.line1);
  fillText("finalLine2", data.final.line2);
  fillText("finalLine3", data.final.line3 + " ❤️");
  fillText("finalSignature", "Dengan sayang, " + data.senderName);
  fillText("finalDate", data.final.dateLine);

  /* ----------------------------------------------------------
     Timeline
     ---------------------------------------------------------- */
  const timelineList = document.getElementById("timelineList");
  data.story.forEach((item) => {
    const li = document.createElement("li");
    li.className = "timeline-item reveal";
    li.innerHTML = `
      <span class="timeline-year">${item.year}</span>
      <h3 class="timeline-title">${item.title}</h3>
      <p class="timeline-text">${item.text}</p>
    `;
    timelineList.appendChild(li);
  });

  /* ----------------------------------------------------------
     Memories grid + lightbox
     ---------------------------------------------------------- */
  const memoryGrid = document.getElementById("memoryGrid");
  data.memories.forEach((m, i) => {
    const fig = document.createElement("figure");
    fig.className = "memory-item reveal";
    fig.dataset.size = m.size || "small";
    fig.tabIndex = 0;
    fig.setAttribute("role", "button");
    fig.setAttribute("aria-label", "Lihat foto: " + m.caption);
    const filename = m.src.split("/").pop();
    fig.innerHTML = `
      <img src="${m.src}" alt="${m.alt}" loading="lazy" onerror="handleImageError(this, '${filename}')" />
      <figcaption class="memory-caption">${m.caption}</figcaption>
    `;
    fig.addEventListener("click", () => openLightbox(m));
    fig.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") { e.preventDefault(); openLightbox(m); }
    });
    memoryGrid.appendChild(fig);
  });

  const lightbox = document.getElementById("lightbox");
  const lightboxImage = document.getElementById("lightboxImage");
  const lightboxCaption = document.getElementById("lightboxCaption");
  let lastFocused = null;

  function openLightbox(m) {
    lastFocused = document.activeElement;
    lightboxImage.src = document.querySelector(`img[src="${m.src}"]`).currentSrc || m.src;
    lightboxImage.alt = m.alt;
    lightboxCaption.textContent = m.caption;
    lightbox.hidden = false;
    document.getElementById("lightboxClose").focus();
    document.body.style.overflow = "hidden";
  }
  function closeLightbox() {
    lightbox.hidden = true;
    document.body.style.overflow = "";
    if (lastFocused) lastFocused.focus();
  }
  document.getElementById("lightboxClose").addEventListener("click", closeLightbox);
  lightbox.addEventListener("click", (e) => { if (e.target === lightbox) closeLightbox(); });
  document.addEventListener("keydown", (e) => { if (e.key === "Escape" && !lightbox.hidden) closeLightbox(); });

  /* ----------------------------------------------------------
     Reasons
     ---------------------------------------------------------- */
  const reasonsList = document.getElementById("reasonsList");
  data.reasons.forEach((reason, i) => {
    const li = document.createElement("li");
    li.className = "reason-item reveal";
    li.style.transitionDelay = reduceMotion ? "0s" : `${i * 0.08}s`;
    li.innerHTML = `
      <span class="reason-number">${String(i + 1).padStart(2, "0")}</span>
      <p class="reason-text">${reason}</p>
    `;
    reasonsList.appendChild(li);
  });

  /* ----------------------------------------------------------
     Scroll reveal (IntersectionObserver)
     ---------------------------------------------------------- */
  const revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && !reduceMotion) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" }
    );
    revealEls.forEach((el) => io.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add("is-visible"));
  }

  /* ----------------------------------------------------------
     Opening screen
     ---------------------------------------------------------- */
  const opening = document.getElementById("opening");
  const site = document.getElementById("site");
  const openButton = document.getElementById("openButton");
  const floatingPlayer = document.getElementById("floatingPlayer");

  // floating hearts in opening background
  const particleField = document.querySelector(".opening-particles");
  if (!reduceMotion) {
    const glyphs = ["❤", "♡", "✦"];
    for (let i = 0; i < 10; i++) {
      const span = document.createElement("span");
      span.textContent = glyphs[i % glyphs.length];
      span.style.left = Math.random() * 100 + "%";
      span.style.animationDuration = 9 + Math.random() * 7 + "s";
      span.style.animationDelay = Math.random() * 6 + "s";
      span.style.fontSize = 10 + Math.random() * 10 + "px";
      particleField.appendChild(span);
    }
  }

  function openSite() {
    opening.classList.add("is-hidden");
    site.removeAttribute("aria-hidden");
    document.body.style.overflow = "";
    setTimeout(() => { floatingPlayer.classList.add("is-visible"); }, 500);
    // Trigger langsung di dalam gesture klik ini supaya browser mengizinkan autoplay
    playSong();
  }

  document.body.style.overflow = "hidden";
  openButton.addEventListener("click", openSite);
  opening.addEventListener("click", (e) => {
    if (e.target === opening) openSite();
  });

  /* ----------------------------------------------------------
     Scroll progress bar
     ---------------------------------------------------------- */
  const progressFill = document.getElementById("progressFill");
  function updateProgress() {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    progressFill.style.width = pct + "%";
  }
  window.addEventListener("scroll", updateProgress, { passive: true });
  updateProgress();

  /* ----------------------------------------------------------
     Floating music player
     Lagu mulai otomatis begitu tombol "Sentuh untuk membuka" ditekan
     (dipanggil di dalam gesture klik supaya browser mengizinkan autoplay).
     ---------------------------------------------------------- */
  const songAudio = document.getElementById("songAudio");
  const musicToggle = document.getElementById("musicToggle");
  const playIcon = document.getElementById("playIcon");
  const playerArtist = document.getElementById("playerArtist");
  let audioFailed = false;

  function setPlayingUI(isPlaying) {
    floatingPlayer.dataset.playing = isPlaying ? "true" : "false";
    musicToggle.setAttribute("aria-pressed", isPlaying ? "true" : "false");
    playIcon.textContent = isPlaying ? "" : "▶";
  }

  function playSong() {
    if (audioFailed) return;
    songAudio.play().catch(() => {
      // Browser menolak autoplay (mis. belum ada interaksi) — biarkan,
      // pengunjung tetap bisa menekan tombol play manual di floating player.
    });
  }

  songAudio.addEventListener("error", () => {
    audioFailed = true;
    playerArtist.textContent = "Lagu belum ditambahkan";
  });

  musicToggle.addEventListener("click", () => {
    if (audioFailed) return;
    if (songAudio.paused) {
      playSong();
    } else {
      songAudio.pause();
    }
  });

  songAudio.addEventListener("play", () => setPlayingUI(true));
  songAudio.addEventListener("pause", () => setPlayingUI(false));
  songAudio.addEventListener("ended", () => setPlayingUI(false));

  /* ----------------------------------------------------------
     Special surprise reveal
     ---------------------------------------------------------- */
  const surpriseButton = document.getElementById("surpriseButton");
  const surpriseReveal = document.getElementById("surpriseReveal");
  surpriseButton.addEventListener("click", () => {
    surpriseReveal.textContent = data.surprise.reveal;
    surpriseReveal.classList.add("is-visible");
    surpriseButton.classList.add("is-done");
    surpriseButton.disabled = true;
  });

  /* ============================================================
     SECRET INVITATION — state machine
     States: LOCKED -> UNLOCKING -> UNLOCKED -> EVENT_DAY -> COMPLETED
     ============================================================ */
  const inv = data.invitation;
  const invitationSection = document.getElementById("invitation");

  if (!inv || !inv.enabled) {
    if (invitationSection) invitationSection.style.display = "none";
  } else {
    const eventTime = new Date(inv.eventDateTime).getTime();
    const unlockTime = new Date(inv.unlockDateTime).getTime();
    // treat the event as "ongoing" for 6 hours after start, then completed the next day
    const eventEndTime = eventTime + 6 * 60 * 60 * 1000;
    const eventDayEnd = new Date(inv.eventDateTime);
    eventDayEnd.setHours(23, 59, 59, 999);

    const card = document.getElementById("invitationCard");
    const statusEl = document.getElementById("invitationStatus");
    const countdownEl = document.getElementById("invitationCountdown");
    const srCountdown = document.getElementById("invitationSrCountdown");
    const lockIcon = document.getElementById("invitationLockIcon");
    const unlockOverlay = document.getElementById("unlockOverlay");
    const unlockText = document.getElementById("unlockText");
    const unlockCount = document.getElementById("unlockCount");
    const rsvpButton = document.getElementById("rsvpButton");

    const eventDate = new Date(inv.eventDateTime);
    const dateFormatter = new Intl.DateTimeFormat("id-ID", { day: "numeric", month: "long", year: "numeric", timeZone: "Asia/Jakarta" });
    const timeFormatter = new Intl.DateTimeFormat("id-ID", { hour: "2-digit", minute: "2-digit", timeZone: "Asia/Jakarta" });

    document.querySelector('#detailEventTitle .detail-value').textContent = inv.eventTitle;
    document.querySelector('#detailDate .detail-value').textContent = dateFormatter.format(eventDate);
    document.querySelector('#detailTime .detail-value').textContent = timeFormatter.format(eventDate)+ " WIB";
    document.querySelector('#detailDress .detail-value').textContent = inv.dressCode;
    document.querySelector('#detailLocation .detail-value').textContent = inv.location.name;
    document.getElementById("invitationMessage").textContent = "\u201c" + inv.message + "\u201d";

    function computeState(now) {
      if (now >= eventDayEnd.getTime() && now > eventEndTime) return "COMPLETED";
      if (now >= eventTime) return "EVENT_DAY";
      if (now >= unlockTime) return "UNLOCKED";
      return "LOCKED";
    }

    function formatCountdown(ms) {
      ms = Math.max(0, ms);
      const totalSeconds = Math.floor(ms / 1000);
      const days = Math.floor(totalSeconds / 86400);
      const hours = Math.floor((totalSeconds % 86400) / 3600);
      const minutes = Math.floor((totalSeconds % 3600) / 60);
      const seconds = totalSeconds % 60;
      return { days, hours, minutes, seconds };
    }

    function pad(n) { return String(n).padStart(2, "0"); }

    const STORAGE_KEY = "yasmine-invitation-state-v1";
    let previousState = null;
    let unlockAnimating = false;

    function setBlurState(isLocked) {
      card.dataset.state = isLocked ? "locked" : "unlocked";
    }

    function renderLocked(msRemaining) {
      lockIcon.textContent = "🔒";
      lockIcon.style.display = "";
      statusEl.textContent = "Ada kejutan kecil buat kita — belum boleh dibuka dulu.";
      countdownEl.removeAttribute("aria-hidden");
      countdownEl.style.display = "";
      const t = formatCountdown(msRemaining);
      document.getElementById("cdDays").textContent = pad(t.days);
      document.getElementById("cdHours").textContent = pad(t.hours);
      document.getElementById("cdMinutes").textContent = pad(t.minutes);
      document.getElementById("cdSeconds").textContent = pad(t.seconds);
      setBlurState(true);
      rsvpButton.hidden = true;
    }

    function updateSrCountdown(msRemaining, prefix) {
      const t = formatCountdown(msRemaining);
      srCountdown.textContent = `${prefix} sekitar ${t.days} hari ${t.hours} jam lagi.`;
    }

    function renderUnlocked(msToEvent) {
      lockIcon.style.display = "none";
      statusEl.textContent = "Happy Birthday Sayangku! ini undangan buat kamu ❤️";
      setBlurState(false);
      if (msToEvent > 0) {
        countdownEl.removeAttribute("aria-hidden");
        countdownEl.style.display = "";
        const t = formatCountdown(msToEvent);
        document.getElementById("cdDays").textContent = pad(t.days);
        document.getElementById("cdHours").textContent = pad(t.hours);
        document.getElementById("cdMinutes").textContent = pad(t.minutes);
        document.getElementById("cdSeconds").textContent = pad(t.seconds);
      } else {
        countdownEl.style.display = "none";
      }
      rsvpButton.hidden = false;
      if (!rsvpButton.textContent) rsvpButton.textContent = "Aku ikut ❤️";
    }

    function renderEventDay() {
      lockIcon.style.display = "none";
      statusEl.textContent = "Hari ini. Tinggal kamu dan aku ❤️";
      countdownEl.style.display = "none";
      setBlurState(false);
      rsvpButton.hidden = false;
    }

    function renderCompleted() {
      lockIcon.style.display = "none";
      statusEl.textContent = "Kita baru aja bikin satu kenangan indah lagi ❤️";
      countdownEl.style.display = "none";
      setBlurState(false);
      rsvpButton.hidden = true;
    }

    function playUnlockAnimation(onDone) {
      unlockAnimating = true;
      unlockOverlay.classList.add("is-active");
      const sequence = ["Sesuatu akhirnya siap dibuka...", "3", "2", "1", "✨ YOU'RE INVITED ❤️"];
      let i = 0;
      function step() {
        if (i === 0) { unlockText.textContent = sequence[0]; unlockCount.textContent = ""; }
        else if (i < 4) { unlockText.textContent = ""; unlockCount.textContent = sequence[i]; }
        else { unlockText.textContent = sequence[4]; unlockCount.textContent = ""; }
        i++;
        if (i < sequence.length) {
          setTimeout(step, i === 1 ? 1200 : 700);
        } else {
          setTimeout(() => {
            unlockOverlay.classList.remove("is-active");
            unlockAnimating = false;
            onDone && onDone();
          }, 1100);
        }
      }
      step();
    }

    function tick() {
      const now = Date.now();
      const state = computeState(now);

      if (unlockAnimating) return; // don't fight the animation mid-sequence

      if (state !== previousState) {
        if (state === "UNLOCKED" && previousState === "LOCKED") {
          // live transition witnessed — play cinematic unlock
          playUnlockAnimation(() => renderUnlocked(eventTime - Date.now()));
          previousState = state;
          return;
        }
        if (state === "UNLOCKED" && previousState !== "UNLOCKED") {
          // opened or refreshed in UNLOCKED state — show with reveal
          card.classList.add("reveal");
          requestAnimationFrame(() => card.classList.add("is-visible"));
        }
        previousState = state;
      }

      if (state === "LOCKED") {
        renderLocked(unlockTime - now);
        updateSrCountdown(unlockTime - now, "Kejutan terbuka");
        
        // Show toast notification when 2 minutes remaining
        if ((unlockTime - now) > 0 && (unlockTime - now) <= 120000 && !notificationShown) {
          notificationShown = true;
          showToastNotification();
        }
      } else if (state === "UNLOCKED") {
        const msToEvent = eventTime - now;
        renderUnlocked(msToEvent);
        updateSrCountdown(msToEvent, "Acara dimulai");
      } else if (state === "EVENT_DAY") {
        renderEventDay();
      } else {
        renderCompleted();
      }
    }

    rsvpButton.addEventListener("click", () => {
      rsvpButton.textContent = "Nggak sabar ❤️";
      rsvpButton.classList.add("is-confirmed");
      burstHearts(rsvpButton);
    });

    function burstHearts(anchorEl) {
      if (reduceMotion) return;
      const rect = anchorEl.getBoundingClientRect();
      for (let i = 0; i < 8; i++) {
        const heart = document.createElement("span");
        heart.textContent = "❤";
        heart.style.position = "fixed";
        heart.style.left = rect.left + rect.width / 2 + "px";
        heart.style.top = rect.top + "px";
        heart.style.color = "#C17786";
        heart.style.fontSize = 14 + Math.random() * 10 + "px";
        heart.style.pointerEvents = "none";
        heart.style.zIndex = "80";
        heart.style.transition = "transform 1s ease-out, opacity 1s ease-out";
        document.body.appendChild(heart);
        requestAnimationFrame(() => {
          const dx = (Math.random() - 0.5) * 160;
          const dy = -80 - Math.random() * 80;
          heart.style.transform = `translate(${dx}px, ${dy}px)`;
          heart.style.opacity = "0";
        });
        setTimeout(() => heart.remove(), 1100);
      }
    }

    /* ----------------------------------------------------------
       Toast Notification
       ---------------------------------------------------------- */
    const toastNotification = document.getElementById("toastNotification");
    let notificationShown = false;

    function showToastNotification() {
      toastNotification.removeAttribute("hidden");
      toastNotification.style.animation = "none";
      requestAnimationFrame(() => {
        toastNotification.style.animation = "slideUp 0.4s var(--ease)";
      });

      // Auto-dismiss after 5 seconds
      setTimeout(() => {
        toastNotification.setAttribute("hidden", "");
      }, 5000);
    }

    tick();
    setInterval(tick, 1000);
  }
})();
