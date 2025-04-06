import React from "react";
import { createRoot } from "react-dom/client";
import "styles/root.css";
import App from "./App";
import TagManager from "react-gtm-module";
import { setupWorker } from "msw/browser";
import { handlers } from "../tests/mocks/handlers";

export const worker = setupWorker(...handlers);

async function enableMocking() {
  if (process.env.NODE_ENV !== "development") {
    return;
  }

  return worker.start({ onUnhandledRequest: "bypass" });
}

const tagManagerArgs = {
  gtmId: "GTM-PS74HS2",
  events: {
    customEvent: "customEvent",
    viewDetail: null,
    getDirections: null,
    dialPhone: null,
  },
  action: null,
  value: null,
};

TagManager.initialize(tagManagerArgs);
const container = document.getElementById("root");
if (container) {
  const root = createRoot(container);
  enableMocking().then(() => {
    root.render(<App />);
  });
}
