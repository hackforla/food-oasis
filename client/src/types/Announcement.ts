export type AnnouncementSeverity = "info" | "warning" | "error" | "success";

export interface AnnouncementInput {
  title: string;
  description: string;
  is_enabled: boolean;
  severity: AnnouncementSeverity;
}

export interface Announcement extends AnnouncementInput {
  id: number;
  created_at: string;
}

export interface ProcessedAnnouncement {
  announcementId: number;
  title: string;
  description: string;
  is_enabled: boolean;
  severity: AnnouncementSeverity;
  created_at: string;
}
