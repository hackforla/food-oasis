import { RequestHandler } from "express";
import { Announcements } from "../../types/announcements-types"; 
import announcementsService from "../services/announcements-service";

const getAll: RequestHandler<
  never,
  Announcements[] | { error: string },
  never
> = async (req, res) => {
  try {
    const resp = await announcementsService.getAll();
    res.status(200).json(resp);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const post: RequestHandler<
  never,
  { id: number } | { error: string },
  Announcements
> = async (req, res) => {
  try {
    const resp = await announcementsService.insert(req.body);
    res.status(201).json(resp);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
const remove: RequestHandler<
  { id: string },
  Response | { error: string } | { message: string },
  never
> = async (req, res) => {
  try {
    const rowCount = await announcementsService.remove(req.params.id);
    if (!rowCount) {
      return res.status(400).json({ error: "Record not found" });
    }
    res.sendStatus(204);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
const update: RequestHandler<
  { id: number },
  { error: string } | { message: string } | Announcements
  //{ is_enabled: boolean }
> = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, is_enabled } = req.body; // Updated variable names
    const resp = await announcementsService.update(Number(id), title, description, is_enabled);
    res.status(200).json(resp);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export default {
  post,
  getAll,
  remove,
  update,
};