export interface Announcement {
  id: number;
  title: string;
  description: string;
  is_enabled: boolean;
  created_at: Date | string;
  severity: "info" | "warning" | "error" | "success";
}
