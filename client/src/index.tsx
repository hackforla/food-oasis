import { createRoot } from "react-dom/client";
import TagManager from "react-gtm-module";
import "styles/root.css";
import App from "./App";

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
  root.render(<App />);
}
