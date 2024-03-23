export interface FeatureToLogin {
  feature_id: number;
  feature_name: string;
  users: Array<{
    login_id: number;
    first_name: string;
    last_name: string;
    email: string;
    ftl_id: number;
  }>;
}
