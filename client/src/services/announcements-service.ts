import axios from "axios";

export interface AnnouncementInput {
  title: string;
  description: string;
  is_enabled: boolean;
  severity: "info" | "warning" | "error" | "success";
}

export interface Announcement extends AnnouncementInput {
  id: number;
  created_at: string;
}

const baseUrl = "/api/announcements";

export const getAllAnnouncements = async (): Promise<Announcement[]> => {
  try {
    const response = await axios.get<Announcement[]>(`${baseUrl}`);
    return response.data;
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : "Failed to fetch announcements"
    );
  }
};

export const post = async (
  announcement: AnnouncementInput
): Promise<Announcement> => {
  const response = await axios.post<Announcement>(`${baseUrl}`, {
    ...announcement,
  });
  return response.data;
};

export const remove = async (id: number): Promise<any> => {
  const response = await axios.delete(`${baseUrl}/${id}`);
  return response.data;
};

export const update = async (
  id: number,
  announcement: AnnouncementInput
): Promise<Announcement> => {
  const response = await axios.put<Announcement>(
    `${baseUrl}/${id}`,
    announcement
  );
  return response.data;
};
