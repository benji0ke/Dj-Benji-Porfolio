const heroBanner = document.querySelector('.hero-banner');
const heroImage = document.querySelector('.hero-banner__image');

if (heroBanner && heroImage) {
  let ticking = false;

  const updateHero = () => {
    const heroHeight = Math.max(heroBanner.offsetHeight, 1);
    const scrollY = window.scrollY || window.pageYOffset;

    // Fade and parallax are based on how far the user has scrolled relative to the hero height.
    const progress = Math.min(scrollY / heroHeight, 1);
    const opacity = 1 - progress;
    const offset = Math.min(scrollY * 0.16, 60);
    const scale = 1.05 - progress * 0.03;

    heroImage.style.opacity = Math.max(0, opacity).toString();
    heroImage.style.transform = `translate3d(0, ${-offset}px, 0) scale(${scale})`;
    ticking = false;
  };

  const onScroll = () => {
    if (!ticking) {
      window.requestAnimationFrame(updateHero);
      ticking = true;
    }
  };

  updateHero();
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll);
}

// Latest Uploads showcase
const uploadSamples = [
  {
    id: 'b0zarlhUq4g',
    title: 'Midnight City Rush',
    category: 'Club Bangers',
    date: '2026-08-03',
    views: '128K',
    description: 'A high-tempo club route packed with magnetic drops, early-morning energy, and deep bass pressure.',
    duration: '12:47',
    isNew: false,
    thumbnail: 'https://img.youtube.com/vi/b0zarlhUq4g/hqdefault.jpg'
  },
  {
    id: 'NNVThkEjCfc',
    title: 'Boda Boda Anthems',
    category: 'Gengetone',
    date: '2026-08-01',
    views: '74K',
    description: 'Quick-fire rhythms and playful crowd chants that keep the city dance floor bouncing through every transition.',
    duration: '10:02',
    isNew: false,
    thumbnail: 'https://img.youtube.com/vi/NNVThkEjCfc/hqdefault.jpg'
  },
  {
    id: 'N1Euv764hME',
    title: 'Amapiano Rooftop Session',
    category: 'Amapiano',
    date: '2026-07-29',
    views: '96K',
    description: 'A polished sunset set built around smooth log drums, velvet bass lines, and a rooftop-ready groove.',
    duration: '14:36',
    isNew: true,
    thumbnail: 'https://img.youtube.com/vi/N1Euv764hME/hqdefault.jpg'
  },
  {
    id: '-NmrZR3TGso',
    title: 'Classic Nairobi Drive',
    category: 'Old School',
    date: '2026-07-25',
    views: '53K',
    description: 'Dusty tape-era textures, familiar hooks, and a nostalgic spin that still lands at full volume.',
    duration: '09:11',
    isNew: false,
    thumbnail: 'https://img.youtube.com/vi/-NmrZR3TGso/hqdefault.jpg'
  },
  {
    id: 'QH2-TGUlwu4',
    title: 'Sunset Afro Pulse',
    category: 'Afro Mixes',
    date: '2026-07-22',
    views: '46K',
    description: 'Lush percussion and melodic hooks shape a warm, polished Afro-house blend with a stylish finish.',
    duration: '11:43',
    isNew: false,
    thumbnail: 'https://img.youtube.com/vi/QH2-TGUlwu4/hqdefault.jpg'
  },
  {
    id: 'dQw4w9WgXcQ',
    title: 'Weekend Heatwave',
    category: 'Club Bangers',
    date: '2026-07-17',
    views: '68K',
    description: 'A relentless club sequence balancing clean transitions with a strong, crowd-first build and release.',
    duration: '16:08',
    isNew: false,
    thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/hqdefault.jpg'
  },
  {
    id: 'aqz-KE-bpKQ',
    title: 'Old School Blend',
    category: 'Old School',
    date: '2026-07-10',
    views: '61K',
    description: 'A throwback listening session curated with punchy drums, familiar melodies, and careful phase control.',
    duration: '08:58',
    isNew: false,
    thumbnail: 'https://img.youtube.com/vi/aqz-KE-bpKQ/hqdefault.jpg'
  },
  {
    id: 'ysz5S6PUM-U',
    title: 'Kibera to the Main Stage',
    category: 'Gengetone',
    date: '2026-07-06',
    views: '44K',
    description: 'Street-driven flair and crisp groove pacing put a downloaded club sensibility on a local soundboard.',
    duration: '13:24',
    isNew: false,
    thumbnail: 'https://img.youtube.com/vi/ysz5S6PUM-U/hqdefault.jpg'
  },
  {
    id: 'ScMzIvxBSi4',
    title: 'House Floor Anthem',
    category: 'Club Bangers',
    date: '2026-06-28',
    views: '81K',
    description: 'This one is built for sustained energy, sharper transitions, and a fearless late-night crowd response.',
    duration: '12:16',
    isNew: false,
    thumbnail: 'https://img.youtube.com/vi/ScMzIvxBSi4/hqdefault.jpg'
  },
  {
    id: 'ysz5S6PUM-U',
    title: 'Mile High Mash',
    category: 'Amapiano',
    date: '2026-06-21',
    views: '39K',
    description: 'A smooth vertical lift through deep rhythm pockets, mellow vocal snippets, and warm dance-floor release.',
    duration: '10:31',
    isNew: false,
    thumbnail: 'https://img.youtube.com/vi/ysz5S6PUM-U/hqdefault.jpg'
  },
  {
    id: 'M7lc1UVf-VE',
    title: 'Nairobi After Dark',
    category: 'Afro Mixes',
    date: '2026-06-16',
    views: '57K',
    description: 'Late-night atmosphere and polished transitions take the set into a cinematic but still playful edge.',
    duration: '15:09',
    isNew: false,
    thumbnail: 'https://img.youtube.com/vi/M7lc1UVf-VE/hqdefault.jpg'
  },
  {
    id: 'fJ9rUzIMcZQ',
    title: 'Soulful Friday',
    category: 'Old School',
    date: '2026-06-12',
    views: '52K',
    description: 'A mellow, deeply textured selection that charms the room while keeping the pulse alive all the way through.',
    duration: '09:44',
    isNew: false,
    thumbnail: 'https://img.youtube.com/vi/fJ9rUzIMcZQ/hqdefault.jpg'
  },
  {
    id: '5qap5aO4i9A',
    title: 'Tropical House Bites',
    category: 'Afro Mixes',
    date: '2026-06-08',
    views: '34K',
    description: 'Sun-drenched rhythm and subtle vocal layering bring a softer edge to the night without losing momentum.',
    duration: '07:36',
    isNew: false,
    thumbnail: 'https://img.youtube.com/vi/5qap5aO4i9A/hqdefault.jpg'
  },
  {
    id: 'M7lc1UVf-VE',
    title: 'Sauti Ya Mtaa',
    category: 'Gengetone',
    date: '2026-06-02',
    views: '41K',
    description: 'A sharp local groove shaped by strong vocal energy, crisp percussion, and a fast-moving club pulse.',
    duration: '11:27',
    isNew: false,
    thumbnail: 'https://img.youtube.com/vi/M7lc1UVf-VE/hqdefault.jpg'
  },
  {
    id: 'aqz-KE-bpKQ',
    title: 'Golden Era Grooves',
    category: 'Old School',
    date: '2026-05-30',
    views: '66K',
    description: 'A polished revival set that leans into layered vocals, familiar textures, and smooth DJ timing.',
    duration: '13:50',
    isNew: false,
    thumbnail: 'https://img.youtube.com/vi/aqz-KE-bpKQ/hqdefault.jpg'
  },
  {
    id: 'ScMzIvxBSi4',
    title: 'Mombasa Nights',
    category: 'Club Bangers',
    date: '2026-05-24',
    views: '72K',
    description: 'Coastal energy meets a smart club structure by mixing bright percussion with a firm late-night headliner feel.',
    duration: '14:53',
    isNew: false,
    thumbnail: 'https://img.youtube.com/vi/ScMzIvxBSi4/hqdefault.jpg'
  }
];

