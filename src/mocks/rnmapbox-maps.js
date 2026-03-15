// Web stub for @rnmapbox/maps — native-only library
// Metro redirects here when bundling for web platform

const noop = () => null;
const noopComponent = () => null;

module.exports = {
  default: noopComponent,
  MapView: noopComponent,
  Camera: noopComponent,
  UserLocation: noopComponent,
  PointAnnotation: noopComponent,
  ShapeSource: noopComponent,
  SymbolLayer: noopComponent,
  CircleLayer: noopComponent,
  LineLayer: noopComponent,
  FillLayer: noopComponent,
  Images: noopComponent,
  setAccessToken: noop,
  UserLocationRenderMode: { Native: 'native', Normal: 'normal', Compass: 'compass' },
  StyleURL: { Street: '', Light: '', Dark: '', Satellite: '' },
};
