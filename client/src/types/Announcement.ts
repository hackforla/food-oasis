export type AnnouncementSeverity =
  | "info"
  | "warning"
  | "error"
  | "success";

export interface AnnouncementInput {
  title: string;
  description: string;
  is_enabled: boolean;
  severity: AnnouncementSeverity;
}

/** API response shape (id, created_at from server) */
export interface Announcement extends AnnouncementInput {
  id: number;
  created_at: string;
}

/** UI list row shape (announcementId used in admin table) */
export interface ProcessedAnnouncement {
  announcementId: number;
  title: string;
  description: string;
  is_enabled: boolean;
  severity: AnnouncementSeverity;
  created_at: string;
}
