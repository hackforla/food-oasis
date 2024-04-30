export interface FeatureToLogin {
  ftl_id: number;
  feature_id: number;
  login_id: number;
  users: Array<{
    login_id: number;
    first_name: string;
    last_name: string;
    email: string;
  }>;
}
