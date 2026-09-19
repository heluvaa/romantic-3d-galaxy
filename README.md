# Romantic 3D Photo Galaxy

Next.js + Tailwind + Three.js (`@react-three/fiber`, `@react-three/drei`,
`@react-three/postprocessing`) experience: a glowing ringed planet that,
when touched, bursts open into a slowly rotating spiral galaxy of floating
photos you can orbit around and click into.

## 1. Create the project and drop in these files

```bash
npx create-next-app@latest romantic-3d-galaxy --js --tailwind --eslint --app --src-dir=false --import-alias "@/*"
cd romantic-3d-galaxy
```

When the prompt finishes, replace/add the files from this package into the
matching paths (`app/`, `components/`, `lib/`, `tailwind.config.js`,
`postcss.config.js`, `next.config.mjs`) — or just copy this whole folder's
contents over a fresh `create-next-app` output.

## 2. Install the 3D + animation dependencies

```bash
npm install three @react-three/fiber @react-three/drei @react-three/postprocessing postprocessing @react-spring/three framer-motion zustand
```

(`package.json` in this project already lists exact versions if you'd
rather just run `npm install`.)

## 3. Run it

```bash
npm run dev
```

Open `http://localhost:3000`.

## How the flow works

- **`lib/store.js`** — a tiny Zustand store holding `stage`
  (`'intro' | 'transition' | 'galaxy'`) and `selectedPhoto`. Every
  component reads/writes this instead of passing props down through the
  Canvas tree.
- **`components/IntroPlanet.js`** — the Saturn-like planet. On click it
  flips `stage` to `'transition'`, springs its scale up (a "burst"), then
  after ~1.1s flips to `'galaxy'` and fades itself out.
- **`components/PhotoGalaxy.js`** + **`components/Photo.js`** — ~220
  placeholder photos (from `lib/photos.js`, using `picsum.photos`)
  positioned along a 3-armed spiral, wrapped in a group that rotates
  forever via `useFrame`. Each photo scales up on hover and dims when a
  *different* photo is selected.
- **`components/CameraRig.js`** — lives inside the `<Canvas>` and lerps
  the camera position/target every frame toward wherever the current
  `stage`/`selectedPhoto` say it should be: intro framing → push-in during
  transition → wide galaxy overview → close-up in front of the selected
  photo. It also toggles `OrbitControls.enabled` so dragging only works in
  the free-roam galaxy view.
- **`components/Overlay.js`** — the HTML "Touch the planet" text and the
  "← Back to galaxy" button, cross-faded with `framer-motion`.

## Customizing

- **Real photos**: replace the `url` in `lib/photos.js` with your own image
  paths (e.g. files in `public/photos/` or a CDN). Keep them roughly square
  for the `1.6 x 1.6` plane geometry, or adjust the geometry per-aspect-ratio.
- **Photo count / performance**: `generateGalaxyPhotos(220)` in
  `lib/photos.js` — drop this to ~80–120 on mobile-first builds, since each
  photo currently loads its own texture. For a production build with
  hundreds of real images, consider a texture atlas or `useTexture`'s
  array-loading + instancing to cut draw calls.
- **Transition style**: `IntroPlanet.js` uses `@react-spring/three` for the
  burst. If you'd rather scrub the burst with a precise timeline (e.g.
  layered scale + emissive-intensity + camera shake), swap that spring for
  a GSAP timeline triggered in the same `onClick` handler — `gsap` wasn't
  strictly needed here since spring covers the single-value scale/opacity
  animation cleanly, but it's a one-line swap if you want more control.
- **Bloom intensity**: tweak `luminanceThreshold` / `intensity` in
  `components/Scene.js` for a stronger or subtler glow.
