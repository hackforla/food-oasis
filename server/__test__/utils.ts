import { Response, Request } from "express";

export function mockRequest(overrides: any = {}): any {
  return { body: {}, params: {}, ...overrides };
}

export function mockResponse(overrides: any = {}): any {
  const res: any = {
    send: jest.fn(() => res).mockName("send"),
    status: jest.fn(() => res).mockName("status"),
    ...overrides,
  };
  return res;
}

export function mockNext(impl: any = () => null) {
  return jest.fn(impl).mockName("next");
}
