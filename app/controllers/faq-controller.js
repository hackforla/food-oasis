const faqService = require("../services/faq-service");

const getAll = (req, res) => {
  const { language } = req.body;
  faqService
    .selectAll(language)
    .then(resp => {
      res.send(resp);
    })
    .catch(err => {
      res.status("404").json({ error: err.toString() });
    });
};

const getById = (req, res) => {
  faqService
    .selectById(req.params.id, req.body)
    .then(resp => {
      res.send(resp);
    })
    .catch(err => {
      res.status("500").json({ error: err.toString() });
    });
};

const post = (req, res) => {
  faqService
    .insert(req.body)
    .then(resp => {
      res.json(resp);
    })
    .catch(err => {
      res.status("500").json({ error: err.toString() });
    });
};

const put = (req, res) => {
  faqService
    .update(req.params.id, req.body)
    .then(resp => {
      res.json(resp);
    })
    .catch(err => {
      res.status("500").json({ error: err.toString() });
    });
};

const remove = (req, res) => {
  faqService
    .remove(req.body) // identifier
    .then(resp => {
      res.sendStatus(200);
    })
    .catch(err => {
      res.status("500").json({ error: err.toString() });
    });
};

module.exports = {
  getAll,
  getById,
  post,
  put,
  remove
};