const uploadsSection = document.querySelector('.latest-uploads-section');

if (uploadsSection) {
  const uploadsGrid = uploadsSection.querySelector('#uploadsGrid');
  const searchInput = uploadsSection.querySelector('#uploadsSearch');
  const filters = [...uploadsSection.querySelectorAll('.upload-filter-btn')];
  const loadMoreBtn = uploadsSection.querySelector('#loadMoreBtn');
  const modal = uploadsSection.querySelector('#videoModal');
  const modalFrame = uploadsSection.querySelector('#modalIframe');
  const closeModalBtn = uploadsSection.querySelector('#closeModalBtn');

  const state = {
    allVideos: [],
    filter: 'All',
    query: '',
    visibleCount: 8,
    loading: true
  };

  const formatDate = (date) => new Date(date).toLocaleDateString('en', { month: 'short', day: 'numeric', year: 'numeric' });

  const renderSkeletons = (count = 8) => {
    uploadsGrid.innerHTML = Array.from({ length: count }, () => `
      <article class="upload-card" aria-hidden="true">
        <div class="upload-skeleton upload-skeleton-thumb"></div>
        <div class="upload-skeleton-line medium"></div>
        <div class="upload-skeleton-line"></div>
        <div class="upload-skeleton-line short"></div>
      </article>
    `).join('');
  };

  const getVisibleVideos = () => {
    const filtered = state.allVideos.filter((video) => {
      const matchesCategory = state.filter === 'All' || video.category === state.filter;
      const searchText = `${video.title} ${video.description}`.toLowerCase();
      const matchesQuery = searchText.includes(state.query.toLowerCase());
      return matchesCategory && matchesQuery;
    });

    return filtered.slice(0, state.visibleCount);
  };

  const renderCards = () => {
    const visibleVideos = getVisibleVideos();

    if (!visibleVideos.length) {
      uploadsGrid.innerHTML = `
        <div class="upload-empty-state">
          <p>No uploads match your current search. Try another title or category.</p>
        </div>
      `;
      loadMoreBtn.hidden = true;
      return;
    }

    uploadsGrid.innerHTML = visibleVideos.map((video, index) => `
      <article class="upload-card" tabindex="0" role="button" data-video-id="${video.id}" aria-label="Open video ${video.title}" data-index="${index}">
        <div class="upload-thumb">
          ${video.isNew ? '<span class="upload-badge">NEW</span>' : ''}
          <span class="upload-duration">${video.duration}</span>
          <img src="${video.thumbnail}" alt="${video.title}" loading="lazy" onerror="this.onerror=null;this.src='https://placehold.co/640x360/0a0e16/ffd54a?text=DJ+BENJI';">
          <span class="upload-play" aria-hidden="true"><span>▶</span></span>
        </div>
        <h3>${video.title}</h3>
        <div class="upload-meta">
          <span>${formatDate(video.date)}</span>
          <span>${video.views} views</span>
        </div>
        <p class="upload-description">${video.description.slice(0, 100)}${video.description.length > 100 ? '…' : ''}</p>
        <button type="button" class="btn btn-secondary upload-button" aria-label="Watch ${video.title}">Watch Now</button>
      </article>
    `).join('');

    const totalFiltered = state.allVideos.filter((video) => {
      const matchesCategory = state.filter === 'All' || video.category === state.filter;
      const searchText = `${video.title} ${video.description}`.toLowerCase();
      const matchesQuery = searchText.includes(state.query.toLowerCase());
      return matchesCategory && matchesQuery;
    }).length;

    loadMoreBtn.hidden = totalFiltered <= state.visibleCount;
    loadMoreBtn.disabled = totalFiltered <= state.visibleCount;
  };

  const debounce = (callback, delay = 120) => {
    let handle;
    return (...args) => {
      window.clearTimeout(handle);
      handle = window.setTimeout(() => callback(...args), delay);
    };
  };

  const handleSearch = debounce((event) => {
    state.query = event.target.value.trim();
    state.visibleCount = 8;
    renderCards();
  });

  const handleFilter = (button) => {
    state.filter = button.dataset.category;
    state.visibleCount = 8;
    filters.forEach((target) => {
      const isActive = target === button;
      target.classList.toggle('is-active', isActive);
      target.setAttribute('aria-pressed', String(isActive));
    });
    renderCards();
  };

  const openModal = (videoId) => {
    modal.hidden = false;
    modalFrame.src = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
    document.body.classList.add('modal-open');
  };

  const closeModal = () => {
    modal.hidden = true;
    modalFrame.src = '';
    document.body.classList.remove('modal-open');
  };

  const loadVideos = () => new Promise((resolve) => {
    window.setTimeout(() => resolve(uploadSamples), 500);
  });

  const init = async () => {
    renderSkeletons(8);
    try {
      state.allVideos = await loadVideos();
      state.loading = false;
      renderCards();
    } catch (error) {
      uploadsGrid.innerHTML = `
        <div class="upload-empty-state">
          <p>We couldn’t load the latest uploads right now. Please try again shortly.</p>
        </div>
      `;
      loadMoreBtn.hidden = true;
    }
  };

  searchInput.addEventListener('input', handleSearch);
  filters.forEach((button) => button.addEventListener('click', () => handleFilter(button)));

  loadMoreBtn.addEventListener('click', () => {
    const filtered = state.allVideos.filter((video) => {
      const matchesCategory = state.filter === 'All' || video.category === state.filter;
      const searchText = `${video.title} ${video.description}`.toLowerCase();
      const matchesQuery = searchText.includes(state.query.toLowerCase());
      return matchesCategory && matchesQuery;
    });

    state.visibleCount = Math.min(state.visibleCount + 8, filtered.length);
    renderCards();
  });

  uploadsGrid.addEventListener('click', (event) => {
    const card = event.target.closest('.upload-card');
    if (!card) return;
    const videoId = card.dataset.videoId;
    if (videoId) {
      openModal(videoId);
    }
  });

  uploadsGrid.addEventListener('keydown', (event) => {
    if (event.key !== 'Enter' && event.key !== ' ') return;
    const card = event.target.closest('.upload-card');
    if (!card) return;
    event.preventDefault();
    openModal(card.dataset.videoId);
  });

  closeModalBtn.addEventListener('click', closeModal);
  modal.addEventListener('click', (event) => {
    if (event.target.dataset.closeModal === 'true') {
      closeModal();
    }
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && !modal.hidden) {
      closeModal();
    }
  });

  init();
}
