import { RequestHandler } from "express";
import helmet, { HelmetOptions } from "helmet";

// Third-party origins the client loads from. Keep these in sync with the
// client when adding a new external script, stylesheet, font, image, or API.
const MAPBOX_API = "https://api.mapbox.com";
const MAPBOX_EVENTS = "https://events.mapbox.com";
const MAPBOX_CSS = "https://api.tiles.mapbox.com";
const GOOGLE_FONTS_CSS = "https://fonts.googleapis.com";
const GOOGLE_FONTS_FILES = "https://fonts.gstatic.com";
const GOOGLE_TAG_MANAGER = "https://*.googletagmanager.com";
const GOOGLE_ANALYTICS = "https://*.google-analytics.com";
const GOOGLE_ANALYTICS_COLLECT = "https://*.analytics.google.com";
const GOOGLE_ANALYTICS_COLLECT_APEX = "https://analytics.google.com";
const GOOGLE = "https://*.google.com";
const GOOGLE_DOUBLECLICK = "https://*.g.doubleclick.net";
const CLARITY = "https://*.clarity.ms";
const CLARITY_BEACON = "https://c.bing.com";

const isProduction = process.env.NODE_ENV === "production";

function buildOptions(allowThirdPartyFraming: boolean): HelmetOptions {
  return {
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", GOOGLE_TAG_MANAGER, CLARITY, CLARITY_BEACON],
        // MUI/emotion injects <style> tags at runtime, so inline styles are
        // required. Inline scripts are still blocked.
        styleSrc: ["'self'", "'unsafe-inline'", MAPBOX_CSS, GOOGLE_FONTS_CSS],
        fontSrc: ["'self'", "data:", GOOGLE_FONTS_FILES],
        imgSrc: [
          "'self'",
          "data:",
          "blob:",
          MAPBOX_API,
          GOOGLE_TAG_MANAGER,
          GOOGLE_ANALYTICS,
          GOOGLE,
          GOOGLE_DOUBLECLICK,
          CLARITY,
          CLARITY_BEACON,
        ],
        connectSrc: [
          "'self'",
          MAPBOX_API,
          MAPBOX_EVENTS,
          GOOGLE_TAG_MANAGER,
          GOOGLE_ANALYTICS,
          GOOGLE_ANALYTICS_COLLECT,
          GOOGLE_ANALYTICS_COLLECT_APEX,
          GOOGLE,
          GOOGLE_DOUBLECLICK,
          CLARITY,
          CLARITY_BEACON,
        ],
        workerSrc: ["'self'", "blob:"],
        childSrc: ["blob:"],
        objectSrc: ["'none'"],
        baseUri: ["'self'"],
        formAction: ["'self'"],
        frameAncestors: allowThirdPartyFraming ? ["*"] : ["'self'"],
        upgradeInsecureRequests: isProduction ? [] : null,
      },
    },
    referrerPolicy: { policy: "strict-origin-when-cross-origin" },
    xFrameOptions: allowThirdPartyFraming ? false : { action: "sameorigin" },
    crossOriginResourcePolicy: { policy: "cross-origin" },
    strictTransportSecurity: { maxAge: 31536000, includeSubDomains: false },
  };
}


const defaultHeaders = helmet(buildOptions(false));
const widgetHeaders = helmet(buildOptions(true));

const securityHeaders: RequestHandler = (req, res, next) => {
  const path = req.path.toLowerCase().replace(/\/+$/, "");
  if (THIRD_PARTY_FRAMEABLE_PATHS.has(path)) {
    widgetHeaders(req, res, next);
  } else {
    defaultHeaders(req, res, next);
  }
};

export default securityHeaders;
