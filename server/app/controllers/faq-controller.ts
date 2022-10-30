import { RequestHandler } from "express";
import faqService from "../services/faq-service";
import { Faq } from "../types/faq-types";

const getAll: RequestHandler<never, Faq[] | { error: string }, never, never> = (
  _req,
  res
) => {
  faqService
    .selectAll()
    .then((resp) => {
      res.send(resp);
    })
    .catch((err) => {
      res.status(404).json({ error: err.toString() });
    });
};

const getAllByLanguage: RequestHandler<
  { language: string },
  Faq[] | { error: string },
  never,
  never
> = (req, res) => {
  const { language } = req.params;
  faqService
    .selectAllByLanguage(language)
    .then((resp) => {
      res.send(resp);
    })
    .catch((err) => {
      res.status(404).json({ error: err.toString() });
    });
};

const getById: RequestHandler<
  { id: string },
  Faq | { error: string },
  never,
  never
> = (req, res) => {
  const { id } = req.params;
  faqService
    .selectById(id)
    .then((resp) => {
      res.send(resp);
    })
    .catch((err) => {
      res.status(500).json({ error: err.toString() });
    });
};

const getByIdentifier: RequestHandler<
  { identifier: string },
  Faq[] | { error: string },
  never,
  never
> = (req, res) => {
  const { identifier } = req.params;
  faqService
    .selectByIdentifier(identifier)
    .then((resp) => {
      res.send(resp);
    })
    .catch((err) => {
      res.status(500).json({ error: err.toString() });
    });
};

const post: RequestHandler<
  never,
  { id: number } | { error: string },
  Faq,
  never
> = (req, res) => {
  faqService
    .insert(req.body)
    .then((resp) => {
      res.json(resp);
    })
    .catch((err) => {
      res.status(500).json({ error: err.toString() });
    });
};

const put: RequestHandler<
  { id: string },
  Faq | { error: string },
  Faq,
  never
> = (req, res) => {
  const { id } = req.params;
  faqService
    .update(id, req.body)
    .then((resp) => {
      res.json(resp);
    })
    .catch((err) => {
      res.status(500).json({ error: err.toString() });
    });
};

const remove: RequestHandler<
  never,
  { identifier: number } | { error: string },
  { identifier: string },
  never
> = (req, res) => {
  const { identifier } = req.body;
  faqService
    .remove(identifier)
    .then(() => {
      res.sendStatus(200);
    })
    .catch((err) => {
      res.status(500).json({ error: err.toString() });
    });
};

export default {
  getAll,
  getAllByLanguage,
  getById,
  getByIdentifier,
  post,
  put,
  remove,
};
