import type { User } from "./User";

export type UserRoleKey = keyof Pick<
  User,
  | "isAdmin"
  | "isDataEntry"
  | "isCoordinator"
  | "isGlobalAdmin"
  | "isSecurityAdmin"
>;
