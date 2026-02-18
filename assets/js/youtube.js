/**
 * YouTube Integration
 * Handles YouTube video loading and playback
 */

// Load YouTube videos from data
function loadYouTubeVideos() {
  const youtubeGrid = document.getElementById('youtubeGrid');
  if (!youtubeGrid || typeof youtubeVideos === 'undefined') return;

  youtubeGrid.innerHTML = '';

  youtubeVideos.forEach(video => {
    const videoCard = createYouTubeCard(video);
    youtubeGrid.appendChild(videoCard);
  });
}

// Create YouTube video card
function createYouTubeCard(video) {
  const card = document.createElement('div');
  card.className = 'youtube-video';
  
  card.innerHTML = `
    <div class="youtube-thumbnail" data-video-id="${video.id}">
      <img src="${video.thumbnail}" alt="${sanitizeHTML(video.title)}" loading="lazy">
      <div class="youtube-play-btn">
        <i class="fab fa-youtube"></i>
      </div>
    </div>
    <div class="youtube-content">
      <h3 class="youtube-title">${sanitizeHTML(video.title)}</h3>
    </div>
  `;

  // Add click handler to thumbnail
  const thumbnail = card.querySelector('.youtube-thumbnail');
  thumbnail.addEventListener('click', () => {
    openYouTubeVideo(video.url);
  });

  return card;
}

// Open YouTube video in new tab
function openYouTubeVideo(url) {
  window.open(url, '_blank', 'noopener,noreferrer');
}

// Alternative: Embed YouTube video inline
function embedYouTubeVideo(videoId, container) {
  const iframe = document.createElement('iframe');
  iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
  iframe.width = '100%';
  iframe.height = '100%';
  iframe.frameBorder = '0';
  iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
  iframe.allowFullscreen = true;
  
  container.innerHTML = '';
  container.appendChild(iframe);
}

// Initialize YouTube section
function initYouTube() {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadYouTubeVideos);
  } else {
    loadYouTubeVideos();
  }
}

// Auto-initialize
initYouTube();
