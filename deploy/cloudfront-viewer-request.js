// CloudFront Function (runtime cloudfront-js-2.0), viewer request, default behavior.
// Replaces the Netlify rules for /new/* and the SPA fallback in netlify.toml.
function handler(event) {
  var request = event.request;
  var uri = request.uri;

  // Old visl.ai/new links -> root (301)
  if (uri === '/new' || uri.indexOf('/new/') === 0) {
    var target = uri.substring(4) || '/';
    var qs = querystring(request.querystring);
    return {
      statusCode: 301,
      statusDescription: 'Moved Permanently',
      headers: { location: { value: target + qs } },
    };
  }

  // SPA fallback: paths without a file extension are app routes
  var last = uri.substring(uri.lastIndexOf('/') + 1);
  if (last.indexOf('.') === -1) {
    request.uri = '/index.html';
  }
  return request;
}

function querystring(params) {
  var parts = [];
  for (var key in params) {
    var p = params[key];
    if (p.multiValue) {
      for (var i = 0; i < p.multiValue.length; i++) parts.push(key + '=' + p.multiValue[i].value);
    } else {
      parts.push(p.value === '' ? key : key + '=' + p.value);
    }
  }
  return parts.length ? '?' + parts.join('&') : '';
}
