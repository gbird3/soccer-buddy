import appConfig from '../app.json';

describe('app config (web distribution)', () => {
  it('sets baseUrl for GitHub Pages project-site subdirectory', () => {
    expect(appConfig.expo.experiments?.baseUrl).toBe('/soccer-buddy');
  });
});
