import stakeholderService from "../services/stakeholder-service";

type StakeholderAccessUser = {
  id?: string;
  role?: string;
  sub?: string;
};

type StakeholderAccessRequest = {
  user?: {
    id?: string;
    role?: string;
    sub?: string;
  };
};

const getUserRoles = (user?: StakeholderAccessUser) =>
  new Set((user?.sub || user?.role || "").split(",").filter(Boolean));

const isRestrictedDataEntryUser = (user?: StakeholderAccessUser) => {
  const roles = getUserRoles(user);
  return (
    roles.has("data_entry") && !roles.has("admin") && !roles.has("coordinator")
  );
};

export const getAuthenticatedUserId = (req: StakeholderAccessRequest) =>
  Number(req.user?.id || 0);

export const hasStakeholderAccess = async (
  user: StakeholderAccessUser | undefined,
  stakeholderId: number
) => {
  if (!isRestrictedDataEntryUser(user)) {
    return true;
  }

  const userId = Number(user?.id || 0);
  if (!userId) {
    return false;
  }

  return stakeholderService.isStakeholderAssignedToUser(
    stakeholderId,
    userId
  );
};
