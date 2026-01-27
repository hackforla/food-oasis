export interface Announcement {
  id: number;
  description: string;
  is_enabled: boolean;
  severity: "info" | "warning" | "error" | "success";
}
