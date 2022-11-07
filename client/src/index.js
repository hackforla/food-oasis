import React from "react";
import ReactDOM from "react-dom/client";
import "./i18n";
import "styles/root.css";
import App from "./App";
import TagManager from "react-gtm-module";

const root = ReactDOM.createRoot(document.getElementById("root"));
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

root.render(<App />);
