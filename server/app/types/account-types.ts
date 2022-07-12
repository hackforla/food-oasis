export interface User {
  firstName: string;
  lastName: string;
  email: string;
  tenantId?: number;
}

export interface Account extends User {
  id: number;
  emailConfirmed: boolean;
  passwordHash?: string;
  dateCreated?: string;
  isGlobalAdmin: boolean;
  isGlobalReporting: boolean;
  isAdmin: boolean;
  isSecurityAdmin: boolean;
  isDataEntry: boolean;
  isCoordinator: boolean;
}

export interface RegisterFields extends User {
  password: string;
  clientUrl: string;
}

type ResponseCode =
  | "REG_SUCCESS"
  | "REG_DUPLICATE_EMAIL"
  | "REG_EMAIL_FAILED"
  | "REG_ACCOUNT_NOT_FOUND"
  | "FORGOT_PASSWORD_SUCCESS"
  | "FORGOT_PASSWORD_ACCOUNT_NOT_FOUND"
  | "FORGOT_PASSWORD_EMAIL_FAILED"
  | "RESET_PASSWORD_TOKEN_INVALID"
  | "RESET_PASSWORD_TOKEN_EXPIRED"
  | "RESET_PASSWORD_SUCCESS"
  | "RESET_PASSWORD_FAILED"
  | "AUTH_NOT_CONFIRMED"
  | "AUTH_SUCCESS"
  | "AUTH_INCORRECT_PASSWORD"
  | "AUTH_NO_ACCOUNT"
  | "DB_ERROR"
  | "UPDATE_SUCCESS"
  | "REG_CONFIRM_TOKEN_INVALID"
  | "REG_CONFIRM_TOKEN_EXPIRED"
  | "REG_CONFIRM_SUCCESS"
  | "REG_CONFIRM_FAILED";

export interface AccountResponse {
  isSuccess: boolean;
  code: ResponseCode;
  message?: string;
  newId?: string;
  email?: string;
  user?: Account & {
    role: string;
  };
}
