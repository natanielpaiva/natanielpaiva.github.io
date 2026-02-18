# Contract: YouTube IFrame Player API

**API**: YouTube IFrame Player API  
**Version**: v3  
**Documentation**: https://developers.google.com/youtube/iframe_api_reference

## Overview

The YouTube IFrame Player API lets you embed a YouTube video player on your website and control the player using JavaScript. No API key required for basic embedding.

## Loading the API

### Method 1: Load API script

```html
<script src="https://www.youtube.com/iframe_api"></script>
```

### Method 2: Programmatic loading (recommended)

```javascript
// Load YouTube IFrame API
function loadYouTubeAPI() {
  const tag = document.createElement('script');
  tag.src = "https://www.youtube.com/iframe_api";
  const firstScriptTag = document.getElementsByTagName('script')[0];
  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
}

// API ready callback (must be global)
window.onYouTubeIframeAPIReady = function() {
  console.log('YouTube IFrame API ready');
  initializePlayers();
};
```

## Player Creation

### Basic Embed (HTML only)

```html
<iframe 
  width="560" 
  height="315" 
  src="https://www.youtube.com/embed/VIDEO_ID" 
  frameborder="0" 
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
  allowfullscreen>
</iframe>
```

### Player with JavaScript API

```javascript
let player;

function onYouTubeIframeAPIReady() {
  player = new YT.Player('player-container', {
    height: '390',
    width: '640',
    videoId: 'VIDEO_ID',
    playerVars: {
      'playsinline': 1,      // iOS inline playback
      'modestbranding': 1,   // Minimal YouTube branding
      'rel': 0,              // Don't show related videos from other channels
      'fs': 1,               // Show fullscreen button
      'cc_load_policy': 0,   // Don't show captions by default
      'iv_load_policy': 3,   // Don't show video annotations
      'autohide': 1          // Auto-hide controls
    },
    events: {
      'onReady': onPlayerReady,
      'onStateChange': onPlayerStateChange,
      'onError': onPlayerError
    }
  });
}

function onPlayerReady(event) {
  console.log('Player ready');
  // event.target.playVideo(); // Auto-play (use with caution)
}

function onPlayerStateChange(event) {
  // YT.PlayerState.UNSTARTED: -1
  // YT.PlayerState.ENDED: 0
  // YT.PlayerState.PLAYING: 1
  // YT.PlayerState.PAUSED: 2
  // YT.PlayerState.BUFFERING: 3
  // YT.PlayerState.CUED: 5
  
  if (event.data === YT.PlayerState.PLAYING) {
    console.log('Video playing');
    
    // Track analytics
    if (window.gtag) {
      gtag('event', 'video_play', {
        event_category: 'youtube',
        event_label: player.getVideoData().title
      });
    }
  }
}

function onPlayerError(event) {
  // 2: Invalid video ID
  // 5: HTML5 player error
  // 100: Video not found or private
  // 101, 150: Video not embeddable
  
  console.error('Player error:', event.data);
}
```

## Player Parameters

Key player parameters for `playerVars`:

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `autoplay` | 0 or 1 | 0 | Auto-play video on load |
| `cc_load_policy` | 0 or 1 | 0 | Show closed captions by default |
| `color` | 'red' or 'white' | 'red' | Player controls color |
| `controls` | 0, 1, or 2 | 1 | Show player controls |
| `disablekb` | 0 or 1 | 0 | Disable keyboard controls |
| `enablejsapi` | 0 or 1 | 0 | Enable JavaScript API |
| `fs` | 0 or 1 | 1 | Show fullscreen button |
| `hl` | string | en | Interface language (e.g., 'pt') |
| `iv_load_policy` | 1 or 3 | 1 | Show video annotations (3 = hide) |
| `modestbranding` | 0 or 1 | 0 | Minimal YouTube branding |
| `playsinline` | 0 or 1 | 0 | iOS inline playback |
| `rel` | 0 or 1 | 1 | Show related videos (0 = same channel only) |
| `start` | number | 0 | Start time in seconds |
| `end` | number | - | End time in seconds |

## Player Methods

### Playback Control

```javascript
// Play video
player.playVideo();

// Pause video
player.pauseVideo();

// Stop video (returns to start)
player.stopVideo();

// Seek to time (seconds)
player.seekTo(90, true); // true = allow seek ahead

// Get current time
const currentTime = player.getCurrentTime();

// Get duration
const duration = player.getDuration();
```

### Volume Control

```javascript
// Mute
player.mute();

// Unmute
player.unMute();

// Check if muted
const isMuted = player.isMuted();

// Set volume (0-100)
player.setVolume(50);

// Get volume
const volume = player.getVolume();
```

### Playback Rate

