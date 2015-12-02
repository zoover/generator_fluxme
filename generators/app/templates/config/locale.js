// import Dutch as the used locale
import locale from './locales/nl';

// translate function, translate a key to a string in a locale
export function t(key) {
  function _fetchFromObject(object, prop) {
    let _index;
    if (typeof object === 'undefined') {
      return false;
    }
    _index = prop.indexOf('.');
    if (_index > -1) {
      return _fetchFromObject(object[prop.substring(0, _index)], prop.substr(_index + 1));
    }
    return object[prop];
  }
  return _fetchFromObject(locale, key);
}
