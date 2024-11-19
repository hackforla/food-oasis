import { useFeatures } from "../hooks/useFeatures";

export default function useFeatureFlag(flagName) {
  const { data: featureFlags } = useFeatures();

  const featureFlag = featureFlags.find((feature) => feature.name === flagName);

  const isFeatureEnabled = featureFlag && featureFlag.is_enabled;

  const sessionUser = JSON.parse(sessionStorage.getItem("user") || "{}");

  const userHasFeature =
    sessionUser &&
    sessionUser.features &&
    sessionUser.features.includes(flagName);

  return isFeatureEnabled || userHasFeature;
}