```javascript
// Set speed (0.25, 0.5, 1, 1.25, 1.5, 2)
player.setPlaybackRate(1.5);

// Get current speed
const rate = player.getPlaybackRate();

// Get available speeds
const rates = player.getAvailablePlaybackRates();
```

### Video Information

```javascript
// Get video data
const videoData = player.getVideoData();
/*
{
  video_id: "VIDEO_ID",
  title: "Video Title",
  author: "Channel Name"
}
*/

// Get video URL
const url = player.getVideoUrl(); // Returns watch URL

// Get embed code
const embedCode = player.getVideoEmbedCode();
```

### Player State

```javascript
// Get player state
const state = player.getPlayerState();
// -1: unstarted, 0: ended, 1: playing, 2: paused, 3: buffering, 5: cued

// Get playback quality
const quality = player.getPlaybackQuality();
// 'small', 'medium', 'large', 'hd720', 'hd1080', 'highres'

// Set playback quality
player.setPlaybackQuality('hd720');
```

## Multiple Players Example

```javascript
const players = [];
const videoIds = ['VIDEO_ID_1', 'VIDEO_ID_2', 'VIDEO_ID_3'];

function onYouTubeIframeAPIReady() {
  videoIds.forEach((videoId, index) => {
    const containerId = `player-${index}`;
    
    players[index] = new YT.Player(containerId, {
      height: '315',
      width: '560',
      videoId: videoId,
      playerVars: {
        'modestbranding': 1,
        'rel': 0,
        'playsinline': 1
      },
      events: {
        'onStateChange': (event) => onPlayerStateChange(event, index)
      }
    });
  });
}

function onPlayerStateChange(event, playerIndex) {
  if (event.data === YT.PlayerState.PLAYING) {
    // Pause other players when one starts playing
    players.forEach((player, index) => {
      if (index !== playerIndex && player.getPlayerState() === YT.PlayerState.PLAYING) {
        player.pauseVideo();
      }
    });
  }
}
```

## Lazy Loading YouTube Embeds

For better performance, lazy load YouTube embeds:

```html
<!-- Placeholder with thumbnail -->
<div class="youtube-embed" data-video-id="VIDEO_ID">
  <img 
    src="https://img.youtube.com/vi/VIDEO_ID/maxresdefault.jpg" 
    alt="Video thumbnail"
    loading="lazy"
  >
  <button class="play-button" aria-label="Play video">
    <svg><!-- Play icon --></svg>
  </button>
</div>

<style>
.youtube-embed {
  position: relative;
  padding-bottom: 56.25%; /* 16:9 aspect ratio */
  cursor: pointer;
}

.youtube-embed img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.play-button {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: rgba(0, 0, 0, 0.7);
  border: none;
  border-radius: 50%;
  width: 68px;
  height: 48px;
  cursor: pointer;
  transition: background 0.3s;
}

.play-button:hover {
  background: rgba(255, 0, 0, 0.9);
}

.youtube-embed iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
</style>

<script>
document.querySelectorAll('.youtube-embed').forEach(container => {
  container.addEventListener('click', function() {
    const videoId = this.dataset.videoId;
    const iframe = document.createElement('iframe');
    
    iframe.setAttribute('src', `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`);
    iframe.setAttribute('frameborder', '0');
    iframe.setAttribute('allow', 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture');
    iframe.setAttribute('allowfullscreen', '');
    
    // Replace thumbnail with iframe
    this.innerHTML = '';
    this.appendChild(iframe);
  });
});
</script>
```

## Thumbnail URLs

YouTube provides multiple thumbnail sizes:

```javascript
function getYouTubeThumbnail(videoId, quality = 'maxresdefault') {
  // Available qualities:
  // - default: 120x90
  // - mqdefault: 320x180
  // - hqdefault: 480x360
  // - sddefault: 640x480
  // - maxresdefault: 1280x720 (not always available)
  
  return `https://img.youtube.com/vi/${videoId}/${quality}.jpg`;
}

