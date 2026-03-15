// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

// Redirect CSS imports that Metro cannot handle (e.g. mapbox-gl/dist/mapbox-gl.css)
// to an empty JS module so web bundling doesn't fail.
const emptyMock = path.resolve(__dirname, 'src/mocks/empty.js');
const rnmapboxMock = path.resolve(__dirname, 'src/mocks/rnmapbox-maps.js');

// Packages that require native code and must be mocked on web
const WEB_MOCKS = {
  '@rnmapbox/maps': rnmapboxMock,
  'mapbox-gl': emptyMock,
};

config.resolver.resolveRequest = (context, moduleName, platform) => {
  if (platform === 'web') {
    // Mock entire native-only packages
    if (WEB_MOCKS[moduleName]) {
      return { filePath: WEB_MOCKS[moduleName], type: 'sourceFile' };
    }
    // Mock CSS imports Metro cannot handle
    if (moduleName.endsWith('.css')) {
      return { filePath: emptyMock, type: 'sourceFile' };
    }
  }
  // Fall through to default resolver
  return context.resolveRequest(context, moduleName, platform);
};

module.exports = config;
