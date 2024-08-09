import { useUserContext } from "../contexts/userContext";
import { useFeatures } from "../hooks/useFeatures";

export default function useFeatureFlag(flagName) {
  const { user } = useUserContext();
  const { data: featureFlags } = useFeatures();
  const featureFlag = featureFlags.find((feature) => feature.name === flagName);

  if (featureFlag && featureFlag.is_enabled) {
    return true;
  }
  if (user && user.features && user.features.includes(flagName)) {
    return true;
  }

  return false;
}
