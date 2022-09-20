import accountController from "../app/controllers/account-controller";
import accountService from "../app/services/account-service";
import loginService from "../app/services/logins-service";
import { mockResponse, mockRequest, mockNext } from "./utils";

jest.mock("../app/services/account-service");
jest.mock("../app/services/logins-service");

const tenantId = 1;

const selectAllMock = accountService.selectAll as jest.MockedFunction<
  typeof accountService.selectAll
>;
const accounts = [
  {
    id: 106,
    firstName: "Webinar",
    lastName: "User",
    email: "webinaruser@test.com",
    emailConfirmed: true,
    passwordHash:
      "$2b$10$MZ9Nlvc9lYd6/GrgG3sbs.jzR4Ta/NYWlCHW8MCrLDseNeNRV7Yme",
    dateCreated: "2020-03-28T03:52:35.898Z",
    isGlobalAdmin: false,
    isGlobalReporting: false,
    tenantId: 1,
    isAdmin: false,
    isSecurityAdmin: false,
    isDataEntry: false,
    isCoordinator: false,
  },
  {
    id: 110,
    firstName: "Data Entry",
    lastName: "User",
    email: "dataentryuser@test.com",
    emailConfirmed: true,
    passwordHash:
      "$2b$10$XnPYzSp5/a6/I4vcpgGDreWTq4JlSqiIdQIfKJSG8HareqrJgEVC.",
    dateCreated: "2020-04-17T05:52:29.485Z",
    isGlobalAdmin: false,
    isGlobalReporting: false,
    tenantId: 1,
    isAdmin: false,
    isSecurityAdmin: false,
    isDataEntry: true,
    isCoordinator: false,
  },
  {
    id: 171,
    firstName: "Admin",
    lastName: "Admin",
    email: "admin@test.com",
    emailConfirmed: false,
    passwordHash:
      "$2b$10$aMAO10PCC2RfcmXg1GCH1.UsccMgTB53h4XD2w9ydlQMrf4Nn55.q",
    dateCreated: "2021-05-18T06:04:09.421Z",
    isGlobalAdmin: false,
    isGlobalReporting: false,
    tenantId: 1,
    isAdmin: false,
    isSecurityAdmin: false,
    isDataEntry: true,
    isCoordinator: false,
  },
  {
    id: 108,
    firstName: "Admin",
    lastName: "User",
    email: "adminuser@test.com",
    emailConfirmed: true,
    passwordHash:
      "$2b$10$hJy1U8B6pC2GzPWKQr/TYOO876S3YtHjlYXro81KwOZWgdyR5LFqC",
    dateCreated: "2020-04-17T05:46:43.603Z",
    isGlobalAdmin: true,
    isGlobalReporting: false,
    tenantId: 1,
    isAdmin: true,
    isSecurityAdmin: true,
    isDataEntry: true,
    isCoordinator: true,
  },
  {
    id: 109,
    firstName: "Security",
    lastName: "User",
    email: "securityuser@test.com",
    emailConfirmed: true,
    passwordHash:
      "$2b$10$8TerixiBDRGFatpWUm/ZO.8/6gPEBoJid1MWvb9c3ZQth3luFWFSe",
    dateCreated: "2020-04-17T05:49:35.021Z",
    isGlobalAdmin: true,
    isGlobalReporting: false,
    tenantId: 1,
    isAdmin: false,
    isSecurityAdmin: true,
    isDataEntry: false,
    isCoordinator: false,
  },
];
function seedAccount() {
  selectAllMock.mockImplementationOnce(() => Promise.resolve(accounts));
}

beforeEach(() => {
  jest.resetAllMocks();
});

