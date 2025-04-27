export interface User {
  dateCreated: Date;
  email: string;
  emailConfirmed: boolean;
  features: string[];
  firstName: string;
  id: number;
  isAdmin: boolean;
  isCoordinator: boolean;
  isDataEntry: boolean;
  isGlobalAdmin: boolean;
  isGlobalReporting: boolean;
  isSecurityAdmin: boolean;
  lastName: string;
  passwordHash: string;
  role: string;
  tenantId: number;
}