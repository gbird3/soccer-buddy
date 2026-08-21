export const PWA_THEME = {
  fieldGreen: '#0a7d2c',
  cream: '#fff9e6',
};

export function getPwaWebConfig(appConfig) {
  const expo = appConfig.expo ?? {};
  const web = expo.web ?? {};

  return {
    baseUrl: expo.experiments?.baseUrl ?? '',
    name: web.name ?? expo.name ?? 'Soccer Buddy',
    shortName: web.shortName ?? web.name ?? expo.name ?? 'Soccer Buddy',
    display: web.display ?? 'standalone',
    themeColor: web.themeColor ?? PWA_THEME.fieldGreen,
    backgroundColor: web.backgroundColor ?? PWA_THEME.cream,
    startUrl: web.startUrl ?? '.',
    scope: web.scope ?? '.',
    orientation: web.orientation ?? expo.orientation ?? 'portrait',
  };
}

export function buildWebManifest(config) {
  return {
    name: config.name,
    short_name: config.shortName,
    display: config.display,
    theme_color: config.themeColor,
    background_color: config.backgroundColor,
    start_url: config.startUrl,
    scope: config.scope,
    orientation: config.orientation,
    icons: [
      {
        src: 'favicon.ico',
        sizes: '64x64 32x32 24x24 16x16',
        type: 'image/x-icon',
      },
      {
        src: 'pwa-icon-192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: 'pwa-icon-512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any maskable',
      },
    ],
  };
}

export function getManifestLinkHref(baseUrl) {
  return baseUrl ? `${baseUrl}/manifest.json` : 'manifest.json';
}