describe("Account", () => {
  it("should get all accounts", async () => {
    seedAccount();
    const res = mockResponse();
    const req = mockRequest({ query: { tenantId } });
    const next = mockNext();

    await accountController.getAll(req, res, next);
    expect(selectAllMock).toHaveBeenCalledWith(tenantId);
    expect(selectAllMock).toHaveBeenCalledTimes(1);
    expect(res.send.mock.calls[0][0]).toMatchInlineSnapshot(`
      Array [
        Object {
          "dateCreated": "2020-03-28T03:52:35.898Z",
          "email": "webinaruser@test.com",
          "emailConfirmed": true,
          "firstName": "Webinar",
          "id": 106,
          "isAdmin": false,
          "isCoordinator": false,
          "isDataEntry": false,
          "isGlobalAdmin": false,
          "isGlobalReporting": false,
          "isSecurityAdmin": false,
          "lastName": "User",
          "passwordHash": "$2b$10$MZ9Nlvc9lYd6/GrgG3sbs.jzR4Ta/NYWlCHW8MCrLDseNeNRV7Yme",
          "tenantId": 1,
        },
        Object {
          "dateCreated": "2020-04-17T05:52:29.485Z",
          "email": "dataentryuser@test.com",
          "emailConfirmed": true,
          "firstName": "Data Entry",
          "id": 110,
          "isAdmin": false,
          "isCoordinator": false,
          "isDataEntry": true,
          "isGlobalAdmin": false,
          "isGlobalReporting": false,
          "isSecurityAdmin": false,
          "lastName": "User",
          "passwordHash": "$2b$10$XnPYzSp5/a6/I4vcpgGDreWTq4JlSqiIdQIfKJSG8HareqrJgEVC.",
          "tenantId": 1,
        },
        Object {
          "dateCreated": "2021-05-18T06:04:09.421Z",
          "email": "admin@test.com",
          "emailConfirmed": false,
          "firstName": "Admin",
          "id": 171,
          "isAdmin": false,
          "isCoordinator": false,
          "isDataEntry": true,
          "isGlobalAdmin": false,
          "isGlobalReporting": false,
          "isSecurityAdmin": false,
          "lastName": "Admin",
          "passwordHash": "$2b$10$aMAO10PCC2RfcmXg1GCH1.UsccMgTB53h4XD2w9ydlQMrf4Nn55.q",
          "tenantId": 1,
        },
        Object {
          "dateCreated": "2020-04-17T05:46:43.603Z",
          "email": "adminuser@test.com",
          "emailConfirmed": true,
          "firstName": "Admin",
          "id": 108,
          "isAdmin": true,
          "isCoordinator": true,
          "isDataEntry": true,
          "isGlobalAdmin": true,
          "isGlobalReporting": false,
          "isSecurityAdmin": true,
          "lastName": "User",
          "passwordHash": "$2b$10$hJy1U8B6pC2GzPWKQr/TYOO876S3YtHjlYXro81KwOZWgdyR5LFqC",
          "tenantId": 1,
        },
        Object {
          "dateCreated": "2020-04-17T05:49:35.021Z",
          "email": "securityuser@test.com",
          "emailConfirmed": true,
          "firstName": "Security",
          "id": 109,
          "isAdmin": false,
          "isCoordinator": false,
          "isDataEntry": false,
          "isGlobalAdmin": true,
          "isGlobalReporting": false,
          "isSecurityAdmin": true,
          "lastName": "User",
          "passwordHash": "$2b$10$8TerixiBDRGFatpWUm/ZO.8/6gPEBoJid1MWvb9c3ZQth3luFWFSe",
          "tenantId": 1,
        },
      ]
    `);
  });

  it("returns an account based on id", async () => {
    const res = mockResponse();
    const req = mockRequest({ query: { tenantId: 1 }, params: { id: 106 } });
    const next = mockNext();
    const selectByIdMock = accountService.selectById as jest.MockedFunction<
      typeof accountService.selectById
    >;
    selectByIdMock.mockImplementationOnce(() => Promise.resolve(accounts[0]));

    await accountController.getById(req, res, next);
    expect(selectByIdMock).toHaveBeenCalledWith(106, 1);
    expect(selectByIdMock).toHaveBeenCalledTimes(1);
    expect(res.send.mock.calls[0][0]).toMatchInlineSnapshot(`
      Object {
        "dateCreated": "2020-03-28T03:52:35.898Z",
        "email": "webinaruser@test.com",
        "emailConfirmed": true,
        "firstName": "Webinar",
        "id": 106,
        "isAdmin": false,
        "isCoordinator": false,
        "isDataEntry": false,
        "isGlobalAdmin": false,
        "isGlobalReporting": false,
        "isSecurityAdmin": false,
        "lastName": "User",
        "passwordHash": "$2b$10$MZ9Nlvc9lYd6/GrgG3sbs.jzR4Ta/NYWlCHW8MCrLDseNeNRV7Yme",
        "tenantId": 1,
      }
    `);
  });

  it("returns an account based on email", async () => {
    const res = mockResponse();
    const req = mockRequest({
      query: { tenantId: 1 },
      params: { email: "admin@test.com" },
    });
    const next = mockNext();
    const selectByEmailMock =
      accountService.selectByEmail as jest.MockedFunction<
        typeof accountService.selectByEmail
      >;
    selectByEmailMock.mockImplementationOnce(() =>
      Promise.resolve(accounts[2])
    );
    await accountController.getByEmail(req, res, next);
    expect(selectByEmailMock).toHaveBeenCalledWith("admin@test.com", 1);
    expect(selectByEmailMock).toHaveBeenCalledTimes(1);
    expect(res.send.mock.calls[0][0]).toMatchInlineSnapshot(`
      Object {
        "dateCreated": "2021-05-18T06:04:09.421Z",
        "email": "admin@test.com",
        "emailConfirmed": false,
        "firstName": "Admin",
        "id": 171,
        "isAdmin": false,
        "isCoordinator": false,
        "isDataEntry": true,
        "isGlobalAdmin": false,
        "isGlobalReporting": false,
        "isSecurityAdmin": false,
        "lastName": "Admin",
        "passwordHash": "$2b$10$aMAO10PCC2RfcmXg1GCH1.UsccMgTB53h4XD2w9ydlQMrf4Nn55.q",
        "tenantId": 1,
      }
    `);
  });

  it("registers a new user successfully", async () => {
    const res = mockResponse();
    const req = mockRequest({
      body: {
        firstName: "Hannah",
        lastName: "Zulueta",
        email: "adminuser@test.com",
        tenantId: 1,
        password: "password",
        clientUrl: "http://localhost:5001",
      },
    });
    const next = mockNext();
    const registerMock = accountService.register as jest.MockedFunction<
      typeof accountService.register
    >;
    registerMock.mockImplementationOnce(() =>
      Promise.resolve({
        isSuccess: true,
        code: "REG_SUCCESS",
        newId: "newId",
        message: "Registration successful.",
      })
    );

    await accountController.register(req, res, next);
    expect(registerMock).toHaveBeenCalledWith({
      clientUrl: "http://localhost:5001",
      email: "adminuser@test.com",
      firstName: "Hannah",
      lastName: "Zulueta",
      password: "password",
      tenantId: 1,
    });
    expect(registerMock).toHaveBeenCalledTimes(1);
    expect(res.send.mock.calls[0][0]).toMatchInlineSnapshot(`
      Object {
        "code": "REG_SUCCESS",
        "isSuccess": true,
        "message": "Registration successful.",
        "newId": "newId",
      }
    `);
  });

  it("resends confirmation email", async () => {
    const res = mockResponse();
    const req = mockRequest({
      body: {
        email: "adminuser@test.com",
        clientUrl: "http://localhost:5001",
      },
    });
    const next = mockNext();
    const resendConfirmationEmailMock =
      accountService.resendConfirmationEmail as jest.MockedFunction<
        typeof accountService.resendConfirmationEmail
      >;
    resendConfirmationEmailMock.mockImplementationOnce(() =>
      Promise.resolve({
        isSuccess: true,
        code: "REG_SUCCESS",
        newId: "newId",
        message: "Account found.",
      })
    );

    await accountController.resendConfirmationEmail(req, res, next);
    expect(resendConfirmationEmailMock).toHaveBeenCalledWith(
      "adminuser@test.com",
      "http://localhost:5001"
    );
    expect(resendConfirmationEmailMock).toHaveBeenCalledTimes(1);
    expect(res.send.mock.calls[0][0]).toMatchInlineSnapshot(`
      Object {
        "code": "REG_SUCCESS",
        "isSuccess": true,
        "message": "Account found.",
        "newId": "newId",
      }
    `);
  });

  it("forgot password", async () => {
    const res = mockResponse();
    const req = mockRequest({
      body: {
        email: "adminuser@test.com",
        clientUrl: "http://localhost:5001",
      },
    });
    const next = mockNext();
    const forgotPasswordMock =
      accountService.forgotPassword as jest.MockedFunction<
        typeof accountService.forgotPassword
      >;
    forgotPasswordMock.mockImplementationOnce(() =>
      Promise.resolve({
        isSuccess: true,
        code: "FORGOT_PASSWORD_SUCCESS",
        newId: "newId",
        message: "Account found.",
      })
    );

    await accountController.forgotPassword(req, res, next);
    expect(forgotPasswordMock).toHaveBeenCalledWith({
      clientUrl: "http://localhost:5001",
      email: "adminuser@test.com",
    });
    expect(forgotPasswordMock).toHaveBeenCalledTimes(1);
    expect(res.send.mock.calls[0][0]).toMatchInlineSnapshot(`
      Object {
        "code": "FORGOT_PASSWORD_SUCCESS",
        "isSuccess": true,
        "message": "Account found.",
        "newId": "newId",
      }
    `);
  });

  it("resets password successfully", async () => {
    const res = mockResponse();
    const req = mockRequest({
      body: {
        password: "password",
        token: "token",
      },
    });
    const next = mockNext();
    const resetPasswordMock =
      accountService.resetPassword as jest.MockedFunction<
        typeof accountService.resetPassword
      >;
    resetPasswordMock.mockImplementationOnce(() =>
      Promise.resolve({
        isSuccess: true,
        code: "FORGOT_PASSWORD_SUCCESS",
        newId: "newId",
        message: "Account found.",
      })
    );

    await accountController.resetPassword(req, res, next);
    expect(resetPasswordMock).toHaveBeenCalledWith({
      password: "password",
      token: "token",
    });
    expect(resetPasswordMock).toHaveBeenCalledTimes(1);
    expect(res.send.mock.calls[0][0]).toMatchInlineSnapshot(`
      Object {
        "code": "FORGOT_PASSWORD_SUCCESS",
        "isSuccess": true,
        "message": "Account found.",
        "newId": "newId",
      }
    `);
  });

  it("sets tenant permission successfully", async () => {
    const res = mockResponse();
    const body = {
      userId: "userId",
      permissionName: "is_admin",
      value: true,
      tenantId: 1,
    };
    const req = mockRequest({
      body,
    });
    const next = mockNext();
    const setTenantPermissionsMock =
      accountService.setTenantPermissions as jest.MockedFunction<
        typeof accountService.setTenantPermissions
      >;
    setTenantPermissionsMock.mockImplementationOnce(() =>
      Promise.resolve({
        isSuccess: true,
        code: "UPDATE_SUCCESS",
        message: `${body.permissionName} successfully set to ${body.value} for ${body.userId}`,
      })
    );

    await accountController.setTenantPermissions(req, res, next);
    expect(setTenantPermissionsMock).toHaveBeenCalledWith(
      "userId",
      "is_admin",
      true,
      1
    );
    expect(setTenantPermissionsMock).toHaveBeenCalledTimes(1);
    expect(res.send.mock.calls[0][0]).toMatchInlineSnapshot(`
      Object {
        "code": "UPDATE_SUCCESS",
        "isSuccess": true,
        "message": "is_admin successfully set to true for userId",
      }
    `);
  });

  it("sets global permission successfully", async () => {
    const res = mockResponse();
    const body = {
      userId: "userId",
      permissionName: "is_admin",
      value: true,
      tenantId: 1,
    };
    const req = mockRequest({
      body,
    });
    const next = mockNext();
    const setGlobalPermissionsMock =
      accountService.setGlobalPermissions as jest.MockedFunction<
        typeof accountService.setGlobalPermissions
      >;
    setGlobalPermissionsMock.mockImplementationOnce(() =>
      Promise.resolve({
        isSuccess: true,
        code: "UPDATE_SUCCESS",
        message: `${body.permissionName} successfully set to ${body.value} for ${body.userId}`,
      })
    );

    await accountController.setGlobalPermissions(req, res, next);
    expect(setGlobalPermissionsMock).toHaveBeenCalledWith(
      "userId",
      "is_admin",
      true,
      1
    );
    expect(setGlobalPermissionsMock).toHaveBeenCalledTimes(1);
    expect(res.send.mock.calls[0][0]).toMatchInlineSnapshot(`
      Object {
        "code": "UPDATE_SUCCESS",
        "isSuccess": true,
        "message": "is_admin successfully set to true for userId",
      }
    `);
  });

  it("confirms successful registration", async () => {
    const res = mockResponse();
    const body = {
      id: "userId",
      token: "token",
    };
    const req = mockRequest({
      body,
    });
    const next = mockNext();
    const confirmRegistrationMock =
      accountService.confirmRegistration as jest.MockedFunction<
        typeof accountService.confirmRegistration
      >;
    confirmRegistrationMock.mockImplementationOnce(() =>
      Promise.resolve({
        isSuccess: true,
        code: "REG_CONFIRM_SUCCESS",
        message: "Email confirmed.",
        email: "adminuser@test.com",
      })
    );

    await accountController.confirmRegister(req, res, next);
    expect(confirmRegistrationMock).toHaveBeenCalledWith("token");
    expect(confirmRegistrationMock).toHaveBeenCalledTimes(1);
    expect(res.send.mock.calls[0][0]).toMatchInlineSnapshot(`
      Object {
        "code": "REG_CONFIRM_SUCCESS",
        "email": "adminuser@test.com",
        "isSuccess": true,
        "message": "Email confirmed.",
      }
    `);
  });

  it("logins user successfully", async () => {
    const res = mockResponse();
    const body = {
      email: "adminuser@test.com",
      password: "password",
      tenantId: 1,
    };
    const req = mockRequest({
      body,
    });
    const next = mockNext();
    const authenticateMock = accountService.authenticate as jest.MockedFunction<
      typeof accountService.authenticate
    >;
    authenticateMock.mockImplementationOnce(() =>
      Promise.resolve({
        isSuccess: true,
        code: "AUTH_SUCCESS",
        user: {
          id: 123,
          firstName: "admin",
          lastName: "user",
          email: "adminuser@test.com",
          isAdmin: true,
          isCoordinator: true,
          isSecurityAdmin: true,
          isDataEntry: true,
          emailConfirmed: true,
          isGlobalAdmin: true,
          isGlobalReporting: true,
          role: "admin",
        },
      })
    );
    const loginMock = loginService.insert as jest.MockedFunction<
      typeof loginService.insert
    >;

    await accountController.login(req, res, next);
    expect(authenticateMock).toHaveBeenCalledWith(
      "adminuser@test.com",
      "password",
      1
    );
    expect(authenticateMock).toHaveBeenCalledTimes(1);
    expect(loginMock).toHaveBeenCalledTimes(1);
  });

  it("updates user successfully", async () => {
    const res = mockResponse();
    const body = {
      firstName: "admin",
    };
    const req = mockRequest({
      body,
    });
    const next = mockNext();
    const updateMock = accountService.update as jest.MockedFunction<
      typeof accountService.update
    >;

    await accountController.put(req, res, next);
    expect(updateMock).toHaveBeenCalledWith({ firstName: "admin" });
    expect(updateMock).toHaveBeenCalledTimes(1);
    expect(res.sendStatus).toHaveBeenCalledWith(200);
  });

  it("removes a user successfully", async () => {
    const res = mockResponse();
    const params = {
      id: 123,
    };
    const req = mockRequest({
      params,
    });
    const next = mockNext();
    const removeMock = accountService.remove as jest.MockedFunction<
      typeof accountService.remove
    >;

    await accountController.remove(req, res, next);
    expect(removeMock).toHaveBeenCalledWith(123);
    expect(removeMock).toHaveBeenCalledTimes(1);
    expect(res.sendStatus).toHaveBeenCalledWith(200);
  });
});
