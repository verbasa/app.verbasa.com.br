export default function uriEncode(uri: string, obj: any): string {
  if (!obj) {
    return uri;
  }
  const serialize = function (_obj: any): string {
    var str = [];
    for (var p in _obj)
      if (_obj.hasOwnProperty(p)) {
        str.push(encodeURIComponent(p) + '=' + encodeURIComponent(_obj[p]));
      }
    return str.join('&');
  };
  return uri + '?' + serialize(obj);
}
