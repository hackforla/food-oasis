// Google Tag Manager. Must load before the app so window.dataLayer exists for
// services/analytics.ts. Kept out of index.html so the
// Content-Security-Policy can block inline scripts.
(function (w, d, s, l, i) {
  w[l] = w[l] || [];
  w[l].push({
    "gtm.start": new Date().getTime(),
    event: "gtm.js",
    customEvent: "customEvent",
    viewDetail: null,
    getDirections: null,
    dialPhone: null,
  });
  var f = d.getElementsByTagName(s)[0],
    j = d.createElement(s),
    dl = l != "dataLayer" ? "&l=" + l : "";
  j.async = true;
  j.src = "https://www.googletagmanager.com/gtm.js?id=" + i + dl;
  f.parentNode.insertBefore(j, f);
})(window, document, "script", "dataLayer", "GTM-PS74HS2");
