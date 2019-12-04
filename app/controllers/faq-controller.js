const faqService = require("../services/faq-service");

const getAll = (req, res) => {
  faqService
    .selectAll()
    .then(resp => {
      res.send(resp);
    })
    .catch(err => {
      res.status("404").json({ error: err.toString() });
    });
};

const getAllByLanguage = (req, res) => {
  const { language } = req.params;
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
  const { id } = req.params;
  faqService
    .selectById(id)
    .then(resp => {
      res.send(resp);
    })
    .catch(err => {
      res.status("500").json({ error: err.toString() });
    });
};

const getByIdentifier = (req, res) => {
  const { identifier } = req.params;
  console.log(identifier)
  faqService
    .selectByIdentifier(identifier)
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
  const { id } = req.params;
  faqService
    .update(id, req.body)
    .then(resp => {
      res.json(resp);
    })
    .catch(err => {
      res.status("500").json({ error: err.toString() });
    });
};

const remove = (req, res) => {
  const { identifier } = req.body;
  faqService
    .remove(identifier)
    .then(resp => {
      res.sendStatus(200);
    })
    .catch(err => {
      res.status("500").json({ error: err.toString() });
    });
};

module.exports = {
  getAll,
  getAllByLanguage,
  getById,
  getByIdentifier,
  post,
  put,
  remove
};
