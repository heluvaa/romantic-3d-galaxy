// Generates placeholder photos (picsum.photos) arranged along a multi-armed
// spiral so they read as a "swirling galaxy" once rendered in 3D.
// Swap `url` for your own images later — see README for how.

function generateGalaxyPhotos(count = 220, arms = 3) {
  const photos = [];

  for (let i = 0; i < count; i++) {
    const t = i / count;
    const armOffset = (i % arms) * ((Math.PI * 2) / arms);
    const angle = t * Math.PI * 8 + armOffset;
    const radius = 6 + t * 14 + (Math.random() - 0.5) * 1.5;
    const height = (Math.random() - 0.5) * 3 * (1 - t * 0.4);

    const x = Math.cos(angle) * radius;
    const z = Math.sin(angle) * radius;
    const y = height;

    photos.push({
      id: i,
      position: [x, y, z],
      rotationY: angle + Math.PI / 2,
      url: `https://picsum.photos/seed/galaxy-${i}/300/300`,
    });
  }

  return photos;
}

// Tip: on lower-end devices, drop this to ~80-120 for smoother framerates.
export const GALAXY_PHOTOS = generateGalaxyPhotos(220);
