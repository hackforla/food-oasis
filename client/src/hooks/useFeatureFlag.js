import { useUserContext } from "../contexts/userContext";

export default function useFeatureFlag(flagName) {
  const { user } = useUserContext();
  if (!user || !user.featureFlags) {
    return false;
  }
  const featureFlags = user.features;
  return featureFlags.includes(flagName);
}
