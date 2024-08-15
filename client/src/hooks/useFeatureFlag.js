import { useUserContext } from "../contexts/userContext";
import { useFeatures } from "../hooks/useFeatures";

export default function useFeatureFlag(flagName) {
  const { user } = useUserContext();
  const { data: featureFlags } = useFeatures();

  const featureFlag = featureFlags.find((feature) => feature.name === flagName);

  const isFeatureEnabled = featureFlag && featureFlag.is_enabled;

  const userHasFeature =
    user && user.features && user.features.includes(flagName);

  return isFeatureEnabled || userHasFeature;
}
