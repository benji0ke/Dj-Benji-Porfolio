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
const YOUTUBE_API_KEY = 'AIzaSyDTzmqlvwrIEZ3ahg9NF8mggCAeIWAmfPs';
const YOUTUBE_CHANNEL_HANDLE = '@Airwave254';

const FALLBACK_UPLOADS = [
  {
    id: 'b0zarlhUq4g',
    title: 'Kenyan OldSchool',
    category: 'Old School',
    date: '2026-08-03',
    views: '128K',
    description: 'A polished throwback mix with strong club pacing and a smooth old-school Nairobi feel.',
    duration: '12:47',
    isNew: true,
    thumbnail: 'https://img.youtube.com/vi/b0zarlhUq4g/hqdefault.jpg'
  },
  {
    id: 'NNVThkEjCfc',
    title: 'UGANDAN MIX',
    category: 'Afro Mixes',
    date: '2026-08-01',
    views: '74K',
    description: 'A crisp regional blend built around melodic continuity and a steady late-night groove.',
    duration: '10:02',
    isNew: false,
    thumbnail: 'https://img.youtube.com/vi/NNVThkEjCfc/hqdefault.jpg'
  },
  {
    id: 'N1Euv764hME',
    title: 'Strictly Kenyan',
    category: 'Club Bangers',
    date: '2026-07-29',
    views: '96K',
    description: 'A street-ready Kenyan shuffle with clean transitions, crowd-friendly energy, and a bold finish.',
    duration: '14:36',
    isNew: false,
    thumbnail: 'https://img.youtube.com/vi/N1Euv764hME/hqdefault.jpg'
  },
  {
    id: '-NmrZR3TGso',
    title: 'Afro-house blend',
    category: 'Amapiano',
    date: '2026-07-25',
    views: '53K',
    description: 'Warm chords, precise beat placement, and a smooth listening structure for the evening crowd.',
    duration: '09:11',
    isNew: false,
    thumbnail: 'https://img.youtube.com/vi/-NmrZR3TGso/hqdefault.jpg'
  }
];
const EMBED_WHITELIST = new Set(['b0zarlhUq4g', 'NNVThkEjCfc', 'N1Euv764hME', '-NmrZR3TGso']);

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
  const formatDuration = (duration) => {
    const match = duration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/i);
    if (!match) return '0:00';

    const hours = Number(match[1] || 0);
    const mins = Number(match[2] || 0);
    const secs = Number(match[3] || 0);

    if (hours > 0) {
      return `${hours}:${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    }

    return `${mins}:${String(secs).padStart(2, '0')}`;
  };

  const formatCount = (value) => {
    if (!Number.isFinite(Number(value))) return value || '0';
    return new Intl.NumberFormat('en', { notation: 'compact', maximumFractionDigits: 1 }).format(Number(value));
  };

  const toUploadModel = (item) => ({
    id: item.id,
    title: item.title,
    category: item.category || 'All',
    date: item.date,
    views: item.views || '0',
    description: item.description || 'No description available for this upload yet.',
    duration: item.duration || '0:00',
    isNew: item.isNew || false,
    thumbnail: item.thumbnail || 'https://placehold.co/640x360/0a0e16/ffd54a?text=DJ+BENJI'
  });

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
    if (!EMBED_WHITELIST.has(videoId)) {
      window.open(`https://www.youtube.com/watch?v=${videoId}`, '_blank', 'noopener,noreferrer');
      return;
    }

    modal.hidden = false;
    modalFrame.src = `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`;
    document.body.classList.add('modal-open');
  };

  const closeModal = () => {
    modal.hidden = true;
    modalFrame.src = '';
    document.body.classList.remove('modal-open');
  };

  const loadVideos = async () => {
    try {
      const channelLookup = await fetch(`https://www.googleapis.com/youtube/v3/channels?part=id,snippet&forHandle=${encodeURIComponent(YOUTUBE_CHANNEL_HANDLE)}&key=${YOUTUBE_API_KEY}`);
      const channelData = await channelLookup.json();

      if (!channelData.items || !channelData.items.length) {
        throw new Error('No channel found for the provided handle.');
      }

      const channelId = channelData.items[0].id;
      const searchUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${channelId}&maxResults=20&order=date&type=video&videoEmbeddable=true&key=${YOUTUBE_API_KEY}`;
      const searchResponse = await fetch(searchUrl);
      const searchData = await searchResponse.json();

      if (!searchData.items || !searchData.items.length) {
        return FALLBACK_UPLOADS;
      }

      const ids = searchData.items.map((item) => item.id.videoId).filter(Boolean).join(',');
      const videoLookup = await fetch(`https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics,contentDetails&id=${encodeURIComponent(ids)}&key=${YOUTUBE_API_KEY}`);
      const videoData = await videoLookup.json();

      return (videoData.items || []).map((item) => ({
        id: item.id,
        title: item.snippet?.title || 'Untitled upload',
        category: 'All',
        date: item.snippet?.publishedAt || new Date().toISOString(),
        views: formatCount(item.statistics?.viewCount),
        description: item.snippet?.description || 'No description available for this upload yet.',
        duration: formatDuration(item.contentDetails?.duration || 'PT0S'),
        isNew: true,
        thumbnail: item.snippet?.thumbnails?.high?.url || item.snippet?.thumbnails?.medium?.url || 'https://placehold.co/640x360/0a0e16/ffd54a?text=DJ+BENJI'
      }));
    } catch (error) {
      return FALLBACK_UPLOADS;
    }
  };

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
