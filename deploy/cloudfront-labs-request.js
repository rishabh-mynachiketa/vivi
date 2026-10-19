// CloudFront Function (runtime cloudfront-js-2.0), viewer request, on the /labs and /labs/* behaviors.
// Strips the /labs prefix before the request reaches the old Labs site on Netlify,
// matching the /labs/* -> /:splat proxy rule in netlify.toml.
function handler(event) {
  var request = event.request;
  request.uri = request.uri.substring(5) || '/';
  return request;
}
