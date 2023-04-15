export function mockRequest(overrides: any = {}): any {
  return { body: {}, params: {}, ...overrides };
}

export function mockResponse(overrides: any = {}): any {
  const res: any = {
    send: jest.fn(() => res).mockName("send"),
    status: jest.fn(() => res).mockName("status"),
    sendStatus: jest.fn(() => res).mockName("sendStatus"),
    json: jest.fn(() => res).mockName("json"),
    ...overrides,
  };
  return res;
}

export function mockNext(impl: any = () => null) {
  return jest.fn(impl).mockName("next");
}
