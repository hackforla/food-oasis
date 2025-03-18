import { RequestHandler } from "express";
import { Announcement } from "../../types/announcement-types";
import localNotificationsService from "../services/localNotifications-service";

const getAll: RequestHandler<
  never,
  Announcement[] | { error: string },
  never
> = async (req, res) => {
  try {
    const resp = await localNotificationsService.getAll();
    res.status(200).json(resp);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const post: RequestHandler<
  never,
  { id: number } | { error: string },
  //LocalNotifications
  Announcement
> = async (req, res) => {
  try {
    //console.log
	const resp = await localNotificationsService.insert(req.body);
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
    const rowCount = await localNotificationsService.remove(req.params.id);
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
  {/* id: string */},
  { id: number },
  { error: string } | { message: string } | Announcement,
  ///{ is_enabled: boolean }
> = async (req, res) => {
  try {
    const { id } = req.params;
	const { name } = req.body;
	console.log({ name });
    //const { is_enabled } = req.body;
    //const resp = await localNotificationsService.update(Number(id), is_enabled);
	//const resp = await localNotificationsService.update(Number(id), String(name));
    const resp = await localNotificationsService.update(Number(id), name);
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