/* ==========================================================================
   BASECASE — CLOUDINARY MEDIA CONFIGURATION ENGINE (DIRECT CDN URLS)
   Configures direct Cloudinary CDN media URLs for 100% guaranteed delivery.
   ========================================================================== */

const CLOUDINARY_CONFIG = {
  cloudName: 'c11lmgbm',

  // Verified Direct Cloudinary CDN Video URLs (8 Unique Videos)
  videos: {
    tvs: 'https://res.cloudinary.com/c11lmgbm/video/upload/q_auto,f_auto/TVS.mp4.mp4',
    a2496: 'https://res.cloudinary.com/c11lmgbm/video/upload/q_auto,f_auto/A2496.MP4.mp4',
    a2594: 'https://res.cloudinary.com/c11lmgbm/video/upload/q_auto,f_auto/A2594.MP4.mp4',
    a2629: 'https://res.cloudinary.com/c11lmgbm/video/upload/q_auto,f_auto/A2629.MP4.mp4',
    c0522: 'https://res.cloudinary.com/c11lmgbm/video/upload/q_auto,f_auto/C0522.MP4.mp4',
    c5082: 'https://res.cloudinary.com/c11lmgbm/video/upload/q_auto,f_auto/C5082.MP4.mp4',
    c5086: 'https://res.cloudinary.com/c11lmgbm/video/upload/q_auto,f_auto/C5086.MP4.mp4',
    a2423: 'https://res.cloudinary.com/c11lmgbm/video/upload/q_auto,f_auto/A2423.MP4.mp4'
  },

  // Verified Direct Cloudinary CDN Photo & Profile URLs
  photos: {
    heroLens: 'https://res.cloudinary.com/c11lmgbm/image/upload/q_auto,f_auto/WhatsApp%20Image%202026-09-03%20at%2010.02.48%20AM.jpeg.jpg',
    adhityaProfile1: 'https://res.cloudinary.com/c11lmgbm/image/upload/q_auto,f_auto/Adhitya.jpeg.jpg',
    adhityaProfile2: 'https://res.cloudinary.com/c11lmgbm/image/upload/q_auto,f_auto/Adhitya%20%282%29.jpeg.jpg',
    kushalProfile1: 'https://res.cloudinary.com/c11lmgbm/image/upload/q_auto,f_auto/Kushal.jpeg.jpg',
    kushalProfile2: 'https://res.cloudinary.com/c11lmgbm/image/upload/q_auto,f_auto/Kushal1.jpeg.jpg',
    photo01: 'https://res.cloudinary.com/c11lmgbm/image/upload/q_auto,f_auto/WhatsApp%20Image%202026-09-03%20at%2010.02.48%20AM%20%281%29.jpeg.jpg',
    photo02: 'https://res.cloudinary.com/c11lmgbm/image/upload/q_auto,f_auto/WhatsApp%20Image%202026-09-03%20at%2010.02.49%20AM.jpeg.jpg',
    photo03: 'https://res.cloudinary.com/c11lmgbm/image/upload/q_auto,f_auto/WhatsApp%20Image%202026-09-03%20at%2010.02.49%20AM%20%281%29.jpeg.jpg',
    photo04: 'https://res.cloudinary.com/c11lmgbm/image/upload/q_auto,f_auto/WhatsApp%20Image%202026-09-03%20at%2010.03.12%20AM.jpeg.jpg',
    photo05: 'https://res.cloudinary.com/c11lmgbm/image/upload/q_auto,f_auto/WhatsApp%20Image%202026-09-03%20at%2010.03.12%20AM%20%281%29.jpeg.jpg',
    photo06: 'https://res.cloudinary.com/c11lmgbm/image/upload/q_auto,f_auto/WhatsApp%20Image%202026-09-03%20at%2010.22.00%20AM.jpeg.jpg',
    photo07: 'https://res.cloudinary.com/c11lmgbm/image/upload/q_auto,f_auto/WhatsApp%20Image%202026-09-03%20at%2010.22.00%20AM%20%281%29.jpeg.jpg',
    photo08: 'https://res.cloudinary.com/c11lmgbm/image/upload/q_auto,f_auto/WhatsApp%20Image%202026-09-03%20at%2010.31.11%20AM.jpeg.jpg',
    logo: 'https://res.cloudinary.com/c11lmgbm/image/upload/q_auto,f_auto/Basecase.png.png'
  }
};

/**
 * Returns the full Cloudinary CDN URL for a given video key
 * @param {string} videoKey 
 * @returns {string} Cloudinary CDN URL
 */
function getCloudinaryVideoUrl(videoKey) {
  return CLOUDINARY_CONFIG.videos[videoKey] || '';
}

/**
 * Returns the full Cloudinary CDN URL for a given photo key
 * @param {string} photoKey 
 * @returns {string} Cloudinary CDN URL
 */
function getCloudinaryPhotoUrl(photoKey) {
  return CLOUDINARY_CONFIG.photos[photoKey] || '';
}
