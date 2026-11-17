(function () {
  "use strict";

  const DATA = window.PORTFOLIO_DATA;
  if (!DATA) return;

  const state = {
    lang: "pt",
    theme: document.documentElement.getAttribute("data-theme") === "light" ? "light" : "dark",
    heroSlideIndex: 0,
    isHeroPaused: false,
    heroTimer: null,
    skillCategory: "all",
    projectCategory: "all",
    activeProjectId: null,
    activeImageIndex: 0,
    isGalleryPaused: false,
    galleryTimer: null,
  };

  /* --------------------------------------------------------------------------
     Static Vector Icons & Official Institution Wordmarks
     -------------------------------------------------------------------------- */
  const ICONS = {
    mail: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>`,
    phone: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>`,
    mapPin: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>`,
    globe: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></svg>`,
    calendar: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M8 2v4"/><path d="M16 2v4"/><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M3 10h18"/></svg>`,
    graduationCap: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z"/><path d="M22 10v6"/><path d="M6 12.5V16a6 3 0 0 0 12 0v-3.5"/></svg>`,
    checkCircle: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>`,
    refresh: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/><path d="M21 3v5h-5"/><path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"/><path d="M8 16H3v5"/></svg>`,
    eye: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0"/><circle cx="12" cy="12" r="3"/></svg>`,
    externalLink: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" x2="21" y1="14" y2="3"/></svg>`,
    eda: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 3v18h18"/><path d="m19 9-5 5-4-4-3 3"/></svg>`,
    ml: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="4" y="4" width="16" height="16" rx="2"/><rect x="9" y="9" width="6" height="6"/><path d="M15 2v2"/><path d="M15 20v2"/><path d="M2 15h2"/><path d="M2 9h2"/><path d="M20 15h2"/><path d="M20 9h2"/><path d="M9 2v2"/><path d="M9 20v2"/></svg>`,
    nlp: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z"/><path d="M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z"/><path d="M15 13a4.5 4.5 0 0 1-3-4 4.5 4.5 0 0 1-3 4"/><path d="M17.599 6.5a3 3 0 0 0 .399-1.375"/><path d="M6.003 5.125A3 3 0 0 0 6.401 6.5"/><path d="M3.477 10.896a4 4 0 0 1 .585-.396"/><path d="M19.938 10.5a4 4 0 0 1 .585.396"/><path d="M6 18a4 4 0 0 1-1.967-.516"/><path d="M19.967 17.484A4 4 0 0 1 18 18"/></svg>`,
    cloud: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"/></svg>`,
  };

  const INSTITUTION_LOGOS = {
    google: `<svg viewBox="0 0 24 24" fill="currentColor" aria-label="Google"><path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"/></svg>`,
    aws: `<svg viewBox="0 0 120 44" fill="currentColor" aria-label="Amazon AWS"><text x="60" y="23" text-anchor="middle" font-family="Space Grotesk, sans-serif" font-weight="800" font-size="22" letter-spacing="2">AWS</text><path d="M22 31 Q60 40 98 31" stroke="currentColor" stroke-width="3" fill="none" stroke-linecap="round"/><path d="M92 27 L99 31 L93 36" stroke="currentColor" stroke-width="2.6" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
    usp: `<svg viewBox="0 0 984.76 399.31" fill="currentColor" aria-label="USP"><g transform="matrix(1.3333333,0,0,-1.3333333,0,399.30667)"><g transform="scale(0.1)"><path d="m 2395.31,698.602 c 0,-274.832 -224.18,-499 -499,-499 V 0 c 253.58,0 476.36,136.34 598.79,339.488 v 359.114 z m 199.59,0 c 0,-274.832 224.2,-499 499.08,-499 V 0 C 2840.27,0 2617.56,136.34 2495.1,339.488 v 359.114 h 99.8 z M 4990.27,2296.18 c 0,274.85 224.13,498.99 499.01,498.99 v 199.64 c -253.65,0 -476.46,-136.38 -598.82,-339.5 v -359.13 h 99.81 z m -199.68,-0.32 h 99.87 v 359.09 c -122.39,203.15 -345.24,339.5 -598.91,339.5 v -199.58 c 274.94,0 499.04,-224.2 499.04,-499.01 z m 0,-1597.008 c 0,-274.782 -224.1,-499.563 -499.04,-499.563 V 0.269531 c 384.84,0 698.72,313.890469 698.72,698.582469 H 4790.59 Z M 7185.95,2295.79 h 199.73 c 0,384.79 -313.87,698.6 -698.75,698.6 v -199.52 c 274.79,0 499.02,-224.2 499.02,-499.08 z M 199.609,698.852 H 0 C 0,314.16 313.824,0.269531 698.629,0.269531 V 199.898 c -274.875,0 -499.02,224.172 -499.02,498.954 z M 3094.12,2994.39 c -365.71,0 -699.43,-315.41 -698.81,-698.35 h 199.77 c 0,283.7 231.8,499.13 499.02,499.23 -0.67,95 -0.59,126.58 0.02,199.12 z M 4990.27,199.84 V 0.0898438 H 6187.95 V 998.371 H 7385.68 V 2295.79 H 7185.95 V 1198 h -998 V 2295.79 H 5988.31 V 199.898 l -998.04,-0.058 z m 499.01,2794.97 1197.65,-0.42 v -199.73 l -1197.65,0.51 z m -498.55,-1855.17 -0.46,-440.788 h -199.68 v 357.998 l -1167.54,1169.4 139.93,141.49 1227.75,-1228.1 z m -2595.42,715.39 1227.74,-1228.069 139.93,141.5 -1167.9,1169.369 v 358.21 H 2395.31 Z M 0,2994.39 H 2395.31 V 2794.87 H 1397.27 V 703.102 H 1197.62 V 2794.87 H 199.609 V 698.852 H 0 Z M 698.629,199.898 H 1896.49 V 0.0898438 H 698.629 Z m 2395.381,2794.442 1197.68,0.05 v -199.73 l -1197.68,0.61 z m -0.03,-2794.738 1197.71,-0.723 V 0.21875 l -1197.68,0.3125 -0.03,199.07075 v 0"/></g></g></svg>`,
    wharton: `<svg viewBox="0 0 200 60" fill="currentColor" aria-label="Wharton"><text x="50%" y="52%" dominant-baseline="middle" text-anchor="middle" font-family="Georgia, 'Times New Roman', serif" font-weight="700" font-size="34" letter-spacing="0.5">Wharton</text></svg>`,
    ibm: `<svg viewBox="0 0 1075 401.15" fill="currentColor" aria-label="IBM"><g><rect y="373.17" width="194.43" height="27.932"/><rect y="319.83" width="194.43" height="27.932"/><rect x="55.468" y="266.54" width="83.399" height="27.932"/><rect x="55.468" y="213.25" width="83.399" height="27.932"/><rect x="55.468" y="159.96" width="83.399" height="27.932"/><rect x="55.468" y="106.58" width="83.399" height="27.932"/><rect y="53.288" width="194.43" height="27.932"/><rect width="194.43" height="27.932"/></g><g><path d="m222.17 400.85 207.11 0.297c27.734 0 52.793-10.697 71.513-27.932h-278.62z"/><path d="m222.17 347.76h299.03c5.051-8.617 8.815-18.027 11.094-27.932h-310.12z"/><rect x="277.73" y="266.54" width="83.3" height="27.932"/><path d="m444.43 266.54v27.932h90.927c0-9.608-1.288-19.017-3.764-27.932z"/><path d="m497.92 213.25h-220.19v27.932h243.46c-6.34-10.698-14.165-20.107-23.277-27.932z"/><path d="m277.73 159.96v27.932h220.19c9.311-7.825 17.135-17.235 23.277-27.932z"/><rect x="277.73" y="106.58" width="83.3" height="27.932"/><path d="m444.43 134.51h87.163c2.476-8.914 3.764-18.324 3.764-27.932h-90.927z"/><path d="m521.2 53.288h-299.03v27.932h310.12c-2.575-9.905-6.339-19.314-11.093-27.932z"/><path d="m429.28 0h-207.11v27.932h278.53c-18.621-17.235-43.878-27.932-71.414-27.932z"/></g><g><polygon points="555.57 81.22 742.67 81.22 733.06 53.288 555.57 53.288"/><polygon points="555.57 27.932 724.25 27.932 714.64 0 555.57 0"/><polygon points="861.03 401.17 861.03 373.24 1000 373.24 1000 401.17"/><polygon points="861.03 347.76 861.03 319.83 1000 319.83 1000 347.76"/><polygon points="777.73 182.54 769.91 159.96 694.43 159.96 611.03 159.96 611.03 187.89 694.43 187.89 694.43 162.24 703.25 187.89 852.22 187.89 861.03 162.24 861.03 187.89 944.43 187.89 944.43 159.96 861.03 159.96 785.56 159.96"/><polygon points="944.43 106.58 803.98 106.58 794.37 134.51 944.43 134.51"/><polygon points="1000 27.932 1000 0 840.93 0 831.32 27.932"/><polygon points="768.13 373.22 777.73 400.85 787.34 373.22"/><polygon points="749.5 319.83 759.31 347.76 796.16 347.76 806.06 319.83"/><polygon points="730.78 266.54 740.59 294.47 814.88 294.47 824.68 266.54"/><polygon points="721.97 241.18 833.6 241.18 843.11 213.25 712.36 213.25"/><polygon points="611.03 134.51 761.09 134.51 751.49 106.58 611.03 106.58"/><polygon points="1000 53.288 822.4 53.288 812.9 81.22 1000 81.22"/><rect x="555.57" y="373.22" width="138.97" height="27.932"/><rect x="555.57" y="319.83" width="138.97" height="27.932"/><rect x="611.03" y="266.54" width="83.399" height="27.932"/><rect x="611.03" y="213.25" width="83.399" height="27.932"/><rect x="861.03" y="213.25" width="83.399" height="27.932"/><rect x="861.03" y="266.54" width="83.399" height="27.932"/></g></svg>`,
  };

  /* --------------------------------------------------------------------------
     DOM Helpers
     -------------------------------------------------------------------------- */
  const $ = (id) => document.getElementById(id);

  function escapeHtml(text) {
    const div = document.createElement("div");
    div.textContent = text;
    return div.innerHTML;
  }

  function currentData() {
    return DATA[state.lang];
  }

  function copyEmailToClipboard(triggerBtn, labelEl, defaultText, copiedText) {
    const email = currentData().profile.email;
    const onSuccess = () => {
      triggerBtn.classList.add("is-copied");
      labelEl.textContent = copiedText;
      setTimeout(() => {
        triggerBtn.classList.remove("is-copied");
        labelEl.textContent = defaultText;
      }, 2200);
    };

    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(email).then(onSuccess).catch(fallbackCopy);
    } else {
      fallbackCopy();
    }

    function fallbackCopy() {
      const textarea = document.createElement("textarea");
      textarea.value = email;
      textarea.style.position = "fixed";
      textarea.style.opacity = "0";
      document.body.appendChild(textarea);
      textarea.select();
      try {
        document.execCommand("copy");
        onSuccess();
      } catch (e) {}
      document.body.removeChild(textarea);
    }
  }

  /* --------------------------------------------------------------------------
     Render Functions
     -------------------------------------------------------------------------- */
  function renderNavbar() {
    const d = currentData();
    $("nav-cv-label").textContent = d.nav.cvButton;
    $("nav-cv-btn").href = d.profile.cvUrl;
    $("mobile-cv-btn").href = d.profile.cvUrl;
    $("mobile-cv-label").textContent = d.hero.ctaCv;
    $("theme-toggle").setAttribute("aria-label", d.nav.themeLabel);
    $("lang-toggle").setAttribute("aria-label", d.nav.langLabel);

    const ptSpan = document.querySelector('#lang-toggle [data-lang="pt"]');
    const enSpan = document.querySelector('#lang-toggle [data-lang="en"]');
    ptSpan.classList.toggle("lang-active", state.lang === "pt");
    enSpan.classList.toggle("lang-active", state.lang === "en");

    const desktopList = $("nav-links");
    const mobileList = $("mobile-nav-links");
    desktopList.innerHTML = "";
    mobileList.innerHTML = "";

    d.nav.links.forEach((item, idx) => {
      const li = document.createElement("li");
      const a = document.createElement("a");
      a.href = "#" + item.id;
      a.className = idx === 0 ? "nav-link active" : "nav-link";
      a.dataset.section = item.id;
      a.textContent = item.label;
      li.appendChild(a);
      desktopList.appendChild(li);

      const mLi = li.cloneNode(true);
      mLi.querySelector("a").addEventListener("click", closeMobileDrawer);
      mobileList.appendChild(mLi);
    });
  }

  function getHeroSlides() {
    const d = currentData();
    const bioSlide = {
      kicker: d.profile.statusPill,
      title: d.profile.name,
      paragraphs: d.about.bioParagraphs,
      primaryLabel: d.hero.ctaProjects,
      primaryAction: () => {
        const target = $("projetos");
        if (target) target.scrollIntoView({ behavior: "smooth" });
      },
      secondaryLabel: d.hero.ctaCv,
      secondaryHref: d.profile.cvUrl,
      secondaryDownload: "Felipe Oliveira Lopes CV.pdf",
      secondaryExternal: false,
    };

    const projectSlides = d.portfolio.projects.map((proj, idx) => {
      const prefix = state.lang === "pt" ? "Projeto" : "Project";
      const num = String(idx + 1).padStart(2, "0");
      return {
        kicker: `${prefix} ${num} • ${proj.categoryLabel}`,
        title: proj.title,
        paragraphs: [proj.shortDescription, proj.fullDescription],
        primaryLabel: d.portfolio.cardButtons.preview,
        primaryAction: () => openProjectModal(proj.id),
        secondaryLabel: d.portfolio.modal.codeButton,
        secondaryHref: proj.githubUrl,
        secondaryDownload: null,
        secondaryExternal: true,
      };
    });

    return [bioSlide, ...projectSlides];
  }

  function renderHeroSlide() {
    const slides = getHeroSlides();
    if (state.heroSlideIndex >= slides.length) state.heroSlideIndex = 0;
    const slide = slides[state.heroSlideIndex];

    $("hero-kicker-text").textContent = slide.kicker;
    $("hero-display-title").textContent = slide.title;

    const paragraphsEl = $("hero-slide-paragraphs");
    paragraphsEl.classList.add("is-switching");
    paragraphsEl.innerHTML = slide.paragraphs
      .map((p) => `<p>${escapeHtml(p)}</p>`)
      .join("");
    // Force reflow to replay fadeSlideIn animation cleanly on slide changes
    void paragraphsEl.offsetWidth;
    paragraphsEl.classList.remove("is-switching");

    $("hero-primary-label").textContent = slide.primaryLabel;
    $("hero-primary-btn").onclick = slide.primaryAction;

    const secondaryBtn = $("hero-secondary-btn");
    $("hero-secondary-label").textContent = slide.secondaryLabel;
    secondaryBtn.href = slide.secondaryHref;
    if (slide.secondaryDownload) {
      secondaryBtn.setAttribute("download", slide.secondaryDownload);
    } else {
      secondaryBtn.removeAttribute("download");
    }
    if (slide.secondaryExternal) {
      secondaryBtn.setAttribute("target", "_blank");
      secondaryBtn.setAttribute("rel", "noopener noreferrer");
    } else {
      secondaryBtn.removeAttribute("target");
      secondaryBtn.removeAttribute("rel");
    }

    const dotsContainer = $("hero-dots");
    dotsContainer.innerHTML = slides
      .map(
        (_, idx) => `
        <button
          type="button"
          class="carousel-diamond-btn ${idx === state.heroSlideIndex ? "active" : ""}"
          role="tab"
          aria-selected="${idx === state.heroSlideIndex}"
          aria-label="${state.lang === "pt" ? `Ir para slide ${idx + 1}` : `Go to slide ${idx + 1}`}"
          data-hero-dot="${idx}"
        ></button>
      `
      )
      .join("");

    dotsContainer.querySelectorAll("[data-hero-dot]").forEach((btn) => {
      btn.addEventListener("click", () => {
        state.heroSlideIndex = Number(btn.dataset.heroDot);
        renderHeroSlide();
        startHeroAutoplay();
      });
    });

    const prevBtn = $("hero-prev-slide");
    const nextBtn = $("hero-next-slide");
    const pauseBtn = $("hero-pause-slide");
    prevBtn.setAttribute("aria-label", state.lang === "pt" ? "Slide anterior" : "Previous slide");
    nextBtn.setAttribute("aria-label", state.lang === "pt" ? "Próximo slide" : "Next slide");
    pauseBtn.classList.toggle("is-paused", state.isHeroPaused);
    pauseBtn.setAttribute("aria-pressed", String(state.isHeroPaused));
    pauseBtn.setAttribute(
      "aria-label",
      state.isHeroPaused
        ? state.lang === "pt"
          ? "Retomar rotação"
          : "Resume rotation"
        : state.lang === "pt"
        ? "Pausar rotação"
        : "Pause rotation"
    );
  }

  function stepHeroSlide(delta) {
    const total = getHeroSlides().length;
    state.heroSlideIndex = (state.heroSlideIndex + delta + total) % total;
    renderHeroSlide();
    startHeroAutoplay();
  }

  function stopHeroAutoplay() {
    if (state.heroTimer) {
      window.clearInterval(state.heroTimer);
      state.heroTimer = null;
    }
  }

  function startHeroAutoplay() {
    stopHeroAutoplay();
    if (state.isHeroPaused) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    state.heroTimer = window.setInterval(() => {
      const total = getHeroSlides().length;
      state.heroSlideIndex = (state.heroSlideIndex + 1) % total;
      renderHeroSlide();
    }, 6500);
  }

  function toggleHeroPause() {
    state.isHeroPaused = !state.isHeroPaused;
    renderHeroSlide();
    if (state.isHeroPaused) {
      stopHeroAutoplay();
    } else {
      startHeroAutoplay();
    }
  }

  function renderHeroAndAbout() {
    const d = currentData();
    $("hero-copy-email-label").textContent = d.hero.ctaCopyEmail;
    $("social-github").href = d.profile.social.github;
    $("social-linkedin").href = d.profile.social.linkedin;
    renderHeroSlide();
  }

  function renderProjects() {
    const d = currentData();
    $("projects-tag").textContent = d.portfolio.sectionTag;
    $("projects-title").textContent = d.portfolio.title;
    $("projects-subtitle").textContent = d.portfolio.experienceDescription;

    $("projects-filters").innerHTML = d.portfolio.categories
      .map(
        (cat) => `
        <button
          type="button"
          class="filter-pill ${state.projectCategory === cat.key ? "active" : ""}"
          data-proj-cat="${escapeHtml(cat.key)}"
        >
          ${escapeHtml(cat.label)}
        </button>
      `
      )
      .join("");

    document.querySelectorAll("[data-proj-cat]").forEach((btn) => {
      btn.addEventListener("click", () => {
        state.projectCategory = btn.dataset.projCat;
        renderProjects();
      });
    });

    const filteredProjects =
      state.projectCategory === "all"
        ? d.portfolio.projects
        : d.portfolio.projects.filter((p) => p.category === state.projectCategory);

    $("projects-grid").innerHTML = filteredProjects
      .map((proj) => {
        const previewFeatures = proj.features.slice(0, 2);
        return `
          <article class="bento-card project-card">
            <div class="project-media">
              <div class="project-frame">
                <img
                  src="${escapeHtml(proj.image)}"
                  alt="${escapeHtml(proj.title)}"
                  class="project-thumb"
                  loading="lazy"
                />
              </div>
              <div class="project-badges">
                <span class="category-pill mono">${escapeHtml(proj.categoryLabel)}</span>
                <span class="charts-count-pill mono">${proj.gallery.length} ${escapeHtml(
          d.portfolio.cardButtons.chartsLabel
        )}</span>
              </div>
            </div>

            <div class="project-body">
              <div>
                <h3 class="project-title">${escapeHtml(proj.title)}</h3>
                <p class="project-desc">${escapeHtml(proj.shortDescription)}</p>
                <ul class="project-highlights">
                  ${previewFeatures.map((f) => `<li>${escapeHtml(f)}</li>`).join("")}
                </ul>
                <div class="tag-row">
                  ${proj.technologies
                    .slice(0, 4)
                    .map((t) => `<span class="tech-tag mono">${escapeHtml(t)}</span>`)
                    .join("")}
                </div>
              </div>

              <div class="project-actions">
                <button
                  type="button"
                  class="btn btn-primary"
                  data-open-project="${escapeHtml(proj.id)}"
                >
                  ${ICONS.eye}
                  <span>${escapeHtml(d.portfolio.cardButtons.preview)}</span>
                </button>
                <a
                  href="${escapeHtml(proj.githubUrl)}"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="btn btn-secondary"
                >
                  ${ICONS.externalLink}
                  <span>${escapeHtml(d.portfolio.cardButtons.visit)}</span>
                </a>
              </div>
            </div>
          </article>
        `;
      })
      .join("");

    document.querySelectorAll("[data-open-project]").forEach((btn) => {
      btn.addEventListener("click", () => openProjectModal(btn.dataset.openProject));
    });
  }

  function renderEducationAndCerts() {
    const d = currentData();
    $("resume-tag").textContent = d.resume.sectionTag;
    $("resume-title").textContent = d.resume.title;
    $("resume-subtitle").textContent = d.resume.subtitle;

    const degree = d.resume.education.find((item) => item.type === "degree");
    const certs = d.resume.education.filter((item) => item.type !== "degree");

    if (degree) {
      const pct = degree.progress
        ? Math.round((degree.progress.current / degree.progress.total) * 100)
        : 0;
      const progressText = degree.progress
        ? d.resume.progressLabel
            .replace("{current}", String(degree.progress.current))
            .replace("{total}", String(degree.progress.total))
        : "";

      $("degree-container").innerHTML = `
        <article class="bento-card degree-card">
          <div class="degree-header">
            <div class="degree-title-group">
              <div class="degree-icon">${ICONS.graduationCap}</div>
              <div>
                <h3 class="degree-title">${escapeHtml(degree.title)}</h3>
                <p class="degree-subtitle">
                  ${escapeHtml(degree.subtitle)} ·
                  <span class="degree-period mono">${escapeHtml(degree.period)}</span>
                </p>
              </div>
            </div>
            <span class="status-badge ongoing mono">
              ${ICONS.refresh}
              <span>${escapeHtml(d.resume.statusLabels.ongoing)}</span>
            </span>
          </div>
          <p class="degree-desc">${escapeHtml(degree.description)}</p>
          <div class="degree-progress-row">
            <div class="progress-track">
              <div class="progress-fill" style="width: ${pct}%"></div>
            </div>
            <span class="degree-progress-text mono">${escapeHtml(progressText)} (${pct}%) · ${escapeHtml(
        d.resume.expectedCompletion
      )}</span>
          </div>
        </article>
      `;
    }

    $("certificates-grid").innerHTML = certs
      .map((cert) => {
        const logoHtml = INSTITUTION_LOGOS[cert.institution] || ICONS.graduationCap;
        return `
          <article class="bento-card cert-card reveal is-visible">
            <div>
              <div class="cert-top">
                <div class="cert-logo-box">${logoHtml}</div>
                <span class="status-badge completed mono">
                  ${ICONS.checkCircle}
                  <span>${escapeHtml(d.resume.statusLabels.completed)}</span>
                </span>
              </div>
              <h3 class="cert-title" style="margin-top: 14px;">${escapeHtml(cert.title)}</h3>
              <p class="cert-issuer">${escapeHtml(cert.subtitle)}</p>
              <p class="cert-period mono">
                ${ICONS.calendar}
                <span>${escapeHtml(cert.period)}</span>
              </p>
            </div>
            <p class="cert-desc">${escapeHtml(cert.description)}</p>
          </article>
        `;
      })
      .join("");
  }

  function renderFooter() {
    const d = currentData();
    $("footer-rights").textContent = d.footer.rights;
    $("footer-original-link").textContent = d.footer.originalLinkLabel;
  }

  function renderAll() {
    const d = currentData();
    document.documentElement.lang = state.lang === "pt" ? "pt-BR" : "en";
    document.title = d.meta.pageTitle;
    $("meta-description").setAttribute("content", d.meta.description);

    renderNavbar();
    renderHeroAndAbout();
    renderProjects();
    renderEducationAndCerts();
    renderFooter();

    if (state.activeProjectId) {
      updateModalContent();
    }
  }

  /* --------------------------------------------------------------------------
     Project Case Study Modal
     -------------------------------------------------------------------------- */
  function getActiveProject() {
    if (!state.activeProjectId) return null;
    return currentData().portfolio.projects.find((p) => p.id === state.activeProjectId) || null;
  }

  function updateModalImage() {
    const proj = getActiveProject();
    if (!proj) return;
    const total = proj.gallery.length;
    if (state.activeImageIndex >= total) state.activeImageIndex = 0;

    const src = proj.gallery[state.activeImageIndex] || proj.image;
    const imgEl = $("modal-main-image");
    imgEl.src = src;
    imgEl.alt = `${proj.title} — ${state.activeImageIndex + 1}`;
    $("modal-image-counter").textContent = `${state.activeImageIndex + 1} / ${total}`;

    const thumbs = $("modal-thumbnails").querySelectorAll(".modal-thumb-btn");
    thumbs.forEach((btn, idx) => {
      const isActive = idx === state.activeImageIndex;
      btn.classList.toggle("active", isActive);
      btn.setAttribute("aria-pressed", String(isActive));
      if (isActive) {
        btn.scrollIntoView({ block: "nearest", inline: "center", behavior: "smooth" });
      }
    });
  }

  function updateModalContent() {
    const proj = getActiveProject();
    const modalLabels = currentData().portfolio.modal;
    if (!proj) return;

    $("modal-category-badge").textContent = proj.categoryLabel;
    $("modal-title").textContent = proj.title;
    $("modal-short-desc").textContent = proj.shortDescription;
    $("modal-full-desc").textContent = proj.fullDescription;
    $("modal-tech-label").textContent = modalLabels.technologiesLabel;
    $("modal-features-label").textContent = modalLabels.featuresLabel;
    $("modal-challenges-label").textContent = modalLabels.challengesLabel;
    $("modal-challenges-text").textContent = proj.challenges;
    $("modal-live-btn").href = proj.liveUrl;
    $("modal-live-label").textContent = modalLabels.liveButton;
    $("modal-code-btn").href = proj.githubUrl;
    $("modal-code-label").textContent = modalLabels.codeButton;
    $("modal-close-btn").setAttribute("aria-label", modalLabels.closeButton);
    $("modal-prev-btn").setAttribute("aria-label", modalLabels.previousImageLabel);
    $("modal-next-btn").setAttribute("aria-label", modalLabels.nextImageLabel);

    $("modal-tech-list").innerHTML = proj.technologies
      .map((t) => `<span class="tech-tag mono">${escapeHtml(t)}</span>`)
      .join("");

    $("modal-features-list").innerHTML = proj.features
      .map((f) => `<li>${escapeHtml(f)}</li>`)
      .join("");

    const thumbsContainer = $("modal-thumbnails");
    const hasMultiple = proj.gallery.length > 1;
    $("modal-prev-btn").hidden = !hasMultiple;
    $("modal-next-btn").hidden = !hasMultiple;
    thumbsContainer.hidden = !hasMultiple;

    thumbsContainer.innerHTML = hasMultiple
      ? proj.gallery
          .map(
            (imgUrl, idx) => `
          <button
            type="button"
            class="modal-thumb-btn ${idx === state.activeImageIndex ? "active" : ""}"
            aria-label="${escapeHtml(modalLabels.showImageLabel)} ${idx + 1}"
            aria-pressed="${idx === state.activeImageIndex}"
            data-thumb-idx="${idx}"
          >
            <img src="${escapeHtml(imgUrl)}" alt="" loading="lazy" />
          </button>
        `
          )
          .join("")
      : "";

    thumbsContainer.querySelectorAll("[data-thumb-idx]").forEach((btn) => {
      btn.addEventListener("click", () => {
        state.activeImageIndex = Number(btn.dataset.thumbIdx);
        updateModalImage();
      });
    });

    updateModalImage();
  }

  function startGalleryAutoplay() {
    stopGalleryAutoplay();
    const proj = getActiveProject();
    if (!proj || proj.gallery.length < 2 || state.isGalleryPaused) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    state.galleryTimer = window.setInterval(() => {
      const currentProj = getActiveProject();
      if (!currentProj) return;
      state.activeImageIndex = (state.activeImageIndex + 1) % currentProj.gallery.length;
      updateModalImage();
    }, 5000);
  }

  function stopGalleryAutoplay() {
    if (state.galleryTimer) {
      window.clearInterval(state.galleryTimer);
      state.galleryTimer = null;
    }
  }

  function openProjectModal(projectId) {
    state.activeProjectId = projectId;
    state.activeImageIndex = 0;
    state.isGalleryPaused = false;
    updateModalContent();
    $("project-modal").hidden = false;
    document.body.style.overflow = "hidden";
    $("modal-close-btn").focus();
    startGalleryAutoplay();
  }

  function closeProjectModal() {
    stopGalleryAutoplay();
    state.activeProjectId = null;
    $("project-modal").hidden = true;
    document.body.style.overflow = "";
  }

  function stepModalImage(delta) {
    const proj = getActiveProject();
    if (!proj || proj.gallery.length < 2) return;
    state.activeImageIndex =
      (state.activeImageIndex + delta + proj.gallery.length) % proj.gallery.length;
    updateModalImage();
  }

  /* --------------------------------------------------------------------------
     Mobile Drawer & Controls
     -------------------------------------------------------------------------- */
  function closeMobileDrawer() {
    $("mobile-drawer").hidden = true;
    $("mobile-menu-btn").setAttribute("aria-expanded", "false");
  }

  function initEventListeners() {
    // Theme toggle
    $("theme-toggle").addEventListener("click", () => {
      state.theme = state.theme === "dark" ? "light" : "dark";
      document.documentElement.setAttribute("data-theme", state.theme);
      try {
        localStorage.setItem("theme", state.theme);
      } catch (e) {}
    });

    // Language toggle
    $("lang-toggle").addEventListener("click", () => {
      state.lang = state.lang === "pt" ? "en" : "pt";
      renderAll();
    });

    // Hero carousel controls
    $("hero-prev-slide").addEventListener("click", () => stepHeroSlide(-1));
    $("hero-next-slide").addEventListener("click", () => stepHeroSlide(1));
    $("hero-pause-slide").addEventListener("click", toggleHeroPause);

    // Hero email copy button
    $("hero-copy-email").addEventListener("click", () => {
      const d = currentData();
      copyEmailToClipboard(
        $("hero-copy-email"),
        $("hero-copy-email-label"),
        d.hero.ctaCopyEmail,
        d.hero.copiedFeedback
      );
    });

    // Mobile menu drawer
    $("mobile-menu-btn").addEventListener("click", () => {
      const drawer = $("mobile-drawer");
      const isHidden = drawer.hidden;
      drawer.hidden = !isHidden;
      $("mobile-menu-btn").setAttribute("aria-expanded", String(isHidden));
    });

    // Modal controls
    $("modal-close-btn").addEventListener("click", closeProjectModal);
    $("project-modal").addEventListener("click", (e) => {
      if (e.target === $("project-modal")) closeProjectModal();
    });
    $("modal-prev-btn").addEventListener("click", () => stepModalImage(-1));
    $("modal-next-btn").addEventListener("click", () => stepModalImage(1));

    const galleryWrap = $("modal-gallery-wrap");
    galleryWrap.addEventListener("mouseenter", () => {
      state.isGalleryPaused = true;
      stopGalleryAutoplay();
    });
    galleryWrap.addEventListener("mouseleave", () => {
      state.isGalleryPaused = false;
      startGalleryAutoplay();
    });

    window.addEventListener("keydown", (e) => {
      if (!state.activeProjectId) return;
      if (e.key === "Escape") closeProjectModal();
      else if (e.key === "ArrowLeft") stepModalImage(-1);
      else if (e.key === "ArrowRight") stepModalImage(1);
    });
  }

  /* --------------------------------------------------------------------------
     Scroll Reveal & Navbar Scroll-Spy
     -------------------------------------------------------------------------- */
  function initObservers() {
    const revealEls = document.querySelectorAll(".reveal");
    if ("IntersectionObserver" in window) {
      const revealObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("is-visible");
              revealObserver.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.08, rootMargin: "0px 0px -30px 0px" }
      );
      revealEls.forEach((el) => revealObserver.observe(el));

      const sections = document.querySelectorAll("main section[id]");
      const navObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const activeId = entry.target.id;
              document.querySelectorAll(".nav-link").forEach((link) => {
                link.classList.toggle("active", link.dataset.section === activeId);
              });
            }
          });
        },
        { rootMargin: "-35% 0px -55% 0px" }
      );
      sections.forEach((sec) => navObserver.observe(sec));
    } else {
      revealEls.forEach((el) => el.classList.add("is-visible"));
    }
  }

  /* --------------------------------------------------------------------------
     Bootstrap
     -------------------------------------------------------------------------- */
  renderAll();
  initEventListeners();
  initObservers();
  startHeroAutoplay();
})();
