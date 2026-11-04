import { act, render } from "@testing-library/react";
import App from "../App";

// Every client service talks to the API through the default axios export, so a
// single module mock keeps the render from making real network requests.
jest.mock("axios", () => ({
  __esModule: true,
  default: {
    get: jest.fn().mockResolvedValue({ data: [] }),
    post: jest.fn().mockResolvedValue({ data: {} }),
    put: jest.fn().mockResolvedValue({ data: {} }),
    delete: jest.fn().mockResolvedValue({ data: {} }),
  },
}));

beforeEach(() => {
  // Google Tag Manager queue that the analytics service pushes into.
  window.dataLayer = [];
  // jsdom does not implement scrolling.
  window.scrollTo = jest.fn();
});

it("renders without crashing", async () => {
  let container;
  await act(async () => {
    ({ container } = render(<App />));
  });

  expect(container.firstChild).not.toBeNull();
  expect(window.dataLayer).toContainEqual(
    expect.objectContaining({ event: "visitAppComponent" })
  );
});
