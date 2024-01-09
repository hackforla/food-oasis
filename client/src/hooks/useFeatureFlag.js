export default function useFeatureFlag(flagName) {
  const featureFlags = JSON.parse(process.env.REACT_APP_FEATURE_FLAGS || "[]");

  return featureFlags.includes(flagName);
}
