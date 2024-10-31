import { render } from "@testing-library/react"
import App from "../App";

window.dataLayer = {
  push: jest.fn().mockImplementation(() => {
    eventCallback: jest.fn()
})
};

it("renders without crashing", () => {
  render(<App />)
});
