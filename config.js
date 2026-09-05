/* ==========================================================================
   BASECASE — CLOUDINARY MEDIA CONFIGURATION ENGINE (VIDEOS & PHOTOS)
   Configures Cloudinary CDN media URLs for global fast streaming & auto-format.
   ========================================================================== */

const CLOUDINARY_CONFIG = {
  // Your active Cloudinary Cloud Name
  cloudName: 'c11lmgbm',
  
  // High-performance Cloudinary transformations
  videoTransformation: 'q_auto,f_auto',
  imageTransformation: 'q_auto,f_auto',

  // The 8 unique BaseCase video assets
  videos: {
    tvs: 'TVS.mp4',
    a2496: 'A2496.MP4',
    a2594: 'A2594.MP4',
    a2629: 'A2629.MP4',
    c0522: 'C0522.MP4',
    c5082: 'C5082.MP4',
    c5086: 'C5086.MP4',
    a2423: 'A2423.MP4'
  },

  // All 11 BaseCase photography assets & profile images
  photos: {
    heroLens: 'WhatsApp Image 2026-09-03 at 10.02.48 AM.jpeg',
    adhityaProfile1: 'Adhitya.jpeg',
    adhityaProfile2: 'Adhitya (2).jpeg',
    kushalProfile1: 'Kushal.jpeg',
    kushalProfile2: 'Kushal1.jpeg',
    photo01: 'WhatsApp Image 2026-09-03 at 10.02.48 AM (1).jpeg',
    photo02: 'WhatsApp Image 2026-09-03 at 10.02.49 AM.jpeg',
    photo03: 'WhatsApp Image 2026-09-03 at 10.02.49 AM (1).jpeg',
    photo04: 'WhatsApp Image 2026-09-03 at 10.03.12 AM.jpeg',
    photo05: 'WhatsApp Image 2026-09-03 at 10.03.12 AM (1).jpeg',
    photo06: 'WhatsApp Image 2026-09-03 at 10.22.00 AM.jpeg',
    photo07: 'WhatsApp Image 2026-09-03 at 10.22.00 AM (1).jpeg',
    photo08: 'WhatsApp Image 2026-09-03 at 10.31.11 AM.jpeg',
    logo: 'Basecase.png'
  }
};

/**
 * Returns the full Cloudinary CDN URL for a given video key
 * @param {string} videoKey 
 * @returns {string} Cloudinary CDN URL or local fallback
 */
function getCloudinaryVideoUrl(videoKey) {
  const publicId = CLOUDINARY_CONFIG.videos[videoKey];
  if (!publicId) return '';
  
  if (CLOUDINARY_CONFIG.cloudName && CLOUDINARY_CONFIG.cloudName !== 'your_cloud_name_here') {
    return `https://res.cloudinary.com/${CLOUDINARY_CONFIG.cloudName}/video/upload/${CLOUDINARY_CONFIG.videoTransformation}/${encodeURIComponent(publicId)}`;
  }
  
  // Fallback to local files if cloudName is not configured yet
  return `Videography by Kushal/${publicId}`;
}

/**
 * Returns the full Cloudinary CDN URL for a given photo key
 * @param {string} photoKey 
 * @returns {string} Cloudinary CDN URL or local fallback
 */
function getCloudinaryPhotoUrl(photoKey) {
  const publicId = CLOUDINARY_CONFIG.photos[photoKey];
  if (!publicId) return '';
  
  if (CLOUDINARY_CONFIG.cloudName && CLOUDINARY_CONFIG.cloudName !== 'your_cloud_name_here') {
    return `https://res.cloudinary.com/${CLOUDINARY_CONFIG.cloudName}/image/upload/${CLOUDINARY_CONFIG.imageTransformation}/${encodeURIComponent(publicId)}`;
  }
  
  // Fallback to local files if cloudName is not configured yet
  if (photoKey.startsWith('kushal')) {
    return `Videography by Kushal/${publicId}`;
  }
  if (photoKey === 'logo') {
    return `Basecase.png`;
  }
  return `photography by Adhitya/${publicId}`;
}
