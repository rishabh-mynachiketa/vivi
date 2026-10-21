# Deploying to S3 + CloudFront

These files replace the Netlify-only rules in `netlify.toml` (`netlify.toml` stays for the Netlify deploy).
The site is served at the domain root, from the `home/` prefix of the bucket.

| netlify.toml rule | Replacement |
| --- | --- |
| `/new/*` -> `/:splat` (301) | `cloudfront-viewer-request.js` |
| `/*` -> `/index.html` (200, SPA fallback) | `cloudfront-viewer-request.js` |
| `/labs`, `/labs/*` proxy to the Labs Netlify site | `/labs` behaviors + `cloudfront-labs-request.js` |
| Cache-Control headers | `deploy-s3.sh` sets them on upload |

## Deploy

Needs the AWS CLI, signed in with write access to the bucket.

```bash
S3_BUCKET=my-bucket CF_DISTRIBUTION_ID=E123ABC npm run deploy:s3
```

`S3_PREFIX` defaults to `home`. `CF_DISTRIBUTION_ID` is optional; when set, the script invalidates the CloudFront cache.

## One-time CloudFront setup

1. **S3 origin**: the bucket, with **Origin path** `/home` and Origin Access Control (keep the bucket private).
   Use the bucket's REST endpoint, not the static-website endpoint.
2. **Default root object**: `index.html`.
3. **Default behavior** (`*`) → S3 origin. Viewer protocol: redirect HTTP to HTTPS. Cache policy: `CachingOptimized`.
   Create a CloudFront Function from `cloudfront-viewer-request.js` (runtime `cloudfront-js-2.0`), publish it,
   and attach it to this behavior as **Viewer request**.
4. **Labs origin**: custom origin `inquisitive-klepon-cd2ed6.netlify.app`, HTTPS only.
5. **Labs behaviors**: add two behaviors, `/labs` and `/labs/*`, both → Labs origin, ordered above the default.
   Cache policy `CachingDisabled` (or `CachingOptimized` if the Labs site rarely changes),
   origin request policy `AllViewerExceptHostHeader` (Netlify needs its own Host header).
   Create a function from `cloudfront-labs-request.js` and attach it to both as **Viewer request**.
6. Do **not** add custom error responses for 403/404 → `/index.html`: the viewer-request function already
   rewrites app routes, and a missing image or video should stay a real 404/403.
