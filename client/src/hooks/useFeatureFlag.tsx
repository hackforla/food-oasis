import { useUserContext } from "contexts/userContext";
import { useFeatures } from "./useFeatures";

export default function useFeatureFlag(flagName: string): boolean {
  const { data: featureFlags } = useFeatures();
  const { user } = useUserContext();

  const features = featureFlags || [];

  const featureFlag = features.find((feature) => feature.name === flagName);

  const isFeatureEnabled = !!(featureFlag && featureFlag.is_enabled);

  const userHasFeature = !!(
    user &&
    user.features &&
    Array.isArray(user.features) &&
    user.features.includes(flagName)
  );

  return isFeatureEnabled || userHasFeature;
}
