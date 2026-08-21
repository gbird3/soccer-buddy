const fs = require('fs');
const path = require('path');
const { generateImageAsync } = require('@expo/image-utils');
const appConfig = require('../app.json');
const { buildWebManifest, getPwaWebConfig } = require('../src/web/pwaManifest');

const projectRoot = path.resolve(__dirname, '..');
const publicDir = path.join(projectRoot, 'public');

async function ensurePwaIcons() {
  const iconSrc = path.join(projectRoot, 'assets', 'icon.png');
  const sizes = [
    { size: 192, filename: 'pwa-icon-192.png' },
    { size: 512, filename: 'pwa-icon-512.png' },
  ];

  await Promise.all(
    sizes.map(async ({ size, filename }) => {
      const { source } = await generateImageAsync({ projectRoot, cacheType: 'pwa-icon' }, {
        src: iconSrc,
        width: size,
        height: size,
        resizeMode: 'cover',
        backgroundColor: '#0a7d2c',
        name: filename,
      });

      await fs.promises.writeFile(path.join(publicDir, filename), source);
    }),
  );
}

async function main() {
  await fs.promises.mkdir(publicDir, { recursive: true });

  const config = getPwaWebConfig(appConfig);
  const manifest = buildWebManifest(config);

  await ensurePwaIcons();
  await fs.promises.writeFile(
    path.join(publicDir, 'manifest.json'),
    `${JSON.stringify(manifest, null, 2)}\n`,
  );

  console.log('Synced public/manifest.json and PWA icons from app.json web config.');
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
