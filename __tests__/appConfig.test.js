import appConfig from '../app.json';
import {
  PWA_THEME,
  buildWebManifest,
  getManifestLinkHref,
  getPwaWebConfig,
} from '../src/web/pwaManifest';

describe('app config (web distribution)', () => {
  it('sets baseUrl for GitHub Pages project-site subdirectory', () => {
    expect(appConfig.expo.experiments?.baseUrl).toBe('/soccer-buddy');
  });

  it('configures PWA web fields for home-screen install', () => {
    const web = appConfig.expo.web;

    expect(web?.name).toBe('Soccer Buddy');
    expect(web?.shortName).toBe('Soccer Buddy');
    expect(web?.display).toBe('standalone');
    expect(web?.themeColor).toBe(PWA_THEME.fieldGreen);
    expect(web?.backgroundColor).toBe(PWA_THEME.cream);
    expect(web?.startUrl).toBe('.');
    expect(web?.scope).toBe('.');
    expect(web?.orientation).toBe('portrait');
  });
});

describe('PWA manifest helper', () => {
  it('builds a manifest with standalone display and Soccer Buddy branding', () => {
    const config = getPwaWebConfig(appConfig);
    const manifest = buildWebManifest(config);

    expect(config.baseUrl).toBe('/soccer-buddy');
    expect(manifest.name).toBe('Soccer Buddy');
    expect(manifest.short_name).toBe('Soccer Buddy');
    expect(manifest.display).toBe('standalone');
    expect(manifest.theme_color).toBe('#0a7d2c');
    expect(manifest.background_color).toBe('#fff9e6');
    expect(manifest.start_url).toBe('.');
    expect(manifest.scope).toBe('.');
    expect(manifest.orientation).toBe('portrait');
  });

  it('uses relative icon paths so assets resolve under the baseUrl subdirectory', () => {
    const manifest = buildWebManifest(getPwaWebConfig(appConfig));

    expect(manifest.icons.map((icon) => icon.src)).toEqual([
      'favicon.ico',
      'pwa-icon-192.png',
      'pwa-icon-512.png',
    ]);
  });

  it('links the manifest from the GitHub Pages project-site path', () => {
    expect(getManifestLinkHref('/soccer-buddy')).toBe('/soccer-buddy/manifest.json');
  });
});
