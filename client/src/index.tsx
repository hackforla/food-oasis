import React from "react";
import { createRoot } from "react-dom/client";
import "styles/root.css";
import App from "./App";
import TagManager from "react-gtm-module";

async function enableMocking() {
  if (!(window as any).__IS_TEST__) {
    return;
  }

  const { worker } = await import("../tests/helpers/msw");
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
