import db from "../app/services/db";
import { sendResetPasswordConfirmation } from "../app/services/ses-service";
import accountService from "../app/services/account-service";

// forgotPassword must not reveal whether an email is registered (account
// enumeration). These tests assert the response is identical for a registered
// and an unregistered address, and that a reset email is only sent when a
// matching account actually exists.
jest.mock("../app/services/db", () => ({
  __esModule: true,
  default: {
    oneOrNone: jest.fn(),
    none: jest.fn(),
  },
}));

jest.mock("../app/services/ses-service", () => ({
  __esModule: true,
  sendResetPasswordConfirmation: jest.fn(),
  sendRegistrationConfirmation: jest.fn(),
}));

const oneOrNoneMock = db.oneOrNone as jest.Mock;
const noneMock = db.none as jest.Mock;
const sendResetMock = sendResetPasswordConfirmation as jest.Mock;

const clientUrl = "https://example.test";
const genericResponse = {
  isSuccess: true,
  code: "FORGOT_PASSWORD_SUCCESS",
  message:
    "If an account exists for that email, a password reset link has been sent.",
};

// forgotPassword sends the reset email fire-and-forget (not awaited) so the
// registered path returns as fast as the unregistered one. Drain the microtask
// queue so those background awaits (token insert + email send) settle before we
// assert on them.
const flushAsync = () => new Promise((resolve) => setImmediate(resolve));

beforeEach(() => {
  jest.resetAllMocks();
});

describe("forgotPassword account enumeration", () => {
  it("returns a generic success without sending email for an unregistered address", async () => {
    oneOrNoneMock.mockResolvedValueOnce(null);

    const result = await accountService.forgotPassword({
      email: "nobody@test.com",
      clientUrl,
    });

    expect(result).toEqual(genericResponse);
    // No token stored, no email sent -- nothing observable that would confirm
    // whether the account exists.
    expect(noneMock).not.toHaveBeenCalled();
    expect(sendResetMock).not.toHaveBeenCalled();
  });

  it("sends the reset email and returns the same generic success for a registered address", async () => {
    oneOrNoneMock.mockResolvedValueOnce({ id: 42 });
    noneMock.mockResolvedValueOnce(undefined);
    sendResetMock.mockResolvedValueOnce(undefined);

    const result = await accountService.forgotPassword({
      email: "real@test.com",
      clientUrl,
    });
    await flushAsync();

    expect(result).toEqual(genericResponse);
    expect(sendResetMock).toHaveBeenCalledTimes(1);
    expect(sendResetMock).toHaveBeenCalledWith(
      "real@test.com",
      expect.any(String),
      clientUrl
    );
  });

  it("returns without waiting for the reset email to be sent (no response-timing oracle)", async () => {
    oneOrNoneMock.mockResolvedValueOnce({ id: 5 });
    noneMock.mockResolvedValueOnce(undefined);
    // A send that never settles on its own: if forgotPassword awaited it, this
    // test would hang. It resolving proves the send is not on the response path.
    let resolveSend: () => void = () => undefined;
    sendResetMock.mockImplementationOnce(
      () => new Promise<void>((resolve) => (resolveSend = resolve))
    );

    const result = await accountService.forgotPassword({
      email: "real@test.com",
      clientUrl,
    });

    expect(result).toEqual(genericResponse);

    // Let the background send settle so it does not leak into other tests.
    resolveSend();
    await flushAsync();
  });

  it("returns an identical response for registered and unregistered addresses", async () => {
    // Unregistered
    oneOrNoneMock.mockResolvedValueOnce(null);
    const unregistered = await accountService.forgotPassword({
      email: "nobody@test.com",
      clientUrl,
    });

    // Registered
    oneOrNoneMock.mockResolvedValueOnce({ id: 7 });
    noneMock.mockResolvedValueOnce(undefined);
    sendResetMock.mockResolvedValueOnce(undefined);
    const registered = await accountService.forgotPassword({
      email: "real@test.com",
      clientUrl,
    });
    await flushAsync();

    // The caller cannot tell the two apart.
    expect(registered).toEqual(unregistered);
  });

  it("still returns generic success (logging server-side) when the reset email fails", async () => {
    const consoleErrorSpy = jest
      .spyOn(console, "error")
      .mockImplementation(() => undefined);
    oneOrNoneMock.mockResolvedValueOnce({ id: 99 });
    noneMock.mockResolvedValueOnce(undefined);
    sendResetMock.mockRejectedValueOnce(new Error("SMTP down"));

    const result = await accountService.forgotPassword({
      email: "real@test.com",
      clientUrl,
    });
    await flushAsync();

    expect(result).toEqual(genericResponse);
    expect(consoleErrorSpy).toHaveBeenCalled();
    consoleErrorSpy.mockRestore();
  });
});