// Fallback if maxresdefault doesn't exist
async function getThumbnailWithFallback(videoId) {
  const maxRes = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
  
  try {
    const response = await fetch(maxRes, { method: 'HEAD' });
    if (response.ok) {
      return maxRes;
    }
  } catch (e) {}
  
  // Fallback to hqdefault
  return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
}
```

## Error Handling

```javascript
function onPlayerError(event) {
  let errorMessage;
  
  switch (event.data) {
    case 2:
      errorMessage = 'Invalid video ID';
      break;
    case 5:
      errorMessage = 'HTML5 player error';
      break;
    case 100:
      errorMessage = 'Video not found or is private';
      break;
    case 101:
    case 150:
      errorMessage = 'Video cannot be embedded';
      break;
    default:
      errorMessage = 'Unknown error';
  }
  
  console.error(`YouTube Player Error: ${errorMessage}`);
  
  // Show fallback UI
  const container = event.target.getIframe().parentElement;
  container.innerHTML = `
    <div class="video-error">
      <p>⚠️ ${errorMessage}</p>
      <a href="https://youtube.com/watch?v=${event.target.getVideoData().video_id}" target="_blank">
        Watch on YouTube
      </a>
    </div>
  `;
}
```

## Analytics Integration

Track video engagement:

```javascript
function onPlayerStateChange(event) {
  const videoData = event.target.getVideoData();
  
  switch (event.data) {
    case YT.PlayerState.PLAYING:
      // Track video play
      if (window.gtag) {
        gtag('event', 'video_start', {
          event_category: 'video',
          event_label: videoData.title,
          video_id: videoData.video_id
        });
      }
      break;
      
    case YT.PlayerState.ENDED:
      // Track video completion
      if (window.gtag) {
        gtag('event', 'video_complete', {
          event_category: 'video',
          event_label: videoData.title,
          video_id: videoData.video_id
        });
      }
      break;
      
    case YT.PlayerState.PAUSED:
      // Track video pause (optional)
      const currentTime = event.target.getCurrentTime();
      const duration = event.target.getDuration();
      const progress = Math.round((currentTime / duration) * 100);
      
      if (window.gtag) {
        gtag('event', 'video_pause', {
          event_category: 'video',
          event_label: videoData.title,
          video_id: videoData.video_id,
          progress: progress
        });
      }
      break;
  }
}
```

## Implementation for Site

### Recommended approach for personal site:

1. **Static embeds** with lazy loading (Phase 1 - MVP)
   - Simple, fast, no JavaScript complexity
   - Good performance with lazy loading
   - Manual video list update

2. **IFrame API** for interactive features (Phase 2 - Enhancement)
   - Control playback
   - Track engagement
   - Better UX (auto-pause when scrolling away)

### Example Implementation:

```javascript
// youtube.js
class YouTubeManager {
  constructor(videoIds) {
    this.videoIds = videoIds;
    this.players = [];
    this.apiReady = false;
    
    this.loadAPI();
  }
  
  loadAPI() {
    if (window.YT) {
      this.onAPIReady();
      return;
    }
    
    window.onYouTubeIframeAPIReady = () => this.onAPIReady();
    
    const tag = document.createElement('script');
    tag.src = "https://www.youtube.com/iframe_api";
    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
  }
  
  onAPIReady() {
    this.apiReady = true;
    this.initPlayers();
  }
  
  initPlayers() {
    this.videoIds.forEach((videoId, index) => {
      const containerId = `youtube-player-${index}`;
      
      this.players[index] = new YT.Player(containerId, {
        videoId: videoId,
        playerVars: {
          'modestbranding': 1,
          'rel': 0,
          'playsinline': 1
        },
        events: {
          'onStateChange': (e) => this.onStateChange(e, index)
        }
      });
    });
  }
  
  onStateChange(event, playerIndex) {
    if (event.data === YT.PlayerState.PLAYING) {
      // Pause other videos
      this.players.forEach((player, index) => {
        if (index !== playerIndex) {
          player.pauseVideo();
        }
      });
      
      // Track analytics
      this.trackVideoPlay(event.target.getVideoData());
    }
  }
  
  trackVideoPlay(videoData) {
    if (window.gtag) {
      gtag('event', 'video_play', {
        event_category: 'youtube',
        event_label: videoData.title,
        video_id: videoData.video_id
      });
    }
  }
}

// Usage
const videoIds = ['VIDEO_ID_1', 'VIDEO_ID_2', 'VIDEO_ID_3'];
const youtubeManager = new YouTubeManager(videoIds);
```

## Testing Checklist

- [ ] Videos load correctly
- [ ] Thumbnails display with correct aspect ratio
- [ ] Play button works
- [ ] Videos are embeddable (no 101/150 errors)
- [ ] Lazy loading improves page load time
- [ ] Multiple videos don't conflict
- [ ] Analytics tracking works
- [ ] Mobile responsiveness
- [ ] iOS inline playback works

## Notes

- **No API key required** for embedding
- **Rate limits**: None for embedding (unlimited embeds)
- **YouTube Data API v3**: Different API, requires key, has quotas
- **Privacy**: Use `youtube-nocookie.com` domain for privacy-friendly embeds
- **Performance**: Lazy loading saves ~500KB per video

## References

- IFrame API: https://developers.google.com/youtube/iframe_api_reference
- Player Parameters: https://developers.google.com/youtube/player_parameters
- Privacy-Enhanced Mode: https://support.google.com/youtube/answer/171780

---

**Version**: 1.0  
**Last Updated**: 2026-02-18
